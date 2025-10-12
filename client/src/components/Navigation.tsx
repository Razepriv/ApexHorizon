import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";

export default function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-background/80 border-b border-primary/20">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-md bg-gradient-to-br from-primary to-chart-2 flex items-center justify-center">
              <Zap className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">
              APEX AI
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#services" className="text-sm hover:text-primary transition-colors" data-testid="link-services">Services</a>
            <a href="#results" className="text-sm hover:text-primary transition-colors" data-testid="link-results">Results</a>
            <a href="#demo" className="text-sm hover:text-primary transition-colors" data-testid="link-demo">Demo</a>
          </div>

          <Button 
            size="sm"
            className="bg-gradient-to-r from-primary to-chart-2"
            data-testid="button-nav-cta"
          >
            Book Now
          </Button>
        </div>
      </div>
    </nav>
  );
}
