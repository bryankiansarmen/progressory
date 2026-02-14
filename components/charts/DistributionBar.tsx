"use client";

interface MuscleData {
    muscleGroup: string;
    setCount: number;
    percentage: number;
}

interface DistributionBarProps {
    data: MuscleData[];
}

export default function DistributionBar({ data }: DistributionBarProps) {
    return (
        <div className="space-y-6">
            {data.map((item) => (
                <div key={item.muscleGroup} className="space-y-2">
                    <div className="flex justify-between items-end">
                        <span className="text-sm font-black tracking-tight">{item.muscleGroup}</span>
                        <div className="text-right">
                            <span className="text-sm font-black text-primary">{item.percentage}%</span>
                            <span className="text-[10px] font-bold text-muted-foreground ml-2 uppercase tracking-widest">
                                {item.setCount} Sets
                            </span>
                        </div>
                    </div>

                    <div className="h-3 w-full bg-muted/30 rounded-full overflow-hidden border border-muted-foreground/5 p-[1.5px]">
                        <div
                            className="h-full bg-primary rounded-full transition-all duration-1000 ease-out shadow-[0_0_12px_rgba(var(--color-primary-rgb),0.2)]"
                            style={{ width: `${item.percentage}%` }}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}
