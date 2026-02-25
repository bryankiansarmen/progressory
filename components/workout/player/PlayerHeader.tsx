"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle2, ChevronLeft, Loader2, Timer } from "lucide-react";
import Link from "next/link";

interface PlayerHeaderProps {
    templateName: string;
    timer: string;
    onFinish: () => void;
    isFinishing: boolean;
    syncStatus?: "syncing" | "saved" | "error";
}

export default function PlayerHeader({
    templateName,
    timer,
    onFinish,
    isFinishing,
    syncStatus = "saved"
}: PlayerHeaderProps) {
    return (
        <header className="sticky top-0 z-40 w-full border-b-2 bg-background/80 backdrop-blur-md">
            <div className="container mx-auto px-2 sm:px-4 h-16 sm:h-20 flex items-center justify-between">
                <div className="flex items-center gap-1.5 sm:gap-3">
                    <Link href="/workouts">
                        <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 sm:h-10 sm:w-10">
                            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                        </Button>
                    </Link>
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <h2 className="font-bold text-[10px] text-muted-foreground uppercase tracking-widest leading-none">Active Session</h2>
                            {syncStatus === "syncing" && (
                                <div className="flex items-center gap-1 text-[10px] text-primary font-bold animate-pulse">
                                    <Loader2 className="w-2.5 h-2.5 animate-spin" />
                                    SYNCING
                                </div>
                            )}
                            {syncStatus === "saved" && (
                                <div className="text-[10px] text-emerald-500 font-bold">
                                    • SAVED
                                </div>
                            )}
                            {syncStatus === "error" && (
                                <div className="text-[10px] text-destructive font-bold">
                                    • OFFLINE
                                </div>
                            )}
                        </div>
                        <h1 className="text-base sm:text-xl font-bold truncate max-w-[100px] sm:max-w-xs leading-none">{templateName}</h1>
                    </div>
                </div>

                <div className="flex items-center gap-2 sm:gap-6">
                    <div className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 bg-primary/10 rounded-xl sm:rounded-2xl border border-primary/20">
                        <Timer className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary animate-pulse" />
                        <span className="font-mono text-base sm:text-xl font-black text-primary tabular-nums">{timer}</span>
                    </div>

                    <Button
                        onClick={onFinish}
                        disabled={isFinishing}
                        className="gap-2 shadow-lg shadow-success/20 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl sm:rounded-2xl px-3 sm:px-6 h-9 sm:h-11"
                    >
                        {isFinishing ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                        <span className="hidden sm:inline">Finish</span>
                    </Button>
                </div>
            </div>
        </header>
    );
}
