"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface ExerciseFiltersProps {
    searchQuery: string;
    onSearchChange: (query: string) => void;
    categoryFilter: string;
    onCategoryChange: (category: string) => void;
    muscleGroupFilter: string;
    onMuscleGroupChange: (muscleGroup: string) => void;
}

export default function ExerciseFilters({
    searchQuery,
    onSearchChange,
    categoryFilter,
    onCategoryChange,
    muscleGroupFilter,
    onMuscleGroupChange,
}: ExerciseFiltersProps) {
    const categories = ["all", "Strength", "Cardio", "Flexibility", "Stretching"];
    const muscleGroups = [
        "all",
        "Chest",
        "Legs",
        "Back",
        "Arms",
        "Shoulders",
        "Core",
        "FullBody",
    ];

    return (
        <div className="flex flex-col sm:flex-row items-center gap-4 flex-1">
            <div className="relative w-full sm:max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                    placeholder="Search exercises..."
                    className="pl-9 bg-card border-none shadow-inner focus-visible:ring-primary/50"
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                />
            </div>

            <div className="flex gap-2 w-full sm:w-auto">
                <select
                    className="flex h-9 w-full sm:w-[140px] rounded-md border border-input bg-card px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    value={muscleGroupFilter}
                    onChange={(e) => onMuscleGroupChange(e.target.value)}
                >
                    {muscleGroups.map((group) => (
                        <option key={group} value={group}>
                            {group === "all" ? "All Muscles" : group}
                        </option>
                    ))}
                </select>

                <select
                    className="flex h-9 w-full sm:w-[140px] rounded-md border border-input bg-card px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    value={categoryFilter}
                    onChange={(e) => onCategoryChange(e.target.value)}
                >
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>
                            {cat === "all" ? "All Types" : cat}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}
