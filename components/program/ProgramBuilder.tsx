"use client";

import { useState } from "react";
import { Workout } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Trash2, Plus, Save, Loader2, LayoutList, GripVertical } from "lucide-react";
import { createProgram } from "@/services/program.service";
import { useRouter } from "next/navigation";

interface ProgramBuilderProps {
    workouts: Workout[];
}

export default function ProgramBuilder({ workouts }: ProgramBuilderProps) {
    const router = useRouter();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [days, setDays] = useState<{ workoutId: string; dayNumber: number }[]>([]);
    const [isSaving, setIsSaving] = useState(false);

    const handleAddDay = () => {
        if (workouts.length === 0) return;
        setDays([...days, { workoutId: workouts[0].id, dayNumber: days.length + 1 }]);
    };

    const handleRemoveDay = (index: number) => {
        const newDays = days.filter((_, i) => i !== index).map((day, i) => ({
            ...day,
            dayNumber: i + 1
        }));
        setDays(newDays);
    };

    const handleUpdateDay = (index: number, workoutId: string) => {
        const newDays = [...days];
        newDays[index].workoutId = workoutId;
        setDays(newDays);
    };

    const handleSave = async () => {
        if (!name || days.length === 0) return;

        setIsSaving(true);
        try {
            await createProgram({
                name,
                description,
                userId: "user_123", // Mock
                days: days
            });
            router.push("/programs");
            router.refresh();
        } catch (error) {
            console.error("Failed to save program:", error);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
                <Card className="p-6 border-none shadow-xl bg-gradient-to-r from-primary/5 to-transparent space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground ml-1">Program Name</label>
                        <Input
                            placeholder="e.g. 12-Week Strength Phase"
                            className="text-2xl font-bold h-14 bg-transparent border-none px-1 focus-visible:ring-0 focus-visible:border-primary border-b-2 rounded-none transition-all"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground ml-1">Description</label>
                        <Textarea
                            placeholder="What is the goal of this program?"
                            className="bg-card/50 border-2 focus-visible:ring-primary"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                </Card>

                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            <LayoutList className="w-5 h-5 text-primary" />
                            Schedule ({days.length} Days)
                        </h2>
                        <Button variant="outline" size="sm" className="rounded-full gap-2" onClick={handleAddDay}>
                            <Plus className="w-4 h-4" /> Add Day
                        </Button>
                    </div>

                    {days.length > 0 ? (
                        <div className="space-y-3">
                            {days.map((day, index) => (
                                <Card key={index} className="p-4 flex items-center gap-4 group hover:border-primary/30 transition-all bg-card/50 backdrop-blur-sm border-2">
                                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary shrink-0">
                                        {day.dayNumber}
                                    </div>
                                    
                                    <div className="flex-1">
                                        <select 
                                            className="w-full bg-transparent font-bold focus:outline-none cursor-pointer"
                                            value={day.workoutId}
                                            onChange={(e) => handleUpdateDay(index, e.target.value)}
                                        >
                                            {workouts.map(w => (
                                                <option key={w.id} value={w.id}>{w.name}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10" onClick={() => handleRemoveDay(index)}>
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <div className="py-20 text-center border-4 border-dashed rounded-3xl bg-card/20">
                            <p className="text-muted-foreground italic mb-6">No days scheduled yet.</p>
                            <Button variant="outline" className="rounded-full gap-2 border-2" onClick={handleAddDay}>
                                <Plus className="w-4 h-4" /> Add First Day
                            </Button>
                        </div>
                    )}
                </div>
            </div>

            <div className="space-y-6">
                <Card className="p-6 sticky top-24 border-2 shadow-2xl bg-card">
                    <h3 className="font-bold mb-4 uppercase text-xs tracking-widest text-muted-foreground">Actions</h3>
                    <div className="space-y-3">
                        <Button 
                            className="w-full h-11 rounded-xl gap-2 font-bold bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20"
                            disabled={!name || days.length === 0 || isSaving}
                            onClick={handleSave}
                        >
                            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                            Save Program
                        </Button>
                    </div>
                </Card>
            </div>
        </div>
    );
}
