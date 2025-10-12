import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import ceo1 from "@assets/stock_images/professional_busines_6d2ab48c.jpg";
import ceo2 from "@assets/stock_images/professional_busines_3951b52b.jpg";
import ceo3 from "@assets/stock_images/professional_busines_348bda19.jpg";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "CEO, TechVentures",
    image: ceo1,
    quote: "APEX AI automated 80% of our workflows. We're scaling 10x faster.",
    metric: "$3.2M saved annually"
  },
  {
    name: "Marcus Rodriguez",
    role: "CTO, InnovateNow",
    image: ceo2,
    quote: "The AI agents never sleep. Our productivity went through the roof.",
    metric: "500% ROI in 6 months"
  },
  {
    name: "Jennifer Park",
    role: "Founder, DataFlow",
    image: ceo3,
    quote: "Predictive intelligence changed everything. We see the future before it happens.",
    metric: "99.8% accuracy rate"
  }
];

const metrics = [
  "847 tasks automated today",
  "$2.4M saved this month",
  "10,000+ AI agents deployed",
  "99.7% accuracy rate",
  "500+ companies trust us",
  "24/7 autonomous operation"
];

export default function SocialProof() {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-chart-2/5 to-background" />
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">
              Companies That Chose The Future
            </span>
          </h2>
        </div>

        <div className="mb-16 overflow-hidden">
          <div className="flex gap-8 animate-ticker whitespace-nowrap">
            {[...metrics, ...metrics].map((metric, index) => (
              <div key={index} className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-primary/10 border border-primary/20">
                <div className="w-2 h-2 rounded-full bg-primary animate-glow-pulse" />
                <span className="text-sm font-medium text-primary">{metric}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <ScrollReveal key={index} delay={index * 150}>
              <Card 
                className="border-primary/20 bg-card/50 backdrop-blur-sm hover-elevate transition-all duration-300 p-6"
                data-testid={`card-testimonial-${index}`}
              >
              <div className="flex items-center gap-4 mb-4">
                <Avatar className="w-12 h-12 border-2 border-primary/30">
                  <AvatarImage src={testimonial.image} alt={testimonial.name} />
                  <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>
              
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              
              <p className="text-sm mb-4 leading-relaxed">{testimonial.quote}</p>
              
              <div className="pt-4 border-t border-primary/20">
                <div className="text-sm font-mono text-primary">{testimonial.metric}</div>
              </div>
            </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
