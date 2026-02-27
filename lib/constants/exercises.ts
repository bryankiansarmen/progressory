export const MUSCLE_GROUPS = [
    "Arms",
    "Back",
    "Chest",
    "Core",
    "Legs",
    "Shoulders",
    "Full Body"
] as const;

export const CATEGORIES = [
    "Strength",
    "Cardio",
    "Flexibility",
    "Stretching"
] as const;

export type MuscleGroup = typeof MUSCLE_GROUPS[number];
export type Category = typeof CATEGORIES[number];
