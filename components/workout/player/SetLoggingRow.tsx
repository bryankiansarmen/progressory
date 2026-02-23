"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Check, Trash2, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";
import { SetRecord } from "./WorkoutPlayerContainer";

interface SetLoggingRowProps {
    setNumber: number;
    set: SetRecord;
    lastLogSet?: { weight: number, reps: number };
    onUpdate: (data: Partial<SetRecord>) => void;
    onToggleDone: () => void;
    onRemove: () => void;
}

export default function SetLoggingRow({
    setNumber,
    set,
    lastLogSet,
    onUpdate,
    onToggleDone,
    onRemove
}: SetLoggingRowProps) {
    const handleToggle = () => {
        if (!set.isDone && "vibrate" in navigator) {
            navigator.vibrate(50); // Short tap vibration
        }
        onToggleDone();
    };

    return (
        <div className={cn(
            "grid grid-cols-12 gap-3 items-center p-3 rounded-2xl transition-all duration-300",
            set.isPR ? "bg-amber-500/10 border-amber-500/40 shadow-[0_0_15px_rgba(245,158,11,0.2)]" : set.isDone ? "bg-emerald-500/10 border-emerald-500/20" : "bg-card border-transparent",
            "border-2"
        )}>
            <div className="col-span-1 text-center font-black text-muted-foreground/50 italic">
                {setNumber}
            </div>

            <div className="col-span-4 flex flex-col gap-1">
                <div className="relative group">
                    <Input
                        type="number"
                        placeholder={lastLogSet ? `${lastLogSet.weight}` : "0"}
                        value={set.weight || ""}
                        onChange={(e) => onUpdate({ weight: parseFloat(e.target.value) || 0 })}
                        disabled={set.isDone}
                        className="h-12 rounded-xl text-center font-bold text-lg bg-background/50 border-none shadow-inner"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-muted-foreground uppercase opacity-50 group-hover:opacity-100 transition-opacity">kg</span>
                </div>
            </div>

            <div className="col-span-3 flex flex-col gap-1">
                <div className="relative group">
                    <Input
                        type="number"
                        placeholder={lastLogSet ? `${lastLogSet.reps}` : "0"}
                        value={set.reps || ""}
                        onChange={(e) => onUpdate({ reps: parseInt(e.target.value) || 0 })}
                        disabled={set.isDone}
                        className="h-12 rounded-xl text-center font-bold text-lg bg-background/50 border-none shadow-inner"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-muted-foreground uppercase opacity-50 group-hover:opacity-100 transition-opacity">reps</span>
                </div>
            </div>

            <div className="col-span-4 flex items-center justify-end gap-2">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={onRemove}
                    disabled={set.isDone}
                    className="rounded-xl h-12 w-12 text-destructive hover:bg-destructive/10"
                >
                    <Trash2 className="w-4 h-4" />
                </Button>

                <Button
                    onClick={handleToggle}
                    variant={set.isDone ? "default" : "outline"}
                    className={cn(
                        "h-12 w-12 rounded-xl border-2 transition-all duration-500",
                        set.isPR
                            ? "bg-amber-500 border-amber-400 text-white shadow-lg shadow-amber-500/40"
                            : set.isDone
                                ? "bg-emerald-500 border-emerald-400 text-white shadow-lg shadow-emerald-500/40"
                                : "border-primary/20 hover:border-emerald-500/50 hover:bg-emerald-500/5"
                    )}
                >
                    {set.isPR ? (
                        <Trophy className="w-6 h-6 scale-110 text-yellow-200 fill-yellow-200" />
                    ) : (
                        <Check className={cn("w-6 h-6 transition-transform duration-500", set.isDone ? "scale-110" : "scale-100")} />
                    )}
                </Button>
            </div>
        </div>
    );
}
