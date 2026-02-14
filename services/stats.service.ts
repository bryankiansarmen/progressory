"use server";

import db from "@/lib/db";
import { subDays, startOfDay } from "date-fns";
import { calculateBrzycki1RM } from "@/lib/utils/analytics";

export interface DashboardStats {
    weeklyVolume: number;
    weeklySessions: number;
    activityDays: boolean[];
    recentPRs: {
        exerciseName: string;
        weight: number;
        reps: number;
        date: string;
    }[];
    strengthScore: number;
}

/**
 * Calculates the current Strength Score for a user.
 * The score is the sum of the estimated 1RM for all "Core Lifts".
 */
export const getStrengthScore = async (userId: string): Promise<number> => {
    // Fetch all exercises tagged as core lifts
    const coreExercises = await db.exercise.findMany({
        where: { isCoreLift: true }
    });

    let totalScore = 0;

    // For each core lift, find the best estimated 1RM from history
    for (const ex of coreExercises) {
        const entries = await db.workoutLogEntry.findMany({
            where: {
                exerciseId: ex.id,
                workoutLog: { userId }
            },
            include: {
                sets: {
                    where: { isDone: true }
                }
            }
        });

        let best1RM = 0;
        entries.forEach(entry => {
            entry.sets.forEach(set => {
                // Brzycki is accurate up to 12 reps
                if (set.reps > 0 && set.reps <= 12) {
                    const estimated1RM = calculateBrzycki1RM(set.weight, set.reps);
                    if (estimated1RM > best1RM) {
                        best1RM = estimated1RM;
                    }
                }
            });
        });

        totalScore += best1RM;
    }

    return Math.round(totalScore);
};

export const getDashboardStats = async (userId: string): Promise<DashboardStats> => {
    const now = new Date();
    const sevenDaysAgo = subDays(startOfDay(now), 7);

    // Fetch all logs for the last 7 days for volume and frequency
    const recentLogs = await db.workoutLog.findMany({
        where: {
            userId,
            date: {
                gte: sevenDaysAgo,
            },
        },
        include: {
            entries: {
                include: {
                    sets: {
                        where: { isDone: true }
                    },
                },
            },
        },
    });

    // Calculate Weekly Volume
    let totalVolume = 0;
    recentLogs.forEach(log => {
        log.entries.forEach(entry => {
            entry.sets.forEach(set => {
                totalVolume += set.weight * set.reps;
            });
        });
    });

    // Activity Days (last 7 days)
    const activityDays = Array(7).fill(false);
    recentLogs.forEach(log => {
        const dayDiff = Math.floor((now.getTime() - log.date.getTime()) / (1000 * 60 * 60 * 24));
        if (dayDiff >= 0 && dayDiff < 7) {
            activityDays[6 - dayDiff] = true; // Map to [D-6, D-5, ..., Today]
        }
    });

    // Fetch Recent PRs (Real 1RM-based PRs)
    const allEntries = await db.workoutLogEntry.findMany({
        where: { workoutLog: { userId } },
        include: {
            exercise: true,
            sets: {
                where: { isDone: true },
            },
            workoutLog: true
        },
        orderBy: { createdAt: 'desc' },
        take: 50 // Pull more to find unique PRs
    });

    // Filter to get unique exercises and their top weights (estimated 1RM)
    const prMap = new Map();
    (allEntries as any[]).forEach(entry => {
        if (!prMap.has(entry.exerciseId) && entry.sets.length > 0) {
            let bestSet1RM = 0;
            let bestSet = entry.sets[0];

            entry.sets.forEach((s: any) => {
                const oneRM = calculateBrzycki1RM(s.weight, s.reps);
                if (oneRM > bestSet1RM) {
                    bestSet1RM = oneRM;
                    bestSet = s;
                }
            });

            prMap.set(entry.exerciseId, {
                exerciseName: entry.exercise.name,
                weight: bestSet.weight,
                reps: bestSet.reps,
                date: entry.workoutLog.date.toLocaleDateString(),
            });
        }
    });

    // Get Strength Score
    const strengthScore = await getStrengthScore(userId);

    return {
        weeklyVolume: Math.round(totalVolume),
        weeklySessions: recentLogs.length,
        activityDays,
        recentPRs: Array.from(prMap.values()).slice(0, 3),
        strengthScore,
    };
};

