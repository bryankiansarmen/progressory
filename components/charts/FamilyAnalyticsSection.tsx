"use client";

import AreaChart from "@/components/charts/AreaChart";
import { TrendingUp, Dumbbell } from "lucide-react";

interface FamilyTrend {
    name: string;
    data: { label: string; volume: number }[];
}

interface FamilyAnalyticsSectionProps {
    familyTrends: FamilyTrend[];
}

export default function FamilyAnalyticsSection({ familyTrends }: FamilyAnalyticsSectionProps) {
    if (familyTrends.length === 0) return null;

    return (
        <section className="space-y-6">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-500/10 rounded-2xl flex items-center justify-center text-amber-500">
                    <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                    <h3 className="font-black text-2xl tracking-tight">Movement Families</h3>
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest">Aggregated progress across variations</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {familyTrends.map((family) => (
                    <div key={family.name} className="bg-card/40 border-2 rounded-[32px] p-6 backdrop-blur-sm group hover:border-primary/30 transition-all duration-300">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                    <Dumbbell className="w-4 h-4" />
                                </div>
                                <h4 className="font-black text-lg tracking-tight">{family.name}</h4>
                            </div>
                            <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-40">
                                8-Week Trend
                            </div>
                        </div>

                        <div className="h-[120px] w-full">
                            <AreaChart data={family.data} height={120} />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
