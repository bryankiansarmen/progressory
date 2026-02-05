"use client";

import { useState, useMemo, useEffect, useCallback, useRef } from "react";
import { Exercise } from "@/types";
import ExerciseCard from "./ExerciseCard";
import ExerciseFilters from "./ExerciseFilters";
import CreateExerciseDialog from "./CreateExerciseDialog";
import { getExercises } from "@/services/exercise.service";
import { Loader2 } from "lucide-react";

interface ExerciseLibraryContainerProps {
    initialExercises: Exercise[];
}

export default function ExerciseLibraryContainer({ initialExercises }: ExerciseLibraryContainerProps) {
    const [exercises, setExercises] = useState<Exercise[]>(initialExercises);
    const [searchQuery, setSearchQuery] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("all");
    const [muscleGroupFilter, setMuscleGroupFilter] = useState("all");

    // Pagination State
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [offset, setOffset] = useState(initialExercises.length);
    const observerTarget = useRef<HTMLDivElement>(null);

    const PAGE_SIZE = 20;

    const loadMore = useCallback(async () => {
        if (isLoading || !hasMore) return;

        setIsLoading(true);
        try {
            const nextExercises = await getExercises({
                limit: PAGE_SIZE,
                skip: offset,
                search: searchQuery,
                category: categoryFilter,
                muscleGroup: muscleGroupFilter
            });

            if (nextExercises.length < PAGE_SIZE) {
                setHasMore(false);
            }

            setExercises(prev => [...prev, ...nextExercises]);
            setOffset(prev => prev + nextExercises.length);
        } catch (error) {
            console.error("Failed to load more exercises:", error);
        } finally {
            setIsLoading(false);
        }
    }, [offset, isLoading, hasMore, searchQuery, categoryFilter, muscleGroupFilter]);

    // Reset logic when filters change
    useEffect(() => {
        const resetAndFetch = async () => {
            setIsLoading(true);
            setOffset(0);
            setHasMore(true);

            try {
                const results = await getExercises({
                    limit: PAGE_SIZE,
                    skip: 0,
                    search: searchQuery,
                    category: categoryFilter,
                    muscleGroup: muscleGroupFilter
                });

                setExercises(results);
                setOffset(results.length);
                if (results.length < PAGE_SIZE) setHasMore(false);
            } catch (error) {
                console.error("Failed to filter exercises:", error);
            } finally {
                setIsLoading(false);
            }
        };

        // Don't run on first mount (we use initialExercises)
        // Actually, initialExercises might be unfiltered, so we should run it if filters are active
        if (searchQuery || categoryFilter !== "all" || muscleGroupFilter !== "all") {
            resetAndFetch();
        } else {
            // Restore initial if filters cleared
            setExercises(initialExercises);
            setOffset(initialExercises.length);
            setHasMore(true);
        }
    }, [searchQuery, categoryFilter, muscleGroupFilter]);

    // Intersection Observer
    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting && hasMore && !isLoading) {
                    loadMore();
                }
            },
            { threshold: 1.0 }
        );

        if (observerTarget.current) {
            observer.observe(observerTarget.current);
        }

        return () => {
            if (observerTarget.current) {
                observer.unobserve(observerTarget.current);
            }
        };
    }, [loadMore, hasMore, isLoading]);

    const handleExerciseCreated = (newExercise: Exercise) => {
        setExercises((prev) => [newExercise, ...prev]);
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sticky top-0 bg-background/80 backdrop-blur-md z-10 py-4 -mt-4">
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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {exercises.map((exercise) => (
                    <ExerciseCard key={exercise.id} exercise={exercise} />
                ))}
            </div>

            {/* Infinite Scroll Sentinel */}
            <div ref={observerTarget} className="flex justify-center py-12">
                {isLoading ? (
                    <div className="flex flex-col items-center gap-3">
                        <Loader2 className="w-8 h-8 text-primary animate-spin" />
                        <p className="text-sm font-black uppercase tracking-widest text-primary/40">Loading Strength...</p>
                    </div>
                ) : !hasMore && exercises.length > 0 ? (
                    <p className="text-sm font-bold text-muted-foreground italic opacity-40">You've reached the end of the line. Time to lift.</p>
                ) : null}
            </div>

            {exercises.length === 0 && !isLoading && (
                <div className="text-center py-24 bg-card/30 border-2 border-dashed rounded-[40px] px-6">
                    <h3 className="text-2xl font-black tracking-tight mb-2">No exercises found</h3>
                    <p className="text-muted-foreground mb-6 font-medium italic opacity-60">Try adjusting your filters or create a new custom exercise.</p>
                </div>
            )}
        </div>
    );
}
