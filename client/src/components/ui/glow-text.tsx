import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';

interface GlowTextProps {
  children: string;
  className?: string;
  animationDelay?: number;
  highlight?: boolean;
  typing?: boolean;
  typingSpeed?: number;
}

export default function GlowText({
  children,
  className = '',
  animationDelay = 0,
  highlight = false,
  typing = false,
  typingSpeed = 40,
}: GlowTextProps) {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: {
        delay: animationDelay,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    });
  }, [controls, animationDelay]);

  if (typing) {
    const letters = children.split('');
    
    return (
      <span className={`inline-block ${className}`}>
        {letters.map((letter, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
            }}
            transition={{
              duration: 0.1,
              delay: (index * typingSpeed) / 1000 + animationDelay,
            }}
            className={highlight ? 'text-gradient' : ''}
          >
            {letter === ' ' ? '\u00A0' : letter}
          </motion.span>
        ))}
      </span>
    );
  }

  return (
    <motion.span
      className={`inline-block ${highlight ? 'text-gradient' : ''} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={controls}
    >
      {children}

      {highlight && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at center, rgba(255,68,68,0.15) 0%, transparent 70%)',
            filter: 'blur(20px)',
            opacity: 0.5,
            mixBlendMode: 'screen',
          }}
        />
      )}
    </motion.span>
  );
}