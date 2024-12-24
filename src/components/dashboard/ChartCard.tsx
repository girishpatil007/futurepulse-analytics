import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ChartCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  children: React.ReactNode;
}

export function ChartCard({ title, children, className, ...props }: ChartCardProps) {
  return (
    <Card className={cn("glass-panel p-6 animate-fade-up", className)} {...props}>
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <div className="w-full h-[300px]">{children}</div>
    </Card>
  );
}