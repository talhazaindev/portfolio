"use client";

import { useCallback, useEffect, useId, useMemo, useState } from "react";
import { useReducedMotion } from "motion/react";
import { BrandSignature } from "@/components/brand/LogoMark";
import { cn } from "@/lib/cn";

type Node = {
  id: string;
  label: string;
  short: string;
  meta: string;
  detail: string;
  x: number;
  y: number;
  hub?: boolean;
};

const nodes: Node[] = [
  {
    id: "user",
    label: "USER / INPUT",
    short: "INPUT",
    meta: "Intent",
    detail: "Natural-language goals enter the system as structured intent.",
    x: 50,
    y: 7,
  },
  {
    id: "orchestrator",
    label: "ORCHESTRATOR",
    short: "ORCH",
    meta: "LangGraph",
    detail: "Stateful routing across agents, retrieval, tools and models.",
    x: 50,
    y: 26,
    hub: true,
  },
  {
    id: "agents",
    label: "AGENTS",
    short: "AGENTS",
    meta: "Multi-agent",
    detail: "Specialized workers execute bounded clinical or product tasks.",
    x: 16,
    y: 46,
  },
  {
    id: "rag",
    label: "RAG",
    short: "RAG",
    meta: "pgvector",
    detail: "Retrieval grounds generation in verified knowledge.",
    x: 38,
    y: 46,
  },
  {
    id: "tools",
    label: "TOOLS",
    short: "TOOLS",
    meta: "FastAPI",
    detail: "Deterministic capabilities the agents can invoke.",
    x: 62,
    y: 46,
  },
  {
    id: "models",
    label: "MODELS",
    short: "MODELS",
    meta: "LLM",
    detail: "Model calls for reasoning, generation and structured output.",
    x: 84,
    y: 46,
  },
  {
    id: "memory",
    label: "MEMORY",
    short: "MEMORY",
    meta: "Redis",
    detail: "Session and workflow state across multi-step runs.",
    x: 28,
    y: 65,
  },
  {
    id: "eval",
    label: "EVALUATION",
    short: "EVAL",
    meta: "RAGAS",
    detail: "Quality signals before results ship to production surfaces.",
    x: 72,
    y: 65,
  },
  {
    id: "api",
    label: "PRODUCTION API",
    short: "API",
    meta: "Deploy",
    detail: "Stable interfaces expose the system to products and clients.",
    x: 50,
    y: 82,
  },
  {
    id: "obs",
    label: "OBSERVABILITY",
    short: "OBS",
    meta: "LangSmith",
    detail: "Traces and metrics close the loop for iteration.",
    x: 50,
    y: 95,
  },
];

const edges: Array<[string, string]> = [
  ["user", "orchestrator"],
  ["orchestrator", "agents"],
  ["orchestrator", "rag"],
  ["orchestrator", "tools"],
  ["orchestrator", "models"],
  ["agents", "memory"],
  ["rag", "memory"],
  ["tools", "eval"],
  ["models", "eval"],
  ["memory", "api"],
  ["eval", "api"],
  ["api", "obs"],
];

