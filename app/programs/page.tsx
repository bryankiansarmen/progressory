import { getPrograms } from "@/services/program.service";
import ProgramCard from "@/components/program/ProgramCard";
import { Button } from "@/components/ui/button";
import { Plus, LayoutList } from "lucide-react";
import Link from "next/link";

export default async function ProgramsPage() {
    // Mock userId
    const programs = await getPrograms("user_123");

    return (
        <main className="min-h-screen bg-background">
            <div className="container mx-auto py-8 px-4">
                <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-4xl font-bold tracking-tight mb-2 text-primary">Programs</h1>
                        <p className="text-muted-foreground text-lg">
                            Structured training cycles and multi-week plans.
                        </p>
                    </div>
                    <Link href="/programs/new">
                        <Button className="gap-2 shadow-lg shadow-primary/20">
                            <Plus className="w-4 h-4" />
                            New Program
                        </Button>
                    </Link>
                </header>

                {programs.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {programs.map((program) => (
                            <ProgramCard key={program.id} program={program} />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed rounded-3xl bg-card/30">
                        <div className="p-4 bg-primary/10 rounded-full mb-4">
                            <LayoutList className="w-8 h-8 text-primary" />
                        </div>
                        <h3 className="text-2xl font-bold mb-2">No programs yet</h3>
                        <p className="text-muted-foreground text-center max-w-sm mb-8">
                            Organize your workout routines into structured training blocks to achieve your long-term goals.
                        </p>
                        <Link href="/programs/new">
                            <Button size="lg" className="rounded-full px-8">
                                Create Program
                            </Button>
                        </Link>
                    </div>
                )}
            </div>
        </main>
    );
}
