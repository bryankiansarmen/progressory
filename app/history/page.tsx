import { History, TrendingUp, Calendar } from "lucide-react";
import { Card } from "@/components/ui/card";
import { getHistory } from "@/services/stats.service";
import { HistoryFeed } from "@/components/history/HistoryFeed";

const USER_ID = "user-1"; // Hardcoded for MVP as per project patterns

export default async function HistoryPage() {
    const logs = await getHistory(USER_ID);

    return (
        <main className="min-h-screen bg-background pb-20">
            <div className="container mx-auto py-8 px-4 max-w-4xl">
                <header className="mb-12">
                    <h1 className="text-4xl font-black tracking-tighter text-primary mb-2">Training History</h1>
                    <p className="text-muted-foreground text-lg font-medium italic">Look back to see how far you've come.</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <Card className="p-6 border-2 bg-primary/5 border-primary/10 rounded-[32px]">
                        <Calendar className="w-8 h-8 text-primary mb-4" />
                        <h3 className="font-bold text-lg">Coming Soon</h3>
                        <p className="text-sm text-muted-foreground">Monthly calendar view of your sessions.</p>
                    </Card>
                    <Card className="p-6 border-2 bg-blue-500/5 border-blue-500/10 rounded-[32px]">
                        <TrendingUp className="w-8 h-8 text-blue-500 mb-4" />
                        <h3 className="font-bold text-lg">Volume Trends</h3>
                        <p className="text-sm text-muted-foreground">Interactive charts for long-term progress.</p>
                    </Card>
                    <Card className="p-6 border-2 bg-amber-500/5 border-amber-500/10 rounded-[32px]">
                        <History className="w-8 h-8 text-amber-500 mb-4" />
                        <h3 className="font-bold text-lg">Log Archive</h3>
                        <p className="text-sm text-muted-foreground">Search and filter every set you've ever done.</p>
                    </Card>
                </div>

                <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-6">
                        <History className="w-6 h-6 text-primary" />
                        <h2 className="text-2xl font-black tracking-tight">Recent Sessions</h2>
                    </div>
                    <HistoryFeed logs={logs} />
                </div>
            </div>
        </main>
    );
}
