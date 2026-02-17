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
                            isDone: true,
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

/**
 * Sync (upsert) the current draft session progress to the database.
 */
export const syncDraftSession = async (data: {
    userId: string;
    templateId: string;
    data: string; // Serialized JSON
    seconds: number;
    activeExerciseIndex: number;
}) => {
    return await db.draftSession.upsert({
        where: { userId: data.userId },
        update: {
            templateId: data.templateId,
            data: data.data,
            seconds: data.seconds,
            activeExerciseIndex: data.activeExerciseIndex,
        },
        create: {
            userId: data.userId,
            templateId: data.templateId,
            data: data.data,
            seconds: data.seconds,
            activeExerciseIndex: data.activeExerciseIndex,
        },
    });
};

/**
 * Retrieve the existing draft session for a user.
 */
export const getDraftSession = async (userId: string) => {
    return await db.draftSession.findUnique({
        where: { userId },
    });
};

/**
 * Discard/Delete the draft session for a user.
 */
export const discardDraftSession = async (userId: string) => {
    try {
        await db.draftSession.delete({
            where: { userId },
        });
    } catch (e) {
        // Ignore if record doesn't exist
    }
};
/**
 * Fetch the most recent N logs for a specific exercise to use for trend analysis.
 * Useful for calculating progressive overload targets.
 */
export const getExerciseTrends = async (userId: string, exerciseId: string, count: number = 3) => {
    return await db.workoutLogEntry.findMany({
        where: {
            exerciseId,
            workoutLog: { userId },
        },
        orderBy: { createdAt: "desc" },
        take: count,
        include: {
            sets: true,
        },
    });
};

/**
 * Fetch trends for a batch of exercises.
 */
export const getExerciseTrendsForBatch = async (userId: string, exerciseIds: string[], count: number = 3) => {
    const trends = await Promise.all(
        exerciseIds.map(id => getExerciseTrends(userId, id, count))
    );

    const result: Record<string, any[]> = {};
    exerciseIds.forEach((id, index) => {
        result[id] = trends[index];
    });
    return result;
};
