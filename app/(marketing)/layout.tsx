// app/(marketing)/layout.tsx
import type React from "react";
import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "ProgressLens – Spot risk early. Support learners sooner.",
  description:
    "A student-friendly progress tracking system for educators. Upload spreadsheets, see color-coded progress, and support every learner's journey.",
};

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-dvh flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
