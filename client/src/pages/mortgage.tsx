import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AdBanner from "@/components/AdBanner";

export default function Mortgage() {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [term, setTerm] = useState("");
  const [propertyTax, setPropertyTax] = useState("");
  const [insurance, setInsurance] = useState("");
  const [result, setResult] = useState<{
    monthlyPayment: number;
    totalPayment: number;
    breakdown: {
      principal: number;
      interest: number;
      tax: number;
      insurance: number;
    };
  } | null>(null);

  const calculateMortgage = () => {
    const p = parseFloat(principal);
    const r = (parseFloat(rate) / 100) / 12; // Monthly interest rate
    const n = parseFloat(term) * 12; // Total number of payments
    const monthlyTax = propertyTax ? parseFloat(propertyTax) / 12 : 0;
    const monthlyInsurance = insurance ? parseFloat(insurance) / 12 : 0;

    // Monthly mortgage payment formula: P * (r * (1 + r)^n) / ((1 + r)^n - 1)
    const mortgagePayment = p * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalMonthlyPayment = mortgagePayment + monthlyTax + monthlyInsurance;

    setResult({
      monthlyPayment: parseFloat(totalMonthlyPayment.toFixed(2)),
      totalPayment: parseFloat((totalMonthlyPayment * n).toFixed(2)),
      breakdown: {
        principal: parseFloat(p.toFixed(2)),
        interest: parseFloat(((mortgagePayment * n) - p).toFixed(2)),
        tax: parseFloat((monthlyTax * n).toFixed(2)),
        insurance: parseFloat((monthlyInsurance * n).toFixed(2))
      }
    });
  };

  return (
    <div className="space-y-8">
      {/* Top Banner Ad */}
      <AdBanner
        slot="6789012345"
        className="w-full max-w-[728px] h-[90px] mx-auto mb-8"
        format="horizontal"
      />

      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Mortgage Calculator</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="principal">Loan Amount ($)</Label>
              <Input
                id="principal"
                type="number"
                value={principal}
                onChange={(e) => setPrincipal(e.target.value)}
                placeholder="Enter loan amount"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rate">Annual Interest Rate (%)</Label>
              <Input
                id="rate"
                type="number"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                placeholder="Enter interest rate"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="term">Loan Term (Years)</Label>
              <Input
                id="term"
                type="number"
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                placeholder="Enter loan term"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="propertyTax">Annual Property Tax ($, optional)</Label>
              <Input
                id="propertyTax"
                type="number"
                value={propertyTax}
                onChange={(e) => setPropertyTax(e.target.value)}
                placeholder="Enter annual property tax"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="insurance">Annual Insurance ($, optional)</Label>
              <Input
                id="insurance"
                type="number"
                value={insurance}
                onChange={(e) => setInsurance(e.target.value)}
                placeholder="Enter annual insurance"
              />
            </div>
            <Button
              className="w-full bg-purple-600 hover:bg-purple-700"
              onClick={calculateMortgage}
              disabled={!principal || !rate || !term}
            >
              Calculate
            </Button>
            {result !== null && (
              <div className="pt-4 space-y-2">
                <div className="text-center">
                  <p className="text-lg font-semibold">
                    Monthly Payment: <span className="text-purple-600">${result.monthlyPayment}</span>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Total Payment: ${result.totalPayment}
                  </p>
                </div>
                <div className="space-y-1 text-sm">
                  <p>Principal: ${result.breakdown.principal}</p>
                  <p>Total Interest: ${result.breakdown.interest}</p>
                  {result.breakdown.tax > 0 && (
                    <p>Total Property Tax: ${result.breakdown.tax}</p>
                  )}
                  {result.breakdown.insurance > 0 && (
                    <p>Total Insurance: ${result.breakdown.insurance}</p>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Bottom Banner Ad */}
      <AdBanner
        slot="7890123456"
        className="w-full max-w-[728px] h-[90px] mx-auto mt-8"
        format="horizontal"
      />
    </div>
  );
}