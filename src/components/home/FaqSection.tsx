import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { faqs } from "@/data/faqs";
import { social } from "@/data/social";

/** Compact editorial FAQ — closes collaboration ambiguity before the final CTA. */
export function FaqSection() {
  return (
    <Section
      id="faq"
      eyebrow="FAQ"
      title="Common questions about how I work."
      description="Services, fit, and how collaborations usually start."
      tone="quiet"
      containerWidth="wide"
      className="!py-20 sm:!py-24"
    >
      <div className="mx-auto max-w-3xl border-t border-border">
        {faqs.map((item) => (
          <details
            key={item.question}
            className="group border-b border-border py-5 open:pb-6"
          >
            <summary className="focus-ring flex cursor-pointer list-none items-start justify-between gap-6 rounded-md text-left marker:content-none [&::-webkit-details-marker]:hidden">
              <span className="text-base font-medium tracking-tight text-ink-strong sm:text-lg">
                {item.question}
              </span>
              <span
                aria-hidden
                className="mt-1.5 inline-flex h-5 w-5 shrink-0 items-center justify-center font-mono text-sm text-ink-muted transition-transform duration-200 group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink-secondary sm:text-[15px]">
              {item.answer}
            </p>
          </details>
        ))}
      </div>

      <p className="mx-auto mt-10 max-w-3xl text-sm text-ink-muted">
        Still unsure if it&apos;s a fit?{" "}
        <Link
          href="/contact"
          className="focus-ring inline-flex items-center gap-1 text-system-blue transition-colors hover:text-system-navy"
        >
          Get in touch
          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
        </Link>
        {" · "}
        <a
          href={`mailto:${social.email}`}
          className="focus-ring text-system-blue transition-colors hover:text-system-navy"
        >
          {social.email}
        </a>
      </p>
    </Section>
  );
}
