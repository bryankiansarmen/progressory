"use client";

import { useState, useCallback, useRef } from "react";
import { Workout, Exercise } from "@/types";
import { useWorkoutTimer } from "@/hooks/useWorkoutTimer";
import PlayerHeader from "./PlayerHeader";
import ExerciseLoggingCard from "./ExerciseLoggingCard";
import SessionSummary from "./SessionSummary";
import RestTimer from "./RestTimer";
import SessionCompleteModal from "./SessionCompleteModal";
import ConflictResolutionModal from "./ConflictResolutionModal";
import { logWorkout, syncDraftSession, getDraftSession, discardDraftSession } from "@/services/logging.service";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { calculatePrediction, generatePredictedSets } from "@/lib/prediction-engine";
import { calculateBrzycki1RM } from "@/lib/utils/analytics";
import confetti from "canvas-confetti";
import { Trophy } from "lucide-react";
interface WorkoutPlayerContainerProps {
    template: Workout;
    programDayId?: string | null;
    historyData?: Record<string, any>;
    trendsData?: Record<string, any[]>;
}

export interface SetRecord {
    reps: number;
    weight: number;
    isDone: boolean;
    isPR?: boolean;
}

export interface ExerciseSession {
    exercise: Exercise;
    sets: SetRecord[];
}

const STORAGE_KEY = "progressory_active_session";

interface PersistedSession {
    templateId: string;
    sessionData: ExerciseSession[];
    seconds: number;
    activeExerciseIndex: number;
    restTimeRemaining: number | null;
    updatedAt?: number;
}

