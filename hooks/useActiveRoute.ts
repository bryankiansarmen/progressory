"use client";

import { usePathname } from "next/navigation";

export function useActiveRoute() {
    const pathname = usePathname();

    const isActive = (path: string) => {
        if (path === "/" && pathname !== "/") return false;
        return pathname.startsWith(path);
    };

    return { pathname, isActive };
}
