"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/ui/Section";

const TRAJECTORY = [
  {
    year: "2023",
    stage: "APPLICATION",
    title: "AI Applications",
    detail: "NLP services, fine-tuning, reusable model pipelines.",
  },
  {
    year: "2024",
    stage: "PRODUCT",
    title: "AI Products",
    detail: "Conversational platforms, voice workflows, production APIs.",
  },
  {
    year: "2025+",
    stage: "SYSTEM",
    title: "Production AI Systems",
    detail: "Agentic orchestration, semantic retrieval, multimodal platforms.",
  },
] as const;

/** Ownership progression — quiet visual reset; calm temperature. */
export function TrajectoryPreview() {
  const reduce = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 80%", "end 40%"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0.15, 1]);

  return (
    <Section
      eyebrow="Engineering trajectory"
      title="Ownership compounding over time."
      description="From foundational applications to production AI systems — increasing architecture responsibility."
      tone="quiet"
      containerWidth="medium"
      className="!py-20 sm:!py-24"
    >
      <div ref={trackRef} className="relative">
        <motion.div
          aria-hidden
          className="absolute top-3 left-0 hidden h-px origin-left bg-border sm:block sm:w-full"
          style={{ scaleX: reduce ? 1 : lineScale }}
        />
        <ol className="relative grid gap-0 sm:grid-cols-3">
          {TRAJECTORY.map((stage, index) => (
            <li
              key={stage.year}
              className="relative px-1 py-6 sm:border-l sm:border-border/40 sm:px-6 sm:py-2 first:sm:border-l-0 first:sm:pl-0"
            >
              <div className="mono-label mb-2 flex items-center gap-2">
                <span>{stage.year}</span>
                {index < TRAJECTORY.length - 1 ? (
                  <span className="hidden text-muted sm:inline" aria-hidden>
                    →
                  </span>
                ) : null}
              </div>
              <p className="mono-label mb-3 !text-signal/80">{stage.stage}</p>
              <h3 className="text-xl tracking-tight text-heading sm:text-2xl">
                {stage.title}
              </h3>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
                {stage.detail}
              </p>
              {index < TRAJECTORY.length - 1 ? (
                <span
                  className="mono-label mt-4 inline-block text-muted sm:hidden"
                  aria-hidden
                >
                  ↓
                </span>
              ) : null}
            </li>
          ))}
        </ol>
      </div>
      <Link
        href="/experience"
        className="focus-ring mt-12 inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-foreground"
      >
        Full trajectory
        <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
      </Link>
    </Section>
  );
}