export default function WorkoutPlayerContainer({ template, programDayId, historyData, trendsData }: WorkoutPlayerContainerProps) {
    const router = useRouter();
    const userId = "user_123"; // Mock

    // Hydration & Conflict State
    const [isHydrated, setIsHydrated] = useState(false);
    const [initialState, setInitialState] = useState<PersistedSession | null>(null);
    const [cloudDraft, setCloudDraft] = useState<PersistedSession | null>(null);
    const [showConflictModal, setShowConflictModal] = useState(false);
    const [syncStatus, setSyncStatus] = useState<"syncing" | "saved" | "error">("saved");

    // Session state
    const [sessionData, setSessionData] = useState<ExerciseSession[]>([]);
    const [activeExerciseIndex, setActiveExerciseIndex] = useState(0);
    const [restTimeRemaining, setRestTimeRemaining] = useState<number | null>(null);
    const [isFinishing, setIsFinishing] = useState(false);
    const [showSummary, setShowSummary] = useState(false);
    const [achievedPrSetIds, setAchievedPrSetIds] = useState<Set<string>>(new Set());
    const [showPrToast, setShowPrToast] = useState(false);

    // Timer hook
    const { formattedTime, seconds } = useWorkoutTimer(initialState?.seconds || 0);

    const syncDataRef = useRef({ sessionData, seconds, activeExerciseIndex });

    // Keep refs up to date
    useEffect(() => {
        syncDataRef.current = { sessionData, seconds, activeExerciseIndex };
    }, [sessionData, seconds, activeExerciseIndex]);

    const performSync = useCallback(async () => {
        if (!isHydrated || showConflictModal || isFinishing) return;

        setSyncStatus("syncing");
        const startTime = Date.now();

        try {
            const { sessionData, seconds, activeExerciseIndex } = syncDataRef.current;
            await syncDraftSession({
                userId,
                templateId: template.id,
                data: JSON.stringify(sessionData),
                seconds,
                activeExerciseIndex,
            });

            // Ensure indicator is visible for at least 800ms
            const elapsed = Date.now() - startTime;
            const delay = Math.max(0, 800 - elapsed);
            setTimeout(() => setSyncStatus("saved"), delay);
        } catch {
            setSyncStatus("error");
        }
    }, [isHydrated, showConflictModal, isFinishing, userId, template.id]);

    // Initial hydration from LocalStorage & Server
    useEffect(() => {
        const loadSessions = async () => {
            // Reset conflict states when template changes
            setShowConflictModal(false);
            setCloudDraft(null);
            setInitialState(null);

            // Check LocalStorage
            const saved = localStorage.getItem(STORAGE_KEY);
            let local: PersistedSession | null = null;
            if (saved) {
                try {
                    local = JSON.parse(saved);
                } catch (e) {
                    console.error("Failed to parse local session:", e);
                }
            }

            // Check Server
            const draft = await getDraftSession(userId);
            let server: PersistedSession | null = null;
            if (draft) {
                try {
                    server = {
                        templateId: draft.templateId,
                        sessionData: JSON.parse(draft.data),
                        seconds: draft.seconds,
                        activeExerciseIndex: draft.activeExerciseIndex,
                        restTimeRemaining: null,
                        updatedAt: new Date(draft.updatedAt).getTime(),
                    };
                } catch (e) {
                    console.error("Failed to parse server session:", e);
                }
            }

            // Decide which to use or if we show conflict
            const bestSession = server && (!local || (server.updatedAt || 0) > (local.updatedAt || 0)) ? server : local;

            if (bestSession) {
                if (bestSession.templateId !== template.id) {
                    setCloudDraft(bestSession);
                    setShowConflictModal(true);
                } else {
                    setInitialState(bestSession);
                }
            }
            setIsHydrated(true);
        };

        loadSessions();
    }, [template.id, userId]);

    // State synchronization on hydration
    useEffect(() => {
        if (isHydrated && !showConflictModal) {
            if (initialState) {
                setSessionData(initialState.sessionData);
                setActiveExerciseIndex(initialState.activeExerciseIndex);
                setRestTimeRemaining(initialState.restTimeRemaining);
            } else {
                // Apply predictions when starting fresh (no draft)
                setSessionData(
                    template.exercises?.map(we => {
                        const exerciseId = we.exerciseId;
                        const trends = trendsData?.[exerciseId] || [];
                        const predictedSets = generatePredictedSets(trends, 3);

                        return {
                            exercise: we.exercise!,
                            sets: predictedSets.length > 0 ? predictedSets : [{ reps: 0, weight: 0, isDone: false }]
                        };
                    }) || []
                );
            }
        }
    }, [isHydrated, initialState, template.exercises, showConflictModal, trendsData]);

    // Sync every 30 seconds
    useEffect(() => {
        if (!isHydrated || showConflictModal || isFinishing) return;
        const interval = setInterval(() => performSync(), 30000);
        return () => clearInterval(interval);
    }, [isHydrated, showConflictModal, isFinishing, performSync]);

    // Sync immediately on major data change (Set toggled/Exercise swapped)
    useEffect(() => {
        if (!isHydrated || showConflictModal || isFinishing) return;
        // Skip first run
        if (sessionData.length > 0) {
            performSync();
        }
    }, [sessionData, activeExerciseIndex]);

    // Persistence to LocalStorage on change
    useEffect(() => {
        if (!isHydrated || showConflictModal || isFinishing || showSummary) return;

        const state: PersistedSession = {
            templateId: template.id,
            sessionData,
            seconds,
            activeExerciseIndex,
            restTimeRemaining,
            updatedAt: Date.now()
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }, [isHydrated, template.id, sessionData, seconds, activeExerciseIndex, restTimeRemaining, showConflictModal, isFinishing, showSummary]);

    const activeExercise = sessionData[activeExerciseIndex];
    const lastLog = activeExercise && historyData ? historyData[activeExercise.exercise.id] : null;

    const handleUpdateSet = (exerciseIndex: number, setIndex: number, data: Partial<SetRecord>) => {
        setSessionData(prev => prev.map((ed, exIdx) => {
            if (exIdx !== exerciseIndex) return ed;
            return {
                ...ed,
                sets: ed.sets.map((s, sIdx) => {
                    if (sIdx !== setIndex) return s;
                    return { ...s, ...data };
                })
            };
        }));
    };

    const handleAddSet = (exerciseIndex: number) => {
        setSessionData(prev => prev.map((ed, exIdx) => {
            if (exIdx !== exerciseIndex) return ed;
            const lastSet = ed.sets[ed.sets.length - 1];
            return {
                ...ed,
                sets: [...ed.sets, {
                    reps: lastSet?.reps || 0,
                    weight: lastSet?.weight || 0,
                    isDone: false
                }]
            };
        }));
    };

    const handleRemoveSet = (exerciseIndex: number, setIndex: number) => {
        setSessionData(prev => prev.map((ed, exIdx) => {
            if (exIdx !== exerciseIndex) return ed;
            return {
                ...ed,
                sets: ed.sets.filter((_, i) => i !== setIndex)
            };
        }));
    };

    const handleToggleSetDone = (exerciseIndex: number, setIndex: number) => {
        const set = sessionData[exerciseIndex].sets[setIndex];
        const currentDone = set.isDone;
        let isNewPR = false;

        if (!currentDone) {
            const exerciseId = sessionData[exerciseIndex].exercise.id;
            const history = trendsData?.[exerciseId] || [];
            const current1RM = calculateBrzycki1RM(set.weight, set.reps);

            let maxHistory1RM = 0;
            history.forEach(log => {
                log.sets.forEach((s: any) => {
                    const estimated1RM = calculateBrzycki1RM(s.weight, s.reps);
                    if (estimated1RM > maxHistory1RM) {
                        maxHistory1RM = estimated1RM;
                    }
                });
            });

            const setId = `${exerciseIndex}-${setIndex}`;

            if (current1RM > maxHistory1RM && maxHistory1RM > 0 && !achievedPrSetIds.has(setId)) {
                isNewPR = true;
                setAchievedPrSetIds(prev => new Set(prev).add(setId));
                setSessionData(prev => prev.map((ed, exIdx) => {
                    if (exIdx !== exerciseIndex) return ed;
                    return {
                        ...ed,
                        sets: ed.sets.map((s, sIdx) => {
                            if (sIdx !== setIndex) return s;
                            return { ...s, isDone: true, isPR: true };
                        })
                    };
                }));

                // Trigger Celebration
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 },
                    colors: ['#10b981', '#34d399', '#f59e0b', '#fbbf24']
                });

                if ("vibrate" in navigator) {
                    navigator.vibrate([100, 50, 100]);
                }

                setShowPrToast(true);
                setTimeout(() => setShowPrToast(false), 3000);
            }
        }

        if (!isNewPR) {
            handleUpdateSet(exerciseIndex, setIndex, { isDone: !currentDone });
        }

        if (!currentDone) {
            setRestTimeRemaining(sessionData[exerciseIndex].exercise.restTime || 90);
        }
    };

    const handleSwapExercise = (index: number, newExercise: Exercise) => {
        setSessionData(prev => prev.map((ed, exIdx) => {
            if (exIdx !== index) return ed;
            return {
                ...ed,
                exercise: newExercise
            };
        }));
    };

    const handleCloseRestTimer = useCallback(() => setRestTimeRemaining(null), []);
    const handleSkipRestTimer = useCallback(() => setRestTimeRemaining(null), []);

    const handleResume = () => {
        if (cloudDraft) {
            router.push(`/workouts/active?workoutId=${cloudDraft.templateId}`);
        }
    };

    const handleDiscard = async () => {
        setInitialState(null);
        setCloudDraft(null);
        setShowConflictModal(false);
        localStorage.removeItem(STORAGE_KEY);
        await discardDraftSession(userId);
    };

    const handleFinish = async () => {
        setIsFinishing(true);
        try {
            await logWorkout({
                workoutId: template.id,
                userId,
                duration: Math.floor(seconds / 60),
                programDayId: programDayId || undefined,
                entries: sessionData.map(ed => ({
                    exerciseId: ed.exercise.id,
                    sets: ed.sets.filter(s => s.isDone).map(s => ({
                        reps: s.reps,
                        weight: s.weight,
                        isDone: true
                    }))
                })).filter(e => e.sets.length > 0)
            });

            localStorage.removeItem(STORAGE_KEY);
            await discardDraftSession(userId);

            setShowSummary(true);
        } catch (error) {
            console.error("Failed to log workout:", error);
        } finally {
            setIsFinishing(false);
        }
    };

    const totalSets = sessionData.reduce((acc, ed) => acc + ed.sets.filter(s => s.isDone).length, 0);

    return (
        <div className="flex flex-col min-h-screen">
            <PlayerHeader
                templateName={template.name}
                timer={formattedTime}
                onFinish={handleFinish}
                isFinishing={isFinishing}
                syncStatus={syncStatus}
            />

            <div className="flex-1 container mx-auto px-4 py-6 space-y-8 max-w-3xl">
                {activeExercise ? (
                    <ExerciseLoggingCard
                        exercise={activeExercise.exercise}
                        sets={activeExercise.sets}
                        lastLog={lastLog}
                        prediction={trendsData?.[activeExercise.exercise.id] ? calculatePrediction(trendsData[activeExercise.exercise.id]) : null}
                        onUpdateSet={(idx: number, data: Partial<SetRecord>) => handleUpdateSet(activeExerciseIndex, idx, data)}
                        onAddSet={() => handleAddSet(activeExerciseIndex)}
                        onRemoveSet={(idx: number) => handleRemoveSet(activeExerciseIndex, idx)}
                        onToggleDone={(idx: number) => handleToggleSetDone(activeExerciseIndex, idx)}
                        onSwap={(newEx: Exercise) => handleSwapExercise(activeExerciseIndex, newEx)}
                    />
                ) : (
                    <div className="text-center py-20 bg-card rounded-3xl border-2">
                        No exercises in this workout.
                    </div>
                )}

                <SessionSummary
                    exercises={sessionData.map(sd => sd.exercise.name)}
                    activeIndex={activeExerciseIndex}
                    onSelectExercise={setActiveExerciseIndex}
                />
            </div>

            {restTimeRemaining !== null && (
                <RestTimer
                    duration={restTimeRemaining}
                    onComplete={handleCloseRestTimer}
                    onSkip={handleSkipRestTimer}
                />
            )}

            {showSummary && (
                <SessionCompleteModal
                    duration={Math.floor(seconds / 60)}
                    exerciseCount={sessionData.filter(ed => ed.sets.some(s => s.isDone)).length}
                    setCount={totalSets}
                />
            )}

            <ConflictResolutionModal
                isOpen={showConflictModal}
                existingWorkoutName={cloudDraft?.templateId || "Unknown"} // Ideally we fetch the name
                newWorkoutName={template.name}
                onResume={handleResume}
                onDiscard={handleDiscard}
            />

            {/* PR Toast Overlay */}
            <div className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-in-out ${showPrToast ? 'translate-y-0 opacity-100 scale-100' : '-translate-y-10 opacity-0 scale-95 pointer-events-none'}`}>
                <div className="bg-amber-500 text-white px-6 py-3 rounded-full flex items-center gap-3 shadow-xl shadow-amber-500/20 font-bold border-2 border-amber-400">
                    <Trophy className="w-5 h-5 text-yellow-200 fill-yellow-200" />
                    New Personal Record!
                </div>
            </div>
        </div>
    );
}
