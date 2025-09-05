"use client";

import useSWR from "swr";
import { RiskChart } from "@/components/dashboard/risk-chart";
import { ActivityFeed } from "@/components/dashboard/activity-feed";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import Link from "next/link";

// Import the new components
import { MyScore } from "@/components/dashboard/my-score";
import { TeachingSubjects } from "@/components/dashboard/teaching-subjects";
import { RecentTrends } from "@/components/dashboard/recent-trends";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function DashboardClient() {
  const { data, isLoading, error } = useSWR("/api/dashboard", fetcher);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <SidebarTrigger />
          <h1 className="text-2xl font-semibold tracking-tight text-pretty">
            Dashboard
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/upload">
            <Button>Upload Data</Button>
          </Link>
          <Link href="/students">
            <Button variant="outline">View Students</Button>
          </Link>
        </div>
      </div>
      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-1 space-y-6">
          <MyScore loading={isLoading} score={data?.myScore} />
          <RiskChart loading={isLoading} data={data?.riskDistribution ?? []} />
        </div>

        {/* Right Column */}
        <div className="lg:col-span-2 space-y-6">
          <TeachingSubjects
            loading={isLoading}
            subjects={data?.teachingSubjects}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ActivityFeed
              loading={isLoading}
              items={data?.recentAlerts ?? []}
            />
            <RecentTrends loading={isLoading} trends={data?.recentTrends} />
          </div>
        </div>
      </div>
    </div>
  );
}
