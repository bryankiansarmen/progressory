"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus, X, Timer } from "lucide-react";
import { useAudio } from "@/hooks/useAudio";

interface RestTimerOverlayProps {
    seconds: number;
    onClose: () => void;
    onAddSeconds: (s: number) => void;
}

export default function RestTimerOverlay({ seconds, onClose, onAddSeconds }: RestTimerOverlayProps) {
    const [timeLeft, setTimeLeft] = useState(seconds);
    const { playBeep } = useAudio();

    useEffect(() => {
        setTimeLeft(seconds);
    }, [seconds]);

    useEffect(() => {
        if (timeLeft <= 0) {
            // Feedback before closing
            playBeep(600, 200); // Primary beep
            setTimeout(() => playBeep(800, 150), 150); // Second beep
            if ("vibrate" in navigator) {
                navigator.vibrate([200, 100, 200]);
            }
            onClose();
            return;
        }

        const interval = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [timeLeft, onClose]);

    const formatTime = (totalSeconds: number) => {
        const m = Math.floor(totalSeconds / 60);
        const s = totalSeconds % 60;
        return `${m}:${s.toString().padStart(2, '0')}`;
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/90 backdrop-blur-xl animate-in zoom-in-95 duration-300">
            <div className="w-full max-w-sm text-center relative">
                <div className="bg-primary/10 w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-8 border-4 border-primary/20 animate-pulse">
                    <Timer className="w-16 h-16 text-primary" />
                </div>

                <h2 className="text-sm font-black uppercase tracking-[0.3em] text-primary mb-2">Resting</h2>
                <div className="text-8xl font-black tabular-nums tracking-tighter mb-12">
                    {formatTime(timeLeft)}
                </div>

                <div className="flex gap-4">
                    <Button
                        variant="secondary"
                        size="lg"
                        className="flex-1 h-16 rounded-3xl text-lg font-bold border-2 border-primary/20 bg-primary/5 hover:bg-primary/10 gap-2"
                        onClick={() => onAddSeconds(30)}
                    >
                        <Plus className="w-5 h-5" />
                        30s
                    </Button>
                    <Button
                        size="lg"
                        className="flex-1 h-16 rounded-3xl text-lg font-bold shadow-xl shadow-primary/20 gap-2"
                        onClick={onClose}
                    >
                        <X className="w-5 h-5" />
                        Skip
                    </Button>
                </div>

                <p className="mt-12 text-muted-foreground text-sm font-medium">
                    Drink some water and breathe. 💧
                </p>
            </div>
        </div>
    );
}
