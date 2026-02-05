"use client";

import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";
import BottomNav from "./BottomNav";
import { cn } from "@/lib/utils";

interface AppShellProps {
    children: React.ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
    const pathname = usePathname();

    // Hide navigation when in an active workout session
    const isPlayerPage = pathname === "/workouts/active";

    if (isPlayerPage) {
        return <div className="min-h-screen bg-background">{children}</div>;
    }

    return (
        <div className="flex min-h-screen bg-background antialiased">
            <Sidebar />

            <div className={cn(
                "flex-1 flex flex-col transition-all duration-500",
                "md:pl-72", // Space for Sidebar
                "pb-24 md:pb-0" // Space for BottomNav on mobile
            )}>
                {children}
            </div>

            <BottomNav />
        </div>
    );
}
