import MetricCard from "./MetricCard";
import { Zap, Target, DollarSign, TrendingUp, Users, Clock } from "lucide-react";
import { motion } from "framer-motion";

const metrics = [
  {
    value: "847+",
    label: "Tasks Automated Today",
    icon: Zap,
    trend: 12,
  },
  {
    value: "99.7",
    label: "Accuracy Rate",
    icon: Target,
    suffix: "%",
    trend: 0.5,
  },
  {
    value: "$2.4",
    label: "Revenue Increase",
    icon: TrendingUp,
    suffix: "M",
    trend: 28,
  },
  {
    value: "10k+",
    label: "Active Users",
    icon: Users,
    trend: 15,
  },
  {
    value: "40",
    label: "Hours Saved Weekly",
    icon: Clock,
    suffix: "h",
    trend: 33,
  },
  {
    value: "$180k",
    label: "Cost Reduction",
    icon: DollarSign,
    trend: 22,
  },
];

export default function FloatingMetrics() {
  return (
    <div className="relative z-20 px-4 sm:px-6 lg:px-8 -mt-32 mb-24">
      <div className="mx-auto max-w-7xl">
        {/* Background Effects */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/80 to-background" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] aspect-square">
            <div className="absolute inset-0 bg-gradient-radial from-primary/20 via-transparent to-transparent opacity-50 blur-2xl" />
            <div className="absolute inset-0 bg-gradient-radial from-tech/20 via-transparent to-transparent opacity-30 blur-3xl animate-pulse" />
          </div>
        </div>

        {/* Grid of Metric Cards */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {metrics.map((metric, index) => (
            <MetricCard
              key={metric.label}
              {...metric}
              delay={0.2 + index * 0.1}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
