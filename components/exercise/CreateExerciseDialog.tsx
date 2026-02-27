"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, X, Loader2, Save } from "lucide-react";
import { Exercise } from "@/types";
import { createCustomExercise, updateExercise, getPotentialParents } from "@/services/exercise.service";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { MUSCLE_GROUPS, CATEGORIES } from "@/lib/constants/exercises";

interface CreateExerciseDialogProps {
    onExerciseCreated?: (exercise: Exercise) => void;
    onExerciseUpdated?: (exercise: Exercise) => void;
    exercise?: Exercise;
    trigger?: React.ReactNode;
}

export default function CreateExerciseDialog({
    onExerciseCreated,
    onExerciseUpdated,
    exercise,
    trigger
}: CreateExerciseDialogProps) {
    const isEditing = !!exercise;
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [parents, setParents] = useState<Exercise[]>([]);
    const [formData, setFormData] = useState({
        name: exercise?.name || "",
        category: exercise?.category || CATEGORIES[0],
        muscleGroup: exercise?.muscleGroup || MUSCLE_GROUPS[0],
        equipment: exercise?.equipment || "",
        parentId: exercise?.parentId || "",
    });

    const hasChildren = (exercise?.variations?.length || 0) > 0;

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (isOpen) {
            getPotentialParents().then(setParents);
        }
    }, [isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            // Mock userId for now as we don't have auth yet
            const userId = "user_123";

            const payload = {
                ...formData,
                parentId: formData.parentId === "" ? null : formData.parentId,
            };

            if (isEditing && exercise) {
                const updated = await updateExercise(exercise.id, userId, payload);
                onExerciseUpdated?.(updated as any);
            } else {
                const created = await createCustomExercise({
                    ...payload,
                    userId,
                });
                onExerciseCreated?.(created as any);
            }

            setIsOpen(false);
            if (!isEditing) {
                setFormData({
                    name: "",
                    category: CATEGORIES[0],
                    muscleGroup: MUSCLE_GROUPS[0],
                    equipment: "",
                    parentId: "",
                });
            }
        } catch (error) {
            console.error(`Failed to ${isEditing ? 'update' : 'create'} exercise:`, error);
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) {
        return trigger ? (
            <div onClick={() => setIsOpen(true)}>{trigger}</div>
        ) : (
            <Button onClick={() => setIsOpen(true)} className="w-full sm:w-auto gap-2 shadow-lg shadow-primary/20 bg-primary hover:bg-primary/90">
                <Plus className="w-4 h-4" />
                Add Exercise
            </Button>
        );
    }

    const modalContent = (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="w-full max-w-md bg-card border-2 rounded-2xl shadow-2xl animate-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between p-6 border-b">
                    <h2 className="text-xl font-bold">{isEditing ? 'Edit Exercise' : 'New Exercise'}</h2>
                    <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="rounded-full">
                        <X className="w-4 h-4" />
                    </Button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {isEditing && (
                        <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg text-xs font-medium text-amber-600 dark:text-amber-400">
                            Warning: Changes will reflect in all past workouts.
                        </div>
                    )}
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
                                {MUSCLE_GROUPS.map(group => (
                                    <option key={group} value={group}>{group}</option>
                                ))}
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Category</label>
                            <select
                                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            >
                                {CATEGORIES.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
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

                    <div className="space-y-2">
                        <label className="text-sm font-medium flex justify-between items-center">
                            Parent Exercise (Optional)
                            {hasChildren && (
                                <span className="text-[10px] uppercase font-black text-amber-500 tracking-tighter">Disabled: Has Variations</span>
                            )}
                        </label>
                        <select
                            disabled={hasChildren}
                            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:opacity-50 disabled:cursor-not-allowed"
                            value={formData.parentId}
                            onChange={(e) => setFormData({ ...formData, parentId: e.target.value })}
                        >
                            <option value="">None (Top Level)</option>
                            {parents
                                .filter(p => p.id !== exercise?.id) // Prevent circular reference
                                .map(p => (
                                    <option key={p.id} value={p.id}>{p.name}</option>
                                ))
                            }
                        </select>
                    </div>

                    <div className="pt-4 flex gap-3">
                        <Button type="button" variant="outline" className="flex-1" onClick={() => setIsOpen(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" className="flex-1 gap-2" disabled={isLoading}>
                            {isLoading ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : isEditing ? (
                                <Save className="w-4 h-4" />
                            ) : (
                                <Plus className="w-4 h-4" />
                            )}
                            {isEditing ? 'Save' : 'Create'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );

    return mounted ? createPortal(modalContent, document.body) : null;
}
