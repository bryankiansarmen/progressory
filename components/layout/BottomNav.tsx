"use client";

import Link from "next/link";
import { Home, Dumbbell, ClipboardList, History, LayoutList, TrendingUp } from "lucide-react";
import { useActiveRoute } from "@/hooks/useActiveRoute";
import { cn } from "@/lib/utils";

export default function BottomNav() {
    const { isActive } = useActiveRoute();

    const navItems = [
        { icon: <Home className="w-6 h-6" />, label: "Home", href: "/" },
        { icon: <Dumbbell className="w-6 h-6" />, label: "Library", href: "/exercises" },
        { icon: <ClipboardList className="w-6 h-6" />, label: "Routines", href: "/workouts" },
        { icon: <LayoutList className="w-6 h-6" />, label: "Programs", href: "/programs" },
        { icon: <History className="w-6 h-6" />, label: "History", href: "/history" },
        { icon: <TrendingUp className="w-6 h-6" />, label: "Analytics", href: "/analytics" },
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-background/80 backdrop-blur-xl border-t border-primary/10 px-6 py-3 pb-8">
            <div className="flex items-center justify-between">
                {navItems.map((item) => {
                    const active = isActive(item.href);
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex flex-col items-center gap-1.5 transition-all duration-300",
                                active ? "text-primary scale-110" : "text-muted-foreground opacity-50 hover:opacity-100"
                            )}
                        >
                            <div className={cn(
                                "p-2 rounded-2xl transition-all duration-300",
                                active ? "bg-primary/10 shadow-lg shadow-primary/5" : ""
                            )}>
                                {item.icon}
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-widest">{item.label}</span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
