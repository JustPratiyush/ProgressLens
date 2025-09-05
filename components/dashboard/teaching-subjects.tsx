// Import HoverCard components from your UI library
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Type definitions remain the same...
type ClassData = {
  class: string;
  attendance: string;
  marks: string;
  score: string;
};

type Subject = {
  subject: string;
  attendance: string;
  marks: string;
  overallScore: string;
  classes: ClassData[];
};

export function TeachingSubjects({
  subjects,
  loading,
}: {
  subjects?: Subject[];
  loading: boolean;
}) {
  // Loading state remains the same...
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-base">My Teaching Subjects</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="h-8 w-full bg-muted rounded" />
            <div className="h-8 w-full bg-muted rounded" />
            <div className="h-8 w-full bg-muted rounded" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">My Teaching Subjects</CardTitle>
      </CardHeader>
      <CardContent className="px-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Subject</TableHead>
              <TableHead>Overall Attendance</TableHead>
              <TableHead>Overall Marks</TableHead>
              <TableHead className="text-right">Overall Score</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {subjects?.map((s) => (
              // The HoverCard component now wraps both the trigger and content
              <HoverCard key={s.subject} openDelay={200} closeDelay={100}>
                {/* The ENTIRE TableRow is now the trigger */}
                <HoverCardTrigger asChild>
                  <TableRow className="cursor-pointer">
                    <TableCell className="font-medium">{s.subject}</TableCell>
                    <TableCell>{s.attendance}</TableCell>
                    <TableCell>{s.marks}</TableCell>
                    <TableCell className="text-right">
                      {s.overallScore}
                    </TableCell>
                  </TableRow>
                </HoverCardTrigger>

                {/* The content remains the same */}
                <HoverCardContent className="w-80" align="start">
                  <h4 className="font-bold mb-2">
                    {s.subject} - Class Breakdown
                  </h4>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Class</TableHead>
                        <TableHead>Attendance</TableHead>
                        <TableHead>Marks</TableHead>
                        <TableHead className="text-right">Score</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {s.classes.map((c) => (
                        <TableRow key={c.class}>
                          <TableCell>{c.class}</TableCell>
                          <TableCell>{c.attendance}</TableCell>
                          <TableCell>{c.marks}</TableCell>
                          <TableCell className="text-right">
                            {c.score}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </HoverCardContent>
              </HoverCard>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
