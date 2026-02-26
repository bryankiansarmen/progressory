"use client";

import { Card } from "@/components/ui/card";
import { CheckCircle2, ChevronRight, List } from "lucide-react";
import { cn } from "@/lib/utils";

interface SessionSummaryProps {
    exercises: string[];
    activeIndex: number;
    onSelectExercise: (index: number) => void;
}

export default function SessionSummary({ exercises, activeIndex, onSelectExercise }: SessionSummaryProps) {
    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
                <List className="w-5 h-5 text-primary" />
                <h3 className="font-bold text-lg">Workout Overview</h3>
            </div>

            <div className="space-y-2">
                {exercises.map((name, index) => {
                    const isActive = index === activeIndex;

                    const isDone = index < activeIndex;

                    return (
                        <Card
                            key={index}
                            onClick={() => onSelectExercise(index)}
                            className={cn(
                                "p-4 cursor-pointer transition-all duration-300 border-2",
                                isActive ? "border-primary bg-primary/5 shadow-lg shadow-primary/5" : "border-transparent bg-card/40 hover:bg-card",
                                "group"
                            )}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className={cn(
                                        "w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm",
                                        isDone ? "bg-emerald-500 text-white" :
                                            isActive ? "bg-primary text-white" : "bg-card border-2 text-muted-foreground"
                                    )}>
                                        {isDone ? <CheckCircle2 className="w-5 h-5" /> : index + 1}
                                    </div>
                                    <span className={cn(
                                        "font-bold transition-colors",
                                        isActive ? "text-primary" : isDone ? "text-muted-foreground/60 line-through" : "text-foreground"
                                    )}>
                                        {name}
                                    </span>
                                </div>

                                {!isDone && <ChevronRight className={cn(
                                    "w-4 h-4 transition-all",
                                    isActive ? "text-primary translate-x-1" : "text-muted-foreground/30 group-hover:text-muted-foreground group-hover:translate-x-1"
                                )} />}
                            </div>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}
