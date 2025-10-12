import { Bot, Network, Brain, Database } from "lucide-react";
import { Card } from "@/components/ui/card";

const services = [
  {
    icon: Bot,
    title: "AI Agent Army",
    description: "Deploy autonomous agents that work 24/7",
    stat: "10,000+ agents deployed",
    color: "primary"
  },
  {
    icon: Network,
    title: "Neural Automation",
    description: "Connect your entire tech stack with AI intelligence",
    stat: "500+ integrations",
    color: "chart-2"
  },
  {
    icon: Brain,
    title: "Predictive Intelligence",
    description: "Know what happens before it happens",
    stat: "99.7% accuracy",
    color: "chart-3"
  },
  {
    icon: Database,
    title: "Cognitive Integration",
    description: "Turn your data into decisions instantly",
    stat: "Real-time processing",
    color: "chart-4"
  }
];

export default function ServicesArsenal() {
  return (
    <section className="py-24 md:py-32 relative">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary via-chart-2 to-chart-3 bg-clip-text text-transparent">
              Your Arsenal
            </span>
          </h2>
          <p className="text-xl text-muted-foreground">Choose your weapons. Dominate your industry.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <Card 
              key={index}
              className="group relative overflow-hidden border-primary/20 bg-card/50 backdrop-blur-sm hover-elevate transition-all duration-300 p-6"
              data-testid={`card-service-${index}`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-chart-2/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative space-y-4">
                <div className="w-12 h-12 rounded-md bg-gradient-to-br from-primary/20 to-chart-2/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="w-6 h-6 text-primary" />
                </div>
                
                <div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{service.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{service.description}</p>
                  <div className="text-xs font-mono text-primary/80 border-l-2 border-primary/50 pl-3">
                    {service.stat}
                  </div>
                </div>
              </div>

              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/50 to-chart-2/50 rounded-md opacity-0 group-hover:opacity-30 blur-sm transition-opacity duration-300" />
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
