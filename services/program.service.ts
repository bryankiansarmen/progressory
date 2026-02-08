"use server";

import db from "@/lib/db";
import { Program } from "@/types";

/**
 * Fetch all programs belonging to a specific user.
 */
export const getPrograms = async (userId: string): Promise<Program[]> => {
    return await db.program.findMany({
        where: { userId },
        include: {
            days: {
                include: {
                    workout: true
                },
                orderBy: {
                    dayNumber: 'asc'
                }
            }
        },
        orderBy: { updatedAt: "desc" }
    }) as any;
};

/**
 * Fetch a single program by its ID.
 */
export const getProgramById = async (id: string): Promise<Program | null> => {
    return await db.program.findUnique({
        where: { id },
        include: {
            days: {
                include: {
                    workout: {
                        include: {
                            exercises: {
                                include: {
                                    exercise: true
                                }
                            }
                        }
                    }
                },
                orderBy: {
                    dayNumber: 'asc'
                }
            }
        }
    }) as any;
};

/**
 * Creates a new training program.
 */
export const createProgram = async (data: {
    name: string;
    description?: string;
    userId: string;
    days: { workoutId: string; dayNumber: number }[];
}): Promise<Program> => {
    return await db.program.create({
        data: {
            name: data.name,
            description: data.description,
            userId: data.userId,
            days: {
                create: data.days.map((day) => ({
                    workoutId: day.workoutId,
                    dayNumber: day.dayNumber,
                })),
            },
        },
        include: {
            days: true,
        },
    }) as any;
};

/**
 * Deletes a program.
 */
export const deleteProgram = async (id: string): Promise<void> => {
    await db.program.delete({
        where: { id },
    });
};

/**
 * Enrolls a user in a program, making it the active one.
 * Clears active status from all other programs for that user.
 */
export const enrollInProgram = async (userId: string, programId: string): Promise<void> => {
    // Transaction to ensure atomicity
    await db.$transaction([
        // Deactivate all programs for the user
        db.program.updateMany({
            where: { userId },
            data: { isActive: false }
        }),
        // Activate the selected program
        db.program.update({
            where: { id: programId },
            data: { isActive: true }
        })
    ]);
};

/**
 * Calculates the progress of a program based on completed workout logs
 * linked to program days.
 */
export const getProgramProgress = async (programId: string): Promise<{
    completedDays: number;
    totalDays: number;
    percentage: number;
    nextDayNumber: number;
}> => {
    const program = await db.program.findUnique({
        where: { id: programId },
        include: {
            days: {
                include: {
                    logs: true
                },
                orderBy: { dayNumber: 'asc' }
            }
        }
    });

    if (!program) {
        throw new Error("Program not found");
    }

    const totalDays = program.days.length;
    const completedDays = program.days.filter(day => day.logs.length > 0).length;
    const percentage = totalDays > 0 ? Math.round((completedDays / totalDays) * 100) : 0;
    
    // Find the first day that hasn't been logged yet
    const nextDay = program.days.find(day => day.logs.length === 0);
    const nextDayNumber = nextDay ? nextDay.dayNumber : (totalDays + 1);

    return {
        completedDays,
        totalDays,
        percentage,
        nextDayNumber
    };
};

/**
 * Fetch the currently active program for a user.
 */
export const getActiveProgram = async (userId: string): Promise<Program | null> => {
    return await db.program.findFirst({
        where: { userId, isActive: true },
        include: {
            days: {
                include: {
                    workout: true,
                    logs: true
                },
                orderBy: { dayNumber: 'asc' }
            }
        }
    }) as any;
};
