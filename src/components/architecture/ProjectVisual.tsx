"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";
import type { Project } from "@/types/content";
import { cn } from "@/lib/cn";

type ProjectVisualProps = {
  project: Project;
  className?: string;
};

/**
 * Per-flagship visual grammar. Motion communicates system behavior,
 * not decoration. Amber = human signal / key outcome only.
 */
export function ProjectVisual({ project, className }: ProjectVisualProps) {
  const reduce = useReducedMotion();
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => setTick((v) => v + 1), 1400);
    return () => window.clearInterval(id);
  }, [reduce]);

  return (
    <div
      className={cn(
        "overflow-hidden rounded-[var(--radius-lg)] border border-border bg-background-elevated p-4 sm:p-6",
        className,
      )}
    >
      <div className="mono-label mb-4">
        Visual grammar / {project.visualGrammar.replace(/-/g, " ")}
      </div>
      {project.visualGrammar === "parallel-orchestration" ? (
        <ParallelVisual tick={tick} />
      ) : null}
      {project.visualGrammar === "agent-state-graph" ? (
        <AgentStateVisual tick={tick} />
      ) : null}
      {project.visualGrammar === "semantic-spatial" ? <SpatialVisual tick={tick} /> : null}
      {project.visualGrammar === "data-transformation" ? (
        <TransformVisual tick={tick} />
      ) : null}
      {project.visualGrammar === "generic" ? (
        <p className="text-sm text-muted">{project.headline}</p>
      ) : null}
    </div>
  );
}

/** Parallel execution: prompt → fan-out → parallel completion → aggregate. */
function ParallelVisual({ tick }: { tick: number }) {
  const phase = tick % 5;
  // 0 prompt · 1 fan-out · 2–3 parallel run · 4 aggregate
  const models = ["FLUX", "KLING", "VEO", "OPENAI"] as const;
  const modelDone = (index: number) => {
    if (phase < 2) return false;
    if (phase === 2) return index <= 1;
    if (phase === 3) return index <= 3;
    return true;
  };
  const modelRunning = (index: number) => {
    if (phase < 2) return false;
    if (phase === 2) return index === 2 || index === 3;
    if (phase === 3) return false;
    return false;
  };

  return (
    <div>
      <div
        className={cn(
          "mb-3 rounded-md border px-3 py-2 text-center text-xs transition-colors duration-500",
          phase === 0
            ? "border-system-cyan/50 bg-accent-soft text-foreground"
            : "border-border bg-surface text-muted",
        )}
      >
        PROMPT
      </div>

      <div className="mb-2 flex justify-center" aria-hidden>
        <span
          className={cn(
            "font-mono text-[10px] transition-opacity duration-300",
            phase >= 1 ? "text-system-cyan" : "text-muted/40",
          )}
        >
          ↓ ROUTER
        </span>
      </div>

      <div
        className={cn(
          "mb-3 flex justify-center gap-3 font-mono text-[9px] transition-opacity duration-500",
          phase >= 1 ? "opacity-100" : "opacity-30",
        )}
        aria-hidden
      >
        <span className="text-system-cyan/70">↙</span>
        <span className="text-system-cyan/70">↓</span>
        <span className="text-system-cyan/70">↓</span>
        <span className="text-system-cyan/70">↘</span>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {models.map((name, index) => {
          const done = modelDone(index);
          const running = modelRunning(index);
          return (
            <div
              key={name}
              className={cn(
                "rounded-md border px-2 py-3 text-center font-mono text-[11px] transition-all duration-500",
                done
                  ? "border-system-cyan/60 bg-accent-soft text-foreground"
                  : running
                    ? "border-accent bg-accent-soft/60 text-foreground"
                    : phase >= 1
                      ? "border-border text-muted"
                      : "border-border/60 text-muted/50",
              )}
            >
              {name}
              <div className="mt-1 text-[9px] uppercase tracking-wider text-muted">
                {done ? "done" : running ? "run" : phase >= 1 ? "queued" : "—"}
              </div>
            </div>
          );
        })}
      </div>

      <div
        className={cn(
          "mt-4 rounded-md border px-3 py-2 text-center font-mono text-[10px] transition-all duration-500",
          phase >= 4
            ? "border-signal/50 bg-signal-08 text-signal"
            : "border-border bg-background/50 text-muted",
        )}
      >
        {phase >= 4 ? "AGGREGATE → ASSETS" : "ASYNC EXECUTION → NORMALIZE"}
      </div>
    </div>
  );
}

