"use client";

import { Exercise } from "@/types";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, History, Dumbbell } from "lucide-react";
import SetLoggingRow from "./SetLoggingRow";
import { SetRecord } from "./WorkoutPlayerContainer";

interface ExerciseLoggingCardProps {
    exercise: Exercise;
    sets: SetRecord[];
    lastLog?: any;
    onUpdateSet: (index: number, data: Partial<SetRecord>) => void;
    onAddSet: () => void;
    onRemoveSet: (index: number) => void;
    onToggleDone: (index: number) => void;
}

export default function ExerciseLoggingCard({
    exercise,
    sets,
    lastLog,
    onUpdateSet,
    onAddSet,
    onRemoveSet,
    onToggleDone
}: ExerciseLoggingCardProps) {
    return (
        <Card className="border-none shadow-2xl bg-card/60 backdrop-blur-sm overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
            <div className="bg-gradient-to-r from-primary to-primary/80 p-6 text-white">
                <div className="flex justify-between items-start mb-2">
                    <Badge variant="outline" className="bg-white/10 text-white border-white/20 uppercase tracking-widest text-[10px]">
                        Active Movement
                    </Badge>
                    <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 gap-2">
                        <History className="w-4 h-4" />
                        <span className="text-xs">History</span>
                    </Button>
                </div>
                <h2 className="text-3xl font-black tracking-tight">{exercise.name}</h2>
                <div className="flex justify-between items-end mt-4">
                    <div className="flex items-center gap-1.5 px-3 py-1 bg-white/10 rounded-full text-xs font-medium">
                        <Dumbbell className="w-3.5 h-3.5" />
                        {exercise.muscleGroup}
                    </div>

                    {lastLog && lastLog.sets && lastLog.sets.length > 0 && (
                        <div className="text-[10px] uppercase tracking-widest font-black text-white/60 bg-white/5 px-3 py-1.5 rounded-xl border border-white/10">
                            Last: <span className="text-white">{lastLog.sets[0].weight}kg × {lastLog.sets[0].reps}</span>
                        </div>
                    )}
                </div>
            </div>

            <CardContent className="p-6 space-y-4">
                <div className="grid grid-cols-12 px-3 text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 mb-1">
                    <div className="col-span-1 text-center">Set</div>
                    <div className="col-span-4 text-center">Weight</div>
                    <div className="col-span-3 text-center">Reps</div>
                    <div className="col-span-4 text-right pr-4">Status</div>
                </div>

                <div className="space-y-3">
                    {sets.map((set, index) => (
                        <SetLoggingRow
                            key={index}
                            setNumber={index + 1}
                            set={set}
                            lastLogSet={lastLog?.sets?.[index] ? { weight: lastLog.sets[index].weight, reps: lastLog.sets[index].reps } : undefined}
                            onUpdate={(data) => onUpdateSet(index, data)}
                            onToggleDone={() => onToggleDone(index)}
                            onRemove={() => onRemoveSet(index)}
                        />
                    ))}
                </div>
            </CardContent>

            <CardFooter className="p-6 pt-0">
                <Button
                    variant="outline"
                    className="w-full h-14 rounded-2xl border-2 border-dashed border-primary/30 text-primary hover:bg-primary/5 font-bold gap-2"
                    onClick={onAddSet}
                >
                    <Plus className="w-5 h-5" />
                    Add Set
                </Button>
            </CardFooter>
        </Card>
    );
}
