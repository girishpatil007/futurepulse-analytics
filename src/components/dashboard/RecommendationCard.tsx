import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { AlertCircle } from "lucide-react";

interface Recommendation {
  type: "warning" | "info" | "success";
  message: string;
}

interface RecommendationCardProps extends React.HTMLAttributes<HTMLDivElement> {
  recommendations: Recommendation[];
}

export function RecommendationCard({ recommendations, className, ...props }: RecommendationCardProps) {
  return (
    <Card className={cn("glass-panel p-6 animate-fade-up", className)} {...props}>
      <div className="flex items-center gap-2 mb-4">
        <AlertCircle className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">AI Recommendations</h3>
      </div>
      <div className="space-y-4">
        {recommendations.map((rec, index) => (
          <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50">
            <Badge variant={rec.type === "warning" ? "destructive" : rec.type === "success" ? "default" : "secondary"}>
              {rec.type}
            </Badge>
            <p className="text-sm text-muted-foreground">{rec.message}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}