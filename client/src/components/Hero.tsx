import { useRef } from 'react';
import { Sparkles, Zap, Play } from "lucide-react";
import { motion, useScroll, useTransform } from 'framer-motion';
import ParticleButton from "./ParticleButton";
import GlowText from "./ui/glow-text";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  
  const y = useTransform(scrollY, [0, 1000], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section
      ref={containerRef} 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Glow Effects */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-20 left-20 w-64 h-64 bg-primary/30 rounded-full blur-3xl animate-glow-pulse" />
        <div className="absolute bottom-40 right-32 w-96 h-96 bg-tech/30 rounded-full blur-3xl animate-glow-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-secondary/30 rounded-full blur-3xl animate-glow-pulse" style={{ animationDelay: "2s" }} />
      </div>

      {/* Neural Network Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background-secondary" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,240,255,0.1)_0%,transparent_70%)]" />
        <motion.div 
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          <div className="absolute left-1/4 top-1/4 w-32 h-32 rounded-full bg-primary/20 blur-3xl animate-float" />
          <div className="absolute right-1/4 top-2/3 w-48 h-48 rounded-full bg-tech/20 blur-3xl animate-float" style={{ animationDelay: "1s" }} />
          <div className="absolute right-1/3 top-1/4 w-40 h-40 rounded-full bg-secondary/20 blur-3xl animate-float" style={{ animationDelay: "2s" }} />
        </motion.div>
      </div>

      {/* Neural Network Lines */}
      <div className="absolute inset-0 z-0 opacity-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <motion.path
            d="M0 100 Q 250 50, 500 100 T 1000 100"
            stroke="url(#gradient1)"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
          <motion.path
            d="M0 300 Q 250 250, 500 300 T 1000 300"
            stroke="url(#gradient2)"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
          />
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FF4444" />
              <stop offset="100%" stopColor="#00F0FF" />
            </linearGradient>
            <linearGradient id="gradient2" x1="100%" y1="0%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#FF8C42" />
              <stop offset="100%" stopColor="#00F0FF" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Main Content */}
      <motion.div 
        className="container mx-auto px-4 md:px-8 z-10 text-center"
        style={{ y, opacity }}
      >
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glassmorphism"
          >
            <Sparkles className="w-4 h-4 text-primary animate-glow-pulse" />
            <span className="text-sm font-medium bg-gradient-primary bg-clip-text text-transparent">
              The Future is Now
            </span>
          </motion.div>

          {/* Hero Title */}
          <h1 className="text-hero font-display font-bold leading-hero tracking-hero">
            <GlowText
              animationDelay={0.4}
              highlight
              typing
              typingSpeed={50}
            >
              THE FUTURE OF
            </GlowText>
            <br />
            <GlowText
              animationDelay={1.2}
              typing
              typingSpeed={50}
            >
              BUSINESS RUNS
            </GlowText>
            <br />
            <GlowText
              animationDelay={2.0}
              highlight
              typing
              typingSpeed={50}
            >
              ON AI
            </GlowText>
          </h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.8 }}
            className="text-xl md:text-2xl text-text-muted max-w-3xl mx-auto"
          >
            Stop wasting time on manual tasks. Let AI handle operations while you scale to 7 figures with cutting-edge automation.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.2 }}
            className="flex flex-wrap items-center justify-center gap-6 pt-8"
          >
            <ParticleButton 
              icon={Zap} 
              variant="primary"
              size="lg"
              testId="button-unleash-ai"
            >
              Start Free Trial
            </ParticleButton>
            
            <ParticleButton
              icon={Play}
              variant="outline"
              size="lg"
              testId="button-watch-demo"
            >
              Watch Demo
            </ParticleButton>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-sm text-text-muted">Scroll to Explore</span>
        <motion.div
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="w-5 h-5 border-2 border-text-muted rounded-full flex items-center justify-center"
        >
          <motion.div
            animate={{
              height: [6, 12, 6],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="w-0.5 bg-text-muted rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
