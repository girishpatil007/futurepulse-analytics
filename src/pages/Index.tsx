import { useEffect, useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Package2, TrendingUp, AlertTriangle, BarChart3, Brain, Send, X } from "lucide-react";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { ChartCard } from "@/components/dashboard/ChartCard";
import { RecommendationCard } from "@/components/dashboard/RecommendationCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

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

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function Index() {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;

    try {
      setIsLoading(true);
      const userMessage = { role: "user", content: input };
      setMessages((prev) => [...prev, userMessage]);
      setInput("");

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      if (!response.ok) throw new Error("Failed to get response");

      const data = await response.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.response }]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get response from AI",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

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

      <div className="fixed bottom-4 right-4 z-50">
        {isOpen ? (
          <div className="w-96 h-[600px] glass-panel rounded-lg flex flex-col overflow-hidden animate-fade-up">
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Brain className="w-6 h-6 text-primary" />
                <span className="font-semibold">Future Pulse AI</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/10"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={cn(
                    "max-w-[80%] rounded-lg p-3",
                    message.role === "user"
                      ? "bg-primary/20 ml-auto"
                      : "bg-secondary mr-auto"
                  )}
                >
                  {message.content}
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-white/10">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex gap-2"
              >
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1"
                  disabled={isLoading}
                />
                <Button type="submit" disabled={isLoading}>
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </div>
          </div>
        ) : (
          <Button
            onClick={() => setIsOpen(true)}
            className="rounded-full w-14 h-14 animate-fade-up"
          >
            <Brain className="w-6 h-6" />
          </Button>
        )}
      </div>
    </div>
  );
}
