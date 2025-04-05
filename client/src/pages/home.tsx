import { Link } from "wouter";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Percent,
  Calculator,
  ArrowUpDown,
  DollarSign,
  FlaskConical,
  Clock,
  Home as HomeIcon,
  Calendar,
  Tag,
  CalendarDays, // Added import for CalendarDays icon
} from "lucide-react";
import AdBanner from "@/components/AdBanner";

const calculators = [
  {
    title: "Percentage Calculator",
    description: "Calculate percentages and proportions",
    icon: Percent,
    href: "/percentage",
  },
  {
    title: "Basic Calculator",
    description: "Simple arithmetic calculations",
    icon: Calculator,
    href: "/basic",
  },
  {
    title: "Unit Converter",
    description: "Convert between different units",
    icon: ArrowUpDown,
    href: "/convert",
  },
  {
    title: "Financial Calculator",
    description: "Calculate loans, interest and more",
    icon: DollarSign,
    href: "/financial",
  },
  {
    title: "Mortgage Calculator",
    description: "Calculate monthly mortgage payments",
    icon: HomeIcon,
    href: "/mortgage",
  },
  {
    title: "Age Calculator",
    description: "Calculate exact age and date differences",
    icon: Calendar,
    href: "/age",
  },
  {
    title: "Scientific Calculator",
    description: "Advanced mathematical calculations",
    icon: FlaskConical,
    href: "/scientific",
  },
  {
    title: "Time Calculator",
    description: "Calculate time differences and durations",
    icon: Clock,
    href: "/time",
  },
  {
    title: "Date Difference Calculator",
    description: "Calculate the exact difference between dates",
    icon: CalendarDays,
    href: "/date-diff",
  },
  {
    title: "Discount Calculator",
    description: "Calculate sale prices and savings",
    icon: Tag,
    href: "/discount",
  },
];

// Group calculators into rows of 3
const calculatorRows = calculators.reduce((acc, curr, i) => {
  const rowIndex = Math.floor(i / 3);
  if (!acc[rowIndex]) acc[rowIndex] = [];
  acc[rowIndex].push(curr);
  return acc;
}, [] as typeof calculators[]);

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 space-y-8">
      {/* Top Banner Ad */}
      <AdBanner
        slot="1234567890"
        className="w-full max-w-[728px] h-[90px] mx-auto mb-8"
        format="horizontal"
      />

      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Multi-Purpose Calculator
        </h1>
        <p className="mx-auto mt-4 max-w-[700px] text-muted-foreground text-sm">
          Choose from our range of specialized calculators for all your calculation needs
        </p>
      </div>

      {/* Calculator grid - centered in page */}
      <div className="max-w-6xl mx-auto">
        {calculatorRows.map((row, rowIndex) => (
          <div key={rowIndex} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6 justify-items-center">
            {row.map((calc) => {
              const Icon = calc.icon;
              return (
                <Link key={calc.href} href={calc.href} className="w-full max-w-sm">
                  <Card className="cursor-pointer transition-colors hover:bg-muted/50 h-full">
                    <CardHeader>
                      <Icon className="h-8 w-8 text-primary mb-2" />
                      <CardTitle className="text-lg">{calc.title}</CardTitle>
                      <CardDescription className="text-xs text-muted-foreground">{calc.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              );
            })}
          </div>
        ))}
      </div>

      {/* Bottom Banner Ad */}
      <AdBanner
        slot="5432109876"
        className="w-full max-w-[728px] h-[90px] mx-auto mt-8"
        format="horizontal"
      />
    </div>
  );
}