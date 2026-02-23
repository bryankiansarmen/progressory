"use client";

import { MuscleFatigueEntry, FatigueLevel } from "@/lib/utils/fatigue";
import { useState } from "react";
import { cn } from "@/lib/utils";

// All major muscle groups the app tracks
const ALL_MUSCLE_GROUPS = [
    { key: "Chest", icon: "💪", description: "Pectorals" },
    { key: "Back", icon: "🔙", description: "Lats & Traps" },
    { key: "Shoulders", icon: "🙆", description: "Deltoids" },
    { key: "Legs", icon: "🦵", description: "Quads, Hams & Glutes" },
    { key: "Arms", icon: "💪", description: "Biceps & Triceps" },
    { key: "Core", icon: "🎯", description: "Abs & Obliques" },
    { key: "Cardio", icon: "❤️", description: "Cardiovascular" },
];

const LEVEL_CONFIG = {
    0: { label: "Rest", bg: "bg-muted/40", border: "border-muted/40", text: "text-muted-foreground", dot: "bg-muted-foreground/40" },
    1: { label: "Cool", bg: "bg-emerald-500/10", border: "border-emerald-500/30", text: "text-emerald-400", dot: "bg-emerald-400" },
    2: { label: "Active", bg: "bg-amber-500/10", border: "border-amber-500/30", text: "text-amber-400", dot: "bg-amber-400" },
    3: { label: "Fatigued", bg: "bg-red-500/10", border: "border-red-500/30", text: "text-red-400", dot: "bg-red-400" },
} as const;

interface FatigueHeatmapProps {
    data: MuscleFatigueEntry[];
}

export default function FatigueHeatmap({ data }: FatigueHeatmapProps) {
    const [activeGroup, setActiveGroup] = useState<string | null>(null);

    // Map fatigue data by muscle group key for quick lookups
    const dataMap = new Map(data.map(d => [d.muscleGroup, d]));

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between px-1">
                <div>
                    <h3 className="font-black text-2xl tracking-tight">Muscle Fatigue</h3>
                    <p className="text-sm text-muted-foreground font-medium mt-0.5">Last 7 days activity</p>
                </div>
                {/* Legend */}
                <div className="flex gap-3 items-center">
                    {Object.entries(LEVEL_CONFIG).slice(1).map(([level, cfg]) => (
                        <div key={level} className="flex items-center gap-1.5">
                            <span className={cn("w-2 h-2 rounded-full", cfg.dot)} />
                            <span className="text-xs font-medium text-muted-foreground">{cfg.label}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {ALL_MUSCLE_GROUPS.map(({ key, icon, description }) => {
                    const entry = dataMap.get(key);
                    const level = (entry?.level ?? 0) as FatigueLevel;
                    const setCount = entry?.setCount ?? 0;
                    const cfg = LEVEL_CONFIG[level];
                    const isActive = activeGroup === key;

                    return (
                        <button
                            key={key}
                            onClick={() => setActiveGroup(isActive ? null : key)}
                            className={cn(
                                "flex flex-col gap-2 p-4 rounded-2xl border-2 text-left transition-all duration-300",
                                cfg.bg, cfg.border,
                                isActive && "scale-[1.03] shadow-lg",
                            )}
                        >
                            <div className="flex items-center justify-between">
                                <span className="text-xl">{icon}</span>
                                <span className={cn("w-2 h-2 rounded-full", cfg.dot)} />
                            </div>
                            <div>
                                <p className="font-black text-sm">{key}</p>
                                <p className="text-xs text-muted-foreground">{description}</p>
                            </div>
                            {isActive && (
                                <div className={cn("text-xs font-bold mt-1", cfg.text)}>
                                    {setCount > 0
                                        ? `${setCount} sets this week · ${cfg.label}`
                                        : "No sets logged this week"}
                                </div>
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
