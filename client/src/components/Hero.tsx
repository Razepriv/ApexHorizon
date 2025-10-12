import { Sparkles, Zap, Play } from "lucide-react";
import heroImage from "@assets/stock_images/futuristic_ai_neural_e16bc214.jpg";
import ParticleButton from "./ParticleButton";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Neural Network" 
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
      </div>

      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-20 left-20 w-64 h-64 bg-primary/30 rounded-full blur-3xl animate-glow-pulse" />
        <div className="absolute bottom-40 right-32 w-96 h-96 bg-chart-2/30 rounded-full blur-3xl animate-glow-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-chart-3/30 rounded-full blur-3xl animate-glow-pulse" style={{ animationDelay: "2s" }} />
      </div>

      <div className="container mx-auto px-4 md:px-8 z-10 text-center">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 backdrop-blur-sm mb-4">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">The Future is Now</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-bold leading-tight">
            <span className="bg-gradient-to-r from-primary via-chart-2 to-chart-3 bg-clip-text text-transparent animate-fade-in-up">
              THE FUTURE OF
            </span>
            <br />
            <span className="text-foreground animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              BUSINESS RUNS
            </span>
            <br />
            <span className="bg-gradient-to-r from-chart-2 via-primary to-chart-3 bg-clip-text text-transparent animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
              ON AI
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
            Deploy autonomous agents that work 24/7. Automate everything. Scale faster than your competition.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4 animate-fade-in-up" style={{ animationDelay: "0.8s" }}>
            <ParticleButton icon={Zap} testId="button-unleash-ai">
              UNLEASH AI POWER
            </ParticleButton>
            <ParticleButton icon={Play} testId="button-watch-demo">
              Watch the Demo
            </ParticleButton>
          </div>
        </div>
      </div>
    </section>
  );
}
