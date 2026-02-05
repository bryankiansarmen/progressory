export interface Exercise {
    id: string;
    name: string;
    category: string;
    muscleGroup: string;
    equipment: string | null;
    isCustom?: boolean;
    userId: string | null;
    parentId?: string | null;
    variations?: Exercise[];
    createdAt?: Date;
    updatedAt?: Date;
}

export interface Workout {
    id: string;
    name: string;
    userId: string;
    exercises?: WorkoutExercise[];
    createdAt: Date;
    updatedAt: Date;
}

export interface WorkoutExercise {
    id: string;
    workoutId: string;
    exerciseId: string;
    exercise?: Exercise;
    order: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface WorkoutLog {
    id: string;
    date: Date;
    duration?: number | null;
    userId: string;
    workoutId: string;
    entries?: WorkoutLogEntry[];
    createdAt: Date;
    updatedAt: Date;
}

export interface WorkoutLogEntry {
    id: string;
    workoutLogId: string;
    exerciseId: string;
    exercise?: Exercise;
    sets?: Set[];
    createdAt: Date;
    updatedAt: Date;
}

export interface Set {
    id: string;
    reps: number;
    weight: number;
    isDone: boolean;
    logEntryId: string;
    createdAt: Date;
    updatedAt: Date;
}
