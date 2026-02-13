import { getWorkoutById } from "@/services/workout.service";
import { getLatestLogsForExercises } from "@/services/logging.service";
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

    const exerciseIds = template.exercises?.map(we => we.exerciseId) || [];
    // Since we don't have auth yet, use a placeholder userId or infer from template
    const userId = template.userId;
    const historyData = await getLatestLogsForExercises(userId, exerciseIds);

    return (
        <main className="min-h-screen bg-background">
            <WorkoutPlayerContainer
                template={template}
                programDayId={programDayId}
                historyData={historyData}
            />
        </main>
    );
}
