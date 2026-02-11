import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { Workout } from "@/types"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function getWorkoutMuscleGroups(workout: Workout): string[] {
    if (!workout.exercises) return [];
    
    const muscleGroups = new Set<string>();
    workout.exercises.forEach(we => {
        if (we.exercise?.muscleGroup) {
            muscleGroups.add(we.exercise.muscleGroup);
        }
    });
    
    return Array.from(muscleGroups);
}
