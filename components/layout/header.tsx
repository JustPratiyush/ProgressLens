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
import Link from "next/link";

export function Header() {
  const { isSignedIn, isLoaded } = useUser();

  return (
    <header className="border-b bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <AppName />
        </div>
        <div className="flex items-center gap-3">
          {isLoaded && (
            <>
              {!isSignedIn ? (
                <div className="flex items-center gap-2">
                  <SignInButton mode="modal">
                    <Button variant="outline" size="sm">
                      Sign in
                    </Button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <Button size="sm">Sign up</Button>
                  </SignUpButton>
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  <SignOutButton>
                    <Button variant="destructive" size="sm">
                      Sign out
                    </Button>
                  </SignOutButton>
                  <Button asChild variant="outline" size="sm">
                    <Link href="/dashboard">Dashboard</Link>
                  </Button>
                  <UserButton
                    appearance={{
                      elements: {
                        avatarBox: "h-8 w-8",
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
