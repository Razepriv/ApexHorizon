import { ReactNode } from "react";
import { Card } from "@/components/ui/card";

interface HolographicCardProps {
  children: ReactNode;
  className?: string;
}

export default function HolographicCard({ children, className = "" }: HolographicCardProps) {
  return (
    <div className={`relative group ${className}`}>
      <div className="absolute -inset-1 bg-gradient-to-r from-primary via-chart-2 to-chart-3 rounded-md opacity-30 group-hover:opacity-50 blur-sm transition-opacity duration-500" />
      
      <Card className="relative border-primary/30 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-chart-2/5" />
        
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-chart-2 to-transparent opacity-50" />
        <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-transparent via-primary to-transparent opacity-50" />
        <div className="absolute right-0 top-0 h-full w-1 bg-gradient-to-b from-transparent via-chart-2 to-transparent opacity-50" />
        
        <div className="relative">
          {children}
        </div>
      </Card>
    </div>
  );
}
