import { getVolumeTrends, getMuscleDistribution, getDashboardStats, getCoreFamiliesTrends } from "@/services/stats.service";
import AreaChart from "@/components/charts/AreaChart";
import DistributionBar from "@/components/charts/DistributionBar";
import PRHistoryTable from "@/components/charts/PRHistoryTable";
import FamilyAnalyticsSection from "@/components/charts/FamilyAnalyticsSection";
import { TrendingUp, PieChart, Info, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function AnalyticsPage() {
    const userId = "user_123"; // Mock
    const volumeTrends = await getVolumeTrends(userId, 8); // 8 week lookback for cleaner view
    const muscleDistribution = await getMuscleDistribution(userId);
    const { recentPRs } = await getDashboardStats(userId);
    const familyTrends = await getCoreFamiliesTrends(userId);

    return (
        <main className="min-h-screen bg-background pb-20">
            {/* Header */}
            <div className="bg-primary/5 border-b border-primary/10 pt-16 pb-12 px-4 sm:px-6">
                <div className="container mx-auto max-w-5xl">
                    <Link href="/">
                        <Button variant="ghost" className="mb-6 -ml-2 text-muted-foreground hover:text-primary gap-2 font-bold uppercase tracking-widest text-[10px]">
                            <ArrowLeft className="w-4 h-4" />
                            Back to Dashboard
                        </Button>
                    </Link>
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                            <h1 className="text-5xl font-black tracking-tighter mb-2">Analytics Hub</h1>
                            <p className="text-muted-foreground font-medium italic">"Data is the foundation of progressive overload."</p>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-2xl border border-primary/20">
                            <Info className="w-4 h-4 text-primary" />
                            <span className="text-xs font-black text-primary uppercase tracking-widest">Live Optimization</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto max-w-5xl px-4 sm:px-6 mt-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

                    {/* Left Column: Trends */}
                    <div className="lg:col-span-8 space-y-10">
                        <section className="bg-card/40 border-2 rounded-[40px] p-8 backdrop-blur-sm relative overflow-hidden group">
                            <div className="absolute -right-12 -top-12 opacity-[0.03] group-hover:scale-110 transition-transform duration-1000">
                                <TrendingUp className="w-64 h-64" />
                            </div>

                            <div className="flex items-center gap-3 mb-10">
                                <div className="w-10 h-10 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                                    <TrendingUp className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-black text-2xl tracking-tight">Volume Trends</h3>
                                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest">Weekly Load Accumulation (KG)</p>
                                </div>
                            </div>

                            <div className="h-[300px] w-full mt-4">
                                <AreaChart data={volumeTrends} />
                            </div>
                        </section>

                        <PRHistoryTable records={recentPRs} />

                        <FamilyAnalyticsSection familyTrends={familyTrends} />
                    </div>

                    {/* Right Column: Muscle Proportions */}
                    <div className="lg:col-span-4 space-y-10">
                        <section className="bg-card/40 border-2 rounded-[40px] p-8 backdrop-blur-sm">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-10 h-10 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-500">
                                    <PieChart className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-black text-xl tracking-tight">Focus Balance</h3>
                                    <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">Muscle Group Targetting</p>
                                </div>
                            </div>

                            <DistributionBar data={muscleDistribution} />

                            <div className="mt-8 p-6 bg-blue-500/5 rounded-3xl border border-blue-500/10">
                                <p className="text-xs text-muted-foreground leading-relaxed font-medium">
                                    Ensure you're maintaining a **balanced profile** to prevent muscle imbalances and improve overall strength scores.
                                </p>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </main>
    );
}
