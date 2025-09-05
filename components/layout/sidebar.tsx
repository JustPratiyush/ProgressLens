"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Upload,
  Settings,
  Bell,
  Award,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { UserButton } from "@clerk/nextjs";

// A placeholder for the Clerk UserButton to avoid import errors in previews
const UserButtonPlaceholder = () => (
  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
    <span className="text-sm font-medium text-muted-foreground">U</span>
  </div>
);

// Updated main navigation links based on the UI/UX photo
const mainLinks = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/students", label: "All Students and Classes", icon: Users },
  { href: "/alerts", label: "All Alerts and Trends", icon: Bell },
  { href: "/leaderboard", label: "Leaderboard", icon: Award },
];

// Kept utility links like "Upload Data" in a separate group
const utilityLinks = [{ href: "/upload", label: "Upload Data", icon: Upload }];

export function AppSidebar() {
  const [pathname, setPathname] = useState("");
  const [role, setRole] = useState<string>("teacher");

  useEffect(() => {
    // Safely access window and localStorage only on the client side
    setPathname(window.location.pathname);
    setRole(window.localStorage.getItem("role") || "teacher");
  }, []);

  return (
    <Sidebar collapsible="icon" variant="inset">
      <SidebarHeader>
        {/* The parent `Sidebar` component adds a `group` class with `data-state`. */}
        {/* This is used to center the logo when the sidebar is collapsed. */}
        <div className="flex items-center gap-2 px-2 py-1 group-data-[state=collapsed]:justify-center group-data-[state=collapsed]:px-0">
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-transparent invert text-sidebar-primary-foreground group-data-[state=collapsed]:mx-auto">
            {/* Use standard <img> tag instead of Next.js <Image> */}
            <img src="/icon.svg" alt="Logo" width={24} height={24} />
          </div>
          {/* This text part is automatically hidden by the sidebar's internal logic when collapsed */}
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">ProgressLens</span>
            <span className="truncate text-xs">Student Analytics</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname.startsWith(link.href);
                return (
                  <SidebarMenuItem key={link.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      tooltip={link.label}
                    >
                      {/* Use standard <a> tag instead of Next.js <Link> */}
                      <a href={link.href}>
                        <Icon />
                        <span>{link.label}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        {/* Actions / Utility Links are now in the footer */}
        <SidebarGroup className="p-0">
          <SidebarGroupLabel>Actions</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {utilityLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname.startsWith(link.href);
                return (
                  <SidebarMenuItem key={link.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      tooltip={link.label}
                    >
                      <a href={link.href}>
                        <Icon />
                        <span>{link.label}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
              {/* Conditional link for admin role */}
              {role === "admin" && (
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname.startsWith("/settings")}
                    tooltip="Settings"
                  >
                    <a href="/settings">
                      <Settings />
                      <span>Settings</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        {/* User Info Section */}
        <div className="flex items-center justify-between group-data-[state=collapsed]:justify-center">
          <div className="text-xs text-muted-foreground group-data-[state=collapsed]:hidden">
            Role: {role}
          </div>
          <UserButton />
        </div>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
