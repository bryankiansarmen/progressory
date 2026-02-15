import { getWorkoutLogDetail } from "@/services/stats.service";
import { notFound } from "next/navigation";
import { SessionDetailHeader } from "@/components/history/SessionDetailHeader";
import { ExerciseLogCard } from "@/components/history/ExerciseLogCard";

interface PageProps {
    params: {
        logId: string;
    };
}

export default async function SessionDetailPage({ params }: PageProps) {
    const { logId } = await params;
    const log = await getWorkoutLogDetail(logId);

    if (!log) {
        notFound();
    }

    // Calculate volume for the header
    let totalVolume = 0;
    log.entries.forEach(entry => {
        entry.sets.forEach(set => {
            totalVolume += set.weight * set.reps;
        });
    });

    return (
        <main className="min-h-screen bg-background pb-20">
            <div className="container mx-auto py-8 px-4 max-w-4xl">
                <SessionDetailHeader
                    workoutName={log.workout?.name ?? "Ad-hoc Workout"}
                    date={log.date}
                    totalVolume={Math.round(totalVolume)}
                    duration={log.duration}
                />

                <div className="space-y-6">
                    {log.entries.map((entry) => (
                        <ExerciseLogCard
                            key={entry.id}
                            exerciseName={entry.exercise.name}
                            sets={entry.sets.map(s => ({
                                id: s.id,
                                weight: s.weight,
                                reps: s.reps
                            }))}
                        />
                    ))}
                </div>
            </div>
        </main>
    );
}
