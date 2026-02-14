"use client";

import { Card } from "@/components/ui/card";
import { Calendar, Clock, Weight, Dumbbell } from "lucide-react";
import { format } from "date-fns";
import { HistoryLog } from "@/services/stats.service";
import Link from "next/link";

interface HistoryLogCardProps {
    log: HistoryLog;
}

export function HistoryLogCard({ log }: HistoryLogCardProps) {
    return (
        <Link href={`/history/${log.id}`}>
            <Card className="p-6 border-2 hover:border-primary/20 transition-all group bg-card/50 backdrop-blur-sm rounded-[32px] cursor-pointer">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2 text-muted-foreground mb-1">
                            <Calendar className="w-4 h-4" />
                            <span className="text-xs font-bold tracking-wider uppercase">
                                {format(new Date(log.date), "EEEE, MMM d")}
                            </span>
                        </div>
                        <h3 className="text-xl font-black tracking-tight group-hover:text-primary transition-colors">
                            {log.workoutName}
                        </h3>
                    </div>

                    <div className="grid grid-cols-3 gap-8 md:gap-12">
                        <div className="flex flex-col">
                            <div className="flex items-center gap-1.5 text-muted-foreground mb-0.5">
                                <Weight className="w-3.5 h-3.5" />
                                <span className="text-[10px] font-black uppercase tracking-widest">Volume</span>
                            </div>
                            <span className="text-lg font-black tracking-tighter">
                                {log.totalVolume.toLocaleString()}<span className="text-[10px] ml-0.5 opacity-50">KG</span>
                            </span>
                        </div>

                        <div className="flex flex-col">
                            <div className="flex items-center gap-1.5 text-muted-foreground mb-0.5">
                                <Dumbbell className="w-3.5 h-3.5" />
                                <span className="text-[10px] font-black uppercase tracking-widest">Exercises</span>
                            </div>
                            <span className="text-lg font-black tracking-tighter">{log.exerciseCount}</span>
                        </div>

                        <div className="flex flex-col">
                            <div className="flex items-center gap-1.5 text-muted-foreground mb-0.5">
                                <Clock className="w-3.5 h-3.5" />
                                <span className="text-[10px] font-black uppercase tracking-widest">Time</span>
                            </div>
                            <span className="text-lg font-black tracking-tighter">
                                {log.duration ?? "--"}<span className="text-[10px] ml-0.5 opacity-50">MIN</span>
                            </span>
                        </div>
                    </div>
                </div>
            </Card>
        </Link>
    );
}
