"use server";

import db from "@/lib/db";
import { WorkoutLog, Set } from "@/types";

/**
 * Initializes a new WorkoutLog session based on a Workout template.
 * Automatically creates the log entries and an initial set for each exercise.
 */
export const startWorkout = async (userId: string, workoutId: string): Promise<WorkoutLog> => {
    const template = await db.workout.findUnique({
        where: { id: workoutId },
        include: { exercises: true }
    });

    if (!template) throw new Error("Workout template not found");

    return await db.workoutLog.create({
        data: {
            userId,
            workoutId,
            entries: {
                create: template.exercises.map(ex => ({
                    exerciseId: ex.exerciseId,
                    sets: {
                        create: {
                            reps: 0,
                            weight: 0,
                            isDone: false
                        }
                    }
                }))
            }
        },
        include: {
            entries: {
                include: {
                    sets: true,
                    exercise: true
                }
            }
        }
    });
};

/**
 * Marks a specific set as complete and records the performance data.
 * This is the trigger for the "Checkmark" UI action.
 */
export const completeSet = async (setId: string, weight: number, reps: number): Promise<Set> => {
    return await db.set.update({
        where: { id: setId },
        data: {
            weight,
            reps,
            isDone: true
        }
    });
};

/**
 * Toggles a set back to an "incomplete" state.
 */
export const undoCompleteSet = async (setId: string): Promise<Set> => {
    return await db.set.update({
        where: { id: setId },
        data: {
            isDone: false
        }
    });
};

/**
 * Fetches the most recent completed performance for an exercise by a specific user.
 * Used to provide "previous weight" hints in the UI.
 */
export const getLastPerformance = async (userId: string, exerciseId: string): Promise<Set | null> => {
    return await db.set.findFirst({
        where: {
            isDone: true,
            logEntry: {
                exerciseId,
                workoutLog: {
                    userId
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    });
};

/**
 * Fetch a full workout log session by ID, including all entries and sets.
 */
export const getWorkoutLogById = async (id: string): Promise<WorkoutLog | null> => {
    return await db.workoutLog.findUnique({
        where: { id },
        include: {
            entries: {
                include: {
                    exercise: true,
                    sets: true
                }
            }
        }
    });
};
