"use client";

import { useState, useCallback } from "react";
import { Workout, Exercise } from "@/types";
import { useWorkoutTimer } from "@/hooks/useWorkoutTimer";
import PlayerHeader from "./PlayerHeader";
import ExerciseLoggingCard from "./ExerciseLoggingCard";
import SessionSummary from "./SessionSummary";
import RestTimer from "./RestTimer";
import SessionCompleteModal from "./SessionCompleteModal";
import { logWorkout, getLastLogForExercise } from "@/services/logging.service";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface WorkoutPlayerContainerProps {
    template: Workout;
    programDayId?: string | null;
    historyData?: Record<string, any>;
}

export interface SetRecord {
    reps: number;
    weight: number;
    isDone: boolean;
}

export interface ExerciseSession {
    exercise: Exercise;
    sets: SetRecord[];
}

export default function WorkoutPlayerContainer({ template, programDayId, historyData }: WorkoutPlayerContainerProps) {
    const router = useRouter();
    const { formattedTime, seconds } = useWorkoutTimer();

    // Initialize session state with exercises from template
    const [sessionData, setSessionData] = useState<ExerciseSession[]>(
        template.exercises?.map(we => ({
            exercise: we.exercise!,
            sets: [{ reps: 0, weight: 0, isDone: false }] // Start with one empty set
        })) || []
    );

    const [activeExerciseIndex, setActiveExerciseIndex] = useState(0);
    const [restTimeRemaining, setRestTimeRemaining] = useState<number | null>(null);
    const [isFinishing, setIsFinishing] = useState(false);
    const [showSummary, setShowSummary] = useState(false);

    // Get history for active exercise from the batch-fetched historyData
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

        handleUpdateSet(exerciseIndex, setIndex, { isDone: !currentDone });

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

    const handleFinish = async () => {
        setIsFinishing(true);
        try {
            await logWorkout({
                workoutId: template.id,
                userId: "user_123", // Mock
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
            />

            <div className="flex-1 container mx-auto px-4 py-6 space-y-8 max-w-3xl">
                {activeExercise ? (
                    <ExerciseLoggingCard
                        exercise={activeExercise.exercise}
                        sets={activeExercise.sets}
                        lastLog={lastLog}
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
        </div>
    );
}
