import { getProgramById, getProgramProgress } from "@/services/program.service";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlayCircle, CheckCircle2, LayoutList, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function ProgramDetailsPage({ params }: { params: { id: string } }) {
    const program = await getProgramById(params.id);

    if (!program) {
        notFound();
    }

    const progress = await getProgramProgress(program.id);

    return (
        <main className="min-h-screen bg-background">
            <div className="container mx-auto py-8 px-4">
                <Link href="/programs" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6 transition-colors">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Library
                </Link>

                <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                    <div className="space-y-2">
                        <div className="flex items-center gap-3">
                            <h1 className="text-4xl font-bold tracking-tight">{program.name}</h1>
                            {program.isActive && (
                                <Badge className="bg-primary text-white">Active</Badge>
                            )}
                        </div>
                        <p className="text-muted-foreground text-lg max-w-2xl">
                            {program.description || "No description provided."}
                        </p>
                    </div>

                    {program.isActive && (
                        <Card className="p-4 bg-primary/5 border-primary/20 flex flex-col items-center gap-1 min-w-[150px]">
                            <span className="text-sm font-semibold text-muted-foreground uppercase tracking-widest">Progress</span>
                            <span className="text-3xl font-black text-primary">{progress.percentage}%</span>
                            <span className="text-xs text-muted-foreground">{progress.completedDays} / {progress.totalDays} Days</span>
                        </Card>
                    )}
                </header>

                <div className="space-y-6">
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <LayoutList className="w-6 h-6 text-primary" />
                        Program Schedule
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {program.days?.map((day: any) => (
                            <Card key={day.id} className="p-5 border-2 hover:border-primary/30 transition-all flex items-center justify-between group">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary group-hover:bg-primary group-hover:text-white transition-all">
                                        {day.dayNumber}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg">{day.workout.name}</h3>
                                        <p className="text-xs text-muted-foreground">
                                            {day.workout.exercises?.length || 0} Exercises
                                        </p>
                                    </div>
                                </div>
                                {day.logs?.length > 0 && (
                                    <CheckCircle2 className="w-6 h-6 text-green-500" />
                                )}
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}
