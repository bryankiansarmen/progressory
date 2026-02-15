"use client";

import Link from "next/link";
import { Home, Dumbbell, ClipboardList, History, LayoutList, TrendingUp } from "lucide-react";
import { useActiveRoute } from "@/hooks/useActiveRoute";
import { cn } from "@/lib/utils";

export default function BottomNav() {
    const { isActive } = useActiveRoute();

    const navItems = [
        { icon: <Home className="w-5 h-5" />, label: "Home", href: "/" },
        { icon: <Dumbbell className="w-5 h-5" />, label: "Library", href: "/exercises" },
        { icon: <ClipboardList className="w-5 h-5" />, label: "Workouts", href: "/workouts" },
        { icon: <LayoutList className="w-5 h-5" />, label: "Programs", href: "/programs" },
        { icon: <History className="w-5 h-5" />, label: "History", href: "/history" },
        { icon: <TrendingUp className="w-5 h-5" />, label: "Stats", href: "/analytics" },
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-background/80 backdrop-blur-xl border-t border-primary/10 px-2 py-3 pb-8">
            <div className="flex items-center justify-between">
                {navItems.map((item) => {
                    const active = isActive(item.href);
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex flex-col items-center gap-1 transition-all duration-300 flex-1 min-w-0",
                                active ? "text-primary" : "text-muted-foreground opacity-60 hover:opacity-100"
                            )}
                        >
                            <div className={cn(
                                "p-2 rounded-xl transition-all duration-300",
                                active ? "bg-primary/10" : ""
                            )}>
                                {item.icon}
                            </div>
                            <span className="text-[9px] font-black uppercase tracking-wider truncate w-full text-center">
                                {item.label}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
