import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Rocket, Calendar, AlertCircle } from "lucide-react";

export default function FinalCTA() {
  const spotsLeft = 3;
  const companiesThisWeek = 47;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/10 to-background" />
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-chart-2/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-destructive/50 bg-destructive/10 backdrop-blur-sm mb-6">
              <AlertCircle className="w-4 h-4 text-destructive" />
              <span className="text-sm font-medium text-destructive">Every Day Without AI Costs You $8,500</span>
            </div>

            <h2 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="text-muted-foreground">Stop Working</span>
              {" "}
              <span className="text-destructive">IN</span>
              {" "}
              <span className="text-muted-foreground">Your Business.</span>
              <br />
              <span className="bg-gradient-to-r from-primary via-chart-2 to-chart-3 bg-clip-text text-transparent">
                Start Working ON It.
              </span>
            </h2>

            <div className="flex flex-wrap items-center justify-center gap-8 mb-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-1">{spotsLeft}</div>
                <div className="text-sm text-muted-foreground">Consultation Spots Left</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-chart-2 mb-1">{companiesThisWeek}</div>
                <div className="text-sm text-muted-foreground">Companies Automated This Week</div>
              </div>
            </div>
          </div>

          <div className="backdrop-blur-xl bg-card/30 border border-primary/20 rounded-md p-8 md:p-12">
            <h3 className="text-2xl font-bold mb-6 text-center">Book Your AI Strategy Session</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input 
                  placeholder="Your Name" 
                  className="bg-background/50 border-primary/20 focus:border-primary"
                  data-testid="input-name"
                />
                <Input 
                  type="email" 
                  placeholder="Email Address" 
                  className="bg-background/50 border-primary/20 focus:border-primary"
                  data-testid="input-email"
                />
              </div>
              <Input 
                placeholder="Company Name" 
                className="bg-background/50 border-primary/20 focus:border-primary"
                data-testid="input-company"
              />
              <Input 
                placeholder="Current Monthly Revenue" 
                className="bg-background/50 border-primary/20 focus:border-primary"
                data-testid="input-revenue"
              />
              
              <Button 
                type="submit"
                size="lg" 
                className="w-full bg-gradient-to-r from-primary to-chart-2 hover:shadow-[0_0_30px_rgba(56,189,248,0.5)] transition-all duration-300"
                data-testid="button-book-session"
              >
                <Rocket className="w-5 h-5 mr-2" />
                BOOK MY SESSION NOW
              </Button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-sm text-muted-foreground mb-4">
                100% Money-Back Guarantee • Free AI Audit Included • Cancel Anytime
              </p>
              <div className="flex items-center justify-center gap-2 text-xs text-primary">
                <Calendar className="w-4 h-4" />
                <span>Next available slot: Tomorrow at 2:00 PM</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
