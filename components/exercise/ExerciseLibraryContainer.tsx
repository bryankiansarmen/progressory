"use client";

import { useState, useEffect, useCallback, useRef } from "react";
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
    const [isError, setIsError] = useState(false);
    const [offset, setOffset] = useState(initialExercises.length);
    const observerTarget = useRef<HTMLDivElement>(null);

    const PAGE_SIZE = 20;

    const loadMore = useCallback(async () => {
        if (isLoading || !hasMore) return;

        setIsLoading(true);
        setIsError(false);
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

            setExercises(prev => {
                const existingIds = new Set(prev.map(ex => ex.id));
                const uniqueNew = nextExercises.filter(ex => !existingIds.has(ex.id));
                return [...prev, ...uniqueNew];
            });
            setOffset(prev => prev + nextExercises.length);
        } catch (error) {
            console.error("Failed to load more exercises:", error);
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    }, [offset, isLoading, hasMore, searchQuery, categoryFilter, muscleGroupFilter]);

    // Keep loadMore ref up to date to prevent observer recreation
    const loadMoreRef = useRef(loadMore);
    useEffect(() => {
        loadMoreRef.current = loadMore;
    }, [loadMore]);

    // Reset logic when filters change
    useEffect(() => {
        const resetAndFetch = async () => {
            setIsLoading(true);
            setIsError(false);
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
                setIsError(true);
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
            setIsError(false);
        }
    }, [searchQuery, categoryFilter, muscleGroupFilter]);

    // Intersection Observer
    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                // Check isError to prevent infinite retry loop on failure
                if (entries[0].isIntersecting && hasMore && !isLoading && !isError) {
                    loadMoreRef.current();
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
    }, [hasMore, isLoading, isError]); // Removed loadMore dependency

    const handleExerciseCreated = (newExercise: Exercise) => {
        setExercises((prev) => [newExercise, ...prev]);
        setOffset(prev => prev + 1);
    };

    const handleExerciseUpdated = (updatedExercise: Exercise) => {
        setExercises((prev) => {
            // Case 1: Was it a top-level exercise that's still top-level?
            if (!updatedExercise.parentId) {
                const wasTopLevel = prev.some(ex => ex.id === updatedExercise.id);
                if (wasTopLevel) {
                    return prev.map(ex => ex.id === updatedExercise.id ? { ...updatedExercise, variations: ex.variations } : ex);
                } else {
                    // It moved from a parent to top-level
                    const newExercises = prev.map(ex => ({
                        ...ex,
                        variations: ex.variations?.filter(v => v.id !== updatedExercise.id)
                    }));
                    return [updatedExercise, ...newExercises];
                }
            }

            // Case 2: It's a child exercise
            const newExercises = prev.map(parent => {
                // If it's the NEW parent, add or update it in variations
                if (parent.id === updatedExercise.parentId) {
                    const variations = parent.variations || [];
                    const exists = variations.some(v => v.id === updatedExercise.id);
                    return {
                        ...parent,
                        variations: exists
                            ? variations.map(v => v.id === updatedExercise.id ? updatedExercise : v)
                            : [...variations, updatedExercise].sort((a, b) => a.name.localeCompare(b.name))
                    };
                }
                // If it's NOT the new parent, ensure it's removed if it was there
                return {
                    ...parent,
                    variations: parent.variations?.filter(v => v.id !== updatedExercise.id)
                };
            });

            // If it was top-level and now has a parent, remove from top-level
            return newExercises.filter(ex => ex.id !== updatedExercise.id);
        });
    };

    const handleExerciseArchived = async (id: string) => {
        try {
            // Mock userId
            const userId = "user_123";
            const { archiveExercise } = await import("@/services/exercise.service");
            await archiveExercise(id, userId);

            setExercises((prev) => {
                // Remove from top-level
                const filtered = prev.filter((ex) => ex.id !== id);
                // Remove from variations
                return filtered.map(ex => ({
                    ...ex,
                    variations: ex.variations?.filter(v => v.id !== id)
                }));
            });
            setOffset((prev) => prev - 1);
        } catch (error) {
            console.error("Failed to archive exercise:", error);
        }
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
                    <ExerciseCard
                        key={exercise.id}
                        exercise={exercise}
                        onExerciseUpdated={handleExerciseUpdated}
                        onExerciseArchived={handleExerciseArchived}
                    />
                ))}
            </div>

            {/* Infinite Scroll Sentinel */}
            <div ref={observerTarget} className="flex justify-center py-12 min-h-[100px]">
                {isLoading ? (
                    <div className="flex flex-col items-center gap-3">
                        <Loader2 className="w-8 h-8 text-primary animate-spin" />
                        <p className="text-sm font-black uppercase tracking-widest text-primary/40">Loading Strength...</p>
                    </div>
                ) : isError ? (
                    <div className="flex flex-col items-center gap-2">
                        <p className="text-sm font-medium text-destructive">Failed to load more exercises.</p>
                        <button
                            onClick={loadMore}
                            className="px-4 py-2 text-sm font-medium bg-secondary hover:bg-secondary/80 rounded-md transition-colors"
                        >
                            Retry
                        </button>
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
