import { getWorkoutById } from "@/services/workout.service";
import WorkoutBuilderContainer from "@/components/workout/WorkoutBuilderContainer";
import { notFound } from "next/navigation";

interface EditWorkoutPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function EditWorkoutPage({ params }: EditWorkoutPageProps) {
    const { id } = await params;
    const workout = await getWorkoutById(id);

    if (!workout) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-background">
            <div className="container mx-auto py-8 px-4">
                <header className="mb-8">
                    <h1 className="text-4xl font-bold tracking-tight mb-2">Edit Template</h1>
                    <p className="text-muted-foreground text-lg">
                        Modify your existing workout routine.
                    </p>
                </header>

                <WorkoutBuilderContainer initialData={workout} />
            </div>
        </main>
    );
}
