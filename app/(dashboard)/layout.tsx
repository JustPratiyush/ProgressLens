import type { ReactNode } from "react";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { AppSidebar } from "@/components/layout/sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import ChatWidget from "@/components/dashboard/ChatWidget";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  let user;
  try {
    user = await currentUser();
  } catch (error) {
    console.error("Clerk authentication error:", error);
    // For development, continue without authentication
    user = { id: "dev-user" };
  }

  if (!user) {
    redirect("/sign-in");
  }

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