export interface HistoryLog {
    id: string;
    date: Date;
    duration: number | null;
    workoutName: string;
    exerciseCount: number;
    totalVolume: number;
}

/**
 * Fetches all workout logs for a user, ordered by date descending.
 */
export const getHistory = async (userId: string): Promise<HistoryLog[]> => {
    const logs = await db.workoutLog.findMany({
        where: { userId },
        include: {
            workout: true,
            entries: {
                include: {
                    sets: {
                        where: { isDone: true }
                    }
                }
            }
        },
        orderBy: { date: 'desc' }
    });

    return logs.map(log => {
        let totalVolume = 0;
        log.entries.forEach(entry => {
            entry.sets.forEach(set => {
                totalVolume += set.weight * set.reps;
            });
        });

        return {
            id: log.id,
            date: log.date,
            duration: log.duration,
            workoutName: log.workout?.name ?? "Ad-hoc Workout",
            exerciseCount: log.entries.length,
            totalVolume: Math.round(totalVolume),
        };
    });
};

/**
 * Fetches the granular details of a single workout log.
 */
export const getWorkoutLogDetail = async (logId: string) => {
    return await db.workoutLog.findUnique({
        where: { id: logId },
        include: {
            workout: true,
            entries: {
                include: {
                    exercise: true,
                    sets: {
                        where: { isDone: true },
                        orderBy: { createdAt: 'asc' }
                    }
                }
            }
        }
    });
};

export interface VolumeTrend {
    label: string;
    volume: number;
}

/**
 * Aggregates total volume by week for the specified number of weeks.
 */
export const getVolumeTrends = async (userId: string, weeks: number = 12): Promise<VolumeTrend[]> => {
    const now = new Date();
    const trends: VolumeTrend[] = [];

    for (let i = weeks - 1; i >= 0; i--) {
        const start = subDays(startOfDay(now), (i + 1) * 7);
        const end = subDays(startOfDay(now), i * 7);

        const logs = await db.workoutLog.findMany({
            where: {
                userId,
                date: {
                    gte: start,
                    lt: end,
                },
            },
            include: {
                entries: {
                    include: {
                        sets: {
                            where: { isDone: true }
                        }
                    }
                }
            }
        });

        let weeklyVolume = 0;
        logs.forEach(log => {
            log.entries.forEach(entry => {
                entry.sets.forEach(set => {
                    weeklyVolume += set.weight * set.reps;
                });
            });
        });

        trends.push({
            label: `W${weeks - i}`,
            volume: Math.round(weeklyVolume)
        });
    }

    return trends;
};

export interface MuscleDistribution {
    muscleGroup: string;
    setCount: number;
    percentage: number;
}

/**
 * Returns a proportional breakdown of sets per muscle group.
 */
export const getMuscleDistribution = async (userId: string): Promise<MuscleDistribution[]> => {
    const entries = await db.workoutLogEntry.findMany({
        where: {
            workoutLog: { userId }
        },
        include: {
            exercise: true,
            sets: {
                where: { isDone: true }
            }
        }
    });

    const counts: Record<string, number> = {};
    let totalSets = 0;

    entries.forEach(entry => {
        const mg = entry.exercise.muscleGroup;
        counts[mg] = (counts[mg] || 0) + entry.sets.length;
        totalSets += entry.sets.length;
    });

    return Object.entries(counts)
        .map(([muscleGroup, setCount]) => ({
            muscleGroup,
            setCount,
            percentage: totalSets > 0 ? Math.round((setCount / totalSets) * 100) : 0
        }))
        .sort((a, b) => b.setCount - a.setCount);
};
