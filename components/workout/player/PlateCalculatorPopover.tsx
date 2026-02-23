"use client";

import { useState } from "react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Layers } from "lucide-react";
import { calcBarbellPlates, PlateResult, PlateUnit } from "@/lib/utils/plates";

interface PlateCalculatorPopoverProps {
    currentWeight: number;
}

export function PlateCalculatorPopover({ currentWeight }: PlateCalculatorPopoverProps) {
    const [barWeight, setBarWeight] = useState<number>(20);
    const [unit, setUnit] = useState<PlateUnit>("kg"); // Defaulting to kg as per project settings

    const requiredPlates: PlateResult[] = calcBarbellPlates(currentWeight, barWeight, unit);

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" size="icon" className="h-12 w-12 rounded-xl border-2 border-primary/20 hover:border-primary/50 text-muted-foreground hover:text-foreground">
                    <Layers className="h-5 w-5" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-4 rounded-2xl shadow-xl border-2 border-border/50" side="top" align="center">
                <div className="space-y-4">
                    <div className="flex items-center justify-between border-b pb-2">
                        <h4 className="font-black text-lg tracking-tight">Plate Math</h4>
                        <div className="flex gap-1 bg-muted p-1 rounded-lg">
                            <button
                                onClick={() => setBarWeight(20)}
                                className={`text-xs px-2 py-1 flex-1 font-bold rounded-md transition-colors ${barWeight === 20 ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                            >
                                20kg
                            </button>
                            <button
                                onClick={() => setBarWeight(15)}
                                className={`text-xs px-2 py-1 flex-1 font-bold rounded-md transition-colors ${barWeight === 15 ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                            >
                                15kg
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-center text-sm font-medium text-muted-foreground px-1 pb-1">
                            <span>Plate</span>
                            <span>Count (Per Side)</span>
                        </div>

                        {requiredPlates.length > 0 ? (
                            <ul className="space-y-2">
                                {requiredPlates.map((pr, index) => (
                                    <li key={index} className="flex justify-between items-center bg-muted/50 p-2 rounded-lg border">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center font-black text-xs">
                                                {pr.weight}
                                            </div>
                                            <span className="font-bold">{pr.weight}{unit}</span>
                                        </div>
                                        <span className="font-black text-lg">x{pr.count}</span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="text-center py-4 text-sm text-muted-foreground font-medium">
                                {currentWeight <= barWeight
                                    ? "Target weight is less than or equal to bar weight."
                                    : "No plates required."}
                            </div>
                        )}
                    </div>

                    <div className="pt-2 border-t flex justify-between text-xs text-muted-foreground font-medium">
                        <span>Target: {currentWeight}{unit}</span>
                        <span>Est. total: {currentWeight <= barWeight ? barWeight : currentWeight}{unit}</span>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
}
