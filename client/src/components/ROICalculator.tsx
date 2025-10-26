import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { TrendingUp, DollarSign, Clock, Calculator, ArrowRight } from "lucide-react";
import GlowText from "@/components/ui/glow-text";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface ROIData {
  month: number;
  traditional: number;
  apex: number;
  savings: number;
}

export default function ROICalculator() {
  const [employees, setEmployees] = useState(10);
  const [avgSalary, setAvgSalary] = useState(50000);
  const [hoursPerWeek, setHoursPerWeek] = useState(20);
  const [roiData, setRoiData] = useState<ROIData[]>([]);

  const calculateROI = () => {
    const hourlyCost = avgSalary / 52 / 40;
    const weeklyCost = hourlyCost * hoursPerWeek * employees;
    const monthlyCost = weeklyCost * 4;

    // Initial setup cost and monthly AI cost
    const setupCost = 5000;
    const monthlyAICost = employees * 100;

    const data: ROIData[] = [];
    let traditionalCumulative = 0;
    let apexCumulative = -setupCost;

    for (let month = 1; month <= 12; month++) {
      traditionalCumulative += monthlyCost;
      apexCumulative += monthlyCost * 0.7 - monthlyAICost; // Assume 70% cost reduction

      data.push({
        month,
        traditional: Math.round(traditionalCumulative),
        apex: Math.round(apexCumulative),
        savings: Math.round(traditionalCumulative - apexCumulative),
      });
    }

    setRoiData(data);
  };

  useEffect(() => {
    calculateROI();
  }, [employees, avgSalary, hoursPerWeek]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const annualSavings = roiData[11]?.savings || 0;
  const roi = ((annualSavings / (5000 * 12)) * 100).toFixed(0);

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
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glassmorphism mb-6"
          >
            <Calculator className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">ROI Calculator</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <GlowText>Calculate Your </GlowText>
            <GlowText highlight>Savings</GlowText>
          </h2>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card className="border-primary/20 bg-card/50 backdrop-blur-sm p-8 hover:border-primary/40 transition-colors duration-300">
              <h3 className="text-2xl font-bold mb-6">Your Current Costs</h3>
              
              <div className="space-y-6">
                <div>
                  <Label>Number of Employees</Label>
                  <Slider
                    value={[employees]}
                    onValueChange={(value) => setEmployees(value[0])}
                    min={1}
                    max={100}
                    step={1}
                    className="mt-2"
                    data-testid="slider-employees"
                  />
                  <div className="text-right text-sm text-muted-foreground mt-1">{employees} employees</div>
                </div>

                <div>
                  <Label>Average Salary per Employee</Label>
                  <Input
                    type="number"
                    value={avgSalary}
                    onChange={(e) => setAvgSalary(Number(e.target.value))}
                    className="mt-2 glassmorphism"
                    data-testid="input-salary"
                  />
                </div>

                <div>
                  <Label>Hours Spent on Manual Tasks (per week, per employee)</Label>
                  <Slider
                    value={[hoursPerWeek]}
                    onValueChange={(value) => setHoursPerWeek(value[0])}
                    min={1}
                    max={40}
                    step={1}
                    className="mt-2"
                    data-testid="slider-hours"
                  />
                  <div className="text-right text-sm text-muted-foreground mt-1">{hoursPerWeek} hours/week</div>
                </div>
              </div>
            </Card>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="p-4 rounded-xl glassmorphism"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">Time Saved</span>
                </div>
                <div className="text-2xl font-bold">
                  {hoursPerWeek * employees * 52}
                  <span className="text-sm text-text-muted ml-1">hrs/year</span>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="p-4 rounded-xl glassmorphism"
              >
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">ROI</span>
                </div>
                <div className="text-2xl font-bold">
                  {roi}
                  <span className="text-sm text-text-muted ml-1">%</span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <Card className="border-primary/20 bg-gradient-to-br from-primary/10 to-chart-2/10 backdrop-blur-sm p-6 hover:border-primary/40 transition-colors duration-300">
              <h3 className="text-lg font-semibold mb-6">Cost Comparison</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={roiData}
                    margin={{
                      top: 10,
                      right: 10,
                      left: 0,
                      bottom: 0,
                    }}
                  >
                    <defs>
                      <linearGradient id="traditional" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="apex" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#22c55e" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis
                      dataKey="month"
                      tickFormatter={(value) => `M${value}`}
                      stroke="#888"
                      fontSize={12}
                    />
                    <YAxis
                      tickFormatter={(value) => `$${Math.round(value / 1000)}k`}
                      stroke="#888"
                      fontSize={12}
                    />
                    <Tooltip
                      formatter={(value: number) => formatCurrency(value)}
                      labelFormatter={(label) => `Month ${label}`}
                    />
                    <Area
                      type="monotone"
                      dataKey="traditional"
                      stroke="#ef4444"
                      fill="url(#traditional)"
                      strokeWidth={2}
                      name="Traditional Cost"
                    />
                    <Area
                      type="monotone"
                      dataKey="apex"
                      stroke="#22c55e"
                      fill="url(#apex)"
                      strokeWidth={2}
                      name="With APEX AI"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <div className="grid grid-cols-2 gap-4">
              <Card className="border-primary/20 bg-gradient-to-br from-primary/10 to-chart-2/10 backdrop-blur-sm p-6 hover:border-primary/40 transition-colors duration-300">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-muted-foreground">Annual Savings</div>
                    <div className="text-2xl font-bold text-primary">{formatCurrency(annualSavings)}</div>
                  </div>
                </div>
              </Card>

              <motion.a
                href="#contact"
                className="flex items-center justify-center gap-2 p-6 rounded-xl bg-primary/20 border border-primary/40 text-primary hover:bg-primary/30 transition-colors duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="font-medium">Get Started</span>
                <ArrowRight className="w-5 h-5" />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}