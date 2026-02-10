"use client";

import { Program } from "@/types";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LayoutList, Trash2, CheckCircle2, PlayCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import { enrollInProgram, deleteProgram } from "@/services/program.service";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface ProgramCardProps {
    program: Program;
    onDelete?: (id: string) => void;
}

export default function ProgramCard({ program, onDelete }: ProgramCardProps) {
    const router = useRouter();
    const [isEnrolling, setIsEnrolling] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const dayCount = program.days?.length || 0;

    const handleEnroll = async () => {
        setIsEnrolling(true);
        try {
            await enrollInProgram(program.userId, program.id);
        } catch (error) {
            console.error("Failed to enroll in program:", error);
        } finally {
            setIsEnrolling(false);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm(`Are you sure you want to delete "${program.name}"?`)) {
            return;
        }

        setIsDeleting(true);
        try {
            await deleteProgram(program.id);
            onDelete?.(program.id);
        } catch (error) {
            console.error("Failed to delete program:", error);
            alert("Failed to delete program. Please try again.");
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <Card className={`overflow-hidden border-2 transition-all duration-300 hover:shadow-xl bg-gradient-to-br ${
            program.isActive 
                ? "border-primary shadow-lg shadow-primary/10 from-primary/5 to-card" 
                : "hover:border-primary/50 from-card to-card/50"
        }`}>
            <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                    <CardTitle className="text-2xl font-bold text-primary truncate leading-tight">
                        {program.name}
                    </CardTitle>
                    {program.isActive && (
                        <Badge className="bg-primary text-white shrink-0">
                            Active
                        </Badge>
                    )}
                </div>
            </CardHeader>
            <CardContent className="pb-4">
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4 h-10">
                    {program.description || "No description provided."}
                </p>
                <div className="flex items-center text-sm text-muted-foreground gap-4">
                    <div className="flex items-center gap-1.5">
                        <LayoutList className="w-4 h-4 text-primary/70" />
                        <span>{dayCount} {dayCount === 1 ? 'Day' : 'Days'}</span>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="pt-2 gap-2">
                {!program.isActive ? (
                    <Button 
                        className="flex-1 gap-2 shadow-md hover:shadow-primary/20"
                        onClick={handleEnroll}
                        disabled={isEnrolling}
                    >
                        <PlayCircle className="w-4 h-4" />
                        Set Active
                    </Button>
                ) : (
                    <Button variant="secondary" className="flex-1 gap-2 cursor-default bg-primary/10 text-primary border-primary/20 hover:bg-primary/10">
                        <CheckCircle2 className="w-4 h-4" />
                        Current Program
                    </Button>
                )}
                <Button
                    variant="outline"
                    size="icon"
                    className="shrink-0 border-2 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30 transition-colors"
                    onClick={handleDelete}
                    disabled={isDeleting}
                >
                    {isDeleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                </Button>
            </CardFooter>
        </Card>
    );
}
