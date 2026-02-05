"use server";

import db from "@/lib/db";
import { Exercise } from "@/types";

/**
 * Fetch all available exercises from the database, sorted by name.
 * Includes both global library exercises and user-created custom ones.
 */
/**
 * Fetch a paginated slice of exercises from the database.
 * Supports server-side filtering by name, category, and muscle group.
 * Only returns top-level movements (parentId: null).
 */
export const getExercises = async (params: {
    limit?: number;
    skip?: number;
    search?: string;
    category?: string;
    muscleGroup?: string;
} = {}): Promise<Exercise[]> => {
    const { limit = 20, skip = 0, search = "", category = "all", muscleGroup = "all" } = params;

    const where: any = {
        parentId: null,
    };

    if (search) {
        where.OR = [
            { name: { contains: search } },
            { variations: { some: { name: { contains: search } } } }
        ];
    }

    if (category !== "all") {
        where.category = category;
    }

    if (muscleGroup !== "all") {
        where.muscleGroup = muscleGroup;
    }

    return await db.exercise.findMany({
        where,
        take: limit,
        skip: skip,
        include: {
            variations: {
                orderBy: { name: "asc" }
            }
        },
        orderBy: { name: "asc" }
    }) as any;
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
