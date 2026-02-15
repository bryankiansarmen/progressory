"use client";

import { useState, useEffect } from "react";
import { FamilyPerformance, getFamilyBestPerformance } from "@/services/stats.service";
import { Trophy, Calendar, Dumbbell, Loader2 } from "lucide-react";

interface FamilyReferenceCardProps {
    exerciseId: string;
    familyId: string | null;
}

export default function FamilyReferenceCard({ exerciseId, familyId }: FamilyReferenceCardProps) {
    const [performance, setPerformance] = useState<FamilyPerformance | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchBest = async () => {
            setIsLoading(true);
            try {
                // Use familyId if available, otherwise exerciseId is the root
                const data = await getFamilyBestPerformance("user_123", familyId || exerciseId);
                setPerformance(data);
            } catch (error) {
                console.error("Failed to fetch family performance:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchBest();
    }, [exerciseId, familyId]);

    if (isLoading) {
        return (
            <div className="bg-primary/5 border-2 border-dashed border-primary/20 rounded-3xl p-6 flex items-center justify-center">
                <Loader2 className="w-6 h-6 animate-spin text-primary/40" />
            </div>
        );
    }

    if (!performance) return null;

    return (
        <div className="bg-gradient-to-br from-primary/10 to-transparent border-2 border-primary/20 rounded-3xl p-6 relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 opacity-5 group-hover:scale-110 transition-transform duration-1000">
                <Trophy className="w-24 h-24" />
            </div>

            <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center text-primary shadow-lg shadow-primary/10">
                    <Trophy className="w-6 h-6" />
                </div>
                <div>
                    <h4 className="font-black text-sm uppercase tracking-widest text-primary/80 mb-1">Family Best</h4>
                    <p className="text-lg font-black tracking-tight leading-none mb-2">
                        {performance.bestWeight}KG x {performance.bestReps}
                    </p>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                            <Dumbbell className="w-3 h-3" />
                            {performance.exerciseName}
                        </div>
                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                            <Calendar className="w-3 h-3" />
                            {performance.date}
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-4 pt-4 border-t border-primary/10 font-medium text-[11px] text-muted-foreground leading-relaxed italic">
                "Movement families share the same motor patterns. Reference this best to gauge your intensity."
            </div>
        </div>
    );
}
