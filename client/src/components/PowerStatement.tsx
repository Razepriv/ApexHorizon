import { Clock, TrendingUp } from "lucide-react";

export default function PowerStatement() {
  const hours = 40;
  const savings = 2400000;

  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-6xl mx-auto text-center space-y-12">
          <h2 className="text-4xl md:text-6xl font-bold leading-tight">
            <span className="text-muted-foreground">While Your Competition Wastes</span>
            <br />
            <span className="bg-gradient-to-r from-destructive to-destructive/60 bg-clip-text text-transparent text-5xl md:text-7xl">
              {hours} Hours a Week
            </span>
            <br />
            <span className="text-muted-foreground">on Manual Tasks,</span>
            <br />
            <span className="bg-gradient-to-r from-primary via-chart-2 to-chart-3 bg-clip-text text-transparent text-5xl md:text-7xl">
              You'll Be Scaling
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto pt-8">
            <div className="backdrop-blur-xl bg-destructive/10 border border-destructive/30 rounded-md p-8">
              <Clock className="w-12 h-12 text-destructive mx-auto mb-4" />
              <div className="text-5xl font-bold text-destructive mb-2">{hours}h</div>
              <div className="text-muted-foreground">Wasted Weekly on Manual Work</div>
            </div>
            
            <div className="backdrop-blur-xl bg-primary/10 border border-primary/30 rounded-md p-8">
              <TrendingUp className="w-12 h-12 text-primary mx-auto mb-4" />
              <div className="text-5xl font-bold text-primary mb-2">${(savings/1000000).toFixed(1)}M</div>
              <div className="text-muted-foreground">Saved with AI Automation</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
