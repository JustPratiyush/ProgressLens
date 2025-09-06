import type { ReactNode } from "react";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { AppSidebar } from "@/components/layout/sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import ChatWidget from "@/components/dashboard/ChatWidget";

// Force dynamic rendering for all dashboard routes
export const dynamic = 'force-dynamic';

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  // Skip authentication for development
  const user = { id: "dev-user" };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <main className="mx-auto w-full max-w-7xl">
            {children}
          </main>
        </div>
      </SidebarInset>
      <ChatWidget />
    </SidebarProvider>
  );
}
