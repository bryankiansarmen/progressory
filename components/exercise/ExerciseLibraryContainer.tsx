"use client";

import { useState, useMemo } from "react";
import { Exercise } from "@/types";
import ExerciseCard from "./ExerciseCard";
import ExerciseFilters from "./ExerciseFilters";
import CreateExerciseDialog from "./CreateExerciseDialog";

interface ExerciseLibraryContainerProps {
    initialExercises: Exercise[];
}

export default function ExerciseLibraryContainer({ initialExercises }: ExerciseLibraryContainerProps) {
    const [exercises, setExercises] = useState<Exercise[]>(initialExercises);
    const [searchQuery, setSearchQuery] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("all");
    const [muscleGroupFilter, setMuscleGroupFilter] = useState("all");

    const filteredExercises = useMemo(() => {
        return exercises.filter((ex) => {
            const matchesSearch =
                ex.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                ex.variations?.some(v => v.name.toLowerCase().includes(searchQuery.toLowerCase()));

            const matchesCategory = categoryFilter === "all" || ex.category === categoryFilter;
            const matchesMuscleGroup = muscleGroupFilter === "all" || ex.muscleGroup === muscleGroupFilter;

            return matchesSearch && matchesCategory && matchesMuscleGroup;
        });
    }, [exercises, searchQuery, categoryFilter, muscleGroupFilter]);

    const handleExerciseCreated = (newExercise: Exercise) => {
        setExercises((prev) => [newExercise, ...prev].sort((a, b) => a.name.localeCompare(b.name)));
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <ExerciseFilters
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    categoryFilter={categoryFilter}
                    onCategoryChange={setCategoryFilter}
                    muscleGroupFilter={muscleGroupFilter}
                    onMuscleGroupChange={setMuscleGroupFilter}
                />
                <CreateExerciseDialog onExerciseCreated={handleExerciseCreated} />
            </div>

            {filteredExercises.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredExercises.map((exercise) => (
                        <ExerciseCard key={exercise.id} exercise={exercise} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-24 bg-card/30 border-2 border-dashed rounded-[40px] px-6">
                    <h3 className="text-2xl font-black tracking-tight mb-2">No exercises found</h3>
                    <p className="text-muted-foreground mb-6 font-medium italic opacity-60">Try adjusting your filters or create a new custom exercise.</p>
                </div>
            )}
        </div>
    );
}
