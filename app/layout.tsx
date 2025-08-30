import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "@/components/theme-provider";
import { ClerkAuthProvider } from "@/components/providers/clerk-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "ProgressLens",
  description:
    "A powerful dashboard that helps educators track student progress across attendance, grades, and behavior—so you can support every learner's journey.",
  generator: "ProgressLens",
  robots: "index, follow",
  authors: [{ name: "ProgressLens Team" }],
  keywords: [
    "education",
    "student progress",
    "early warning",
    "dashboard",
    "analytics",
  ],
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ClerkAuthProvider>{children}</ClerkAuthProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
