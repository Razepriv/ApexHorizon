import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import FloatingMetrics from "@/components/FloatingMetrics";
import AIChat from "@/components/AIChat";
import PowerStatement from "@/components/PowerStatement";
import ServicesArsenal from "@/components/ServicesArsenal";
import SocialProof from "@/components/SocialProof";
import Comparison from "@/components/Comparison";
import FinalCTA from "@/components/FinalCTA";
import NeuralBackground from "@/components/NeuralBackground";
import CustomCursor from "@/components/CustomCursor";
import VoiceAgent from "@/components/VoiceAgent";
import ROICalculator from "@/components/ROICalculator";

export default function Home() {
  return (
    <div className="min-h-screen bg-background cursor-none">
      <NeuralBackground />
      <CustomCursor />
      <Navigation />
      <Hero />
      <FloatingMetrics />
      <VoiceAgent />
      <AIChat />
      <PowerStatement />
      <ServicesArsenal />
      <SocialProof />
      <ROICalculator />
      <Comparison />
      <FinalCTA />
    </div>
  );
}
