"use server";

import db from "@/lib/db";
import { Workout } from "@/types";

/**
 * Fetch all workout templates belonging to a specific user.
 * Templates are used to initialize a workout session.
 */
export const getWorkouts = async (userId: string): Promise<Workout[]> => {
    return await db.workout.findMany({
        where: { userId },
        include: {
            exercises: {
                include: {
                    exercise: true
                },
                orderBy: {
                    order: 'asc'
                }
            }
        },
        orderBy: { updatedAt: "desc" }
    });
};

/**
 * Fetch a single workout template by its ID, 
 * including all planned exercises in their correct order.
 */
export const getWorkoutById = async (id: string): Promise<Workout | null> => {
    return await db.workout.findUnique({
        where: { id },
        include: {
            exercises: {
                include: {
                    exercise: true
                },
                orderBy: {
                    order: 'asc'
                }
            }
        }
    });
};

/**
 * Creates a new workout template with its associated exercises.
 */
export const createWorkout = async (data: {
    name: string;
    userId: string;
    exercises: { exerciseId: string; order: number }[];
}): Promise<Workout> => {
    return await db.workout.create({
        data: {
            name: data.name,
            userId: data.userId,
            exercises: {
                create: data.exercises.map((item) => ({
                    exerciseId: item.exerciseId,
                    order: item.order,
                })),
            },
        },
        include: {
            exercises: {
                include: {
                    exercise: true,
                },
            },
        },
    }) as any;
};

/**
 * Deletes a workout template.
 */
export const deleteWorkout = async (id: string): Promise<void> => {
    await db.workout.delete({
        where: { id },
    });
};

/**
 * Updates an existing workout template.
 * Uses a "replace-all" strategy for exercises: deletes all existing links and re-creates them.
 */
export const updateWorkout = async (id: string, data: {
    name: string;
    exercises: { exerciseId: string; order: number }[];
}): Promise<Workout> => {
    return await db.workout.update({
        where: { id },
        data: {
            name: data.name,
            exercises: {
                deleteMany: {}, // Remove all existing exercises
                create: data.exercises.map((item) => ({
                    exerciseId: item.exerciseId,
                    order: item.order,
                })),
            },
        },
        include: {
            exercises: {
                include: {
                    exercise: true,
                },
                orderBy: {
                    order: 'asc'
                }
            },
        },
    }) as any;
};
