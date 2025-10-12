import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { TrendingUp, DollarSign, Clock, Zap } from "lucide-react";

export default function ROICalculator() {
  const [employees, setEmployees] = useState(10);
  const [avgSalary, setAvgSalary] = useState(50000);
  const [hoursPerWeek, setHoursPerWeek] = useState(20);

  const hourlyCost = avgSalary / 52 / 40;
  const weeklyCost = hourlyCost * hoursPerWeek * employees;
  const monthlyCost = weeklyCost * 4;
  const yearlyCost = monthlyCost * 12;
  
  const aiCost = 5000;
  const monthlySavings = monthlyCost - aiCost;
  const yearlySavings = monthlySavings * 12;
  const roi = ((yearlySavings / (aiCost * 12)) * 100).toFixed(0);

  return (
    <section className="py-24 md:py-32 relative">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">
              Calculate Your ROI
            </span>
          </h2>
          <p className="text-xl text-muted-foreground">See exactly how much you'll save with AI automation</p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="border-primary/20 bg-card/50 backdrop-blur-sm p-8">
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
                  className="mt-2"
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

          <div className="space-y-4">
            <Card className="border-primary/20 bg-gradient-to-br from-primary/10 to-chart-2/10 backdrop-blur-sm p-6 hover-elevate">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-md bg-primary/20 flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="text-sm text-muted-foreground">Monthly Savings</div>
                  <div className="text-3xl font-bold text-primary">${monthlySavings.toLocaleString()}</div>
                </div>
              </div>
            </Card>

            <Card className="border-primary/20 bg-gradient-to-br from-chart-2/10 to-primary/10 backdrop-blur-sm p-6 hover-elevate">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-md bg-chart-2/20 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-chart-2" />
                </div>
                <div className="flex-1">
                  <div className="text-sm text-muted-foreground">Yearly Savings</div>
                  <div className="text-3xl font-bold text-chart-2">${yearlySavings.toLocaleString()}</div>
                </div>
              </div>
            </Card>

            <Card className="border-primary/20 bg-gradient-to-br from-chart-4/10 to-primary/10 backdrop-blur-sm p-6 hover-elevate">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-md bg-chart-4/20 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-chart-4" />
                </div>
                <div className="flex-1">
                  <div className="text-sm text-muted-foreground">Return on Investment</div>
                  <div className="text-3xl font-bold text-chart-4">{roi}%</div>
                </div>
              </div>
            </Card>

            <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-chart-2/5 backdrop-blur-sm p-6">
              <div className="flex items-center gap-4">
                <Clock className="w-6 h-6 text-primary" />
                <div className="flex-1">
                  <div className="text-sm text-muted-foreground">Hours Saved Per Year</div>
                  <div className="text-2xl font-bold">{(hoursPerWeek * employees * 52).toLocaleString()} hours</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
