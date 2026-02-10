"use client";

import { useState } from "react";
import { Workout, Exercise } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Trash2, Plus, Save, Loader2, Dumbbell, GripVertical } from "lucide-react";
import ExercisePicker from "@/components/exercise/ExercisePicker";
import { createWorkout, updateWorkout } from "@/services/workout.service";
import { useRouter } from "next/navigation";
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
    useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface SortableExerciseItemProps {
    exercise: Exercise;
    index: number;
    onRemove: (index: number) => void;
}

function SortableExerciseItem({ exercise, index, onRemove }: SortableExerciseItemProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id: `${exercise.id}-${index}` });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 50 : undefined,
    };

    return (
        <Card
            ref={setNodeRef}
            style={style}
            className={`p-4 flex items-center justify-between group hover:border-primary/30 transition-all bg-card/50 backdrop-blur-sm border-2 ${isDragging ? "opacity-50 shadow-2xl border-primary" : ""}`}
        >
            <div className="flex items-center gap-4">
                <div
                    {...attributes}
                    {...listeners}
                    className="cursor-grab active:cursor-grabbing p-1 -ml-1 text-muted-foreground hover:text-primary transition-colors"
                >
                    <GripVertical className="w-5 h-5" />
                </div>
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary group-hover:bg-primary group-hover:text-white transition-all">
                    {index + 1}
                </div>
                <div className="flex flex-col">
                    <span className="font-bold">{exercise.name}</span>
                    <span className="text-xs text-muted-foreground">{exercise.muscleGroup} • {exercise.category}</span>
                </div>
            </div>

            <Button
                variant="ghost"
                size="icon"
                className="text-destructive hover:bg-destructive/10"
                onClick={() => onRemove(index)}
            >
                <Trash2 className="w-4 h-4" />
            </Button>
        </Card>
    );
}

interface WorkoutBuilderContainerProps {
    initialData?: Workout;
}

export default function WorkoutBuilderContainer({ initialData }: WorkoutBuilderContainerProps) {
    const router = useRouter();
    const [workoutName, setWorkoutName] = useState(initialData?.name || "");
    const [selectedExercises, setSelectedExercises] = useState<Exercise[]>(
        initialData?.exercises?.map(we => we.exercise).filter((e): e is Exercise => !!e) || []
    );
    const [isPickerOpen, setIsPickerOpen] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleAddExercise = (exercise: Exercise) => {
        setSelectedExercises([...selectedExercises, exercise]);
        setIsPickerOpen(false);
    };

    const handleAddMultiple = (exercises: Exercise[]) => {
        setSelectedExercises([...selectedExercises, ...exercises]);
        setIsPickerOpen(false);
    };

    const handleRemoveExercise = (index: number) => {
        setSelectedExercises(selectedExercises.filter((_, i) => i !== index));
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            setSelectedExercises((items) => {
                const oldIndex = items.findIndex((_, idx) => `${items[idx].id}-${idx}` === active.id);
                const newIndex = items.findIndex((_, idx) => `${items[idx].id}-${idx}` === over.id);

                return arrayMove(items, oldIndex, newIndex);
            });
        }
    };

    const handleSave = async () => {
        if (!workoutName || selectedExercises.length === 0) return;

        setIsSaving(true);
        try {
            if (initialData) {
                await updateWorkout(initialData.id, {
                    name: workoutName,
                    exercises: selectedExercises.map((ex, index) => ({
                        exerciseId: ex.id,
                        order: index,
                    })),
                });
            } else {
                await createWorkout({
                    name: workoutName,
                    userId: "user_123", // Mock
                    exercises: selectedExercises.map((ex, index) => ({
                        exerciseId: ex.id,
                        order: index,
                    })),
                });
            }
            router.push("/workouts");
        } catch (error) {
            console.error("Failed to save workout:", error);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Builder Area */}
            <div className="lg:col-span-2 space-y-6">
                <Card className="p-6 border-none shadow-xl bg-gradient-to-r from-primary/5 to-transparent">
                    <div className="space-y-4">
                        <label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground ml-1">Template Name</label>
                        <Input
                            placeholder="e.g. Morning Strength Split"
                            className="text-2xl font-bold h-14 bg-transparent border-none px-1 focus-visible:ring-0 focus-visible:border-primary border-b-2 rounded-none transition-all"
                            value={workoutName}
                            onChange={(e) => setWorkoutName(e.target.value)}
                        />
                    </div>
                </Card>

                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            <Dumbbell className="w-5 h-5 text-primary" />
                            Exercises ({selectedExercises.length})
                        </h2>
                    </div>

                    {selectedExercises.length > 0 ? (
                        <DndContext
                            sensors={sensors}
                            collisionDetection={closestCenter}
                            onDragEnd={handleDragEnd}
                        >
                            <SortableContext
                                items={selectedExercises.map((ex, index) => `${ex.id}-${index}`)}
                                strategy={verticalListSortingStrategy}
                            >
                                <div className="space-y-3">
                                    {selectedExercises.map((ex, index) => (
                                        <SortableExerciseItem
                                            key={`${ex.id}-${index}`}
                                            exercise={ex}
                                            index={index}
                                            onRemove={handleRemoveExercise}
                                        />
                                    ))}
                                </div>
                            </SortableContext>
                        </DndContext>
                    ) : (
                        <div className="py-20 text-center border-4 border-dashed rounded-3xl bg-card/20">
                            <p className="text-muted-foreground italic mb-6">Your routine is empty. Time to add some gains!</p>
                            <Button variant="outline" className="rounded-full gap-2 border-2" onClick={() => setIsPickerOpen(true)}>
                                <Plus className="w-4 h-4" /> Add Exercise
                            </Button>
                        </div>
                    )}
                </div>
            </div>

            {/* Sidebar / Controls */}
            <div className="space-y-6">
                <Card className="p-6 sticky top-24 border-2 shadow-2xl bg-card">
                    <h3 className="font-bold mb-4 uppercase text-xs tracking-widest text-muted-foreground">Actions</h3>
                    <div className="space-y-3">
                        <Button className="w-full h-11 rounded-xl gap-2 shadow-lg shadow-primary/20" onClick={() => setIsPickerOpen(true)}>
                            <Plus className="w-4 h-4" />
                            Add Exercise
                        </Button>
                        <Button
                            variant="secondary"
                            className="w-full h-11 rounded-xl gap-2 font-bold bg-primary text-white hover:bg-primary/90"
                            disabled={!workoutName || selectedExercises.length === 0 || isSaving}
                            onClick={handleSave}
                        >
                            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                            Save Template
                        </Button>
                    </div>
                </Card>
            </div>

            {/* Picker Modal */}
            {isPickerOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-background/80 backdrop-blur-md animate-in fade-in duration-200">
                    <div className="w-full max-w-xl bg-card border-2 rounded-3xl shadow-2xl p-6 relative animate-in zoom-in-95 duration-200">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold">Pick an Exercise</h2>
                            <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setIsPickerOpen(false)}>
                                <Trash2 className="w-4 h-4 rotate-45" /> {/* Close icon substitute */}
                            </Button>
                        </div>
                        <ExercisePicker
                            onSelect={handleAddExercise}
                            onSelectMultiple={handleAddMultiple}
                            multiSelect={true}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}