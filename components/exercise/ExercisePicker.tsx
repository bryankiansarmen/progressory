"use client";

import { useState, useMemo } from "react";
import { Exercise } from "@/types";
import { Input } from "@/components/ui/input";
import { Search, Plus, ChevronDown, ChevronRight, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ExercisePickerProps {
    allExercises: Exercise[];
    onSelect: (exercise: Exercise) => void;
    excludeIds?: string[];
}

export default function ExercisePicker({ allExercises, onSelect, excludeIds = [] }: ExercisePickerProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [muscleGroupFilter, setMuscleGroupFilter] = useState("all");
    const [expandedId, setExpandedId] = useState<string | null>(null);

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
        return allExercises
            .filter((ex) => !excludeIds.includes(ex.id))
            .filter((ex) => {
                const matchesSearch =
                    ex.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    ex.variations?.some(v => v.name.toLowerCase().includes(searchQuery.toLowerCase()));

                const matchesMuscleGroup = muscleGroupFilter === "all" || ex.muscleGroup === muscleGroupFilter;

                return matchesSearch && matchesMuscleGroup;
            });
    }, [allExercises, searchQuery, muscleGroupFilter, excludeIds]);

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

            <div className="max-h-[400px] overflow-y-auto pr-2 space-y-2 custom-scrollbar">
                {filteredMovements.length > 0 ? (
                    filteredMovements.map((movement) => {
                        const hasVariations = (movement.variations?.length || 0) > 0;
                        const isExpanded = expandedId === movement.id || searchQuery.length > 0;

                        return (
                            <div key={movement.id} className="space-y-1">
                                {/* Movement Header */}
                                <div
                                    onClick={() => hasVariations ? setExpandedId(movement.id) : onSelect(movement)}
                                    className={cn(
                                        "flex items-center justify-between p-3 rounded-xl border-2 transition-all group cursor-pointer",
                                        isExpanded && hasVariations ? "border-primary/20 bg-primary/5 shadow-sm" : "border-transparent hover:bg-muted"
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
                                            <span className="font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
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

                                    {!hasVariations && (
                                        <div className="p-2 bg-primary/10 rounded-full group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                                            <Plus className="w-4 h-4" />
                                        </div>
                                    )}
                                </div>

                                {/* Variations List */}
                                {hasVariations && isExpanded && (
                                    <div className="ml-8 space-y-1 animate-in slide-in-from-top-2 duration-300">
                                        {movement.variations?.map((variation) => (
                                            <div
                                                key={variation.id}
                                                onClick={() => onSelect(variation)}
                                                className="flex items-center justify-between p-2 pl-4 rounded-xl border border-transparent hover:border-primary/20 hover:bg-primary/5 cursor-pointer transition-all group/var"
                                            >
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-semibold text-muted-foreground group-hover/var:text-primary transition-colors">
                                                        {variation.name}
                                                    </span>
                                                    <span className="text-[10px] text-primary/60 font-black uppercase tracking-widest">
                                                        {variation.equipment || "Standard"}
                                                    </span>
                                                </div>
                                                <div className="p-1.5 bg-primary/5 rounded-full group-hover/var:bg-primary group-hover/var:text-white transition-all">
                                                    <Plus className="w-3 h-3" />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        );
                    })
                ) : (
                    <div className="text-center py-12 bg-muted/20 rounded-3xl border-2 border-dashed border-muted text-muted-foreground font-medium italic">
                        No Movements Found
                    </div>
                )}
            </div>
        </div>
    );
}
