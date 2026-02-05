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
