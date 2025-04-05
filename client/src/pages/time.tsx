import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdBanner from "@/components/AdBanner";

export default function Time() {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [timeDifference, setTimeDifference] = useState<string | null>(null);
  const [daysDifference, setDaysDifference] = useState<number | null>(null);

  const calculateTimeDifference = () => {
    const start = new Date(`1970/01/01 ${startTime}`);
    const end = new Date(`1970/01/01 ${endTime}`);

    let diff = end.getTime() - start.getTime();
    if (diff < 0) {
      diff += 24 * 60 * 60 * 1000;
    }

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    setTimeDifference(`${hours} hours and ${minutes} minutes`);
  };

  const calculateDaysBetween = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setDaysDifference(diffDays);
  };

  return (
    <div className="space-y-8">
      {/* Top Banner Ad */}
      <AdBanner
        slot="1234567890"
        className="w-full max-w-[728px] h-[90px] mx-auto mb-8"
        format="horizontal"
      />

      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Time Calculator</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="time" className="space-y-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="time">Time Difference</TabsTrigger>
                <TabsTrigger value="days">Days Between</TabsTrigger>
              </TabsList>

              <TabsContent value="time" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="startTime">Start Time</Label>
                  <Input
                    id="startTime"
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endTime">End Time</Label>
                  <Input
                    id="endTime"
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                  />
                </div>
                <Button
                  className="w-full bg-purple-600 hover:bg-purple-700"
                  onClick={calculateTimeDifference}
                  disabled={!startTime || !endTime}
                >
                  Calculate Time Difference
                </Button>
                {timeDifference && (
                  <div className="pt-4 text-center">
                    <p className="text-lg">
                      Time Difference: <strong>{timeDifference}</strong>
                    </p>
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
                  Calculate Days Between
                </Button>
                {daysDifference !== null && (
                  <div className="pt-4 text-center">
                    <p className="text-lg">
                      Days Between: <strong>{daysDifference} days</strong>
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
        slot="0987654321"
        className="w-full max-w-[728px] h-[90px] mx-auto mt-8"
        format="horizontal"
      />
    </div>
  );
}