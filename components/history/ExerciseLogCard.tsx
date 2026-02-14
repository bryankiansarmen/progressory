"use client";

import { Card } from "@/components/ui/card";
import { Dumbbell, Info } from "lucide-react";

interface Set {
    id: string;
    weight: number;
    reps: number;
}

interface ExerciseLogCardProps {
    exerciseName: string;
    sets: Set[];
}

export function ExerciseLogCard({ exerciseName, sets }: ExerciseLogCardProps) {
    return (
        <Card className="overflow-hidden border-2 bg-card/30 backdrop-blur-sm rounded-[40px]">
            <div className="p-8 border-b-2 border-primary/5 bg-primary/[0.02]">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-[18px] flex items-center justify-center">
                        <Dumbbell className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-black tracking-tight leading-tight">{exerciseName}</h3>
                        <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider">
                            {sets.length} {sets.length === 1 ? 'Set' : 'Sets'} Completed
                        </p>
                    </div>
                </div>
            </div>

            <div className="p-8">
                <div className="space-y-4">
                    <div className="grid grid-cols-3 px-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                        <div className="col-span-1">Set</div>
                        <div className="col-span-1 text-center">Weight</div>
                        <div className="col-span-1 text-right">Reps</div>
                    </div>

                    <div className="space-y-2">
                        {sets.map((set, index) => (
                            <div
                                key={set.id}
                                className="grid grid-cols-3 items-center px-4 py-4 bg-muted/20 rounded-2xl hover:bg-muted/40 transition-colors"
                            >
                                <div className="text-sm font-black flex items-center gap-2">
                                    <span className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-[10px] text-primary">
                                        {index + 1}
                                    </span>
                                </div>
                                <div className="text-center font-black tracking-tight text-lg">
                                    {set.weight} <span className="text-[10px] font-bold opacity-30">KG</span>
                                </div>
                                <div className="text-right font-black tracking-tight text-lg">
                                    {set.reps} <span className="text-[10px] font-bold opacity-30">REPS</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Card>
    );
}
