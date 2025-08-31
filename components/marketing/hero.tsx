// components/marketing/hero.tsx
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, TrendingUp, Users, Shield } from "lucide-react";
import { SignUpButton } from "@clerk/nextjs";
import Prism from "@/src/blocks/Backgrounds/Prism/Prism";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/20">
      {/* Prism Background */}
      <div className="absolute inset-0 flex items-center justify-center opacity-50">
        <div style={{ width: "100%", height: "100%", position: "relative" }}>
          <Prism
            animationType="rotate"
            timeScale={0.5}
            height={3.5}
            baseWidth={5.5}
            scale={3.6}
            hueShift={0}
            colorFrequency={1}
            noise={0.5}
            glow={1}
          />
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-muted/5 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 py-16 md:py-24">
        <div className="text-center">
          {/* Badge */}
          <div className="mb-8 flex justify-center">
            <Badge
              variant="secondary"
              className="bg-primary/10 text-primary hover:bg-primary/20 border-primary/20 px-4 py-2 text-sm font-medium"
            >
              <TrendingUp className="mr-2 h-4 w-4" />
              Student-first design
            </Badge>
          </div>

          {/* Main heading */}
          <h1 className="mx-auto max-w-4xl text-balance bg-gradient-to-r from-foreground via-foreground to-muted-foreground bg-clip-text text-4xl font-bold leading-tight tracking-tight text-transparent sm:text-5xl md:text-6xl lg:text-7xl">
            Spot risk early.
            <br />
            <span className="bg-gradient-to-r from-primary via-primary to-primary/80 bg-clip-text text-transparent">
              Support learners sooner.
            </span>
          </h1>

          {/* Description */}
          <p className="mx-auto mt-6 max-w-3xl text-pretty text-lg text-muted-foreground md:text-xl">
            A powerful dashboard that helps educators track student progress
            across attendance, grades, and behavior—so you can support every
            learner's journey.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <SignUpButton mode="modal">
              <Button
                size="lg"
                className="group px-8 py-6 text-lg font-semibold shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-105"
              >
                <span className="flex items-center">
                  Get started free
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </span>
              </Button>
            </SignUpButton>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="px-8 py-6 text-lg font-medium border-2 hover:bg-muted/50"
            >
              <a href="/sign-in">Sign in</a>
            </Button>
          </div>

          {/* Feature highlights */}
          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3">
            <Card className="border-0 bg-gradient-to-br from-muted/30 to-muted/10 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 font-semibold">Progress Tracking</h3>
                <p className="text-sm text-muted-foreground">
                  Monitor student growth and development in real-time
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-gradient-to-br from-muted/30 to-muted/10 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 font-semibold">Student Focus</h3>
                <p className="text-sm text-muted-foreground">
                  Personalized insights for every learner's journey
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-gradient-to-br from-muted/30 to-muted/10 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 font-semibold">Smart Insights</h3>
                <p className="text-sm text-muted-foreground">
                  Data-driven recommendations for student success
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Social proof */}
          <div className="mt-16 flex flex-col items-center">
            <Separator className="mb-6 w-24" />
            <p className="text-sm text-muted-foreground">
              Trusted by educators across{" "}
              <span className="font-semibold text-foreground">
                500+ schools
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
