import { getWorkouts } from "@/services/workout.service";
import ProgramBuilder from "@/components/program/ProgramBuilder";

export default async function NewProgramPage() {
    // Mock userId
    const workouts = await getWorkouts("user_123");

    return (
        <main className="min-h-screen bg-background">
            <div className="container mx-auto py-8 px-4">
                <header className="mb-8">
                    <h1 className="text-4xl font-bold tracking-tight mb-2">New Program</h1>
                    <p className="text-muted-foreground text-lg">
                        Design a multi-day training routine.
                    </p>
                </header>

                <ProgramBuilder workouts={workouts} />
            </div>
        </main>
    );
}
