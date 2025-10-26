import { useState } from "react";
import { X, Check } from "lucide-react";
import { motion } from "framer-motion";
import GlowText from "@/components/ui/glow-text";

const withoutAI = [
  "40 hours wasted weekly on manual tasks",
  "Human errors cost thousands daily",
  "Slow decision making",
  "Limited to business hours",
  "Reactive instead of predictive",
  "Competitors pulling ahead"
];

const withAI = [
  "100% automated workflows 24/7",
  "99.7% accuracy with AI precision",
  "Instant data-driven decisions",
  "Never sleeps, always scaling",
  "Predict outcomes before they happen",
  "Dominate your industry"
];

export default function Comparison() {
  const [isHoveredLeft, setIsHoveredLeft] = useState(false);
  const [isHoveredRight, setIsHoveredRight] = useState(false);

  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background-secondary opacity-90" />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.2, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-gradient-radial from-primary/20 via-transparent to-transparent blur-3xl" />
        </motion.div>
      </div>

      <div className="container mx-auto px-4 md:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <GlowText>Transform Your Business </GlowText>
            <GlowText highlight>Today</GlowText>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            See the radical transformation AI brings to your operations
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 relative">
          {/* Without AI Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
            onHoverStart={() => setIsHoveredLeft(true)}
            onHoverEnd={() => setIsHoveredLeft(false)}
          >
            <div className="p-8 rounded-xl bg-destructive/5 border border-destructive/20 backdrop-blur-sm relative overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-destructive/20 to-destructive/5"
                initial={{ opacity: 0 }}
                animate={{ opacity: isHoveredLeft ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              />
              
              <h3 className="text-2xl font-bold mb-6 text-destructive">Without AI</h3>
              
              <div className="space-y-4">
                {withoutAI.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-4"
                  >
                    <div className="w-6 h-6 rounded-full bg-destructive/20 flex items-center justify-center">
                      <X className="w-4 h-4 text-destructive" />
                    </div>
                    <p className="flex-1 text-muted-foreground">{item}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* With AI Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
            onHoverStart={() => setIsHoveredRight(true)}
            onHoverEnd={() => setIsHoveredRight(false)}
          >
            <div className="p-8 rounded-xl bg-primary/5 border border-primary/20 backdrop-blur-sm relative overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5"
                initial={{ opacity: 0 }}
                animate={{ opacity: isHoveredRight ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              />
              
              <h3 className="text-2xl font-bold mb-6 text-primary">With APEX AI</h3>
              
              <div className="space-y-4">
                {withAI.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-4"
                  >
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                      <Check className="w-4 h-4 text-primary" />
                    </div>
                    <p className="flex-1 text-muted-foreground">{item}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Connecting Line */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            className="absolute left-1/2 top-1/2 h-px w-16 -translate-x-1/2 bg-gradient-to-r from-destructive via-primary to-primary hidden md:block"
          />
        </div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex flex-wrap justify-center gap-4">
            {[
              { value: "90%", label: "Time Saved" },
              { value: "99.7%", label: "Accuracy" },
              { value: "24/7", label: "Operation" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="px-6 py-3 rounded-full bg-primary/5 border border-primary/20 backdrop-blur-sm"
              >
                <span className="font-bold text-primary mr-2">{stat.value}</span>
                <span className="text-muted-foreground">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}