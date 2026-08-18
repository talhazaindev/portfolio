"use client";

import { useEffect, useRef, useState } from "react";
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
 * Plays once on view; tap to replay.
 */
export function ProjectVisual({ project, className }: ProjectVisualProps) {
  const reduce = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const [tick, setTick] = useState(0);
  const [playing, setPlaying] = useState(false);
  const maxTick = maxPhase(project.visualGrammar);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setPlaying(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!playing || reduce) return;

    let current = 0;
    const id = window.setInterval(() => {
      current += 1;
      if (current > maxTick) {
        window.clearInterval(id);
        setPlaying(false);
        return;
      }
      setTick(current);
    }, 320);

    return () => window.clearInterval(id);
  }, [playing, reduce, maxTick]);

  const phaseTick = reduce ? maxTick : tick;

  function replay() {
    if (reduce) return;
    setTick(0);
    setPlaying(true);
  }

  return (
    <div
      ref={rootRef}
      role="button"
      tabIndex={0}
      onClick={replay}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          replay();
        }
      }}
      className={cn(
        "focus-ring overflow-hidden rounded-[var(--radius-lg)] border border-border bg-background-elevated p-4 sm:p-6",
        className,
      )}
      aria-label="System visual grammar. Activate to replay execution."
    >
      <div className="mono-label mb-4">
        Visual grammar / {project.visualGrammar.replace(/-/g, " ")}
      </div>
      {project.visualGrammar === "parallel-orchestration" ? (
        <ParallelVisual tick={phaseTick} />
      ) : null}
      {project.visualGrammar === "agent-state-graph" ? (
        <AgentStateVisual tick={phaseTick} />
      ) : null}
      {project.visualGrammar === "semantic-spatial" ? (
        <SpatialVisual tick={phaseTick} reduce={Boolean(reduce)} />
      ) : null}
      {project.visualGrammar === "data-transformation" ? (
        <TransformVisual tick={phaseTick} />
      ) : null}
      {project.visualGrammar === "generic" ? (
        <p className="text-sm text-ink-muted">{project.headline}</p>
      ) : null}
      <p className="mono-label mt-4 !normal-case !tracking-normal !text-[10px] !text-ink-muted">
        Plays once · tap to replay
      </p>
    </div>
  );
}

function maxPhase(grammar: Project["visualGrammar"]): number {
  switch (grammar) {
    case "parallel-orchestration":
      return 4;
    case "agent-state-graph":
      return 4;
    case "semantic-spatial":
      return 4;
    case "data-transformation":
      return 3;
    default:
      return 0;
  }
}

function ParallelVisual({ tick }: { tick: number }) {
  const phase = Math.min(tick, 4);
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
    return false;
  };

  return (
    <div>
      <div
        className={cn(
          "mb-3 rounded-md border px-3 py-2 text-center text-xs transition-colors duration-300",
          phase === 0
            ? "border-system-cyan/50 bg-accent-soft text-ink-strong"
            : "border-border bg-surface text-ink-muted",
        )}
      >
        PROMPT
      </div>

      <div className="mb-2 flex justify-center" aria-hidden>
        <span
          className={cn(
            "font-mono text-[10px] transition-opacity duration-300",
            phase >= 1 ? "text-system-cyan" : "text-ink-muted/40",
          )}
        >
          ↓ ROUTER
        </span>
      </div>

      <div
        className={cn(
          "mb-3 flex justify-center gap-3 font-mono text-[9px] transition-opacity duration-300",
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
                "rounded-md border px-2 py-3 text-center font-mono text-[11px] transition-all duration-300",
                done
                  ? "border-system-cyan/60 bg-accent-soft text-ink-strong"
                  : running
                    ? "border-accent bg-accent-soft/60 text-ink-strong"
                    : phase >= 1
                      ? "border-border text-ink-muted"
                      : "border-border/60 text-ink-muted/50",
              )}
            >
              {name}
              <div className="mt-1 text-[9px] uppercase tracking-wider text-ink-muted">
                {done ? "done" : running ? "run" : phase >= 1 ? "queued" : "—"}
              </div>
            </div>
          );
        })}
      </div>

      <div
        className={cn(
          "mt-4 rounded-md border px-3 py-2 text-center font-mono text-[10px] transition-all duration-300",
          phase >= 4
            ? "border-signal/50 bg-signal-08 text-signal"
            : "border-border bg-background/50 text-ink-muted",
        )}
      >
        {phase >= 4 ? "AGGREGATE → ASSETS" : "ASYNC EXECUTION → NORMALIZE"}
      </div>
    </div>
  );
}