/** Conceptual interactive AI system graph — hero signature visual. */
export function HeroSystemGraph() {
  const reduce = useReducedMotion();
  const gradientId = useId();
  const [active, setActive] = useState<string>("orchestrator");
  const [paused, setPaused] = useState(false);

  const related = useMemo(() => {
    const set = new Set<string>([active]);
    for (const [a, b] of edges) {
      if (a === active) set.add(b);
      if (b === active) set.add(a);
    }
    return set;
  }, [active]);

  const activeNode = nodes.find((n) => n.id === active) ?? nodes[1];
  const activeIndex = nodes.findIndex((n) => n.id === active);

  const select = useCallback((id: string) => {
    setActive(id);
    setPaused(true);
  }, []);

  // Gentle idle tour — storytelling without noise
  useEffect(() => {
    if (reduce || paused) return;
    const id = window.setInterval(() => {
      setActive((current) => {
        const index = nodes.findIndex((n) => n.id === current);
        return nodes[(index + 1) % nodes.length]?.id ?? "orchestrator";
      });
    }, 2800);
    return () => window.clearInterval(id);
  }, [reduce, paused]);

  useEffect(() => {
    if (!paused) return;
    const id = window.setTimeout(() => setPaused(false), 9000);
    return () => window.clearTimeout(id);
  }, [paused, active]);

  function onKeyNav(event: React.KeyboardEvent, id: string) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      select(id);
      return;
    }
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      const next = nodes[(activeIndex + 1) % nodes.length];
      select(next.id);
    }
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      const prev = nodes[(activeIndex - 1 + nodes.length) % nodes.length];
      select(prev.id);
    }
  }

  return (
    <div
      className="relative flex h-full min-h-[32rem] flex-col overflow-hidden rounded-[var(--radius-lg)] border border-border bg-surface/70 shadow-[var(--shadow-soft)] sm:min-h-[36rem] lg:min-h-full"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3 sm:px-5">
        <div className="flex items-center gap-2.5">
          <BrandSignature size="sm" />
          <div>
            <p className="mono-label !text-[10px] text-foreground/80">TZ Systems Graph</p>
            <p className="mt-0.5 font-mono text-[10px] text-muted">Conceptual production topology</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="hidden font-mono text-[10px] uppercase tracking-wider text-muted sm:inline">
            {String(activeIndex + 1).padStart(2, "0")} / {String(nodes.length).padStart(2, "0")}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-md border border-accent/30 bg-accent-soft px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-accent-secondary">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-secondary motion-safe:animate-pulse" />
            Live
          </span>
        </div>
      </div>

      {/* Mobile: compressed flow rail */}
      <div className="grid gap-2 p-3 md:hidden" role="list" aria-label="Production AI system stages">
        {nodes.map((node) => (
          <button
            key={node.id}
            type="button"
            onClick={() => select(node.id)}
            className={cn(
              "focus-ring flex items-start justify-between gap-3 rounded-md border px-3 py-2.5 text-left transition-colors duration-200",
              active === node.id
                ? "border-accent bg-accent-soft"
                : "border-border bg-background/50",
            )}
          >
            <span>
              <span className="block text-xs font-medium text-foreground">{node.label}</span>
              <span className="mt-1 block text-[11px] text-muted">{node.detail}</span>
            </span>
            <span className="shrink-0 font-mono text-[10px] text-accent-secondary">{node.meta}</span>
          </button>
        ))}
      </div>

      {/* Desktop topology */}
      <div className="relative hidden flex-1 md:block">
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 h-full w-full"
          role="img"
          aria-label="Interactive AI system architecture. Use arrow keys to move between nodes."
        >
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.9" />
              <stop offset="100%" stopColor="var(--accent-secondary)" stopOpacity="0.9" />
            </linearGradient>
          </defs>

          {edges.map(([from, to]) => {
            const a = nodes.find((n) => n.id === from)!;
            const b = nodes.find((n) => n.id === to)!;
            const lit = related.has(from) && related.has(to);
            return (
              <g key={`${from}-${to}`}>
                <line
                  x1={a.x}
                  y1={a.y}
                  x2={b.x}
                  y2={b.y}
                  stroke={lit ? `url(#${gradientId})` : "rgba(148,173,204,0.18)"}
                  strokeWidth={lit ? 0.55 : 0.28}
                  className="transition-[stroke-width] duration-300"
                />
                {lit && !reduce ? (
                  <line
                    x1={a.x}
                    y1={a.y}
                    x2={b.x}
                    y2={b.y}
                    stroke="var(--accent-secondary)"
                    strokeWidth="0.35"
                    strokeDasharray="1.2 2.4"
                    className="tz-flow-dash"
                    opacity="0.85"
                  />
                ) : null}
              </g>
            );
          })}

          {nodes.map((node) => {
            const lit = related.has(node.id);
            const isActive = active === node.id;
            const w = node.hub ? 22 : 17;
            const h = node.hub ? 9 : 7.2;
            return (
              <g
                key={node.id}
                className="cursor-pointer"
                onMouseEnter={() => select(node.id)}
                onFocus={() => select(node.id)}
                onKeyDown={(event) => onKeyNav(event, node.id)}
                tabIndex={0}
                role="button"
                aria-pressed={isActive}
                aria-label={`${node.label}: ${node.meta}. ${node.detail}`}
              >
                {isActive ? (
                  <rect
                    x={node.x - w / 2 - 1.2}
                    y={node.y - h / 2 - 1.2}
                    width={w + 2.4}
                    height={h + 2.4}
                    rx="1.6"
                    fill="none"
                    stroke="var(--accent-secondary)"
                    strokeOpacity="0.35"
                    strokeWidth="0.3"
                  />
                ) : null}
                <rect
                  x={node.x - w / 2}
                  y={node.y - h / 2}
                  width={w}
                  height={h}
                  rx="1.3"
                  fill={isActive ? "rgba(59,130,246,0.22)" : "rgba(10,16,26,0.94)"}
                  stroke={
                    isActive
                      ? "var(--accent)"
                      : lit
                        ? "rgba(148,173,204,0.4)"
                        : "rgba(148,173,204,0.12)"
                  }
                  strokeWidth={node.hub ? 0.45 : 0.32}
                  className="transition-[fill,stroke] duration-300"
                />
                <text
                  x={node.x}
                  y={node.y - 0.35}
                  textAnchor="middle"
                  fill="var(--foreground)"
                  fontSize={node.hub ? 2.05 : 1.65}
                  fontFamily="var(--font-mono)"
                  opacity={lit ? 1 : 0.32}
                  className="transition-opacity duration-300"
                >
                  {node.short}
                </text>
                <text
                  x={node.x}
                  y={node.y + 2.1}
                  textAnchor="middle"
                  fill="var(--accent-secondary)"
                  fontSize="1.2"
                  fontFamily="var(--font-mono)"
                  opacity={lit ? 0.9 : 0.2}
                >
                  {node.meta}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Inspector strip — technical storytelling */}
      <div className="mt-auto border-t border-border bg-background/40 px-4 py-3.5 sm:px-5">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className="text-sm font-medium tracking-tight text-foreground">
            {activeNode.label}
          </span>
          <span className="font-mono text-[11px] text-accent-secondary">{activeNode.meta}</span>
        </div>
        <p className="mt-1.5 max-w-xl text-xs leading-relaxed text-muted sm:text-[13px]">
          {activeNode.detail}
        </p>
        <p className="mono-label mt-3 !normal-case tracking-normal text-[10px]">
          Hover · tap · arrow keys — paths illuminate with the active node
        </p>
      </div>
    </div>
  );
}
