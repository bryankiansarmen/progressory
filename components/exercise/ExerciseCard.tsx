"use client";

import { Exercise } from "@/types";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dumbbell, Target, Layers } from "lucide-react";

interface ExerciseCardProps {
    exercise: Exercise;
}

export default function ExerciseCard({ exercise }: ExerciseCardProps) {
    // Elegant color mapping for muscle groups
    const muscleColors: Record<string, string> = {
        Chest: "bg-blue-500/10 text-blue-600 border-blue-200 dark:bg-blue-500/20 dark:text-blue-400 dark:border-blue-800",
        Legs: "bg-emerald-500/10 text-emerald-600 border-emerald-200 dark:bg-emerald-500/20 dark:text-emerald-400 dark:border-emerald-800",
        Back: "bg-amber-500/10 text-amber-600 border-amber-200 dark:bg-amber-500/20 dark:text-amber-400 dark:border-amber-800",
        Arms: "bg-purple-500/10 text-purple-600 border-purple-200 dark:bg-purple-500/20 dark:text-purple-400 dark:border-purple-800",
        Shoulders: "bg-rose-500/10 text-rose-600 border-rose-200 dark:bg-rose-500/20 dark:text-rose-400 dark:border-rose-800",
        Core: "bg-cyan-500/10 text-cyan-600 border-cyan-200 dark:bg-cyan-500/20 dark:text-cyan-400 dark:border-cyan-800",
        FullBody: "bg-indigo-500/10 text-indigo-600 border-indigo-200 dark:bg-indigo-500/20 dark:text-indigo-400 dark:border-indigo-800",
    };

    const muscleColor = muscleColors[exercise.muscleGroup] || "bg-slate-500/10 text-slate-600 border-slate-200 dark:bg-slate-500/20 dark:text-slate-400 dark:border-slate-800";

    return (
        <Card className="group overflow-hidden border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-gradient-to-br from-card to-card/50">
            <CardHeader className="p-5 pb-2">
                <div className="flex justify-between items-start gap-2 mb-2">
                    <Badge variant="outline" className={cn("px-2 py-0 border font-medium", muscleColor)}>
                        {exercise.muscleGroup}
                    </Badge>
                    {exercise.userId && (
                        <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">Custom</Badge>
                    )}
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors line-clamp-1">
                    {exercise.name}
                </CardTitle>
            </CardHeader>
            <CardContent className="p-5 pt-2">
                <div className="space-y-3 mt-2">
                    <div className="flex items-center text-sm text-muted-foreground gap-2">
                        <Layers className="w-4 h-4 text-primary/70" />
                        <span>{exercise.category}</span>
                    </div>
                    {exercise.equipment && (
                        <div className="flex items-center text-sm text-muted-foreground gap-2">
                            <Dumbbell className="w-4 h-4 text-primary/70" />
                            <span>{exercise.equipment}</span>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}

// Minimalist cn function for this component
function cn(...inputs: any[]) {
    return inputs.filter(Boolean).join(" ");
}
