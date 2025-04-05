import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AdBanner from "@/components/AdBanner";

export default function DateDiff() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [result, setResult] = useState<{
    days: number;
    months: number;
    years: number;
  } | null>(null);

  const calculateDifference = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    // Calculate the time difference
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    // Calculate years and remaining days
    const years = Math.floor(diffDays / 365);
    const remainingDays = diffDays % 365;
    
    // Calculate months (approximate)
    const months = Math.floor(remainingDays / 30);
    const days = remainingDays % 30;

    setResult({
      days,
      months,
      years
    });
  };

  return (
    <div className="space-y-8">
      {/* Top Banner Ad */}
      <AdBanner
        slot="2345678901"
        className="w-full max-w-[728px] h-[90px] mx-auto mb-8"
        format="horizontal"
      />

      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Days Between Dates Calculator</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            <Button
              className="w-full bg-purple-600 hover:bg-purple-700"
              onClick={calculateDifference}
              disabled={!startDate || !endDate}
            >
              Calculate Difference
            </Button>
            {result && (
              <div className="pt-4 space-y-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-sm text-muted-foreground">Years</p>
                    <p className="text-2xl font-semibold text-purple-600">
                      {result.years}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Months</p>
                    <p className="text-2xl font-semibold text-purple-600">
                      {result.months}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Days</p>
                    <p className="text-2xl font-semibold text-purple-600">
                      {result.days}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Bottom Banner Ad */}
      <AdBanner
        slot="3456789012"
        className="w-full max-w-[728px] h-[90px] mx-auto mt-8"
        format="horizontal"
      />
    </div>
  );
}
