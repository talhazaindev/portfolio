import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { experience } from "@/data/experience";

export function TrajectoryPreview() {
  return (
    <Section
      eyebrow="Engineering trajectory"
      title="Ownership compounding over time."
      description="From foundational NLP services to production agentic and generative systems."
      className="bg-background-elevated/30"
    >
      <ol className="space-y-4">
        {experience.map((role, index) => (
          <li
            key={role.company}
            className="grid gap-3 rounded-[var(--radius-md)] border border-border bg-surface/50 p-5 sm:grid-cols-[7rem_1fr] sm:gap-6"
          >
            <div className="mono-label pt-1">0{index + 1}</div>
            <div>
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="text-lg text-foreground">{role.company}</h3>
                <span className="font-mono text-xs text-muted">{role.period}</span>
                {role.current ? (
                  <span className="rounded border border-accent/40 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-accent-secondary">
                    Present
                  </span>
                ) : null}
              </div>
              <p className="mt-1 text-sm text-muted">{role.role}</p>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-foreground/85">
                {role.impact}
              </p>
            </div>
          </li>
        ))}
      </ol>
      <Link
        href="/experience"
        className="focus-ring mt-8 inline-flex items-center gap-1 text-sm text-muted hover:text-foreground"
      >
        Full trajectory
        <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
      </Link>
    </Section>
  );
}
