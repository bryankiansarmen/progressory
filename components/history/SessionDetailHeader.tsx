"use client";

import { Card } from "@/components/ui/card";
import { Calendar, Clock, Weight, ChevronLeft } from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface SessionDetailHeaderProps {
    workoutName: string;
    date: Date;
    totalVolume: number;
    duration: number | null;
}

export function SessionDetailHeader({ workoutName, date, totalVolume, duration }: SessionDetailHeaderProps) {
    return (
        <div className="space-y-8 mb-12">
            <Link href="/history">
                <Button variant="ghost" className="pl-0 hover:bg-transparent group -ml-2">
                    <ChevronLeft className="w-5 h-5 mr-1 group-hover:-translate-x-1 transition-transform" />
                    <span className="font-bold tracking-tight">Back to History</span>
                </Button>
            </Link>

            <header>
                <div className="flex items-center gap-2 text-primary font-bold mb-2">
                    <Calendar className="w-5 h-5" />
                    <span className="uppercase tracking-widest text-sm">
                        {format(new Date(date), "EEEE, MMMM d, yyyy")}
                    </span>
                </div>
                <h1 className="text-5xl font-black tracking-tighter mb-8 leading-none">
                    {workoutName}
                </h1>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-2xl">
                    <Card className="p-6 border-2 bg-card/50 backdrop-blur-sm rounded-[32px] flex flex-col justify-center">
                        <div className="flex items-center gap-2 text-muted-foreground mb-1">
                            <Weight className="w-4 h-4" />
                            <span className="text-[10px] font-black uppercase tracking-widest">Total Volume</span>
                        </div>
                        <span className="text-3xl font-black tracking-tighter">
                            {totalVolume.toLocaleString()}<span className="text-xs ml-1 opacity-50 uppercase">kg</span>
                        </span>
                    </Card>

                    <Card className="p-6 border-2 bg-card/50 backdrop-blur-sm rounded-[32px] flex flex-col justify-center">
                        <div className="flex items-center gap-2 text-muted-foreground mb-1">
                            <Clock className="w-4 h-4" />
                            <span className="text-[10px] font-black uppercase tracking-widest">Duration</span>
                        </div>
                        <span className="text-3xl font-black tracking-tighter">
                            {duration ?? "--"}<span className="text-xs ml-1 opacity-50 uppercase">min</span>
                        </span>
                    </Card>
                </div>
            </header>
        </div>
    );
}
