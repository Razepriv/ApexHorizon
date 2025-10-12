import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import FloatingMetrics from "@/components/FloatingMetrics";
import AIChat from "@/components/AIChat";
import PowerStatement from "@/components/PowerStatement";
import ServicesArsenal from "@/components/ServicesArsenal";
import SocialProof from "@/components/SocialProof";
import Comparison from "@/components/Comparison";
import FinalCTA from "@/components/FinalCTA";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <FloatingMetrics />
      <AIChat />
      <PowerStatement />
      <ServicesArsenal />
      <SocialProof />
      <Comparison />
      <FinalCTA />
    </div>
  );
}
