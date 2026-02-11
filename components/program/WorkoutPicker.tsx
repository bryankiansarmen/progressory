"use client";

import { useState, useMemo } from "react";
import { Workout } from "@/types";
import { Input } from "@/components/ui/input";
import { Search, Check, Dumbbell, Coffee, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn, getWorkoutMuscleGroups } from "@/lib/utils";

interface WorkoutPickerProps {
    workouts: Workout[];
    selectedWorkoutId?: string | null;
    onSelect: (workoutId: string | null) => void;
}

export default function WorkoutPicker({
    workouts,
    selectedWorkoutId,
    onSelect
}: WorkoutPickerProps) {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredWorkouts = useMemo(() => {
        return workouts.filter((w) =>
            w.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [workouts, searchQuery]);

    const isRestDaySelected = selectedWorkoutId === null || selectedWorkoutId === undefined;

    return (
        <div className="space-y-4">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                    placeholder="Search workouts..."
                    className="pl-9 h-10 rounded-xl bg-card border-none shadow-inner"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            <div className="max-h-[300px] overflow-y-auto pr-2 space-y-2 custom-scrollbar">
                {/* Rest Day Option */}
                <div
                    onClick={() => onSelect(null)}
                    className={cn(
                        "flex items-center justify-between p-3 rounded-xl border-2 transition-all cursor-pointer group",
                        isRestDaySelected
                            ? "border-amber-500 bg-amber-500/5 shadow-sm"
                            : "border-transparent hover:bg-muted"
                    )}
                >
                    <div className="flex items-center gap-3">
                        <div className={cn(
                            "w-10 h-10 rounded-full flex items-center justify-center transition-all",
                            isRestDaySelected ? "bg-amber-500 text-white" : "bg-amber-500/10 text-amber-600 group-hover:bg-amber-500 group-hover:text-white"
                        )}>
                            <Coffee className="w-5 h-5" />
                        </div>
                        <div className="flex flex-col">
                            <span className={cn(
                                "font-bold tracking-tight",
                                isRestDaySelected ? "text-amber-600" : "text-foreground"
                            )}>
                                Rest Day
                            </span>
                            <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
                                Recovery & Growth
                            </span>
                        </div>
                    </div>
                    {isRestDaySelected && <Check className="w-4 h-4 text-amber-500" />}
                </div>

                {filteredWorkouts.length > 0 ? (
                    filteredWorkouts.map((workout) => {
                        const isSelected = selectedWorkoutId === workout.id;
                        const muscleGroups = getWorkoutMuscleGroups(workout);
                        const exerciseCount = workout.exercises?.length || 0;

                        return (
                            <div
                                key={workout.id}
                                onClick={() => onSelect(workout.id)}
                                className={cn(
                                    "flex items-center justify-between p-3 rounded-xl border-2 transition-all cursor-pointer group",
                                    isSelected
                                        ? "border-primary bg-primary/5 shadow-sm"
                                        : "border-transparent hover:bg-muted"
                                )}
                            >
                                <div className="flex items-center gap-3">
                                    <div className={cn(
                                        "w-10 h-10 rounded-full flex items-center justify-center transition-all",
                                        isSelected ? "bg-primary text-white" : "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white"
                                    )}>
                                        <Dumbbell className="w-5 h-5" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className={cn(
                                            "font-bold tracking-tight",
                                            isSelected ? "text-primary" : "text-foreground"
                                        )}>
                                            {workout.name}
                                        </span>
                                        <div className="flex flex-wrap gap-1 mt-0.5">
                                            <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mr-1">
                                                {exerciseCount} {exerciseCount === 1 ? 'Exercise' : 'Exercises'}
                                            </span>
                                            {muscleGroups.slice(0, 3).map(mg => (
                                                <Badge key={mg} variant="outline" className="text-[8px] px-1 h-3 border-primary/20 bg-primary/5 uppercase font-black tracking-tighter">
                                                    {mg}
                                                </Badge>
                                            ))}
                                            {muscleGroups.length > 3 && (
                                                <span className="text-[8px] text-primary/60 font-black">+{muscleGroups.length - 3}</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                {isSelected && <Check className="w-4 h-4 text-primary" />}
                            </div>
                        );
                    })
                ) : (
                    searchQuery && (
                        <div className="text-center py-8 text-muted-foreground italic text-sm">
                            No workouts found matching "{searchQuery}"
                        </div>
                    )
                )}
            </div>
        </div>
    );
}