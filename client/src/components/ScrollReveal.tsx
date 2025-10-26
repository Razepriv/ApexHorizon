import { useRef, useEffect, type ReactNode } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

interface ScrollRevealProps {
  children: ReactNode;
  variant?: 'fade-up' | 'fade-in' | 'slide-left' | 'slide-right';
  delay?: number;
  duration?: number;
  threshold?: number;
  className?: string;
}

const variants = {
  hidden: {
    opacity: 0,
    y: 20,
    x: 0,
  },
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
  },
} as const;

const slideVariants = {
  'slide-left': {
    hidden: { x: 50, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  },
  'slide-right': {
    hidden: { x: -50, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  },
} as const;

export default function ScrollReveal({
  children,
  variant = 'fade-up',
  delay = 0,
  duration = 0.5,
  threshold = 0.2,
  className,
}: ScrollRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold });
  const controls = useAnimation();
  
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  const selectedVariant = variant.includes('slide') 
    ? slideVariants[variant as keyof typeof slideVariants]
    : variants;

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={selectedVariant}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1], // Custom cubic-bezier for smooth animation
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
