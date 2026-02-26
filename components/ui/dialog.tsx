"use client";

import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";


interface DialogProps {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    children: ReactNode;
}

export function Dialog({ open, children }: DialogProps) {
    useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [open]);

    if (!open) return null;

    // Provide the onOpenChange context via a simple approach since we aren't using a full context provider here
    return <div data-state={open ? "open" : "closed"}>{children}</div>;
}

export function DialogContent({ children, className }: { children: ReactNode; className?: string }) {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="fixed inset-0 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200" />
            <div className={cn("relative w-full max-w-lg bg-card border shadow-lg animate-in zoom-in-95 duration-200", className)}>
                {children}
            </div>
        </div>,
        document.body
    );
}

export function DialogHeader({ children, className }: { children: ReactNode; className?: string }) {
    return <div className={cn("flex flex-col space-y-1.5", className)}>{children}</div>;
}

export function DialogTitle({ children, className }: { children: ReactNode; className?: string }) {
    return <h2 className={cn("text-lg font-semibold leading-none tracking-tight", className)}>{children}</h2>;
}

export function DialogDescription({ children, className }: { children: ReactNode; className?: string }) {
    return <p className={cn("text-sm text-muted-foreground", className)}>{children}</p>;
}

export function DialogFooter({ children, className }: { children: ReactNode; className?: string }) {
    return <div className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)}>{children}</div>;
}
