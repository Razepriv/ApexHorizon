import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  value: string;
  label: string;
  icon: LucideIcon;
  delay?: string;
}

export default function MetricCard({ value, label, icon: Icon, delay = "0s" }: MetricCardProps) {
  return (
    <div 
      className="relative group animate-float backdrop-blur-xl bg-card/20 border border-primary/20 rounded-md p-6 hover-elevate transition-all duration-300"
      style={{ animationDelay: delay }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-chart-2/10 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative">
        <Icon className="w-8 h-8 text-primary mb-3" />
        <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent mb-2">
          {value}
        </div>
        <div className="text-sm text-muted-foreground">{label}</div>
      </div>
      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/50 to-chart-2/50 rounded-md opacity-0 group-hover:opacity-20 blur transition-opacity duration-300" />
    </div>
  );
}
