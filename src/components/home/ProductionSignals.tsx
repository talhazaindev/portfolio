"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { Section } from "@/components/ui/Section";
import { productionSignals } from "@/data/projects";
import { motionTiers } from "@/lib/motion";
import { cn } from "@/lib/cn";

const SIGNAL_METRICS = new Set(["< 5s", "3–4 hrs/week", "HITL"]);

const PROJECT_LABEL: Record<string, string> = {
  "ai-compare-hub": "AI_COMPARE_HUB",
  medicai: "MEDICAI",
  mediax: "MEDIAX",
  "ecg-intelligence": "ECG_INTELLIGENCE",
};

/** Credibility strip — raised warm surface; amber only on key outcomes. */
export function ProductionSignals() {
  const reduce = useReducedMotion();

  return (
    <Section
      eyebrow="Production signals"
      title="Measured outcomes from shipped systems."
      description="Figures tied to specific systems—not vanity company KPIs."
      tone="lifted"
      containerWidth="wide"
      className="!pt-16 sm:!pt-20"
    >
      <div className="grid grid-cols-2 gap-x-0 gap-y-10 sm:grid-cols-3 lg:grid-cols-6">
        {productionSignals.map((signal, index) => {
          const isSignal = SIGNAL_METRICS.has(signal.value);
          const isLast = index === productionSignals.length - 1;
          return (
            <motion.div
              key={`${signal.label}-${signal.value}`}
              initial={reduce ? false : { opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={
                reduce
                  ? { duration: 0 }
                  : {
                      ...motionTiers.component,
                      delay: index * 0.06,
                    }
              }
            >
              <Link
                href={`/work/${signal.projectSlug}`}
                className={cn(
                  "focus-ring group relative block px-4 sm:px-5 lg:px-6",
                  !isLast &&
                    "after:absolute after:right-0 after:top-1 after:hidden after:h-[calc(100%-0.5rem)] after:w-px after:bg-border lg:after:block",
                )}
              >
                <div
                  className={cn(
                    "font-mono text-2xl tracking-tight sm:text-3xl",
                    isSignal ? "text-signal" : "text-system-navy",
                  )}
                >
                  {signal.value}
                </div>
                <div className="mt-2 text-xs leading-snug text-ink-muted transition-colors group-hover:text-ink-secondary">
                  {signal.label}
                </div>
                <div className="mono-label mt-3 !text-[10px] !text-ink-muted/70">
                  {PROJECT_LABEL[signal.projectSlug] ?? signal.projectSlug}
                </div>
                {isSignal ? (
                  <span className="mt-3 block h-px w-6 bg-signal/70" aria-hidden />
                ) : null}
              </Link>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
