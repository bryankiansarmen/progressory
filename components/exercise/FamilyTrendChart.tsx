"use client";

import { useState, useEffect } from "react";
import { VolumeTrend, getFamilyVolumeTrend } from "@/services/stats.service";
import AreaChart from "@/components/charts/AreaChart";
import { Loader2, TrendingUp } from "lucide-react";

interface FamilyTrendChartProps {
    familyId: string;
}

export default function FamilyTrendChart({ familyId }: FamilyTrendChartProps) {
    const [data, setData] = useState<VolumeTrend[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const results = await getFamilyVolumeTrend("user_123", familyId, 8);
                setData(results);
            } catch (error) {
                console.error("Failed to fetch family trend:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [familyId]);

    if (isLoading) {
        return (
            <div className="h-40 flex flex-col items-center justify-center gap-2 bg-muted/20 rounded-2xl border-2 border-dashed border-muted">
                <Loader2 className="w-5 h-5 animate-spin text-primary/40" />
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40">Analyzing Family Patterns...</p>
            </div>
        );
    }

    if (data.length === 0 || data.every(d => d.volume === 0)) {
        return null;
    }

    return (
        <div className="bg-card border-2 rounded-2xl p-4 overflow-hidden relative group">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                        <TrendingUp className="w-4 h-4" />
                    </div>
                    <div>
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 leading-none mb-1">Family Volume</h4>
                        <p className="font-black text-xs tracking-tight">8-Week Trend</p>
                    </div>
                </div>
            </div>

            <AreaChart data={data} height={100} />

            <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent pointer-events-none opacity-50" />
        </div>
    );
}
