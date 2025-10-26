import { Bot, Network, Brain, Database } from "lucide-react";
import { motion } from "framer-motion";
import Service3DCard from "./Service3DCard";
import ScrollReveal from "./ScrollReveal";
import GlowText from "@/components/ui/glow-text";

const services = [
  {
    icon: Bot,
    title: "AI Agent Army",
    description: "Deploy autonomous agents that work 24/7",
    stat: "10,000+ agents deployed",
    gradient: "from-primary/20 to-primary/5",
  },
  {
    icon: Network,
    title: "Neural Automation",
    description: "Connect your entire tech stack with AI intelligence",
    stat: "500+ integrations",
    gradient: "from-chart-2/20 to-chart-2/5",
  },
  {
    icon: Brain,
    title: "Predictive Intelligence",
    description: "Know what happens before it happens",
    stat: "99.7% accuracy",
    gradient: "from-chart-3/20 to-chart-3/5",
  },
  {
    icon: Database,
    title: "Cognitive Integration",
    description: "Turn your data into decisions instantly",
    stat: "Real-time processing",
    gradient: "from-chart-4/20 to-chart-4/5",
  }
];

export default function ServicesArsenal() {
  return (
    <section className="py-24 md:py-32 relative">
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
            <GlowText>Future-Proof Your Business with Our </GlowText>
            <GlowText highlight>AI Arsenal</GlowText>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Deploy cutting-edge AI solutions that transform your operations
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connection Lines */}
          <div className="absolute inset-0 hidden lg:block">
            <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice">
              <motion.path
                d="M 100,200 C 200,100 300,300 400,200"
                stroke="url(#line-gradient)"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5 }}
              />
              <motion.path
                d="M 400,200 C 500,100 600,300 700,200"
                stroke="url(#line-gradient)"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.7 }}
              />
              <motion.path
                d="M 700,200 C 800,100 900,300 1000,200"
                stroke="url(#line-gradient)"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.9 }}
              />
              <defs>
                <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.2" />
                  <stop offset="50%" stopColor="var(--primary)" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.2" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Service Cards */}
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Service3DCard>
                <div className={`p-8 rounded-xl bg-gradient-to-br ${service.gradient} backdrop-blur-sm border border-primary/20 h-full`}>
                  <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                    {React.createElement(service.icon, { className: "w-8 h-8 text-primary" })}
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                  <p className="text-muted-foreground mb-6">{service.description}</p>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary/50 animate-glow-pulse" />
                    <span className="text-sm font-medium text-primary">{service.stat}</span>
                  </div>
                </div>
              </Service3DCard>
            </motion.div>
          ))}
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
              { value: "500+", label: "APIs Connected" },
              { value: "99.9%", label: "Uptime" },
              { value: "10k+", label: "Tasks/Day" }
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