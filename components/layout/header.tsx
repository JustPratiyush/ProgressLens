"use client";

import { AppName } from "./app-name";
import {
  SignInButton,
  SignOutButton,
  SignUpButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import Link from "next/link";
import { useContext } from "react";

function ConditionalSidebarTrigger() {
  try {
    useSidebar();
    return <SidebarTrigger />;
  } catch {
    return null;
  }
}

export function Header() {
  const { isSignedIn, isLoaded } = useUser();

  return (
    <header className="border-b bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <ConditionalSidebarTrigger />
          <AppName />
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          {isLoaded && (
            <>
              {!isSignedIn ? (
                <div className="flex items-center gap-1 sm:gap-2">
                  <SignInButton mode="modal">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs sm:text-sm px-2 sm:px-3"
                    >
                      Sign in
                    </Button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <Button
                      size="sm"
                      className="text-xs sm:text-sm px-2 sm:px-3"
                    >
                      Sign up
                    </Button>
                  </SignUpButton>
                </div>
              ) : (
                <div className="flex items-center gap-1 sm:gap-3">
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="text-xs sm:text-sm px-2 sm:px-3"
                  >
                    <Link prefetch href="/dashboard">
                      Dashboard
                    </Link>
                  </Button>
                  <UserButton
                    appearance={{
                      elements: {
                        avatarBox: "h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8",
                      },
                    }}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  );
}
