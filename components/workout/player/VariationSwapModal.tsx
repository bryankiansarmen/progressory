"use client";

import { useState, useEffect } from "react";
import { Exercise } from "@/types";
import { getExerciseFamily } from "@/services/exercise.service";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Dumbbell, ArrowRightLeft, Loader2, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface VariationSwapModalProps {
    isOpen: boolean;
    onClose: () => void;
    currentExercise: Exercise;
    onSwap: (newExercise: Exercise) => void;
}

export default function VariationSwapModal({ isOpen, onClose, currentExercise, onSwap }: VariationSwapModalProps) {
    const [family, setFamily] = useState<Exercise[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedId, setSelectedId] = useState<string>(currentExercise.id);

    useEffect(() => {
        if (isOpen) {
            const fetchFamily = async () => {
                setIsLoading(true);
                try {
                    const data = await getExerciseFamily(currentExercise.id);
                    setFamily(data);
                } catch (error) {
                    console.error("Failed to fetch family:", error);
                } finally {
                    setIsLoading(false);
                }
            };
            fetchFamily();
        }
    }, [isOpen, currentExercise.id]);

    const handleSwap = () => {
        const selected = family.find(f => f.id === selectedId);
        if (selected && selected.id !== currentExercise.id) {
            onSwap(selected);
            onClose();
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md bg-card border-2 rounded-[40px] p-0 overflow-hidden">
                <DialogHeader className="p-8 pb-4">
                    <DialogTitle className="text-3xl font-black tracking-tighter flex items-center gap-3">
                        <ArrowRightLeft className="w-8 h-8 text-primary" />
                        Swap Variation
                    </DialogTitle>
                    <DialogDescription className="text-muted-foreground font-medium">
                        Replace <span className="text-foreground font-bold">{currentExercise.name}</span> with a related movement from its family.
                    </DialogDescription>
                </DialogHeader>

                <div className="px-8 py-4 max-h-[400px] overflow-y-auto space-y-3">
                    {isLoading ? (
                        <div className="py-20 flex flex-col items-center justify-center gap-4 text-muted-foreground">
                            <Loader2 className="w-10 h-10 animate-spin text-primary" />
                            <p className="font-bold uppercase tracking-widest text-[10px]">Scanning movement family...</p>
                        </div>
                    ) : family.length > 1 ? (
                        family.map((v) => (
                            <button
                                key={v.id}
                                onClick={() => setSelectedId(v.id)}
                                className={cn(
                                    "w-full flex items-center justify-between p-5 rounded-3xl border-2 transition-all duration-300 group",
                                    selectedId === v.id
                                        ? "border-primary bg-primary/10 shadow-lg shadow-primary/5 scale-[1.02]"
                                        : "border-muted hover:border-primary/50 hover:bg-muted/50"
                                )}
                            >
                                <div className="flex items-center gap-4 text-left">
                                    <div className={cn(
                                        "w-12 h-12 rounded-2xl flex items-center justify-center transition-colors",
                                        selectedId === v.id ? "bg-primary text-white" : "bg-muted text-muted-foreground group-hover:text-primary"
                                    )}>
                                        <Dumbbell className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="font-black text-lg tracking-tight leading-none mb-1">{v.name}</p>
                                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                                            {v.parentId ? "Variation" : "Parent Movement"}
                                        </p>
                                    </div>
                                </div>
                                {selectedId === v.id && (
                                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white">
                                        <Check className="w-5 h-5" />
                                    </div>
                                )}
                            </button>
                        ))
                    ) : (
                        <div className="py-12 text-center bg-muted/30 rounded-3xl border-2 border-dashed border-muted">
                            <p className="text-muted-foreground font-medium">No variations found for this movement.</p>
                        </div>
                    )}
                </div>

                <DialogFooter className="p-8 pt-4 bg-muted/30 border-t border-muted">
                    <Button
                        variant="ghost"
                        onClick={onClose}
                        className="rounded-2xl font-bold uppercase tracking-widest text-xs h-14"
                    >
                        Keep Original
                    </Button>
                    <Button
                        onClick={handleSwap}
                        disabled={selectedId === currentExercise.id || isLoading}
                        className="rounded-2xl font-black uppercase tracking-widest text-xs h-14 flex-1 shadow-xl shadow-primary/20"
                    >
                        Swap Movement
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
