import { getDashboardStats, getMuscleFatigueData } from "@/services/stats.service";
import { getActiveProgram, getProgramProgress } from "@/services/program.service";
import DashboardStatCard from "@/components/dashboard/DashboardStatCard";
import ActiveProgramCard from "@/components/dashboard/ActiveProgramCard";
import ConsistencyChart from "@/components/dashboard/ConsistencyChart";
import RecentPRList from "@/components/dashboard/RecentPRList";
import QuickActions from "@/components/dashboard/QuickActions";
import FatigueHeatmap from "@/components/dashboard/FatigueHeatmap";
import { Dumbbell, Flame, TrendingUp } from "lucide-react";

export default async function DashboardPage() {
  const userId = "user_123"; // Mock
  const stats = await getDashboardStats(userId);
  const activeProgram = await getActiveProgram(userId);
  const programProgress = activeProgram ? await getProgramProgress(activeProgram.id) : null;
  const fatigueData = await getMuscleFatigueData(userId);

  return (
    <main className="min-h-screen bg-background text-foreground pb-20">
      {/* Hero Header */}
      <section className="bg-primary/10 border-b border-primary/20 pt-12 pb-8 px-4 sm:px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col gap-2 mb-8">
            <h1 className="text-4xl font-black tracking-tight">Welcome back, Kian!</h1>
            <p className="text-muted-foreground font-medium italic">"The only bad workout is the one that didn't happen."</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <DashboardStatCard
              title="Weekly Volume"
              value={stats.weeklyVolume.toLocaleString()}
              unit="kg"
              icon={<TrendingUp className="w-12 h-12" />}
              description="Total weight moved this week"
              trend={{ value: "12%", positive: true }}
              color="primary"
            />
            <DashboardStatCard
              title="Sessions"
              value={stats.weeklySessions}
              unit="Done"
              icon={<Dumbbell className="w-12 h-12" />}
              description="Workouts in last 7 days"
              color="blue"
            />
            <DashboardStatCard
              title="Strength Score"
              value={stats.strengthScore}
              unit="Pts"
              icon={<Flame className="w-12 h-12" />}
              description="Sum of core lift 1RMs"
              color="amber"
            />
          </div>
        </div>
      </section>

      {/* Content Body */}
      <div className="container mx-auto max-w-5xl px-4 sm:px-6 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Progress & PRs */}
        <div className="lg:col-span-8 space-y-12">
          {activeProgram && programProgress && (
            <ActiveProgramCard
              program={activeProgram}
              progress={programProgress}
            />
          )}

          <ConsistencyChart days={stats.activityDays} />

          <FatigueHeatmap data={fatigueData} />

          <div className="space-y-6">
            <h3 className="font-black text-2xl px-1">Quick Start</h3>
            <QuickActions />
          </div>
        </div>

        {/* Right Column: Hall of Fame */}
        <div className="lg:col-span-4">
          <RecentPRList records={stats.recentPRs} />

          <div className="mt-10 p-6 bg-primary/5 rounded-[32px] border-2 border-primary/10 relative overflow-hidden group">
            <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:rotate-12 transition-transform duration-700">
              <Dumbbell className="w-32 h-32 text-primary" />
            </div>
            <h4 className="font-bold text-lg mb-2">Coach's Tip</h4>
            <p className="text-sm text-muted-foreground leading-relaxed font-medium">
              Focus on **progressive overload**. Try to add 2.5kg or 1-2 reps to your main lifts every week!
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
