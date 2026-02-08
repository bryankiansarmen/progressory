"use client";

import { Program } from "@/types";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlayCircle, LayoutList, ChevronRight } from "lucide-react";
import Link from "next/link";

interface ActiveProgramCardProps {
    program: Program;
    progress: {
        completedDays: number;
        totalDays: number;
        percentage: number;
        nextDayNumber: number;
    };
}

export default function ActiveProgramCard({ program, progress }: ActiveProgramCardProps) {
    const nextDay = program.days?.find(d => d.dayNumber === progress.nextDayNumber);

    return (
        <Card className="overflow-hidden border-none shadow-2xl bg-gradient-to-br from-primary to-primary/80 text-white">
            <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-xs font-black uppercase tracking-[0.2em] text-white/60 mb-1">Active Program</p>
                        <CardTitle className="text-3xl font-black tracking-tighter italic uppercase italic">
                            {program.name}
                        </CardTitle>
                    </div>
                    <LayoutList className="w-8 h-8 text-white/20" />
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <div className="flex justify-between text-sm font-bold tracking-tight">
                        <span>Overall Progress</span>
                        <span>{progress.percentage}%</span>
                    </div>
                    <div className="h-3 bg-white/20 rounded-full overflow-hidden border border-white/10 p-0.5">
                        <div 
                            className="h-full bg-white rounded-full transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(255,255,255,0.5)]" 
                            style={{ width: `${progress.percentage}%` }} 
                        />
                    </div>
                    <p className="text-[10px] font-bold text-white/60 uppercase tracking-widest text-right">
                        {progress.completedDays} of {progress.totalDays} days complete
                    </p>
                </div>

                {nextDay && (
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 group cursor-pointer hover:bg-white/20 transition-all">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-white/50 mb-1">Next Up • Day {nextDay.dayNumber}</p>
                                <p className="text-xl font-bold tracking-tight leading-none uppercase italic">{nextDay.workout?.name}</p>
                            </div>
                            <Link href={`/workouts/active?workoutId=${nextDay.workoutId}&programDayId=${nextDay.id}`}>
                                <Button size="icon" className="rounded-full bg-white text-primary hover:bg-white hover:scale-110 transition-all shadow-xl">
                                    <PlayCircle className="w-6 h-6" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                )}

                <Link href={`/programs/${program.id}`} className="flex items-center justify-center gap-2 text-xs font-black uppercase tracking-widest text-white/60 hover:text-white transition-colors group">
                    View Full Schedule
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
            </CardContent>
        </Card>
    );
}
