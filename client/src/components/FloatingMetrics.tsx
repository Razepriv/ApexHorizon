import MetricCard from "./MetricCard";
import { Zap, Target, DollarSign } from "lucide-react";

export default function FloatingMetrics() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4 md:px-8 -mt-20 relative z-20">
      <MetricCard value="847" label="Tasks Automated Today" icon={Zap} />
      <MetricCard value="99.7%" label="Accuracy Rate" icon={Target} />
      <MetricCard value="$2.4M" label="Saved This Month" icon={DollarSign} />
    </div>
  );
}
