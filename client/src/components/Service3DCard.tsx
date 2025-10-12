import { useState } from "react";
import { LucideIcon } from "lucide-react";

interface Service3DCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  stat: string;
  index: number;
}

export default function Service3DCard({ icon: Icon, title, description, stat, index }: Service3DCardProps) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateXValue = (y - centerY) / 10;
    const rotateYValue = (centerX - x) / 10;
    
    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      className="group relative h-full"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: "1000px",
      }}
    >
      <div
        className="relative overflow-hidden border-primary/20 bg-card/50 backdrop-blur-sm rounded-md p-6 h-full transition-all duration-300"
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`,
          transformStyle: "preserve-3d",
        }}
        data-testid={`card-service-3d-${index}`}
      >
        <div 
          className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-chart-2/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ transform: "translateZ(-10px)" }}
        />
        
        <div className="relative space-y-4" style={{ transform: "translateZ(30px)" }}>
          <div 
            className="w-16 h-16 rounded-md bg-gradient-to-br from-primary/30 to-chart-2/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
            style={{ transform: "translateZ(40px)" }}
          >
            <Icon className="w-8 h-8 text-primary" />
          </div>
          
          <div>
            <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">{title}</h3>
            <p className="text-sm text-muted-foreground mb-3">{description}</p>
            <div className="text-xs font-mono text-primary/80 border-l-2 border-primary/50 pl-3">
              {stat}
            </div>
          </div>
        </div>

        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/50 to-chart-2/50 rounded-md opacity-0 group-hover:opacity-40 blur-sm transition-opacity duration-300" />
      </div>
    </div>
  );
}
