"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/cn";

const STAGES = [
  { id: "input", label: "INPUT" },
  { id: "intent", label: "INTENT" },
  { id: "orch", label: "ORCHESTRATION" },
  { id: "retrieval", label: "RETRIEVAL + TOOLS" },
  { id: "model", label: "MODEL" },
  { id: "eval", label: "EVALUATION" },
  { id: "prod", label: "PRODUCTION" },
] as const;

/**
 * Single signature scroll moment: model capability → production system.
 * ~1.4 viewports on desktop; static list on mobile / reduced motion. No scroll-jacking.
 */
export function ProductionAssembly() {
  const reduce = useReducedMotion();

  return (
    <>
      {/* Mobile + reduced motion: static editorial list */}
      <section
        id="assembly"
        className={cn(
          "relative border-y border-border/50 bg-background-elevated/20 py-20 sm:py-24",
          reduce ? "block" : "md:hidden",
        )}
        aria-labelledby="assembly-heading-static"
      >
        <Container>
          <p className="mono-label mb-4">Signature path</p>
          <h2 id="assembly-heading-static" className="section-display max-w-2xl text-balance">
            From model capability to production system.
          </h2>
          <ol className="mt-10 flex flex-col gap-3 sm:max-w-md">
            {STAGES.map((stage, index) => (
              <li
                key={stage.id}
                className={cn(
                  "rounded-md border px-4 py-3 font-mono text-xs tracking-wider",
                  index === STAGES.length - 1
                    ? "border-accent bg-accent-soft text-foreground"
                    : "border-border text-muted",
                )}
              >
                <span className="mr-3 text-muted">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {stage.label}
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Desktop scrub — only when motion is allowed */}
      {!reduce ? <DesktopScrubAssembly /> : null}
    </>
  );
}

function DesktopScrubAssembly() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      ref={sectionRef}
      className="relative hidden h-[140vh] border-y border-border/50 bg-background-elevated/20 md:block"
      aria-labelledby="assembly-heading"
    >
      <div className="sticky top-0 flex h-[100dvh] items-center overflow-hidden">
        <Container className="relative z-10 w-full">
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
            <div>
              <p className="mono-label mb-4">Signature path</p>
              <h2 id="assembly-heading" className="section-display max-w-md text-balance">
                From model capability
                <br />
                to production system.
              </h2>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
                Capability alone is not a product. The surrounding system is.
              </p>
            </div>

            <ol className="relative space-y-2">
              {STAGES.map((stage, index) => (
                <AssemblyStage
                  key={stage.id}
                  label={stage.label}
                  index={index}
                  progress={scrollYProgress}
                  total={STAGES.length}
                />
              ))}
            </ol>
          </div>
        </Container>
      </div>
    </section>
  );
}

function AssemblyStage({
  label,
  index,
  progress,
  total,
}: {
  label: string;
  index: number;
  progress: MotionValue<number>;
  total: number;
}) {
  const start = index / total;
  const end = (index + 0.85) / total;
  const opacity = useTransform(progress, [start, end], [0.28, 1]);
  const x = useTransform(progress, [start, end], [12, 0]);
  const isLast = index === total - 1;

  return (
    <motion.li
      style={{ opacity, x }}
      className={cn(
        "flex items-center gap-3 rounded-md border bg-surface/40 px-4 py-3 font-mono text-xs tracking-wider",
        isLast ? "border-accent text-foreground" : "border-border text-foreground/90",
      )}
    >
      <span className="text-muted">{String(index + 1).padStart(2, "0")}</span>
      <span>{label}</span>
      {isLast ? (
        <span className="ml-auto font-mono text-[10px] uppercase tracking-wider text-accent-secondary">
          Production AI
        </span>
      ) : (
        <span className="ml-auto text-muted" aria-hidden>
          ↓
        </span>
      )}
    </motion.li>
  );
}
