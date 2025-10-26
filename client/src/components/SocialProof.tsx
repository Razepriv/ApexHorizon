import { useRef, useState, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ScrollReveal from "./ScrollReveal";
import GlowText from "@/components/ui/glow-text";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "CEO, TechVentures",
    image: "https://source.unsplash.com/random/400x400?woman+professional+1",
    quote: "APEX AI automated 80% of our workflows. We're scaling 10x faster.",
    metric: "$3.2M saved annually",
    video: null, // Reserved for future video testimonials
  },
  {
    name: "Marcus Rodriguez",
    role: "CTO, InnovateNow",
    image: "https://source.unsplash.com/random/400x400?man+professional+1",
    quote: "The AI agents never sleep. Our productivity went through the roof.",
    metric: "500% ROI in 6 months",
    video: null,
  },
  {
    name: "Jennifer Park",
    role: "Founder, DataFlow",
    image: "https://source.unsplash.com/random/400x400?woman+professional+2",
    quote: "Predictive intelligence changed everything. We see the future before it happens.",
    metric: "99.8% accuracy rate",
    video: null,
  },
];

const metrics = [
  "847 tasks automated today",
  "$2.4M saved this month",
  "10,000+ AI agents deployed",
  "99.7% accuracy rate",
  "500+ companies trust us",
  "24/7 autonomous operation",
];

const companies = [
  "TechVentures",
  "DataFlow",
  "InnovateNow",
  "FutureScale",
  "CodeGenius",
  "SmartSys",
  "NeuroCorp",
  "AIMatrix",
];

export default function SocialProof() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef);
  const controls = useAnimation();

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (autoplay && isInView) {
      interval = setInterval(() => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
      }, 5000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoplay, isInView]);

  const handlePrevious = () => {
    setAutoplay(false);
    setCurrentTestimonial(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const handleNext = () => {
    setAutoplay(false);
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  useEffect(() => {
    if (isInView) {
      controls.start("animate");
    }
  }, [isInView, controls]);

  const variants = {
    initial: { opacity: 0, y: 20 },
    animate: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
      },
    }),
  };

  return (
    <section ref={containerRef} className="py-24 md:py-32 relative overflow-hidden">
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <GlowText>Trusted by </GlowText>
            <GlowText highlight>Industry Leaders</GlowText>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            See how top companies are revolutionizing their operations with AI
          </p>
        </motion.div>

        {/* Metrics Ticker */}
        <div className="relative mb-16 overflow-hidden">
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
          <motion.div
            animate={{
              x: ["0%", "-50%"],
            }}
            transition={{
              x: {
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              },
            }}
            className="flex gap-8 whitespace-nowrap"
          >
            {[...metrics, ...metrics].map((metric, index) => (
              <div
                key={index}
                className="px-6 py-2 rounded-full bg-primary/5 border border-primary/20 backdrop-blur-sm"
              >
                <span className="text-sm font-medium text-muted-foreground">
                  {metric}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Main Testimonial */}
        <div className="max-w-5xl mx-auto mb-16 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-primary/20 rounded-2xl blur opacity-75" />
            <div className="relative p-8 md:p-12 rounded-xl bg-card/50 backdrop-blur-sm border border-primary/20">
              <Quote className="absolute top-4 left-4 w-12 h-12 text-primary/20" />
              
              <div className="text-center space-y-8">
                <div className="flex items-center justify-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="w-5 h-5 text-primary fill-primary"
                    />
                  ))}
                </div>

                <motion.p
                  key={currentTestimonial}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="text-2xl md:text-3xl font-medium"
                >
                  "{testimonials[currentTestimonial].quote}"
                </motion.p>

                <motion.div
                  key={`${currentTestimonial}-author`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center"
                >
                  <Avatar className="w-16 h-16 mb-4">
                    <AvatarImage src={testimonials[currentTestimonial].image} />
                    <AvatarFallback>{testimonials[currentTestimonial].name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="text-lg font-semibold">
                    {testimonials[currentTestimonial].name}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {testimonials[currentTestimonial].role}
                  </div>
                  <div className="mt-2 px-4 py-1 rounded-full bg-primary/10 text-primary text-sm">
                    {testimonials[currentTestimonial].metric}
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Navigation Buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={handlePrevious}
              className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
            >
              <ChevronLeft className="w-6 h-6 text-primary" />
            </button>
            <button
              onClick={handleNext}
              className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
            >
              <ChevronRight className="w-6 h-6 text-primary" />
            </button>
          </div>
        </div>

        {/* Company Logos */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <p className="text-sm font-medium text-muted-foreground">
              TRUSTED BY INNOVATIVE COMPANIES
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {companies.map((company, index) => (
              <motion.div
                key={company}
                custom={index}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                variants={variants}
                className="flex items-center justify-center px-8 py-4 rounded-lg bg-card/50 backdrop-blur-sm border border-primary/20"
              >
                <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary bg-clip-text text-transparent">
                  {company}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}