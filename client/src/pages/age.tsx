import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdBanner from "@/components/AdBanner";

export default function Age() {
  const [birthDate, setBirthDate] = useState("");
  const [toDate, setToDate] = useState(new Date().toISOString().split('T')[0]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [result, setResult] = useState<{
    years: number;
    months: number;
    days: number;
    totalDays: number;
  } | null>(null);
  const [daysBetween, setDaysBetween] = useState<number | null>(null);

  const calculateAge = () => {
    const birth = new Date(birthDate);
    const end = new Date(toDate);

    // Calculate the time difference
    const diffTime = Math.abs(end.getTime() - birth.getTime());
    const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // Calculate years
    const years = Math.floor(totalDays / 365);

    // Calculate months
    const months = Math.floor((totalDays % 365) / 30);

    // Calculate remaining days
    const days = totalDays % 30;

    setResult({
      years,
      months,
      days,
      totalDays,
    });
  };

  const calculateDaysBetween = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setDaysBetween(diffDays);
  };

  return (
    <div className="space-y-8">
      {/* Top Banner Ad */}
      <AdBanner
        slot="9876543210"
        className="w-full max-w-[728px] h-[90px] mx-auto mb-8"
        format="horizontal"
      />

      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Date Calculator</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="age" className="space-y-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="age">Age Calculator</TabsTrigger>
                <TabsTrigger value="days">Days Between Dates</TabsTrigger>
              </TabsList>

              <TabsContent value="age" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="birthDate">Birth Date</Label>
                  <Input
                    id="birthDate"
                    type="date"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="toDate">Calculate To Date</Label>
                  <Input
                    id="toDate"
                    type="date"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                  />
                </div>
                <Button
                  className="w-full bg-purple-600 hover:bg-purple-700"
                  onClick={calculateAge}
                  disabled={!birthDate || !toDate}
                >
                  Calculate Age
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
                    <div className="text-center pt-2">
                      <p className="text-sm text-muted-foreground">Total Days</p>
                      <p className="text-lg font-semibold">{result.totalDays}</p>
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="days" className="space-y-4">
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
                  onClick={calculateDaysBetween}
                  disabled={!startDate || !endDate}
                >
                  Calculate Days
                </Button>
                {daysBetween !== null && (
                  <div className="pt-4 text-center">
                    <p className="text-sm text-muted-foreground">Days Between Dates</p>
                    <p className="text-2xl font-semibold text-purple-600">
                      {daysBetween} days
                    </p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Banner Ad */}
      <AdBanner
        slot="0123456789"
        className="w-full max-w-[728px] h-[90px] mx-auto mt-8"
        format="horizontal"
      />
    </div>
  );
}