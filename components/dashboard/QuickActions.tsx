"use client";

import { Card } from "@/components/ui/card";
import { Search, List, ArrowRight, LayoutList } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function QuickActions() {
    const actions = [
        {
            title: "Exercise Library",
            description: "Browse and discover new movements",
            icon: <Search className="w-6 h-6" />,
            href: "/exercises",
            color: "blue"
        },
        {
            title: "Workout Routines",
            description: "Start a saved workout template",
            icon: <List className="w-6 h-6" />,
            href: "/workouts",
            color: "primary"
        },
        {
            title: "Training Programs",
            description: "Follow a multi-week training plan",
            icon: <LayoutList className="w-6 h-6" />,
            href: "/programs",
            color: "amber"
        }
    ];

    const colorStyles = {
        primary: "hover:border-primary/50 bg-primary/5 text-primary",
        blue: "hover:border-blue-500/50 bg-blue-500/5 text-blue-600",
        amber: "hover:border-amber-500/50 bg-amber-500/5 text-amber-600",
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {actions.map((action, i) => (
                <Link key={i} href={action.href}>
                    <Card className={cn(
                        "p-6 border-2 transition-all duration-300 group cursor-pointer h-full",
                        colorStyles[action.color as keyof typeof colorStyles]
                    )}>
                        <div className="flex items-start justify-between">
                            <div className="flex flex-col gap-2">
                                <div className="p-3 bg-white w-fit rounded-2xl shadow-sm mb-2 group-hover:scale-110 transition-transform">
                                    {action.icon}
                                </div>
                                <h3 className="font-black text-xl text-foreground group-hover:text-inherit transition-colors">{action.title}</h3>
                                <p className="text-sm text-muted-foreground font-medium pr-8">{action.description}</p>
                            </div>
                            <ArrowRight className="w-5 h-5 mt-2 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all text-inherit" />
                        </div>
                    </Card>
                </Link>
            ))}
        </div>
    );
}
