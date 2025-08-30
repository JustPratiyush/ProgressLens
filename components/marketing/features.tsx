// components/marketing/features.tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  FileSpreadsheet,
  BarChart3,
  Award as IdCard,
  Bell,
  SlidersHorizontal,
  TrendingUp,
} from "lucide-react";

const features = [
  {
    title: "Easy data upload",
    description: "Import CSV/XLSX and map fields in minutes.",
    icon: FileSpreadsheet,
  },
  {
    title: "Color-coded risk dashboard",
    description: "Clear visual indicators of student risk levels.",
    icon: BarChart3,
  },
  {
    title: "Student profiles",
    description: "See attendance and score trends at a glance.",
    icon: IdCard,
  },
  {
    title: "Mentor/guardian alerts",
    description: "Notify the right adults when thresholds are crossed.",
    icon: Bell,
  },
  {
    title: "Configurable thresholds",
    description: "Tune alerts without complex AI or coding.",
    icon: SlidersHorizontal,
  },
  {
    title: "Progress tracking",
    description:
      "Monitor student improvement and intervention effectiveness over time.",
    icon: TrendingUp,
  },
];

export function Features() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-4 py-14 md:py-20">
      <div className="mb-10">
        <Badge className="bg-sky-100 text-sky-800 hover:bg-sky-100">
          Built for educators
        </Badge>
        <h2 className="mt-3 text-balance text-2xl font-semibold sm:text-3xl">
          What you can do
        </h2>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Identify and respond to student risk early—no extra training required.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f) => {
          const Icon = f.icon;
          return (
            <Card key={f.title} className="h-full">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-teal-50 text-teal-700">
                    <Icon size={18} aria-hidden="true" />
                  </span>
                  <CardTitle className="text-base">{f.title}</CardTitle>
                </div>
                <CardDescription className="sr-only">{f.title}</CardDescription>
              </CardHeader>
              <CardContent className="pt-0 text-sm text-muted-foreground">
                {f.description}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