function AgentStateVisual({ tick }: { tick: number }) {
  const states = [
    { id: "REQUEST", kind: "system" as const },
    { id: "ROUTER", kind: "system" as const },
    { id: "SPECIALIST", kind: "system" as const },
    { id: "HITL", kind: "human" as const },
    { id: "OUTPUT", kind: "outcome" as const },
  ];
  const active = Math.min(tick, states.length - 1);
  const confidence = [0.91, 0.94, 0.88, 0.97, 0.93][active];

  return (
    <div className="flex flex-col gap-2">
      {states.map((state, index) => {
        const isActive = index === active;
        const isPast = index < active;
        const isHuman = state.kind === "human";
        const isOutcome = state.kind === "outcome";
        return (
          <div
            key={state.id}
            className={cn(
              "flex items-center justify-between rounded-md border px-3 py-2 font-mono text-xs transition-all duration-300",
              isActive && isHuman
                ? "translate-x-1 border-signal/60 bg-signal-12 text-ink-strong"
                : isActive && isOutcome
                  ? "translate-x-1 border-signal/40 bg-signal-08 text-ink-strong"
                  : isActive
                    ? "translate-x-1 border-accent bg-accent-soft text-ink-strong"
                    : isPast
                      ? "border-border/80 text-ink-secondary"
                      : "border-border text-ink-muted",
            )}
          >
            <span className="flex items-center gap-2">
              {isActive || isPast ? (
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
              <span
                className={cn(
                  "text-[9px] uppercase tracking-wider",
                  isActive ? "text-signal" : "text-ink-muted",
                )}
              >
                Human gate
              </span>
            ) : null}
          </div>
        );
      })}
      <div className="mt-2 rounded-md border border-border bg-background/50 px-3 py-2 font-mono text-[10px] text-ink-muted">
        <span className="text-accent-secondary">route.confidence</span>
        <span className="ml-3 text-ink-strong">{confidence?.toFixed(2)}</span>
      </div>
    </div>
  );
}

function SpatialVisual({ tick, reduce }: { tick: number; reduce: boolean }) {
  const weights = [
    { label: "FOOTFALL", value: 30 },
    { label: "TRAFFIC", value: 30 },
    { label: "POI DENSITY", value: 20 },
    { label: "PROXIMITY", value: 20 },
  ];
  const [hovered, setHovered] = useState<number | null>(null);
  const pulse = hovered ?? Math.min(tick, weights.length - 1);
  const ranked = tick >= 4 || reduce;

  return (
    <div>
      <div className="relative mx-auto mb-6 h-36 w-36 rounded-full border border-border">
        <div
          className="absolute inset-4 rounded-full border border-accent/40 transition-transform duration-300"
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
              "absolute h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full transition-colors duration-300",
              pulse % 3 === i
                ? "bg-system-cyan shadow-[0_0_6px_rgba(103,232,249,0.5)]"
                : "bg-border",
            )}
            style={{ top: pos.top, left: pos.left }}
            aria-hidden
          />
        ))}
        <div className="absolute inset-0 flex items-center justify-center text-center font-mono text-[10px] text-ink-muted">
          GEO
          <br />
          INTENT
        </div>
      </div>
      <div className="space-y-2">
        {weights.map((weight, index) => (
          <button
            key={weight.label}
            type="button"
            className="grid w-full grid-cols-[6rem_1fr_2.5rem] items-center gap-2 text-left"
            onMouseEnter={() => setHovered(index)}
            onMouseLeave={() => setHovered(null)}
            onFocus={() => setHovered(index)}
            onBlur={() => setHovered(null)}
          >
            <span className="font-mono text-[10px] text-ink-muted">{weight.label}</span>
            <div className="h-1.5 overflow-hidden rounded-full bg-border">
              <div
                className={cn(
                  "h-full rounded-full transition-all duration-300",
                  index === pulse ? "bg-accent-secondary" : "bg-accent/70",
                )}
                style={{ width: `${weight.value * (index === pulse ? 3.2 : 3)}%` }}
              />
            </div>
            <span className="font-mono text-[10px] text-ink-strong">{weight.value}%</span>
          </button>
        ))}
      </div>
      <div
        className={cn(
          "mt-4 rounded-md border px-3 py-2 font-mono text-[10px] transition-colors duration-300",
          ranked
            ? "border-signal/50 bg-signal-08 text-signal"
            : "border-border bg-background/50 text-ink-muted",
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

function TransformVisual({ tick }: { tick: number }) {
  const stage = Math.min(tick, 3);
  const sources = ["PDF", "CSV", "WAVEFORM", "IMAGE"];

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-2">
        {sources.map((source) => (
          <span
            key={source}
            className={cn(
              "rounded border px-2 py-1 font-mono text-[10px] transition-all duration-300",
              stage === 0
                ? "border-system-cyan/40 text-system-cyan"
                : stage < 3
                  ? "translate-y-1 border-border text-ink-muted opacity-50"
                  : "border-border/50 text-ink-muted/40 opacity-30",
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
          "rounded-md border px-3 py-4 text-center text-xs transition-colors duration-300",
          stage === 0 && "border-border text-ink-muted",
          stage === 1 && "border-accent bg-accent-soft text-ink-strong",
          stage === 2 && "border-system-cyan/50 bg-accent-soft text-ink-strong",
          stage >= 3 && "border-signal/50 bg-signal-08 text-ink-strong",
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
