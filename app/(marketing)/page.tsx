// app/(marketing)/page.tsx
import { Hero } from "@/components/marketing/hero"
import { Features } from "@/components/marketing/features"
import { Testimonials } from "@/components/marketing/testimonials"
import { FAQ } from "@/components/marketing/faq"

export default function Page() {
  return (
    <>
      <Hero />
      <Features />
      <Testimonials />
      <FAQ />
    </>
  )
}
