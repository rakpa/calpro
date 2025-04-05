import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function Percentage() {
  // Separate state for each calculator section
  const [percentOf, setPercentOf] = useState({ value1: "", value2: "" });
  const [whatPercent, setWhatPercent] = useState({ value1: "", value2: "" });
  const [percentChange, setPercentChange] = useState({ value1: "", value2: "" });
  const [activeSection, setActiveSection] = useState<number>(0);
  const [result1, setResult1] = useState<number | null>(null);
  const [result2, setResult2] = useState<number | null>(null);
  const [result3, setResult3] = useState<number | null>(null);

  // Reset results when switching between sections
  useEffect(() => {
    setResult1(null);
    setResult2(null);
    setResult3(null);
  }, [activeSection]);

  const calculatePercentageOf = () => {
    const num = parseFloat(percentOf.value1);
    const percent = parseFloat(percentOf.value2);
    setResult1((num * percent) / 100);
  };

  const calculateWhatPercent = () => {
    const num = parseFloat(whatPercent.value1);
    const total = parseFloat(whatPercent.value2);
    setResult2((num / total) * 100);
  };

  const calculatePercentageChange = () => {
    const from = parseFloat(percentChange.value1);
    const to = parseFloat(percentChange.value2);
    setResult3(((to - from) / from) * 100);
  };

  // Helper function to determine if an input should be highlighted
  const shouldHighlight = (section: number, values: { value1: string, value2: string }) => {
    if (section !== activeSection) return false;
    return values.value1.length > 0 && values.value2.length === 0;
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Percentage Calculator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Calculate X% of Y */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
              <Input
                type="number"
                placeholder="What is"
                className="w-full sm:w-32"
                value={percentOf.value1}
                onChange={(e) => {
                  setPercentOf(prev => ({ ...prev, value1: e.target.value }));
                  setActiveSection(0);
                }}
              />
              <span className="px-2">% of</span>
              <Input
                type="number"
                placeholder="number"
                className={cn(
                  "w-full sm:w-32",
                  shouldHighlight(0, percentOf) && "ring-2 ring-primary ring-offset-2"
                )}
                value={percentOf.value2}
                onChange={(e) => setPercentOf(prev => ({ ...prev, value2: e.target.value }))}
              />
              <Button 
                onClick={calculatePercentageOf}
                disabled={!percentOf.value1 || !percentOf.value2}
                className="w-full sm:w-auto bg-purple-600 text-white hover:bg-purple-700 mt-2 sm:mt-0"
              >
                Calculate
              </Button>
            </div>
            {result1 !== null && (
              <div className="text-center pt-2">
                <p className="text-lg">
                  Result: <strong>{result1.toFixed(2)}</strong>
                </p>
              </div>
            )}
          </div>

          {/* Calculate what percent X is of Y */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
              <Input
                type="number"
                placeholder="Number"
                className="w-full sm:w-32"
                value={whatPercent.value1}
                onChange={(e) => {
                  setWhatPercent(prev => ({ ...prev, value1: e.target.value }));
                  setActiveSection(1);
                }}
              />
              <span className="px-2">is what percent of</span>
              <Input
                type="number"
                placeholder="number"
                className={cn(
                  "w-full sm:w-32",
                  shouldHighlight(1, whatPercent) && "ring-2 ring-primary ring-offset-2"
                )}
                value={whatPercent.value2}
                onChange={(e) => setWhatPercent(prev => ({ ...prev, value2: e.target.value }))}
              />
              <Button 
                onClick={calculateWhatPercent}
                disabled={!whatPercent.value1 || !whatPercent.value2}
                className="w-full sm:w-auto bg-purple-600 text-white hover:bg-purple-700 mt-2 sm:mt-0"
              >
                Calculate
              </Button>
            </div>
            {result2 !== null && (
              <div className="text-center pt-2">
                <p className="text-lg">
                  Result: <strong>{result2.toFixed(2)}%</strong>
                </p>
              </div>
            )}
          </div>

          {/* Calculate percentage increase/decrease */}
          <div className="space-y-4">
            <div className="w-full text-sm mb-2">
              What is the percentage increase/decrease from
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
              <Input
                type="number"
                placeholder="From"
                className="w-full sm:w-32"
                value={percentChange.value1}
                onChange={(e) => {
                  setPercentChange(prev => ({ ...prev, value1: e.target.value }));
                  setActiveSection(2);
                }}
              />
              <span className="px-2">to</span>
              <Input
                type="number"
                placeholder="To"
                className={cn(
                  "w-full sm:w-32",
                  shouldHighlight(2, percentChange) && "ring-2 ring-primary ring-offset-2"
                )}
                value={percentChange.value2}
                onChange={(e) => setPercentChange(prev => ({ ...prev, value2: e.target.value }))}
              />
              <Button 
                onClick={calculatePercentageChange}
                disabled={!percentChange.value1 || !percentChange.value2}
                className="w-full sm:w-auto bg-purple-600 text-white hover:bg-purple-700 mt-2 sm:mt-0"
              >
                Calculate
              </Button>
            </div>
            {result3 !== null && (
              <div className="text-center pt-2">
                <p className="text-lg">
                  Result: <strong>{result3 > 0 ? "+" : ""}{result3.toFixed(2)}%</strong>
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}