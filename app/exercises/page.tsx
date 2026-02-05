import { getExercises } from "@/services/exercise.service";
import ExerciseLibraryContainer from "@/components/exercise/ExerciseLibraryContainer";

export default async function ExercisesPage() {
    const exercises = await getExercises();

    return (
        <main className="min-h-screen bg-background">
            <div className="container mx-auto py-8 px-4">
                <header className="mb-8">
                    <h1 className="text-4xl font-bold tracking-tight mb-2">Exercise Library</h1>
                    <p className="text-muted-foreground">
                        Browse our comprehensive library of exercises or create your own custom ones.
                    </p>
                </header>

                <ExerciseLibraryContainer initialExercises={exercises} />
            </div>
        </main>
    );
}
