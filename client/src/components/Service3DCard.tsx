import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface Service3DCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  stat: string;
  index: number;
}

export default function Service3DCard({ icon: Icon, title, description, stat, index }: Service3DCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Mouse position values with Framer Motion
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring physics for smooth animation
  const springConfig = { damping: 15, stiffness: 150 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]), springConfig);
  const scale = useSpring(1);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const mouseX = (e.clientX - centerX) / (rect.width / 2);
    const mouseY = (e.clientY - centerY) / (rect.height / 2);

    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseEnter = () => {
    scale.set(1.05);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    scale.set(1);
  };

  // Generate connecting line points
  const isLastCard = index === 3;
  const connectorPath = !isLastCard ? `M 100% 50% C 120% 50%, 180% 50%, 200% 50%` : '';

  return (
    <motion.div
      ref={cardRef}
      className="group relative h-full"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        scale,
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
    >
      <motion.div
        className="relative overflow-hidden border border-primary/20 bg-card/50 backdrop-blur-sm rounded-xl p-6 h-full transition-all duration-300
          group-hover:border-primary/40 group-hover:shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 }}
      >
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-chart-2/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ transform: "translateZ(-10px)" }}
        />
        
        <motion.div 
          className="relative space-y-4"
          style={{ transform: "translateZ(30px)" }}
        >
          <motion.div 
            className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/30 to-chart-2/30 flex items-center justify-center 
              group-hover:scale-110 transition-transform duration-300 relative"
            whileHover={{ scale: 1.1 }}
            style={{ transform: "translateZ(40px)" }}
          >
            <Icon className="w-8 h-8 text-primary relative z-10" />
            <motion.div
              className="absolute inset-0 bg-primary/30 rounded-xl blur-xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
          
          <div>
            <motion.h3 
              className="text-2xl font-bold mb-2 bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent"
              style={{ transform: "translateZ(20px)" }}
            >
              {title}
            </motion.h3>
            <motion.p 
              className="text-sm text-muted-foreground mb-3"
              style={{ transform: "translateZ(10px)" }}
            >
              {description}
            </motion.p>
            <motion.div 
              className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 border border-primary/20"
              whileHover={{ scale: 1.05 }}
              style={{ transform: "translateZ(15px)" }}
            >
              <span className="text-xs font-medium text-primary">{stat}</span>
            </motion.div>
          </div>
        </motion.div>

        <motion.div 
          className="absolute -inset-0.5 bg-gradient-to-r from-primary/50 to-chart-2/50 rounded-xl opacity-0 group-hover:opacity-40 blur-sm transition-opacity duration-300"
          style={{ transform: "translateZ(-20px)" }}
        />
      </motion.div>

      {/* Connecting line to next card */}
      {!isLastCard && (
        <svg
          className="absolute top-0 right-0 w-16 h-full pointer-events-none hidden lg:block"
          style={{ transform: 'translateX(100%)' }}
        >
          <motion.path
            d={connectorPath}
            stroke="url(#gradient-line)"
            strokeWidth="2"
            strokeDasharray="5,5"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.5 }}
            transition={{ duration: 1, delay: index * 0.2 }}
          />
          <defs>
            <linearGradient id={`gradient-line-${index}`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.5" />
              <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      )}
    </motion.div>
  );
}
