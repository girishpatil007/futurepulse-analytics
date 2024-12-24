import { useEffect, useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Package2, TrendingUp, AlertTriangle, BarChart3 } from "lucide-react";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { ChartCard } from "@/components/dashboard/ChartCard";
import { RecommendationCard } from "@/components/dashboard/RecommendationCard";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { TooltipProvider } from "@/components/ui/tooltip";

const mockData = {
  timeline: Array.from({ length: 12 }, (_, i) => ({
    name: `Week ${i + 1}`,
    value: Math.floor(Math.random() * 1000) + 500,
  })),
  recommendations: [
    {
      type: "warning" as const,
      message: "Low stock alert: Product XYZ is below reorder point",
    },
    {
      type: "info" as const,
      message: "Seasonal trend detected: Consider increasing inventory for upcoming peak",
    },
    {
      type: "success" as const,
      message: "Optimal stock levels maintained for Category A products",
    },
  ],
};

export default function Index() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen p-8 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Inventory Dashboard</h1>
        <p className="text-muted-foreground">
          Monitor and predict your inventory levels with AI-powered insights
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Stock Items"
          value="2,345"
          icon={<Package2 className="h-6 w-6" />}
        />
        <StatsCard
          title="Predicted Growth"
          value="+12.3%"
          icon={<TrendingUp className="h-6 w-6" />}
        />
        <StatsCard
          title="Low Stock Alerts"
          value="5"
          icon={<AlertTriangle className="h-6 w-6" />}
        />
        <StatsCard
          title="Categories"
          value="8"
          icon={<BarChart3 className="h-6 w-6" />}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <ChartCard title="Inventory Level Timeline">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={mockData.timeline}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(167, 77%, 51%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(167, 77%, 51%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(240, 3.7%, 15.9%)" />
              <XAxis
                dataKey="name"
                stroke="hsl(240, 5%, 64.9%)"
                fontSize={12}
              />
              <YAxis
                stroke="hsl(240, 5%, 64.9%)"
                fontSize={12}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(240, 10%, 3.9%)",
                  border: "1px solid hsl(240, 3.7%, 15.9%)",
                }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="hsl(167, 77%, 51%)"
                fillOpacity={1}
                fill="url(#colorValue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
        <RecommendationCard recommendations={mockData.recommendations} />
      </div>

      <TooltipProvider>
        <ChatWidget />
      </TooltipProvider>
    </div>
  );
}