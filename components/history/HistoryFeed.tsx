"use client";

import { History, Plus } from "lucide-react";
import { HistoryLog } from "@/services/stats.service";
import { HistoryLogCard } from "./HistoryLogCard";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface HistoryFeedProps {
    logs: HistoryLog[];
}

export function HistoryFeed({ logs }: HistoryFeedProps) {
    if (logs.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 bg-card/40 border-2 border-dashed rounded-[40px] text-center px-6">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                    <History className="w-10 h-10 text-primary opacity-40" />
                </div>
                <h2 className="text-2xl font-black tracking-tight mb-2">The Archive is Empty</h2>
                <p className="text-muted-foreground max-w-sm font-medium mb-8">
                    You haven't logged any sessions yet. Run your first workout to start building your legacy.
                </p>
                <Link href="/workouts">
                    <Button size="lg" className="rounded-full font-bold h-12 px-8">
                        <Plus className="w-5 h-5 mr-2" />
                        Start Your First Workout
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4">
            {logs.map((log) => (
                <HistoryLogCard key={log.id} log={log} />
            ))}
        </div>
    );
}
