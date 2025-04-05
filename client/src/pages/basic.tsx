import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AdBanner from "@/components/AdBanner";

const buttons = [
  ["7", "8", "9", "/"],
  ["4", "5", "6", "*"],
  ["1", "2", "3", "-"],
  ["0", ".", "=", "+"],
  ["C"],
];

export default function Basic() {
  const [display, setDisplay] = useState("0");
  const [operation, setOperation] = useState("");
  const [prevValue, setPrevValue] = useState<number | null>(null);
  const [newNumber, setNewNumber] = useState(true);

  const handleNumber = (num: string) => {
    if (newNumber || display === "0") {
      setDisplay(num);
      setNewNumber(false);
    } else {
      setDisplay(display + num);
    }
  };

  const handleOperator = (op: string) => {
    const currentValue = parseFloat(display);

    if (op === "=") {
      if (prevValue !== null && operation && !newNumber) {
        let result = 0;
        switch (operation) {
          case "+":
            result = prevValue + currentValue;
            break;
          case "-":
            result = prevValue - currentValue;
            break;
          case "*":
            result = prevValue * currentValue;
            break;
          case "/":
            result = prevValue / currentValue;
            break;
        }
        setDisplay(result.toString());
        setPrevValue(null);
        setOperation("");
        setNewNumber(true);
      }
    } else if (op === "C") {
      setDisplay("0");
      setOperation("");
      setPrevValue(null);
      setNewNumber(true);
    } else {
      setPrevValue(currentValue);
      setOperation(op);
      setNewNumber(true);
    }
  };

  const handleDecimal = () => {
    if (!display.includes(".")) {
      setDisplay(display + ".");
      setNewNumber(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Banner Ad */}
      <AdBanner
        slot="4567890123" // Replace with your ad slot ID
        className="w-full max-w-[728px] h-[90px] mx-auto mb-8"
        format="horizontal"
      />

      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Basic Calculator</CardTitle>
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
                    className={btn === "C" ? "col-span-4" : ""}
                    variant={["*", "/", "-", "+", "="].includes(btn) ? "secondary" : "outline"}
                    onClick={() => {
                      if (btn === ".") handleDecimal();
                      else if (["+", "-", "*", "/", "=", "C"].includes(btn)) handleOperator(btn);
                      else handleNumber(btn);
                    }}
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
        slot="5678901234" // Replace with your ad slot ID
        className="w-full max-w-[728px] h-[90px] mx-auto mt-8"
        format="horizontal"
      />
    </div>
  );
}