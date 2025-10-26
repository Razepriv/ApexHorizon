import MetricCard from "../MetricCard";
import { Zap } from "lucide-react";

export default function MetricCardExample() {
  return (
    <div className="p-8 bg-background">
      <MetricCard value="847" label="Tasks Automated Today" icon={Zap} />
    </div>
  );
}
