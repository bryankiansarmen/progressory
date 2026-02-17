"use client";

import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";
import { AlertCircle, History, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

interface ConflictResolutionModalProps {
    isOpen: boolean;
    existingWorkoutName: string;
    newWorkoutName: string;
    onResume: () => void;
    onDiscard: () => void;
}

export default function ConflictResolutionModal({
    isOpen,
    existingWorkoutName,
    newWorkoutName,
    onResume,
    onDiscard,
}: ConflictResolutionModalProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    if (!mounted || !isOpen) return null;

    return createPortal(
        <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center p-4">
            <div
                className="fixed inset-0 bg-background/80 backdrop-blur-md transition-opacity animate-in fade-in duration-300"
                aria-hidden="true"
            />

            <div className="relative w-full max-w-lg bg-card border-2 shadow-2xl rounded-[32px] p-8 animate-in zoom-in-95 slide-in-from-bottom-10 duration-300">
                <div className="flex flex-col items-center text-center space-y-4">
                    <div className="w-16 h-16 rounded-3xl bg-amber-500/10 flex items-center justify-center text-amber-500 mb-2">
                        <AlertCircle className="w-8 h-8" />
                    </div>

                    <div className="space-y-2">
                        <h2 className="text-2xl font-black tracking-tight">Active Session Found</h2>
                        <p className="text-muted-foreground font-medium">
                            You're trying to start <span className="text-foreground font-bold">"{newWorkoutName}"</span>,
                            but you have an unfinished session for <span className="text-foreground font-bold">"{existingWorkoutName}"</span>.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-3 w-full mt-6">
                        <Button
                            variant="default"
                            size="lg"
                            className="h-16 rounded-2xl font-bold bg-primary hover:bg-primary/90 text-white gap-3 transition-all active:scale-95"
                            onClick={onResume}
                        >
                            <History className="w-5 h-5" />
                            Resume {existingWorkoutName}
                        </Button>

                        <Button
                            variant="outline"
                            size="lg"
                            className="h-16 rounded-2xl font-bold border-2 border-destructive/20 text-destructive hover:bg-destructive/5 gap-3 transition-all active:scale-95"
                            onClick={onDiscard}
                        >
                            <Trash2 className="w-5 h-5" />
                            Discard & Start New
                        </Button>
                    </div>

                    <p className="text-[10px] uppercase tracking-widest font-black text-muted-foreground/40 pt-4">
                        Progressory Gym Guard &trade;
                    </p>
                </div>
            </div>
        </div>,
        document.body
    );
}
