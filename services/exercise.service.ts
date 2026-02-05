"use server";

import db from "@/lib/db";
import { Exercise } from "@/types";

/**
 * Fetch all available exercises from the database, sorted by name.
 * Includes both global library exercises and user-created custom ones.
 */
export const getExercises = async (): Promise<Exercise[]> => {
    return await db.exercise.findMany({
        orderBy: { name: "asc" }
    });
};

/**
 * Fetch a single exercise by its uniquely identifying ID.
 */
export const getExerciseById = async (id: string): Promise<Exercise | null> => {
    return await db.exercise.findUnique({
        where: { id }
    });
};

/**
 * Persists a new user-defined custom exercise to the database.
 */
export const createCustomExercise = async (data: {
    name: string;
    category: string;
    muscleGroup: string;
    equipment?: string;
    userId: string;
}): Promise<Exercise> => {
    return await db.exercise.create({
        data: {
            ...data,
        }
    });
};
