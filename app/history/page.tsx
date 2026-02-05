import { History, TrendingUp, Calendar } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function HistoryPage() {
    return (
        <main className="min-h-screen bg-background">
            <div className="container mx-auto py-8 px-4">
                <header className="mb-12">
                    <h1 className="text-4xl font-black tracking-tighter text-primary mb-2">Training History</h1>
                    <p className="text-muted-foreground text-lg font-medium italic">Look back to see how far you've come.</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <Card className="p-6 border-2 bg-primary/5 border-primary/10">
                        <Calendar className="w-8 h-8 text-primary mb-4" />
                        <h3 className="font-bold text-lg">Coming Soon</h3>
                        <p className="text-sm text-muted-foreground">Monthly calendar view of your sessions.</p>
                    </Card>
                    <Card className="p-6 border-2 bg-blue-500/5 border-blue-500/10">
                        <TrendingUp className="w-8 h-8 text-blue-500 mb-4" />
                        <h3 className="font-bold text-lg">Volume Trends</h3>
                        <p className="text-sm text-muted-foreground">Interactive charts for long-term progress.</p>
                    </Card>
                    <Card className="p-6 border-2 bg-amber-500/5 border-amber-500/10">
                        <History className="w-8 h-8 text-amber-500 mb-4" />
                        <h3 className="font-bold text-lg">Log Archive</h3>
                        <p className="text-sm text-muted-foreground">Search and filter every set you've ever done.</p>
                    </Card>
                </div>

                <div className="flex flex-col items-center justify-center py-20 bg-card/40 border-2 border-dashed rounded-[40px] text-center px-6">
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                        <History className="w-10 h-10 text-primary opacity-40" />
                    </div>
                    <h2 className="text-2xl font-black tracking-tight mb-2">Build Your Legacy</h2>
                    <p className="text-muted-foreground max-w-sm font-medium">
                        Your training data will be visualized here as you complete more sessions in the player.
                    </p>
                </div>
            </div>
        </main>
    );
}
