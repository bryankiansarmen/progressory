"use client";

import { useCallback, useEffect, useRef } from "react";

export const useAudio = () => {
    const audioContextRef = useRef<AudioContext | null>(null);

    useEffect(() => {
        // Initialize AudioContext on mount
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioContextClass) {
            audioContextRef.current = new AudioContextClass();
        }

        return () => {
            if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
                audioContextRef.current.close();
            }
        };
    }, []);

    const playBeep = useCallback((frequency = 800, duration = 150, type: OscillatorType = "sine") => {
        if (!audioContextRef.current) return;

        // Resume context if suspended (browser autoplay policy)
        if (audioContextRef.current.state === 'suspended') {
            audioContextRef.current.resume();
        }

        const oscillator = audioContextRef.current.createOscillator();
        const gainNode = audioContextRef.current.createGain();

        oscillator.type = type;
        oscillator.frequency.setValueAtTime(frequency, audioContextRef.current.currentTime);

        // Envelope for smoother sound
        gainNode.gain.setValueAtTime(0.1, audioContextRef.current.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContextRef.current.currentTime + (duration / 1000));

        oscillator.connect(gainNode);
        gainNode.connect(audioContextRef.current.destination);

        oscillator.start();
        oscillator.stop(audioContextRef.current.currentTime + (duration / 1000));
    }, []);

    return { playBeep };
};
