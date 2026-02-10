"use client";

import { Workout } from "@/types";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dumbbell, PlayCircle, Trash2, Pencil } from "lucide-react";
import Link from "next/link";

interface WorkoutCardProps {
    workout: Workout;
    onDelete?: (id: string) => void;
}

export default function WorkoutCard({ workout, onDelete }: WorkoutCardProps) {
    const exerciseCount = workout.exercises?.length || 0;

    return (
        <Card className="overflow-hidden border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-xl bg-gradient-to-br from-card to-card/50">
            <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                    <CardTitle className="text-2xl font-bold text-primary truncate leading-tight">
                        {workout.name}
                    </CardTitle>
                    <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 shrink-0">
                        {exerciseCount} {exerciseCount === 1 ? 'Ex' : 'Exs'}
                    </Badge>
                </div>
            </CardHeader>
            <CardContent className="pb-4">
                <div className="flex items-center text-sm text-muted-foreground gap-4 mt-2">
                    <div className="flex items-center gap-1.5">
                        <Dumbbell className="w-4 h-4 text-primary/70" />
                        <span>Library Routine</span>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="pt-2 gap-2">
                <Link href={`/workouts/active?workoutId=${workout.id}`} className="flex-1">
                    <Button className="w-full gap-2 shadow-md hover:shadow-primary/20">
                        <PlayCircle className="w-4 h-4" />
                        Start
                    </Button>
                </Link>
                <Link href={`/workouts/${workout.id}/edit`}>
                    <Button variant="outline" size="icon" className="shrink-0 border-2">
                        <Pencil className="w-4 h-4" />
                    </Button>
                </Link>
                <Button
                    variant="outline"
                    size="icon"
                    className="shrink-0 border-2 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30 transition-colors"
                    onClick={() => onDelete?.(workout.id)}
                >
                    <Trash2 className="w-4 h-4" />
                </Button>
            </CardFooter>
        </Card>
    );
}
