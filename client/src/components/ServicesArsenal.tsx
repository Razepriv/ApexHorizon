import { Bot, Network, Brain, Database } from "lucide-react";
import Service3DCard from "./Service3DCard";
import ScrollReveal from "./ScrollReveal";

const services = [
  {
    icon: Bot,
    title: "AI Agent Army",
    description: "Deploy autonomous agents that work 24/7",
    stat: "10,000+ agents deployed",
  },
  {
    icon: Network,
    title: "Neural Automation",
    description: "Connect your entire tech stack with AI intelligence",
    stat: "500+ integrations",
  },
  {
    icon: Brain,
    title: "Predictive Intelligence",
    description: "Know what happens before it happens",
    stat: "99.7% accuracy",
  },
  {
    icon: Database,
    title: "Cognitive Integration",
    description: "Turn your data into decisions instantly",
    stat: "Real-time processing",
  }
];

export default function ServicesArsenal() {
  return (
    <section className="py-24 md:py-32 relative">
      <div className="container mx-auto px-4 md:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary via-chart-2 to-chart-3 bg-clip-text text-transparent">
                Your Arsenal
              </span>
            </h2>
            <p className="text-xl text-muted-foreground">Choose your weapons. Dominate your industry.</p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <ScrollReveal key={index} delay={index * 100}>
              <Service3DCard
                icon={service.icon}
                title={service.title}
                description={service.description}
                stat={service.stat}
                index={index}
              />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
