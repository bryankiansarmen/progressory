"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Timer, SkipForward, Plus, RotateCcw } from "lucide-react";

import { useAudio } from "@/hooks/useAudio";

interface RestTimerProps {
    duration: number; // in seconds
    onComplete: () => void;
    onSkip: () => void;
}

export default function RestTimer({ duration, onComplete, onSkip }: RestTimerProps) {
    const [timeLeft, setTimeLeft] = useState(duration);
    const [isActive, setIsActive] = useState(true);
    const { playBeep } = useAudio();

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            // Feedback
            playBeep(600, 200);
            setTimeout(() => playBeep(800, 150), 150);
            if ("vibrate" in navigator) {
                navigator.vibrate([200, 100, 200]);
            }
            onComplete();
            setIsActive(false);
        }

        return () => clearInterval(interval);
    }, [isActive, timeLeft, onComplete, playBeep]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    const progress = ((duration - timeLeft) / duration) * 100;

    return (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-bottom-10 duration-500">
            <div className="bg-card/70 backdrop-blur-xl border-2 border-primary/20 shadow-[0_0_50px_-12px_rgba(var(--primary),0.3)] rounded-[32px] p-6 w-[320px] relative overflow-hidden">

                {/* Background Progress Fill */}
                <div
                    className="absolute bottom-0 left-0 h-1 bg-primary/20 transition-all duration-1000 ease-linear"
                    style={{ width: `${progress}%` }}
                />

                <div className="flex flex-col items-center gap-4">
                    <div className="flex items-center gap-3 self-start">
                        <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                            <Timer className="w-4 h-4" />
                        </div>
                        <div>
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 leading-none mb-1">Rest Interval</h4>
                            <p className="font-black text-xs tracking-tight">Recover & Focus</p>
                        </div>
                    </div>

                    <div className="text-6xl font-black tracking-tighter text-primary tabular-nums py-2">
                        {formatTime(timeLeft)}
                    </div>

                    <div className="grid grid-cols-3 gap-2 w-full">
                        <Button
                            variant="outline"
                            size="sm"
                            className="rounded-xl border-primary/10 bg-white/5 hover:bg-primary/5 font-bold gap-1.5"
                            onClick={() => setTimeLeft((prev) => prev + 30)}
                        >
                            <Plus className="w-3.5 h-3.5" /> 30s
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            className="rounded-xl border-primary/10 bg-white/5 hover:bg-primary/5 font-bold gap-1.5"
                            onClick={() => setTimeLeft(duration)}
                        >
                            <RotateCcw className="w-3.5 h-3.5" />
                        </Button>
                        <Button
                            variant="default"
                            size="sm"
                            className="rounded-xl font-bold gap-1.5"
                            onClick={onSkip}
                        >
                            <SkipForward className="w-3.5 h-3.5" /> Skip
                        </Button>
                    </div>
                </div>
            </div>

            {/* Completion Pulse Overlay (Simplified) */}
            {timeLeft === 0 && (
                <div className="absolute inset-0 rounded-[32px] bg-primary/20 animate-ping pointer-events-none" />
            )}
        </div>
    );
}
