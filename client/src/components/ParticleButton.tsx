import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface ParticleButtonProps {
  children: React.ReactNode;
  icon?: LucideIcon;
  onClick?: () => void;
  size?: "sm" | "lg" | "default";
  testId?: string;
}

export default function ParticleButton({ children, icon: Icon, onClick, size = "lg", testId }: ParticleButtonProps) {
  const [particles, setParticles] = useState<{ id: number; x: number; y: number }[]>([]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newParticles = Array.from({ length: 12 }, (_, i) => ({
      id: Date.now() + i,
      x,
      y,
    }));

    setParticles(prev => [...prev, ...newParticles]);

    setTimeout(() => {
      setParticles(prev => prev.filter(p => !newParticles.find(np => np.id === p.id)));
    }, 1000);

    onClick?.();
  };

  return (
    <div className="relative inline-block">
      <Button
        size={size}
        onClick={handleClick}
        className="group relative overflow-hidden bg-gradient-to-r from-primary to-chart-2 hover:shadow-[0_0_30px_rgba(239,68,68,0.5)] transition-all duration-300"
        data-testid={testId}
      >
        {Icon && <Icon className="w-5 h-5 mr-2 group-hover:animate-glow-pulse" />}
        {children}
      </Button>

      {particles.map((particle, index) => {
        const angle = (index * 30) * (Math.PI / 180);
        const distance = 80;
        return (
          <div
            key={particle.id}
            className="absolute w-2 h-2 rounded-full bg-primary pointer-events-none animate-fade-out"
            style={{
              left: particle.x,
              top: particle.y,
              animation: `fade-out 1s ease-out forwards`,
              animationDelay: `${index * 0.02}s`,
              transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0)`,
              transition: `transform 1s ease-out ${index * 0.02}s, opacity 1s ease-out ${index * 0.02}s`,
            }}
          />
        );
      })}
    </div>
  );
}
