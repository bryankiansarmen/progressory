import { getProgramById } from "@/services/program.service";
import { getWorkouts } from "@/services/workout.service";
import ProgramBuilder from "@/components/program/ProgramBuilder";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function EditProgramPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const program = await getProgramById(id);
    const workouts = await getWorkouts("user_123"); // Mock userId

    if (!program) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-background">
            <div className="container mx-auto py-8 px-4">
                <Link 
                    href={`/programs/${id}`} 
                    className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Details
                </Link>

                <header className="mb-8">
                    <h1 className="text-4xl font-bold tracking-tight mb-2">Edit Program</h1>
                    <p className="text-muted-foreground text-lg">
                        Refine your training routine.
                    </p>
                </header>

                <ProgramBuilder workouts={workouts} initialData={program} />
            </div>
        </main>
    );
}
