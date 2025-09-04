"use client";

import useSWR from "swr";
import { OverviewCards } from "@/components/dashboard/overview-cards";
import { RiskChart } from "@/components/dashboard/risk-chart";
import { ActivityFeed } from "@/components/dashboard/activity-feed";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function DashboardClient() {
  const { data, isLoading, error } = useSWR("/api/dashboard", fetcher);

  // Add debugging
  console.log("Dashboard data:", data);
  console.log("Risk distribution:", data?.riskDistribution);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight text-pretty">
          Dashboard
        </h1>
        <div className="items-center gap-2">
          <Link href="/upload">
            <Button>Upload Data</Button>
          </Link>
          <Link href="/students">
            <Button variant="outline">View Alerts</Button>
          </Link>
        </div>
      </div>

      <OverviewCards loading={isLoading} error={!!error} summary={data} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RiskChart loading={isLoading} data={data?.riskDistribution ?? []} />
        </div>
        <div>
          <ActivityFeed loading={isLoading} items={data?.recentAlerts ?? []} />
        </div>
      </div>
    </div>
  );
}
