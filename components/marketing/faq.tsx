// components/marketing/faq.tsx
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    q: "Is student data secure?",
    a: "Yes. We follow industry best practices and only store what’s necessary. Future releases support district-managed storage.",
  },
  {
    q: "Do we need training?",
    a: "No. The interface is designed to be simple and familiar—most users are productive in minutes.",
  },
  {
    q: "Does it replace our SIS?",
    a: "No. It complements your SIS with early-warning workflows and educator-facing summaries.",
  },
  {
    q: "How do alerts work?",
    a: "You set thresholds. When a student crosses them, we flag them and can notify mentors/guardians based on your settings.",
  },
  {
    q: "What formats can we upload?",
    a: "CSV or XLSX. Map your columns to standard fields during upload.",
  },
  {
    q: "What does it cost?",
    a: "We offer pilot-friendly pricing for schools and non-profits. Contact us to learn more.",
  },
]

export function FAQ() {
  return (
    <section id="faq" className="mx-auto max-w-3xl px-4 py-14 md:py-20">
      <h2 className="text-balance text-2xl font-semibold sm:text-3xl">Frequently asked questions</h2>
      <Accordion type="single" collapsible className="mt-6">
        {faqs.map((f, idx) => (
          <AccordionItem key={idx} value={`item-${idx + 1}`}>
            <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  )
}
