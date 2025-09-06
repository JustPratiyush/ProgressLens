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
  Cog, // Alternative to BellCog
  Brain, // Alternative to BrainCircuit
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
import Link from "next/link";

const mainLinks = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/students", label: "All Students and Classes", icon: Users },
  { href: "/alerts", label: "All Alerts and Trends", icon: Bell },
  { href: "/leaderboard", label: "Leaderboard", icon: Award },
];

// 3. Define the new section for advanced features
const advancedFeatures = [
  { href: "/automation", label: "Automation Hub", icon: Cog },
  { href: "/predictions", label: "Predictive Analytics", icon: Brain },
];

const utilityLinks = [{ href: "/upload", label: "Upload Data", icon: Upload }];

export function AppSidebar() {
  const pathname = usePathname();
  const [role, setRole] = useState<string>("teacher");

  useEffect(() => {
    setRole(window.localStorage.getItem("role") || "teacher");
  }, []);

  return (
    <Sidebar collapsible="icon" variant="inset">
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-1 group-data-[state=collapsed]:justify-center group-data-[state=collapsed]:px-0">
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-transparent invert text-sidebar-primary-foreground group-data-[state=collapsed]:mx-auto">
            <img src="/icon.svg" alt="Logo" width={24} height={24} />
          </div>
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
                      <Link href={link.href}>
                        <Icon />
                        <span>{link.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* 4. Add the new Advanced Features section here */}
        <SidebarGroup>
          <SidebarGroupLabel>Advanced Features</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {advancedFeatures.map((link) => {
                const Icon = link.icon;
                const isActive = pathname.startsWith(link.href);
                return (
                  <SidebarMenuItem key={link.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      tooltip={link.label}
                    >
                      <Link href={link.href}>
                        <Icon />
                        <span>{link.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
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
                      <Link href={link.href}>
                        <Icon />
                        <span>{link.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
              {role === "admin" && (
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname.startsWith("/settings")}
                    tooltip="Settings"
                  >
                    <Link href="/settings">
                      <Settings />
                      <span>Settings</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

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
