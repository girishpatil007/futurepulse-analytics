import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatsCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  value: string;
  description?: string;
  icon?: React.ReactNode;
}

export function StatsCard({ title, value, description, icon, className, ...props }: StatsCardProps) {
  return (
    <Card className={cn("glass-panel p-6 animate-fade-up", className)} {...props}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h3 className="text-2xl font-semibold mt-2">{value}</h3>
          {description && (
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          )}
        </div>
        {icon && <div className="text-primary">{icon}</div>}
      </div>
    </Card>
  );
}