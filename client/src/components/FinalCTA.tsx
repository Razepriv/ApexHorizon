import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Rocket, Calendar, AlertCircle, Shield, Clock, Globe, Lightning } from "lucide-react";
import GlowText from "@/components/ui/glow-text";

const benefits = [
  {
    icon: Clock,
    title: "Instant Setup",
    description: "Get started in minutes, not days",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Bank-grade encryption & compliance",
  },
  {
    icon: Globe,
    title: "24/7 Support",
    description: "Always-on expert assistance",
  },
  {
    icon: Lightning,
    title: "Rapid ROI",
    description: "See results from day one",
  },
];

export default function FinalCTA() {
  const [spotsLeft, setSpotsLeft] = useState(3);
  const [companiesThisWeek, setCompaniesThisWeek] = useState(0);
  const [formData, setFormData] = useState({
    email: "",
    company: "",
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCompaniesThisWeek(prev => prev < 47 ? prev + 1 : 47);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
  };

  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background-secondary opacity-90" />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.2, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-gradient-radial from-primary/20 via-transparent to-transparent blur-3xl" />
        </motion.div>
      </div>

      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-destructive/50 bg-destructive/10 backdrop-blur-sm mb-6"
            >
              <AlertCircle className="w-4 h-4 text-destructive" />
              <span className="text-sm font-medium text-destructive">Limited Spots Available: {spotsLeft} Left</span>
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-7xl font-bold mb-6"
            >
              <span className="text-muted-foreground">Stop Working</span>
              {" "}
              <span className="text-destructive">IN</span>
              {" "}
              <span className="text-muted-foreground">Your Business.</span>
              <br />
              <GlowText highlight>Start Working ON It.</GlowText>
            </motion.h2>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-wrap items-center justify-center gap-8 mb-8"
            >
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                <span className="text-lg">
                  <span className="font-bold text-primary">{companiesThisWeek}</span>
                  <span className="text-muted-foreground"> companies onboarded this week</span>
                </span>
              </div>
            </motion.div>
          </div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-primary/20 rounded-2xl blur opacity-75" />
            <div className="relative p-8 rounded-xl bg-card/50 backdrop-blur-sm border border-primary/20">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">Work Email</label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full bg-background/50"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium mb-2">Company Name</label>
                    <Input
                      id="company"
                      type="text"
                      placeholder="Your company"
                      value={formData.company}
                      onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                      className="w-full bg-background/50"
                      required
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full py-6 text-lg bg-primary hover:bg-primary/90">
                  <Rocket className="w-5 h-5 mr-2" />
                  Get Started Now
                </Button>
              </form>

              <div className="mt-8">
                <div className="text-sm text-center text-muted-foreground mb-6">
                  Everything you need to transform your business with AI
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {benefits.map((benefit, index) => (
                    <motion.div
                      key={benefit.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-4"
                    >
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        {React.createElement(benefit.icon, { className: "w-5 h-5 text-primary" })}
                      </div>
                      <div>
                        <div className="font-medium mb-1">{benefit.title}</div>
                        <div className="text-sm text-muted-foreground">{benefit.description}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8 text-center text-sm text-muted-foreground"
          >
            <div className="flex items-center justify-center gap-2">
              <Shield className="w-4 h-4" />
              <span>Enterprise-grade security</span>
              <span className="mx-2">•</span>
              <span>SOC 2 Certified</span>
              <span className="mx-2">•</span>
              <span>GDPR Compliant</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}