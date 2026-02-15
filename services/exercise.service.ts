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
        isArchived: false,
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
                where: { isArchived: false },
                orderBy: { name: "asc" }
            }
        },
        orderBy: { name: "asc" }
    }) as any;
};

/**
 * Fetch top-level exercises that can be parents for variations.
 */
export const getPotentialParents = async (): Promise<Exercise[]> => {
    return await db.exercise.findMany({
        where: {
            parentId: null,
            isArchived: false,
        },
        orderBy: { name: "asc" }
    }) as any;
};

/**
 * Fetch a single exercise by its uniquely identifying ID.
 */
export const getExerciseById = async (id: string): Promise<Exercise | null> => {
    return await db.exercise.findUnique({
        where: { id },
        include: {
            variations: {
                where: { isArchived: false }
            }
        }
    }) as any;
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
    parentId?: string | null;
}): Promise<Exercise> => {
    return await db.exercise.create({
        data: {
            ...data,
        }
    });
};

/**
 * Updates an existing custom exercise.
 * Includes an ownership check to ensure only the creator can modify it.
 */
export const updateExercise = async (id: string, userId: string, data: {
    name?: string;
    category?: string;
    muscleGroup?: string;
    equipment?: string;
    parentId?: string | null;
}): Promise<Exercise> => {
    return await db.exercise.update({
        where: {
            id,
            userId // Ownership check
        },
        data
    });
};

/**
 * Archives an existing custom exercise (soft-delete).
 */
export const archiveExercise = async (id: string, userId: string): Promise<Exercise> => {
    return await db.exercise.update({
        where: {
            id,
            userId // Ownership check
        },
        data: {
            isArchived: true
        }
    });
};

/**
 * Fetch the entire movement family for an exercise.
 * Returns the parent exercise and all its variations.
 */
export const getExerciseFamily = async (exerciseId: string): Promise<Exercise[]> => {
    const exercise = await db.exercise.findUnique({
        where: { id: exerciseId },
        select: { id: true, parentId: true }
    });

    if (!exercise) return [];

    const rootId = exercise.parentId || exercise.id;

    return await db.exercise.findMany({
        where: {
            OR: [
                { id: rootId },
                { parentId: rootId }
            ],
            isArchived: false
        },
        orderBy: { name: "asc" }
    }) as any;
};
