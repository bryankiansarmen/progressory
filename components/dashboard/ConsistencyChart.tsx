"use client";

import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface ConsistencyChartProps {
    days: boolean[];
}

export default function ConsistencyChart({ days }: ConsistencyChartProps) {
    const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    // We get last 7 days from service [D-6, ..., Today]
    // We want to display them with labels. Let's assume the array is aligned to the labels for now.

    return (
        <div className="bg-card/40 border-2 rounded-3xl p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="font-black text-lg">Weekly Consistency</h3>
                    <p className="text-xs text-muted-foreground font-medium">Don't break the streak</p>
                </div>
                <div className="bg-emerald-500/10 text-emerald-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-500/20">
                    Active
                </div>
            </div>

            <div className="grid grid-cols-7 gap-3">
                {days.map((active, i) => {
                    const dayName = dayNames[i];
                    return (
                        <div key={i} className="flex flex-col items-center gap-3">
                            <div className={cn(
                                "w-full aspect-square rounded-2xl flex items-center justify-center transition-all duration-500 border-2",
                                active
                                    ? "bg-emerald-500 border-emerald-400 text-white shadow-lg shadow-emerald-500/30 scale-105"
                                    : "bg-muted/30 border-dashed border-muted-foreground/20 text-muted-foreground/30"
                            )}>
                                {active && <Check className="w-5 h-5 stroke-[3px]" />}
                            </div>
                            <span className={cn(
                                "text-[10px] font-black uppercase tracking-tighter",
                                active ? "text-emerald-600" : "text-muted-foreground/40"
                            )}>
                                {dayName}
                            </span>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}
