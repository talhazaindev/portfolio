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
 * not decoration.
 */
export function ProjectVisual({ project, className }: ProjectVisualProps) {
  const reduce = useReducedMotion();
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => setTick((v) => v + 1), 1200);
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

function ParallelVisual({ tick }: { tick: number }) {
  const active = tick % 4;
  const models = ["FLUX", "KLING", "VEO", "OPENAI"];
  return (
    <div>
      <div className="mb-4 rounded-md border border-border bg-surface px-3 py-2 text-center text-xs">
        PROMPT
      </div>
      <div className="mb-3 text-center font-mono text-[10px] text-muted">MODEL FAN-OUT</div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {models.map((model, index) => (
          <div
            key={model}
            className={cn(
              "rounded-md border px-2 py-3 text-center font-mono text-[11px] transition-colors duration-300",
              index === active
                ? "border-accent bg-accent-soft text-foreground"
                : "border-border text-muted",
            )}
          >
            {model}
          </div>
        ))}
      </div>
      <div className="mt-4 space-y-2 text-center font-mono text-[10px] text-muted">
        <div>ASYNC EXECUTION → NORMALIZE → ASSETS</div>
        <div className="text-accent-secondary">sync pulse {active + 1}/4</div>
      </div>
    </div>
  );
}

function AgentStateVisual({ tick }: { tick: number }) {
  const states = ["TENANT", "ROUTER", "AGENTS", "HITL", "OUTPUT"];
  const active = tick % states.length;
  return (
    <div className="flex flex-col gap-2">
      {states.map((state, index) => (
        <div
          key={state}
          className={cn(
            "rounded-md border px-3 py-2 font-mono text-xs transition-all duration-300",
            index === active
              ? "border-accent bg-accent-soft translate-x-1"
              : "border-border text-muted",
          )}
        >
          {state}
        </div>
      ))}
    </div>
  );
}

function SpatialVisual({ tick }: { tick: number }) {
  const weights = [
    { label: "FOOTFALL", value: 30 },
    { label: "TRAFFIC", value: 30 },
    { label: "POI DENSITY", value: 20 },
    { label: "PROXIMITY", value: 20 },
  ];
  const pulse = tick % weights.length;
  return (
    <div>
      <div className="relative mx-auto mb-6 h-36 w-36 rounded-full border border-border">
        <div
          className="absolute inset-4 rounded-full border border-accent/40 transition-transform duration-500"
          style={{ transform: `scale(${1 + (pulse % 3) * 0.06})` }}
        />
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
    </div>
  );
}

function TransformVisual({ tick }: { tick: number }) {
  const stage = tick % 3;
  const sources = ["PDF", "IMAGE", "CSV", "WAVE"];
  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-2">
        {sources.map((source, index) => (
          <span
            key={source}
            className={cn(
              "rounded border px-2 py-1 font-mono text-[10px] transition-all duration-500",
              stage === 0
                ? "translate-y-0 border-warning/40 text-warning"
                : "border-border text-muted",
              stage > 0 && index < 2 ? "opacity-40" : "",
            )}
          >
            {source}
          </span>
        ))}
      </div>
      <div
        className={cn(
          "rounded-md border px-3 py-4 text-center text-xs transition-colors duration-500",
          stage >= 1 ? "border-accent bg-accent-soft" : "border-border text-muted",
        )}
      >
        {stage === 0 ? "FRAGMENTED INPUTS" : null}
        {stage === 1 ? "NORMALIZATION / FIELD MAPPING" : null}
        {stage === 2 ? "CANONICAL CLINICAL SCHEMA → ML READY" : null}
      </div>
    </div>
  );
}
