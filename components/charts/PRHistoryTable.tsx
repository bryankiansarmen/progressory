"use client";

import { Trophy, Calendar, Dumbbell } from "lucide-react";

interface PRRecord {
    exerciseName: string;
    weight: number;
    reps: number;
    date: string;
}

interface PRHistoryTableProps {
    records: PRRecord[];
}

export default function PRHistoryTable({ records }: PRHistoryTableProps) {
    return (
        <div className="bg-card/40 border-2 rounded-[32px] overflow-hidden backdrop-blur-sm">
            <div className="p-8 border-b border-muted">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-amber-500/10 rounded-2xl flex items-center justify-center text-amber-500">
                        <Trophy className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="font-black text-xl">Hall of Fame</h3>
                        <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest mt-0.5">Your all-time bests</p>
                    </div>
                </div>
            </div>

            <div className="divide-y divide-muted">
                {records.length > 0 ? (
                    records.map((record, i) => (
                        <div
                            key={i}
                            className="p-6 flex items-center justify-between hover:bg-muted/30 transition-colors"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                                    <Dumbbell className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="font-black text-lg tracking-tight">{record.exerciseName}</p>
                                    <div className="flex items-center gap-2 text-xs text-muted-foreground font-bold">
                                        <Calendar className="w-3.5 h-3.5" />
                                        {record.date}
                                    </div>
                                </div>
                            </div>

                            <div className="text-right">
                                <div className="text-2xl font-black tracking-tighter">
                                    {record.weight}
                                    <span className="text-xs font-bold text-muted-foreground ml-1">KG</span>
                                </div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-primary/60">
                                    {record.reps} Reps
                                </p>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="p-12 text-center">
                        <p className="text-muted-foreground font-medium">No records found yet. Keep training!</p>
                    </div>
                )}
            </div>
        </div>
    );
}
