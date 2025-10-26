import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface ParticleButtonProps {
  children: React.ReactNode;
  icon?: LucideIcon;
  onClick?: () => void;
  size?: "sm" | "lg" | "default";
  testId?: string;
  variant?: "primary" | "outline" | "ghost";
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

interface Particle {
  id: number;
  x: number;
  y: number;
  scale: number;
  opacity: number;
  angle: number;
  speed: number;
}

export default function ParticleButton({ 
  children, 
  icon: Icon, 
  onClick, 
  size = "lg", 
  testId,
  variant = "primary",
  disabled = false,
  type = "button"
}: ParticleButtonProps) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const buttonRef = useRef<HTMLDivElement>(null);

  // Magnetic effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { damping: 15, stiffness: 150 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled) return;
    
    const rect = buttonRef.current?.getBoundingClientRect();
    if (!rect) return;

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const distance = 20; // Maximum magnetic pull distance
    const magneticPull = 0.4; // Magnetic pull strength (0-1)
    
    const deltaX = (e.clientX - centerX) * magneticPull;
    const deltaY = (e.clientY - centerY) * magneticPull;
    
    x.set(Math.min(Math.max(deltaX, -distance), distance));
    y.set(Math.min(Math.max(deltaY, -distance), distance));
  };

  const resetPosition = () => {
    x.set(0);
    y.set(0);
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newParticles = Array.from({ length: 15 }, (_, i) => ({
      id: Date.now() + i,
      x,
      y,
      scale: Math.random() * 0.5 + 0.5,
      opacity: Math.random() * 0.5 + 0.5,
      angle: (Math.random() * 360) * (Math.PI / 180),
      speed: Math.random() * 2 + 1
    }));

    setParticles(prev => [...prev, ...newParticles]);

    setTimeout(() => {
      setParticles(prev => prev.filter(p => !newParticles.find(np => np.id === p.id)));
    }, 1000);

    onClick?.();
  };

  const buttonClassNames = {
    primary: "bg-gradient-primary hover:shadow-[0_0_30px_rgba(239,68,68,0.5)]",
    outline: "border border-primary/50 hover:border-primary/100 bg-transparent hover:shadow-[0_0_20px_rgba(239,68,68,0.3)]",
    ghost: "bg-transparent hover:bg-primary/10"
  };

  return (
    <motion.div 
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetPosition}
      style={{ x: springX, y: springY }}
      className="relative inline-block"
    >
      <Button
        type={type}
        size={size}
        onClick={handleClick}
        disabled={disabled}
        className={`group relative overflow-hidden transition-all duration-300 ${buttonClassNames[variant]} ${
          disabled ? 'opacity-50 cursor-not-allowed hover:shadow-none' : ''
        }`}
        data-testid={testId}
      >
        {Icon && (
          <Icon className={`w-5 h-5 mr-2 transition-transform group-hover:scale-110 ${
            variant === "primary" ? "group-hover:text-white" : "group-hover:text-primary"
          }`} />
        )}
        {children}

        {/* Glow effect */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-glow transition-opacity duration-300" />
        </div>
      </Button>

      {/* Particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-2 h-2 rounded-full pointer-events-none"
          initial={{
            x: particle.x,
            y: particle.y,
            scale: 0,
            opacity: 1,
          }}
          animate={{
            x: particle.x + Math.cos(particle.angle) * 100 * particle.speed,
            y: particle.y + Math.sin(particle.angle) * 100 * particle.speed,
            scale: particle.scale,
            opacity: 0,
          }}
          transition={{
            duration: 1,
            ease: "easeOut",
          }}
          style={{
            background: variant === "primary" 
              ? "linear-gradient(135deg, #FF4444, #CC0000)"
              : "linear-gradient(135deg, rgba(255,68,68,0.5), rgba(204,0,0,0.5))"
          }}
        />
      ))}
    </motion.div>
  );
}
