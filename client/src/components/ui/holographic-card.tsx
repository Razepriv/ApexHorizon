import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface HolographicCardProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  borderGlow?: boolean;
  glareEffect?: boolean;
}

export default function HolographicCard({ 
  children,
  className = '',
  intensity = 20,
  borderGlow = true,
  glareEffect = true,
}: HolographicCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for tracking mouse position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring animation for rotation
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [intensity, -intensity]), {
    damping: 20,
    stiffness: 200,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-intensity, intensity]), {
    damping: 20,
    stiffness: 200,
  });

  // Glare effect
  const glareX = useSpring(useTransform(mouseX, [-1, 1], ['150%', '-50%']), {
    stiffness: 200,
    damping: 20,
  });
  const glareY = useSpring(useTransform(mouseY, [-1, 1], ['150%', '-50%']), {
    stiffness: 200,
    damping: 20,
  });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate normalized mouse position (-1 to 1)
    const x = (e.clientX - centerX) / (rect.width / 2);
    const y = (e.clientY - centerY) / (rect.height / 2);
    
    mouseX.set(x);
    mouseY.set(y);
  }

  return (
    <motion.div
      ref={cardRef}
      className={`relative ${borderGlow ? 'p-[1px] rounded-xl' : ''} ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        mouseX.set(0);
        mouseY.set(0);
      }}
      style={{
        perspective: '1200px',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Gradient border */}
      {borderGlow && (
        <div 
          className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/40 via-tech/20 to-secondary/40"
          style={{
            opacity: isHovered ? 1 : 0.5,
            transition: 'opacity 0.3s',
          }}
        />
      )}

      {/* Card content with 3D rotation */}
      <motion.div
        className="relative h-full w-full rounded-xl overflow-hidden glassmorphism"
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Glare effect */}
        {glareEffect && (
          <motion.div 
            className="pointer-events-none absolute inset-0 w-full h-full"
            style={{
              background: 'radial-gradient(circle at center, rgba(255,255,255,0.15) 0%, transparent 80%)',
              x: glareX,
              y: glareY,
              opacity: isHovered ? 1 : 0,
              transition: 'opacity 0.3s',
            }}
          />
        )}

        {/* Main content */}
        <div className="relative h-full w-full">
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
}