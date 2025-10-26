import { useState, useEffect } from "react";
import { LucideIcon } from "lucide-react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import HolographicCard from "@/components/ui/holographic-card";

interface MetricCardProps {
  value: string;
  label: string;
  icon: LucideIcon;
  delay?: number;
  trend?: number;
  suffix?: string;
}

export default function MetricCard({
  value,
  label,
  icon: Icon,
  delay = 0,
  trend = 0,
  suffix = "",
}: MetricCardProps) {
  // Initialize the hover state for animations
  const [isHovered, setIsHovered] = useState(false);

  // Gradient positioning
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ clientX, clientY, currentTarget }: React.MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    mouseX.set((clientX - left) / width);
    mouseY.set((clientY - top) / height);
  }

  // Create a radial gradient that follows the mouse
  const background = useMotionTemplate`radial-gradient(
    circle at ${mouseX}% ${mouseY}%,
    rgba(255, 68, 68, 0.15) 0%,
    transparent 70%
  )`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <HolographicCard
        intensity={10}
        borderGlow
        glareEffect
        className="overflow-hidden"
      >
        <motion.div
          className="relative h-full glassmorphism p-6"
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Mouse follow gradient */}
          <motion.div
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300"
            style={{
              background,
              opacity: isHovered ? 1 : 0,
            }}
          />

          <div className="relative">
            {/* Icon with glow */}
            <div className="relative inline-block">
              <Icon className="w-8 h-8 text-primary animate-glow-pulse" />
              <motion.div
                className="absolute inset-0 bg-primary/20 blur-xl"
                animate={{
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>

            {/* Value counter */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: delay + 0.3 }}
              className="mt-4"
            >
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-4xl md:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent"
              >
                <motion.span
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: delay + 0.3,
                    ease: "easeOut",
                  }}
                >
                  {value}
                </motion.span>
                {suffix}
              </motion.span>

              {/* Trend indicator */}
              {trend !== 0 && (
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: delay + 0.6 }}
                  className={`ml-2 text-sm ${
                    trend > 0 ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {trend > 0 ? "↑" : "↓"} {Math.abs(trend)}%
                </motion.span>
              )}
            </motion.div>

            {/* Label */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: delay + 0.4 }}
              className="mt-2 text-sm text-text-muted"
            >
              {label}
            </motion.div>
          </div>
        </motion.div>
      </HolographicCard>
    </motion.div>
  );
}
