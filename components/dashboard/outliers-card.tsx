import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const outliers = [
  {
    name: "Jessica Chen",
    initials: "JC",
    reason: "Excels in self-study despite low class participation.",
    type: "Academic Anomaly",
    tags: ["Low Attendance", "High Marks"],
  },
  {
    name: "Michael Rao",
    initials: "MR",
    reason:
      "Founder of a startup with $500k funding. Low engagement in class but exceptional real-world performance.",
    type: "Extracurricular",
    tags: ["Low Marks", "Founder"],
  },
  {
    name: "Priya Singh",
    initials: "PS",
    reason:
      "Working a remote job ($100k/year) as a software developer. Contributes to open-source projects.",
    type: "Professional",
    tags: ["Low Attendance", "Developer"],
  },
];

// Helper function to assign a color class based on the tag's content
const getTagColor = (tag: string) => {
  switch (tag.toLowerCase()) {
    case "low attendance":
      return "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/50 dark:text-amber-300 dark:border-amber-700/60";
    case "high marks":
      return "bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/50 dark:text-emerald-300 dark:border-emerald-700/60";
    case "low marks":
      return "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/50 dark:text-red-300 dark:border-red-700/60";
    case "founder":
      return "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/50 dark:text-blue-300 dark:border-blue-700/60";
    case "developer":
      return "bg-indigo-100 text-indigo-800 border-indigo-200 dark:bg-indigo-900/50 dark:text-indigo-300 dark:border-indigo-700/60";
    default:
      return "border-transparent bg-secondary text-secondary-foreground";
  }
};

export function OutliersCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Outlier Detection</CardTitle>
        <CardDescription>
          Students with unique patterns of performance and engagement.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {outliers.map((outlier) => (
            <li key={outlier.name} className="flex items-start gap-4">
              <Avatar>
                <AvatarFallback>{outlier.initials}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-semibold">{outlier.name}</p>
                    {outlier.tags.map((tag) => (
                      <Badge
                        key={tag}
                        className={cn("font-normal border", getTagColor(tag))}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Badge variant="secondary" className="shrink-0">
                    {outlier.type}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {outlier.reason}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
