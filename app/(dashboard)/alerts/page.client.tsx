"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { OutliersCard } from "@/components/dashboard/outliers-card";
import { AITrendsCard } from "@/components/dashboard/ai-trends-card";

export default function AlertsClient() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <SidebarTrigger />
        <h1 className="text-2xl font-semibold tracking-tight">
          All Alerts & Trends
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Outliers Card is now the main content */}
        <div className="lg:col-span-2 space-y-6">
          <OutliersCard />
        </div>

        {/* AI Trends Card is now in the sidebar area */}
        <div className="lg:col-span-1 space-y-6">
          <AITrendsCard />
        </div>
      </div>
    </div>
  );
}
