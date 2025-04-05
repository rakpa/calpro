import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AdBanner from "@/components/AdBanner";

export default function Tip() {
  const [bill, setBill] = useState("");
  const [tipPercent, setTipPercent] = useState("15");
  const [people, setPeople] = useState("1");
  const [result, setResult] = useState<{
    tipAmount: number;
    total: number;
    perPerson: number;
  } | null>(null);

  const calculateTip = () => {
    const billAmount = parseFloat(bill);
    const tipPercentage = parseFloat(tipPercent) / 100;
    const numberOfPeople = parseInt(people);

    const tipAmount = billAmount * tipPercentage;
    const total = billAmount + tipAmount;
    const perPerson = total / numberOfPeople;

    setResult({
      tipAmount: parseFloat(tipAmount.toFixed(2)),
      total: parseFloat(total.toFixed(2)),
      perPerson: parseFloat(perPerson.toFixed(2))
    });
  };

  const tipPresets = [10, 15, 20, 25];

  return (
    <div className="space-y-8">
      {/* Top Banner Ad */}
      <AdBanner
        slot="8901234567" // Replace with your ad slot ID
        className="w-full max-w-[728px] h-[90px] mx-auto mb-8"
        format="horizontal"
      />

      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Tip Calculator</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="bill">Bill Amount ($)</Label>
              <Input
                id="bill"
                type="number"
                value={bill}
                onChange={(e) => setBill(e.target.value)}
                placeholder="Enter bill amount"
              />
            </div>

            <div className="space-y-2">
              <Label>Tip Percentage</Label>
              <div className="flex gap-2">
                {tipPresets.map((preset) => (
                  <Button
                    key={preset}
                    variant={tipPercent === preset.toString() ? "default" : "outline"}
                    className="flex-1"
                    onClick={() => setTipPercent(preset.toString())}
                  >
                    {preset}%
                  </Button>
                ))}
              </div>
              <Input
                type="number"
                value={tipPercent}
                onChange={(e) => setTipPercent(e.target.value)}
                placeholder="Custom tip %"
                className="mt-2"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="people">Number of People</Label>
              <Input
                id="people"
                type="number"
                min="1"
                value={people}
                onChange={(e) => setPeople(e.target.value)}
                placeholder="Number of people"
              />
            </div>

            <Button
              className="w-full bg-purple-600 hover:bg-purple-700"
              onClick={calculateTip}
              disabled={!bill || !tipPercent || !people}
            >
              Calculate
            </Button>

            {result && (
              <div className="pt-4 space-y-2">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-sm text-muted-foreground">Tip Amount</p>
                    <p className="text-lg font-semibold">${result.tipAmount}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total</p>
                    <p className="text-lg font-semibold">${result.total}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-muted-foreground">Per Person</p>
                    <p className="text-xl font-semibold text-purple-600">
                      ${result.perPerson}
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
        slot="9012345678" // Replace with your ad slot ID
        className="w-full max-w-[728px] h-[90px] mx-auto mt-8"
        format="horizontal"
      />
    </div>
  );
}
