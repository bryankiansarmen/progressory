"use client";

import { useState, useEffect, useRef } from "react";

export function useWorkoutTimer(initialSeconds: number = 0) {
    const [seconds, setSeconds] = useState(initialSeconds);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    // Sync seconds when initialSeconds changes (e.g. after hydration)
    useEffect(() => {
        setSeconds(initialSeconds);
    }, [initialSeconds]);

    useEffect(() => {
        intervalRef.current = setInterval(() => {
            setSeconds((prev) => prev + 1);
        }, 1000);

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, []);

    const formatTime = (totalSeconds: number) => {
        const h = Math.floor(totalSeconds / 3600);
        const m = Math.floor((totalSeconds % 3600) / 60);
        const s = totalSeconds % 60;

        const parts = [
            m.toString().padStart(2, '0'),
            s.toString().padStart(2, '0')
        ];

        if (h > 0) {
            parts.unshift(h.toString());
        }

        return parts.join(':');
    };

    return {
        seconds,
        formattedTime: formatTime(seconds),
    };
}
