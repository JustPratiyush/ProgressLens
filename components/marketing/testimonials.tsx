// components/marketing/testimonials.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const testimonials = [
  {
    role: "Mentor",
    quote: "I finally know who needs a check-in this week—before small issues become big problems.",
    initials: "ME",
  },
  {
    role: "Counsellor",
    quote: "Clear and visual. It surfaces the right students at the right time without extra work.",
    initials: "CO",
  },
  {
    role: "Department Head",
    quote: "Our team shares a common picture of risk and acts faster. Simple, effective, humane.",
    initials: "DH",
  },
]

export function Testimonials() {
  return (
    <section className="bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
        <h2 className="text-balance text-2xl font-semibold sm:text-3xl">Trusted by educators</h2>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Designed with mentors and teachers to fit busy schedules and real classrooms.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {testimonials.map((t) => (
            <Card key={t.role} className="h-full">
              <CardHeader className="flex flex-row items-center gap-3">
                <Avatar>
                  <AvatarFallback>{t.initials}</AvatarFallback>
                </Avatar>
                <CardTitle className="text-base">{t.role}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">{t.quote}</CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
