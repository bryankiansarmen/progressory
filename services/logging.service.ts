"use server";

import db from "@/lib/db";

interface LogWorkoutData {
    workoutId: string;
    userId: string;
    duration: number; // minutes
    programDayId?: string;
    entries: {
        exerciseId: string;
        sets: {
            reps: number;
            weight: number;
            isDone: boolean;
        }[];
    }[];
}

/**
 * Persist a completed workout session to the database.
 */
export const logWorkout = async (data: LogWorkoutData) => {
    return await db.workoutLog.create({
        data: {
            workoutId: data.workoutId,
            userId: data.userId,
            duration: data.duration,
            programDayId: data.programDayId,
            entries: {
                create: data.entries.map((entry) => ({
                    exerciseId: entry.exerciseId,
                    sets: {
                        create: entry.sets.map((set) => ({
                            reps: set.reps,
                            weight: set.weight,
                        })),
                    },
                })),
            },
        },
        include: {
            entries: {
                include: {
                    sets: true,
                    exercise: true,
                },
            },
        },
    });
};

/**
 * Fetch the most recent log for a specific exercise to use as a reference.
 */
export const getLastLogForExercise = async (userId: string, exerciseId: string) => {
    return await db.workoutLogEntry.findFirst({
        where: {
            exerciseId,
            workoutLog: { userId },
        },
        orderBy: { createdAt: "desc" },
        include: {
            sets: true,
        },
    });
};
/**
 * Fetch the most recent log for each exercise in a list.
 */
export const getLatestLogsForExercises = async (userId: string, exerciseIds: string[]) => {
    const logs = await Promise.all(
        exerciseIds.map(id => getLastLogForExercise(userId, id))
    );

    const result: Record<string, any> = {};
    exerciseIds.forEach((id, index) => {
        if (logs[index]) {
            result[id] = logs[index];
        }
    });
    return result;
};
