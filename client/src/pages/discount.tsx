import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdBanner from "@/components/AdBanner";

export default function Discount() {
  // Single Discount Calculator State
  const [originalPrice, setOriginalPrice] = useState("");
  const [discountPercent, setDiscountPercent] = useState("");
  const [result, setResult] = useState<{
    finalPrice: number;
    savedAmount: number;
  } | null>(null);

  // Multiple Discounts Calculator State
  const [basePrice, setBasePrice] = useState("");
  const [discounts, setDiscounts] = useState(["", "", ""]);
  const [multipleResult, setMultipleResult] = useState<{
    finalPrice: number;
    totalSaved: number;
    discountBreakdown: number[];
  } | null>(null);

  const calculateSingleDiscount = () => {
    const price = parseFloat(originalPrice);
    const discount = parseFloat(discountPercent);
    const savedAmount = (price * discount) / 100;
    const finalPrice = price - savedAmount;

    setResult({
      finalPrice: parseFloat(finalPrice.toFixed(2)),
      savedAmount: parseFloat(savedAmount.toFixed(2)),
    });
  };

  const calculateMultipleDiscounts = () => {
    const price = parseFloat(basePrice);
    let currentPrice = price;
    const savings: number[] = [];

    discounts.forEach((discount) => {
      if (discount) {
        const discountAmount = (currentPrice * parseFloat(discount)) / 100;
        savings.push(parseFloat(discountAmount.toFixed(2)));
        currentPrice -= discountAmount;
      }
    });

    const totalSaved = savings.reduce((acc, curr) => acc + curr, 0);

    setMultipleResult({
      finalPrice: parseFloat(currentPrice.toFixed(2)),
      totalSaved: parseFloat(totalSaved.toFixed(2)),
      discountBreakdown: savings,
    });
  };

  return (
    <div className="space-y-8">
      {/* Top Banner Ad */}
      <AdBanner
        slot="3456789012"
        className="w-full max-w-[728px] h-[90px] mx-auto mb-8"
        format="horizontal"
      />

      <div className="max-w-2xl mx-auto px-4">
        <Card>
          <CardHeader>
            <CardTitle>Discount Calculator</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="single" className="space-y-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="single">Single Discount</TabsTrigger>
                <TabsTrigger value="multiple">Multiple Discounts</TabsTrigger>
              </TabsList>

              <TabsContent value="single" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="originalPrice">Original Price ($)</Label>
                  <Input
                    id="originalPrice"
                    type="number"
                    value={originalPrice}
                    onChange={(e) => setOriginalPrice(e.target.value)}
                    placeholder="Enter original price"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="discountPercent">Discount Percentage (%)</Label>
                  <Input
                    id="discountPercent"
                    type="number"
                    value={discountPercent}
                    onChange={(e) => setDiscountPercent(e.target.value)}
                    placeholder="Enter discount percentage"
                  />
                </div>
                <Button
                  className="w-full bg-purple-600 hover:bg-purple-700"
                  onClick={calculateSingleDiscount}
                  disabled={!originalPrice || !discountPercent}
                >
                  Calculate Discount
                </Button>
                {result && (
                  <div className="pt-4 text-center space-y-2">
                    <p className="text-2xl font-semibold">
                      Final Price: <span className="text-purple-600">${result.finalPrice}</span>
                    </p>
                    <p className="text-lg text-green-600">
                      You Save: ${result.savedAmount}
                    </p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="multiple" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="basePrice">Original Price ($)</Label>
                  <Input
                    id="basePrice"
                    type="number"
                    value={basePrice}
                    onChange={(e) => setBasePrice(e.target.value)}
                    placeholder="Enter original price"
                  />
                </div>
                {discounts.map((discount, index) => (
                  <div key={index} className="space-y-2">
                    <Label htmlFor={`discount${index}`}>
                      Discount {index + 1} Percentage (%)
                    </Label>
                    <Input
                      id={`discount${index}`}
                      type="number"
                      value={discount}
                      onChange={(e) => {
                        const newDiscounts = [...discounts];
                        newDiscounts[index] = e.target.value;
                        setDiscounts(newDiscounts);
                      }}
                      placeholder={`Enter discount ${index + 1}`}
                    />
                  </div>
                ))}
                <Button
                  className="w-full bg-purple-600 hover:bg-purple-700"
                  onClick={calculateMultipleDiscounts}
                  disabled={!basePrice || !discounts.some(d => d !== "")}
                >
                  Calculate Multiple Discounts
                </Button>
                {multipleResult && (
                  <div className="pt-4 text-center space-y-2">
                    <p className="text-2xl font-semibold">
                      Final Price: <span className="text-purple-600">${multipleResult.finalPrice}</span>
                    </p>
                    <p className="text-lg text-green-600">
                      Total Savings: ${multipleResult.totalSaved}
                    </p>
                    <div className="text-sm text-muted-foreground">
                      <p>Savings Breakdown:</p>
                      {multipleResult.discountBreakdown.map((saving, index) => (
                        saving > 0 && (
                          <p key={index}>
                            Discount {index + 1}: ${saving}
                          </p>
                        )
                      ))}
                    </div>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Banner Ad */}
      <AdBanner
        slot="4567890123"
        className="w-full max-w-[728px] h-[90px] mx-auto mt-8"
        format="horizontal"
      />
    </div>
  );
}
