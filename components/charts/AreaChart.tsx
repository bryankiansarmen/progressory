"use client";

import { useMemo } from "react";

interface DataPoint {
    label: string;
    volume: number;
}

interface AreaChartProps {
    data: DataPoint[];
    height?: number;
}

export default function AreaChart({ data }: AreaChartProps) {

    const maxVolume = useMemo(() => {
        const max = Math.max(...data.map(d => d.volume), 0);
        return max === 0 ? 1000 : max * 1.1; // Add 10% headroom
    }, [data]);

    const points = useMemo(() => {
        if (data.length === 0) return "";
        const width = 100 / (data.length - 1);
        return data.map((d, i) => {
            const x = i * width;
            const y = 100 - (d.volume / maxVolume) * 100;
            return `${x},${y}`;
        }).join(" ");
    }, [data, maxVolume]);

    const areaPath = useMemo(() => {
        if (data.length === 0) return "";
        const p = points;
        return `M 0,100 L ${p} L 100,100 Z`;
    }, [data, points]);

    const linePath = useMemo(() => {
        if (data.length === 0) return "";
        return `M ${points}`;
    }, [data, points]);

    return (
        <div className="w-full h-full relative group">
            <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="w-full h-full overflow-visible"
            >
                <defs>
                    <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
                    </linearGradient>
                </defs>

                {/* Grid Lines (Horizontal) */}
                {[0, 25, 50, 75, 100].map((tick) => (
                    <line
                        key={tick}
                        x1="0"
                        y1={tick}
                        x2="100"
                        y2={tick}
                        stroke="currentColor"
                        strokeOpacity="0.05"
                        strokeWidth="0.1"
                    />
                ))}

                {/* Area */}
                <path d={areaPath} fill="url(#areaGradient)" />

                {/* Line */}
                <path
                    d={linePath}
                    fill="none"
                    stroke="var(--color-primary)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="drop-shadow-[0_4px_8px_rgba(var(--color-primary-rgb),0.3)]"
                />

                {/* Interactive Points */}
                {data.map((d, i) => {
                    const width = 100 / (data.length - 1);
                    const x = i * width;
                    const y = 100 - (d.volume / maxVolume) * 100;
                    return (
                        <circle
                            key={i}
                            cx={x}
                            cy={y}
                            r="1"
                            fill="white"
                            stroke="var(--color-primary)"
                            strokeWidth="0.5"
                            className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-xl"
                        />
                    );
                })}
            </svg>

            {/* Labels */}
            <div className="flex justify-between mt-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground/40">
                {data.map((d, i) => (
                    <span key={i}>{d.label}</span>
                ))}
            </div>
        </div>
    );
}
