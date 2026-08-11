import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/ui/Section";

const TRAJECTORY = [
  {
    year: "2023",
    title: "AI Applications",
    detail: "NLP services, fine-tuning, reusable model pipelines.",
  },
  {
    year: "2024",
    title: "AI Products",
    detail: "Conversational platforms, voice workflows, production APIs.",
  },
  {
    year: "2025+",
    title: "Production AI Systems",
    detail: "Agentic orchestration, semantic retrieval, multimodal platforms.",
  },
] as const;

/** Ownership progression — architecture responsibility compounding over time. */
export function TrajectoryPreview() {
  return (
    <Section
      eyebrow="Engineering trajectory"
      title="Ownership compounding over time."
      description="From foundational applications to production AI systems — increasing architecture responsibility."
      className="bg-background-elevated/30"
    >
      <ol className="relative grid gap-0 sm:grid-cols-3">
        {TRAJECTORY.map((stage, index) => (
          <li
            key={stage.year}
            className="relative border-t border-border px-1 py-6 sm:border-t-0 sm:border-l sm:px-6 sm:py-2 first:sm:border-l-0 first:sm:pl-0"
          >
            <div className="mono-label mb-3 flex items-center gap-2">
              <span>{stage.year}</span>
              {index < TRAJECTORY.length - 1 ? (
                <span className="hidden text-accent-secondary sm:inline" aria-hidden>
                  →
                </span>
              ) : null}
            </div>
            <h3 className="text-xl tracking-tight text-foreground sm:text-2xl">
              {stage.title}
            </h3>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
              {stage.detail}
            </p>
            {index < TRAJECTORY.length - 1 ? (
              <span
                className="mono-label mt-4 inline-block text-accent-secondary sm:hidden"
                aria-hidden
              >
                ↓
              </span>
            ) : null}
          </li>
        ))}
      </ol>
      <Link
        href="/experience"
        className="focus-ring mt-10 inline-flex items-center gap-1 text-sm text-muted hover:text-foreground"
      >
        Full trajectory
        <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
      </Link>
    </Section>
  );
}
