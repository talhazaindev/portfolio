"use client";

import { useRef, useSyncExternalStore } from "react";
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

function subscribeDesktop(onStoreChange: () => void) {
  const mq = window.matchMedia("(min-width: 768px)");
  mq.addEventListener("change", onStoreChange);
  return () => mq.removeEventListener("change", onStoreChange);
}

function getDesktopSnapshot() {
  return window.matchMedia("(min-width: 768px)").matches;
}

function getServerDesktopSnapshot() {
  return false;
}

/**
 * Single signature scroll moment: model capability → production system.
 * One heading in the DOM; list mode switches to avoid duplicate SEO content.
 */
export function ProductionAssembly() {
  const reduce = useReducedMotion();
  const isDesktop = useSyncExternalStore(
    subscribeDesktop,
    getDesktopSnapshot,
    getServerDesktopSnapshot,
  );
  const scrub = Boolean(isDesktop && !reduce);
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      ref={sectionRef}
      id="assembly"
      className={cn(
        "relative border-y border-border/50 bg-background-elevated/20",
        scrub ? "h-[140vh]" : "py-20 sm:py-24",
      )}
      aria-labelledby="assembly-heading"
    >
      {scrub ? (
        <div className="sticky top-0 flex h-[100dvh] items-center overflow-hidden">
          <Container className="relative z-10 w-full">
            <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
              <AssemblyHeader />
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
      ) : (
        <Container>
          <AssemblyHeader />
          <ol className="mt-10 flex flex-col gap-3 sm:max-w-md">
            {STAGES.map((stage, index) => {
              const isLast = index === STAGES.length - 1;
              return (
                <li
                  key={stage.id}
                  className={cn(
                    "flex items-center gap-3 rounded-md border px-4 py-3 font-mono text-xs tracking-wider",
                    isLast
                      ? "border-signal/45 bg-signal-08 text-foreground"
                      : "border-border text-muted",
                  )}
                >
                  <span className={cn(isLast ? "text-signal" : "text-muted")}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>{stage.label}</span>
                  {isLast ? (
                    <span className="ml-auto inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-signal">
                      <span className="h-1.5 w-1.5 rounded-full bg-signal" aria-hidden />
                      Signal
                    </span>
                  ) : (
                    <span className="ml-auto text-system-cyan/50" aria-hidden>
                      ↓
                    </span>
                  )}
                </li>
              );
            })}
          </ol>
        </Container>
      )}
    </section>
  );
}

function AssemblyHeader() {
  return (
    <div>
      <p className="mono-label mb-4">Signature path</p>
      <h2 id="assembly-heading" className="section-display max-w-2xl text-balance">
        From model capability to production system.
      </h2>
      <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
        Capability alone is not a product. The surrounding system is.
      </p>
    </div>
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
        isLast ? "border-signal/45 text-foreground" : "border-border text-foreground/90",
      )}
    >
      <span className={cn(isLast ? "text-signal" : "text-muted")}>
        {String(index + 1).padStart(2, "0")}
      </span>
      <span>{label}</span>
      {isLast ? (
        <span className="ml-auto inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-signal">
          <span className="h-1.5 w-1.5 rounded-full bg-signal" aria-hidden />
          Production AI
        </span>
      ) : (
        <span className="ml-auto text-system-cyan/60" aria-hidden>
          ↓
        </span>
      )}
    </motion.li>
  );
}
