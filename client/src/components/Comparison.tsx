import { X, Check } from "lucide-react";

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
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="text-foreground">Choose Your Future</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-destructive/20 to-destructive/5 blur-xl opacity-50" />
            <div className="relative backdrop-blur-sm bg-destructive/5 border border-destructive/30 rounded-md p-8 h-full">
              <div className="mb-8">
                <h3 className="text-3xl font-bold text-destructive mb-2">Without APEX AI</h3>
                <p className="text-muted-foreground">Stuck in the past, falling behind</p>
              </div>
              
              <div className="space-y-4">
                {withoutAI.map((item, index) => (
                  <div key={index} className="flex items-start gap-3 opacity-70">
                    <X className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-chart-2/20 blur-xl" />
            <div className="relative backdrop-blur-sm bg-gradient-to-br from-primary/10 to-chart-2/10 border border-primary/30 rounded-md p-8 h-full">
              <div className="mb-8">
                <h3 className="text-3xl font-bold bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent mb-2">
                  With APEX AI
                </h3>
                <p className="text-muted-foreground">Leading the future, unstoppable</p>
              </div>
              
              <div className="space-y-4">
                {withAI.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
