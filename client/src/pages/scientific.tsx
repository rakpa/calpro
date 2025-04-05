import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AdBanner from "@/components/AdBanner";

const buttons = [
  ["sin", "cos", "tan", "^"],
  ["7", "8", "9", "/"],
  ["4", "5", "6", "*"],
  ["1", "2", "3", "-"],
  ["0", ".", "=", "+"],
  ["(", ")", "π", "C"],
];

export default function Scientific() {
  const [display, setDisplay] = useState("0");
  const [operation, setOperation] = useState("");

  const handleInput = (value: string) => {
    if (value === "C") {
      setDisplay("0");
      setOperation("");
    } else if (value === "=") {
      try {
        let expr = display
          .replace(/π/g, Math.PI.toString())
          .replace(/sin/g, "Math.sin")
          .replace(/cos/g, "Math.cos")
          .replace(/tan/g, "Math.tan");
        const result = eval(expr);
        setDisplay(result.toString());
        setOperation("=");
      } catch (error) {
        setDisplay("Error");
      }
    } else {
      if (display === "0" || operation === "=") {
        setDisplay(value);
        setOperation("");
      } else {
        setDisplay(display + value);
      }
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Banner Ad */}
      <AdBanner
        slot="1234567890" // Replace with your ad slot ID
        className="w-full max-w-[728px] h-[90px] mx-auto mb-8"
        format="horizontal"
      />

      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Scientific Calculator</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-muted p-4 rounded-md mb-4 text-right">
              <span className="text-2xl font-mono">{display}</span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {buttons.map((row, i) =>
                row.map((btn) => (
                  <Button
                    key={btn}
                    variant={["sin", "cos", "tan", "^", "(", ")", "π"].includes(btn) ? "secondary" : "outline"}
                    onClick={() => handleInput(btn)}
                  >
                    {btn}
                  </Button>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Banner Ad */}
      <AdBanner
        slot="5432109876" // Replace with your ad slot ID
        className="w-full max-w-[728px] h-[90px] mx-auto mt-8"
        format="horizontal"
      />
    </div>
  );
}