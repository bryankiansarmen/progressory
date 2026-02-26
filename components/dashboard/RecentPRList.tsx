"use client";

import { Trophy } from "lucide-react";
import { Card } from "@/components/ui/card";

interface PRRecord {
    exerciseName: string;
    weight: number;
    reps: number;
    date: string;
}

interface RecentPRListProps {
    records: PRRecord[];
}

export default function RecentPRList({ records }: RecentPRListProps) {
    if (records.length === 0) {
        return (
            <div className="bg-card/40 border-2 border-dashed rounded-3xl p-10 text-center flex flex-col items-center gap-4">
                <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center text-muted-foreground opacity-30">
                    <Trophy className="w-6 h-6" />
                </div>
                <p className="text-sm font-bold text-muted-foreground">No PRs yet. Keep pushing!</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2 px-1">
                <Trophy className="w-5 h-5 text-amber-500" />
                <h3 className="font-black text-lg">Personal Records</h3>
            </div>

            <div className="grid gap-3">
                {records.map((pr, i) => (
                    <Card key={i} className="p-4 border-2 hover:border-amber-500/50 transition-all duration-300 bg-gradient-to-r from-card to-amber-500/5 group">
                        <div className="flex items-center justify-between">
                            <div className="flex flex-col">
                                <span className="text-xs font-black uppercase tracking-widest text-amber-600 mb-0.5">Hall of Fame</span>
                                <h4 className="font-bold text-lg leading-tight">{pr.exerciseName}</h4>
                                <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-tighter mt-1">{pr.date}</span>
                            </div>
                            <div className="text-right flex flex-col items-end">
                                <div className="flex items-baseline gap-1 text-amber-600">
                                    <span className="text-2xl font-black tabular-nums">{pr.weight}</span>
                                    <span className="text-[10px] font-bold uppercase">kg</span>
                                </div>
                                <span className="text-[10px] font-black uppercase text-muted-foreground opacity-60">{pr.reps} Reps</span>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}
