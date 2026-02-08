import { getWorkoutById } from "@/services/workout.service";
import WorkoutPlayerContainer from "@/components/workout/player/WorkoutPlayerContainer";
import { redirect } from "next/navigation";

interface ActiveWorkoutPageProps {
    searchParams: Promise<{ workoutId?: string; programDayId?: string }>;
}

export default async function ActiveWorkoutPage({ searchParams }: ActiveWorkoutPageProps) {
    const { workoutId, programDayId } = await searchParams;

    if (!workoutId) {
        redirect("/workouts");
    }

    const template = await getWorkoutById(workoutId);

    if (!template) {
        redirect("/workouts");
    }

    return (
        <main className="min-h-screen bg-background">
            <WorkoutPlayerContainer 
                template={template} 
                programDayId={programDayId} 
            />
        </main>
    );
}
