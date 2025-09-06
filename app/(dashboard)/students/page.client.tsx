"use client";

import { useState, useMemo } from "react";
import useSWR from "swr";
import { StudentTable } from "@/components/students/student-table";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import type { Student } from "@/lib/types/student";

const fetcher = (url: string): Promise<Student[]> =>
  fetch(url).then((r) => r.json());

// A simple, clickable card component for displaying class sections
const ClassCard = ({ title, count, onClick }: { title: string, count: number, onClick: () => void }) => (
  <div
    className="group aspect-square flex flex-col items-center justify-center p-4 text-center rounded-xl border bg-card text-card-foreground shadow-sm transition-all duration-200 hover:border-primary/50 hover:shadow-lg cursor-pointer"
    onClick={onClick}
  >
    <h3 className="text-2xl font-semibold tracking-tight group-hover:text-primary">{title}</h3>
    <p className="text-sm text-muted-foreground mt-1">
      {count} {count === 1 ? "student" : "students"}
    </p>
  </div>
);

export default function StudentsClient() {
  const {
    data: allStudents,
    isLoading,
    error,
    mutate,
  } = useSWR("/api/students", fetcher);
  const [selectedClass, setSelectedClass] = useState<string | null>(null);

  // Memoize the calculation of unique classes and student groups
  const { uniqueClasses, studentsByClass } = useMemo(() => {
    if (!allStudents) return { uniqueClasses: [], studentsByClass: {} };

    const classMap = new Map<string, Student[]>();
    allStudents.forEach((student) => {
      const className = student.class || "Uncategorized";
      if (!classMap.has(className)) {
        classMap.set(className, []);
      }
      classMap.get(className)!.push(student);
    });

    const sortedClasses = Array.from(classMap.entries())
      .map(([name, students]) => ({ name, count: students.length }))
      .sort((a, b) => a.name.localeCompare(b.name));

    return {
      uniqueClasses: sortedClasses,
      studentsByClass: Object.fromEntries(classMap.entries()),
    };
  }, [allStudents]);

  // Memoize the list of students to show in the table based on selection
  const studentsToShow = useMemo(() => {
    if (!selectedClass || !allStudents) return [];
    if (selectedClass === "All Students") return allStudents;
    return studentsByClass[selectedClass] || [];
  }, [selectedClass, allStudents, studentsByClass]);

  // Renders the grid of class cards
  const renderClassCards = () => {
    if (isLoading) {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-28 w-full rounded-xl" />
          ))}
        </div>
      );
    }

    if (error) {
      return (
        <p className="text-center text-muted-foreground">
          Failed to load classes.
        </p>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <ClassCard
          title="All Students"
          count={allStudents?.length || 0}
          onClick={() => setSelectedClass("All Students")}
        />
        {uniqueClasses.map((cls) => (
          <ClassCard
            key={cls.name}
            title={cls.name}
            count={cls.count}
            onClick={() => setSelectedClass(cls.name)}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <SidebarTrigger />
          {selectedClass ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedClass(null)}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Classes
            </Button>
          ) : (
            <h1 className="text-2xl font-semibold tracking-tight">
              All Students and Classes
            </h1>
          )}
        </div>
      </div>

      {selectedClass ? (
        <>
          <h1 className="text-2xl font-semibold tracking-tight px-1">
            {selectedClass}
          </h1>
          <StudentTable
            loading={isLoading}
            error={!!error}
            students={studentsToShow}
            onRefresh={() => mutate()}
          />
        </>
      ) : (
        renderClassCards()
      )}
    </div>
  );
}