/** Routing + state transitions; amber only on HITL human gate. */
function AgentStateVisual({ tick }: { tick: number }) {
  const states = [
    { id: "REQUEST", kind: "system" as const },
    { id: "ROUTER", kind: "system" as const },
    { id: "SPECIALIST", kind: "system" as const },
    { id: "HITL", kind: "human" as const },
    { id: "OUTPUT", kind: "outcome" as const },
  ];
  const active = tick % states.length;
  const confidence = [0.91, 0.94, 0.88, 0.97, 0.93][active];

  return (
    <div className="flex flex-col gap-2">
      {states.map((state, index) => {
        const isActive = index === active;
        const isHuman = state.kind === "human";
        const isOutcome = state.kind === "outcome";
        return (
          <div
            key={state.id}
            className={cn(
              "flex items-center justify-between rounded-md border px-3 py-2 font-mono text-xs transition-all duration-300",
              isActive && isHuman
                ? "translate-x-1 border-signal/60 bg-signal-12 text-foreground"
                : isActive && isOutcome
                  ? "translate-x-1 border-signal/40 bg-signal-08 text-foreground"
                  : isActive
                    ? "translate-x-1 border-accent bg-accent-soft text-foreground"
                    : "border-border text-muted",
            )}
          >
            <span className="flex items-center gap-2">
              {isActive ? (
                <span
                  className={cn(
                    "h-1.5 w-1.5 rounded-full",
                    isHuman || isOutcome ? "bg-signal" : "bg-system-cyan",
                  )}
                  aria-hidden
                />
              ) : (
                <span className="h-1.5 w-1.5 rounded-full bg-border" aria-hidden />
              )}
              {state.id}
            </span>
            {isHuman ? (
              <span className={cn("text-[9px] uppercase tracking-wider", isActive ? "text-signal" : "text-muted")}>
                Human gate
              </span>
            ) : null}
          </div>
        );
      })}
      <div className="mt-2 rounded-md border border-border bg-background/50 px-3 py-2 font-mono text-[10px] text-muted">
        <span className="text-accent-secondary">route.confidence</span>
        <span className="ml-3 text-foreground">{confidence.toFixed(2)}</span>
      </div>
    </div>
  );
}

/** Spatial intelligence — ranked result receives amber signal. */
function SpatialVisual({ tick }: { tick: number }) {
  const weights = [
    { label: "FOOTFALL", value: 30 },
    { label: "TRAFFIC", value: 30 },
    { label: "POI DENSITY", value: 20 },
    { label: "PROXIMITY", value: 20 },
  ];
  const pulse = tick % weights.length;
  const ranked = tick % 3 === 2;

  return (
    <div>
      <div className="relative mx-auto mb-6 h-36 w-36 rounded-full border border-border">
        <div
          className="absolute inset-4 rounded-full border border-accent/40 transition-transform duration-500"
          style={{ transform: `scale(${1 + (pulse % 3) * 0.06})` }}
        />
        {[
          { top: "18%", left: "62%" },
          { top: "48%", left: "22%" },
          { top: "68%", left: "70%" },
        ].map((pos, i) => (
          <span
            key={i}
            className={cn(
              "absolute h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full transition-colors duration-500",
              pulse % 3 === i ? "bg-system-cyan shadow-[0_0_6px_rgba(103,232,249,0.5)]" : "bg-border",
            )}
            style={{ top: pos.top, left: pos.left }}
            aria-hidden
          />
        ))}
        <div className="absolute inset-0 flex items-center justify-center text-center font-mono text-[10px] text-muted">
          GEO
          <br />
          INTENT
        </div>
      </div>
      <div className="space-y-2">
        {weights.map((weight, index) => (
          <div key={weight.label} className="grid grid-cols-[6rem_1fr_2.5rem] items-center gap-2">
            <span className="font-mono text-[10px] text-muted">{weight.label}</span>
            <div className="h-1.5 overflow-hidden rounded-full bg-border">
              <div
                className={cn(
                  "h-full rounded-full transition-all duration-500",
                  index === pulse ? "bg-accent-secondary" : "bg-accent/70",
                )}
                style={{ width: `${weight.value * (index === pulse ? 3.2 : 3)}%` }}
              />
            </div>
            <span className="font-mono text-[10px] text-foreground">{weight.value}%</span>
          </div>
        ))}
      </div>
      <div
        className={cn(
          "mt-4 rounded-md border px-3 py-2 font-mono text-[10px] transition-colors duration-500",
          ranked
            ? "border-signal/50 bg-signal-08 text-signal"
            : "border-border bg-background/50 text-muted",
        )}
      >
        {ranked ? (
          <span className="inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-signal" aria-hidden />
            RANKED RESULT
          </span>
        ) : (
          <>
            <div className="text-accent-secondary">rank =</div>
            <div>0.30 footfall + 0.30 traffic</div>
            <div>+ 0.20 density + 0.20 proximity</div>
          </>
        )}
      </div>
    </div>
  );
}

/** Unstructured → structured; amber only at ML READY outcome. */
function TransformVisual({ tick }: { tick: number }) {
  const stage = tick % 4;
  const sources = ["PDF", "CSV", "WAVEFORM", "IMAGE"];

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-2">
        {sources.map((source) => (
          <span
            key={source}
            className={cn(
              "rounded border px-2 py-1 font-mono text-[10px] transition-all duration-500",
              stage === 0
                ? "border-system-cyan/40 text-system-cyan"
                : stage < 3
                  ? "translate-y-1 border-border text-muted opacity-50"
                  : "border-border/50 text-muted/40 opacity-30",
            )}
          >
            {source}
          </span>
        ))}
      </div>

      <div className="mb-3 flex justify-center font-mono text-[10px] text-system-cyan/70" aria-hidden>
        {stage >= 1 ? "↓ converge" : "·"}
      </div>

      <div
        className={cn(
          "rounded-md border px-3 py-4 text-center text-xs transition-colors duration-500",
          stage === 0 && "border-border text-muted",
          stage === 1 && "border-accent bg-accent-soft text-foreground",
          stage === 2 && "border-system-cyan/50 bg-accent-soft text-foreground",
          stage >= 3 && "border-signal/50 bg-signal-08 text-foreground",
        )}
      >
        {stage === 0 ? "FRAGMENTED INPUTS" : null}
        {stage === 1 ? "NORMALIZATION / FIELD MAPPING" : null}
        {stage === 2 ? "CANONICAL RECORD" : null}
        {stage >= 3 ? (
          <span className="inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-signal" aria-hidden />
            <span className="text-signal">ML READY</span>
          </span>
        ) : null}
      </div>
    </div>
  );
}
