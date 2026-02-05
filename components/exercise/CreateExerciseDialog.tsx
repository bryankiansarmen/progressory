"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, X, Loader2 } from "lucide-react";
import { Exercise } from "@/types";
import { createCustomExercise } from "@/services/exercise.service";

interface CreateExerciseDialogProps {
    onExerciseCreated: (exercise: Exercise) => void;
}

export default function CreateExerciseDialog({ onExerciseCreated }: CreateExerciseDialogProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        category: "Strength",
        muscleGroup: "Chest",
        equipment: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            // Mock userId for now as we don't have auth yet
            const exercise = await createCustomExercise({
                ...formData,
                userId: "user_123",
            });
            onExerciseCreated(exercise as any);
            setIsOpen(false);
            setFormData({
                name: "",
                category: "Strength",
                muscleGroup: "Chest",
                equipment: "",
            });
        } catch (error) {
            console.error("Failed to create exercise:", error);
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) {
        return (
            <Button onClick={() => setIsOpen(true)} className="w-full sm:w-auto gap-2 shadow-lg shadow-primary/20 bg-primary hover:bg-primary/90">
                <Plus className="w-4 h-4" />
                Add Exercise
            </Button>
        );
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="w-full max-w-md bg-card border-2 rounded-2xl shadow-2xl animate-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between p-6 border-b">
                    <h2 className="text-xl font-bold">New Exercise</h2>
                    <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="rounded-full">
                        <X className="w-4 h-4" />
                    </Button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Exercise Name</label>
                        <Input
                            required
                            placeholder="e.g. Diamond Pushups"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Muscle Group</label>
                            <select
                                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                value={formData.muscleGroup}
                                onChange={(e) => setFormData({ ...formData, muscleGroup: e.target.value })}
                            >
                                <option>Chest</option>
                                <option>Legs</option>
                                <option>Back</option>
                                <option>Arms</option>
                                <option>Shoulders</option>
                                <option>Core</option>
                                <option>FullBody</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Category</label>
                            <select
                                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            >
                                <option>Strength</option>
                                <option>Cardio</option>
                                <option>Flexibility</option>
                                <option>Stretching</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Equipment (Optional)</label>
                        <Input
                            placeholder="e.g. None, Barbell, Dumbbell"
                            value={formData.equipment}
                            onChange={(e) => setFormData({ ...formData, equipment: e.target.value })}
                        />
                    </div>

                    <div className="pt-4 flex gap-3">
                        <Button type="button" variant="outline" className="flex-1" onClick={() => setIsOpen(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" className="flex-1 gap-2" disabled={isLoading}>
                            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                            Create
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
