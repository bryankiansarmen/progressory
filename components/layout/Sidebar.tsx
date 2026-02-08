"use client";

import Link from "next/link";
import { Home, Dumbbell, ClipboardList, History, Zap, LayoutList } from "lucide-react";
import { useActiveRoute } from "@/hooks/useActiveRoute";
import { cn } from "@/lib/utils";

export default function Sidebar() {
    const { isActive } = useActiveRoute();

    const navItems = [
        { icon: <Home className="w-5 h-5" />, label: "Dashboard", href: "/" },
        { icon: <Dumbbell className="w-5 h-5" />, label: "Exercise Library", href: "/exercises" },
        { icon: <ClipboardList className="w-5 h-5" />, label: "Workout Routines", href: "/workouts" },
        { icon: <LayoutList className="w-5 h-5" />, label: "Training Programs", href: "/programs" },
        { icon: <History className="w-5 h-5" />, label: "Training History", href: "/history" },
    ];

    return (
        <aside className="hidden md:flex flex-col w-72 h-screen fixed left-0 top-0 bg-card/40 backdrop-blur-sm border-r-2 border-primary/10 p-8 z-50">
            <div className="flex items-center gap-3 mb-12 px-2">
                <div className="w-10 h-10 bg-primary rounded-2xl flex items-center justify-center shadow-xl shadow-primary/20">
                    <Zap className="w-6 h-6 text-white fill-white" />
                </div>
                <h1 className="text-2xl font-black tracking-tighter text-primary">Progressory</h1>
            </div>

            <nav className="flex-1 space-y-2">
                {navItems.map((item) => {
                    const active = isActive(item.href);
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-300 group",
                                active
                                    ? "bg-primary text-white shadow-xl shadow-primary/20 scale-[1.02]"
                                    : "text-muted-foreground hover:bg-primary/5 hover:text-primary"
                            )}
                        >
                            <span className={cn(
                                "transition-transform duration-300 group-hover:scale-110",
                                active ? "text-white" : "text-primary/60"
                            )}>
                                {item.icon}
                            </span>
                            <span className="font-bold text-sm tracking-tight">{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="mt-auto pt-8 border-t border-primary/5">
                <div className="bg-primary/5 rounded-3xl p-6 border border-primary/10 group cursor-pointer hover:bg-primary/10 transition-colors">
                    <p className="text-xs font-black uppercase tracking-widest text-primary mb-1">Premium Plan</p>
                    <p className="text-sm font-bold leading-snug">Go Pro to unlock advanced analytics</p>
                </div>
            </div>
        </aside>
    );
}
