"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { OutliersCard } from "@/components/dashboard/outliers-card";
import { ModelOverview } from "@/components/predictions/model-overview";
import { KeyFactorsChart } from "@/components/predictions/key-factors-chart";

export default function PredictionsClient() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <SidebarTrigger />
        <h1 className="text-2xl font-semibold tracking-tight">
          Predictive Analytics
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content on the left */}
        <div className="lg:col-span-2 space-y-6">
          <ModelOverview />
          <KeyFactorsChart />
        </div>

        {/* Outlier card on the right */}
        <div className="lg:col-span-1 space-y-6">
          <OutliersCard />
        </div>
      </div>
    </div>
  );
}
