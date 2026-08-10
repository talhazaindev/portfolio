import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { experience } from "@/data/experience";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Experience",
  description:
    "Engineering trajectory of Talha Zain — from NLP services to production agentic AI, RAG, and generative systems.",
  path: "/experience",
});

export default function ExperiencePage() {
  return (
    <div className="pb-24 pt-28 sm:pt-32">
      <Container>
        <header className="mb-12 max-w-3xl">
          <p className="mono-label mb-4">Experience</p>
          <h1 className="section-display text-balance">Engineering trajectory.</h1>
          <p className="mt-4 text-base text-muted sm:text-lg">
            Increasing system ownership and sophistication—not a flat résumé timeline.
          </p>
        </header>

        <ol className="space-y-6">
          {experience.map((role, index) => (
            <li
              key={role.company}
              className="grid gap-4 rounded-[var(--radius-lg)] border border-border bg-surface/40 p-6 lg:grid-cols-[8rem_1fr]"
            >
              <div className="mono-label">Stage 0{index + 1}</div>
              <div>
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h2 className="text-2xl tracking-tight">{role.company}</h2>
                  <span className="font-mono text-xs text-muted">{role.location}</span>
                </div>
                <p className="mt-1 text-sm text-accent-secondary">{role.role}</p>
                <p className="mono-label mt-2">{role.period}</p>
                <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted">{role.impact}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {role.themes.map((theme) => (
                    <span
                      key={theme}
                      className="rounded border border-border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted"
                    >
                      {theme}
                    </span>
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </div>
  );
}
