import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AdBanner from "@/components/AdBanner";

const units = {
  length: [
    { name: "Kilometers", factor: 0.001 },
    { name: "Meters", factor: 1 },
    { name: "Centimeters", factor: 100 },
    { name: "Millimeters", factor: 1000 },
    { name: "Micrometers", factor: 1000000 },
    { name: "Nanometers", factor: 1000000000 },
    { name: "Miles", factor: 0.000621371 },
    { name: "Yards", factor: 1.09361 },
    { name: "Feet", factor: 3.28084 },
    { name: "Inches", factor: 39.3701 },
    { name: "Nautical Miles", factor: 0.000539957 }
  ],
  weight: [
    { name: "Kilograms", factor: 1 },
    { name: "Grams", factor: 1000 },
    { name: "Milligrams", factor: 1000000 },
    { name: "Metric Tons", factor: 0.001 },
    { name: "Pounds", factor: 2.20462 },
    { name: "Ounces", factor: 35.274 },
    { name: "Stone", factor: 0.157473 }
  ]
};

export default function Convert() {
  const [value, setValue] = useState("");
  const [category, setCategory] = useState("length");
  const [fromUnit, setFromUnit] = useState("Meters");
  const [toUnit, setToUnit] = useState("Feet");

  const convert = () => {
    const unitsList = units[category as keyof typeof units];
    const from = unitsList.find((u) => u.name === fromUnit)!;
    const to = unitsList.find((u) => u.name === toUnit)!;

    // Convert to base unit first (meters for length, kg for weight)
    const baseValue = Number(value) / from.factor;
    // Then convert from base unit to target unit
    const result = baseValue * to.factor;

    return result.toLocaleString(undefined, {
      maximumFractionDigits: 8,
      minimumFractionDigits: 0
    });
  };

  return (
    <div className="space-y-8">
      {/* Top Banner Ad */}
      <AdBanner
        slot="8901234567"
        className="w-full max-w-[728px] h-[90px] mx-auto mb-8"
        format="horizontal"
      />

      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Unit Converter</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="length">Length</SelectItem>
                  <SelectItem value="weight">Weight</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>From</Label>
              <Select value={fromUnit} onValueChange={setFromUnit}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="max-h-[300px] overflow-y-auto">
                  {units[category as keyof typeof units].map((unit) => (
                    <SelectItem key={unit.name} value={unit.name}>
                      {unit.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>To</Label>
              <Select value={toUnit} onValueChange={setToUnit}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="max-h-[300px] overflow-y-auto">
                  {units[category as keyof typeof units].map((unit) => (
                    <SelectItem key={unit.name} value={unit.name}>
                      {unit.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Value</Label>
              <Input
                type="number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Enter value"
              />
            </div>

            {value && (
              <div className="pt-4">
                <div className="flex items-center gap-2">
                  <p className="text-sm text-muted-foreground">
                    {value} {fromUnit}
                  </p>
                  <span className="text-sm text-muted-foreground">=</span>
                  <p className="text-lg font-mono font-medium tabular-nums text-green-500">
                    {convert()}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {toUnit}
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Bottom Banner Ad */}
      <AdBanner
        slot="9012345678"
        className="w-full max-w-[728px] h-[90px] mx-auto mt-8"
        format="horizontal"
      />
    </div>
  );
}