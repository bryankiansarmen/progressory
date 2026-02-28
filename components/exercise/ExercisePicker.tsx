"use client";

import { useState, useMemo, useEffect, useCallback, useRef } from "react";
import { Exercise } from "@/types";
import { Input } from "@/components/ui/input";
import { Search, Plus, ChevronDown, ChevronRight, Info, Check, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getExercises } from "@/services/exercise.service";

interface ExercisePickerProps {
    onSelect: (exercise: Exercise) => void;
    onSelectMultiple?: (exercises: Exercise[]) => void;
    excludeIds?: string[];
    multiSelect?: boolean;
}

export default function ExercisePicker({
    onSelect,
    onSelectMultiple,
    excludeIds = [],
    multiSelect = false
}: ExercisePickerProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
    const [muscleGroupFilter, setMuscleGroupFilter] = useState("all");
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [selectedExercises, setSelectedExercises] = useState<Exercise[]>([]);

    // Pagination & Loading State
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [offset, setOffset] = useState(0);
    const observerTarget = useRef<HTMLDivElement>(null);

    const PAGE_SIZE = 20;

    // Search Debouncing
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchQuery(searchQuery);
        }, 300);

        return () => clearTimeout(handler);
    }, [searchQuery]);

    const loadMore = useCallback(async (isInitial = false) => {
        if (isLoading || (!hasMore && !isInitial)) return;

        setIsLoading(true);
        try {
            const currentOffset = isInitial ? 0 : offset;
            const nextExercises = await getExercises({
                limit: PAGE_SIZE,
                skip: currentOffset,
                search: debouncedSearchQuery,
                muscleGroup: muscleGroupFilter
            });

            if (nextExercises.length < PAGE_SIZE) {
                setHasMore(false);
            }

            setExercises(prev => {
                const base = isInitial ? [] : prev;
                const existingIds = new Set(base.map(ex => ex.id));
                const uniqueNew = nextExercises.filter(ex => !existingIds.has(ex.id));
                return [...base, ...uniqueNew];
            });
            setOffset(currentOffset + nextExercises.length);
        } catch (error) {
            console.error("Failed to load exercises in picker:", error);
        } finally {
            setIsLoading(false);
        }
    }, [offset, isLoading, hasMore, debouncedSearchQuery, muscleGroupFilter]);

    // Keep loadMore ref up to date for observer
    const loadMoreRef = useRef(loadMore);
    useEffect(() => {
        loadMoreRef.current = loadMore;
    }, [loadMore]);

    // Reset and fetch when filters change
    useEffect(() => {
        setHasMore(true);
        setOffset(0);
        loadMore(true);
    }, [debouncedSearchQuery, muscleGroupFilter]);

    // Intersection Observer for Infinite Scroll
    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting && hasMore && !isLoading) {
                    loadMoreRef.current();
                }
            },
            { threshold: 0.1 }
        );

        if (observerTarget.current) {
            observer.observe(observerTarget.current);
        }

        return () => {
            if (observerTarget.current) {
                observer.unobserve(observerTarget.current);
            }
        };
    }, [hasMore, isLoading]);

    const handleSelect = (exercise: Exercise) => {
        if (multiSelect) {
            const isSelected = selectedExercises.some(ex => ex.id === exercise.id);
            if (isSelected) {
                setSelectedExercises(selectedExercises.filter(ex => ex.id !== exercise.id));
            } else {
                setSelectedExercises([...selectedExercises, exercise]);
            }
        } else {
            onSelect(exercise);
        }
    };

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

    const toggleExpand = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        setExpandedId(prev => prev === id ? null : id);
    };

    const filteredMovements = useMemo(() => {
        return exercises.filter((ex) => !excludeIds.includes(ex.id));
    }, [exercises, excludeIds]);

    return (
        <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                        placeholder="Search movements (e.g. Press)..."
                        className="pl-9 h-10 rounded-xl bg-card border-none shadow-inner"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="flex gap-2">
                    <select
                        className="h-10 rounded-xl border border-input bg-card px-3 text-sm focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                        value={muscleGroupFilter}
                        onChange={(e) => setMuscleGroupFilter(e.target.value)}
                    >
                        {muscleGroups.map(g => <option key={g} value={g}>{g === 'all' ? 'All Muscles' : g}</option>)}
                    </select>
                </div>
            </div>

            <div className="max-h-[400px] overflow-y-auto pr-2 space-y-2 custom-scrollbar relative">
                {filteredMovements.length > 0 ? (
                    filteredMovements.map((movement) => {
                        const hasVariations = (movement.variations?.length || 0) > 0;
                        const isExpanded = expandedId === movement.id || searchQuery.length > 0;
                        const isSelected = selectedExercises.some(ex => ex.id === movement.id);

                        return (
                            <div key={movement.id} className="space-y-1">
                                {/* Movement Header */}
                                <div
                                    onClick={() => handleSelect(movement)}
                                    className={cn(
                                        "flex items-center justify-between p-3 rounded-xl border-2 transition-all group cursor-pointer",
                                        isExpanded && hasVariations ? "border-primary/20 bg-primary/5 shadow-sm" :
                                            isSelected ? "border-primary bg-primary/5 shadow-sm" : "border-transparent hover:bg-muted"
                                    )}
                                >
                                    <div className="flex items-center gap-3">
                                        {hasVariations && (
                                            <div
                                                onClick={(e) => toggleExpand(movement.id, e)}
                                                className="p-1 hover:bg-primary/10 rounded-md transition-colors"
                                            >
                                                {isExpanded ? <ChevronDown className="w-4 h-4 text-primary" /> : <ChevronRight className="w-4 h-4 text-muted-foreground" />}
                                            </div>
                                        )}
                                        <div className="flex flex-col">
                                            <span className={cn(
                                                "font-bold tracking-tight transition-colors",
                                                isSelected ? "text-primary" : "text-foreground group-hover:text-primary"
                                            )}>
                                                {movement.name}
                                            </span>
                                            <div className="flex gap-2 mt-0.5">
                                                <Badge variant="outline" className="text-[9px] px-1 h-3.5 border-primary/20 bg-primary/5 uppercase font-black tracking-tighter">
                                                    {movement.muscleGroup}
                                                </Badge>
                                                {hasVariations && (
                                                    <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest flex items-center gap-1">
                                                        <Info className="w-3 h-3" /> {movement.variations?.length} Options
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className={cn(
                                        "p-2 rounded-full transition-all shadow-sm",
                                        isSelected ? "bg-primary text-white" : "bg-primary/10 group-hover:bg-primary group-hover:text-white"
                                    )}>
                                        {isSelected ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                                    </div>
                                </div>

                                {hasVariations && isExpanded && (
                                    <div className="ml-8 space-y-1 animate-in slide-in-from-top-2 duration-300">
                                        {movement.variations?.map((variation) => {
                                            const isVarSelected = selectedExercises.some(ex => ex.id === variation.id);
                                            return (
                                                <div
                                                    key={variation.id}
                                                    onClick={() => handleSelect(variation)}
                                                    className={cn(
                                                        "flex items-center justify-between p-2 pl-4 rounded-xl border transition-all group/var cursor-pointer",
                                                        isVarSelected ? "border-primary bg-primary/5" : "border-transparent hover:border-primary/20 hover:bg-primary/5"
                                                    )}
                                                >
                                                    <div className="flex flex-col">
                                                        <span className={cn(
                                                            "text-sm font-semibold transition-colors",
                                                            isVarSelected ? "text-primary" : "text-muted-foreground group-hover/var:text-primary"
                                                        )}>
                                                            {variation.name}
                                                        </span>
                                                        <span className="text-[10px] text-primary/60 font-black uppercase tracking-widest">
                                                            {variation.equipment || "Standard"}
                                                        </span>
                                                    </div>
                                                    <div className={cn(
                                                        "p-1.5 rounded-full transition-all",
                                                        isVarSelected ? "bg-primary text-white" : "bg-primary/5 group-hover/var:bg-primary group-hover/var:text-white"
                                                    )}>
                                                        {isVarSelected ? <Check className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        );
                    })
                ) : !isLoading && (
                    <div className="text-center py-12 bg-muted/20 rounded-3xl border-2 border-dashed border-muted text-muted-foreground font-medium italic">
                        No Movements Found
                    </div>
                )}

                {/* Sentinel for Infinite Scroll */}
                <div ref={observerTarget} className="h-10 flex items-center justify-center">
                    {isLoading && (
                        <Loader2 className="w-5 h-5 text-primary animate-spin" />
                    )}
                </div>
            </div>

            {multiSelect && selectedExercises.length > 0 && (
                <div className="pt-4 border-t sticky bottom-0 bg-card z-10 animate-in slide-in-from-bottom-2 duration-300">
                    <Button
                        className="w-full h-11 rounded-xl font-bold shadow-lg shadow-primary/20 gap-2"
                        onClick={() => onSelectMultiple?.(selectedExercises)}
                    >
                        <Check className="w-4 h-4" />
                        Add Selected ({selectedExercises.length})
                    </Button>
                </div>
            )}
        </div>
    );
}
