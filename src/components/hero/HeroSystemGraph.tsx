"use client";

import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
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
  human?: boolean;
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
    human: true,
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

/** Lifecycle stages for the once-on-view execution story. */
const STORY_STAGES: string[][] = [
  ["user"],
  ["orchestrator"],
  ["agents", "rag", "tools"],
  ["models", "memory"],
  ["eval"],
  ["api"],
  ["obs"],
];

/** Conceptual interactive AI system graph — Neural Ivory architecture artifact. */
export function HeroSystemGraph() {
  const reduce = useReducedMotion();
  const gradientId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<string>("orchestrator");
  const [storyDone, setStoryDone] = useState(false);
  const [pulseKey, setPulseKey] = useState(0);
  const [entered, setEntered] = useState(false);

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
  const storyComplete = Boolean(reduce) || storyDone;

  const select = useCallback(
    (id: string) => {
      setActive(id);
      if (storyComplete && !reduce) {
        setPulseKey((k) => k + 1);
      }
    },
    [storyComplete, reduce],
  );

  // Observe first viewport entry, then run lifecycle once
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setEntered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!entered || storyDone || reduce) return;

    let stage = 0;
    const id = window.setInterval(() => {
      const stageNodes = STORY_STAGES[stage];
      if (!stageNodes) {
        window.clearInterval(id);
        setActive("orchestrator");
        setStoryDone(true);
        return;
      }
      setActive(stageNodes[stageNodes.length - 1]!);
      stage += 1;
      if (stage >= STORY_STAGES.length) {
        window.clearInterval(id);
        window.setTimeout(() => {
          setActive("orchestrator");
          setStoryDone(true);
        }, 150);
      }
    }, 150);

    return () => window.clearInterval(id);
  }, [entered, reduce, storyDone]);

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

  const showPulse = storyComplete && !reduce && pulseKey > 0;

  return (
    <div
      ref={rootRef}
      className="relative flex h-full min-h-0 flex-col overflow-hidden rounded-[var(--radius-lg)] border border-[#D3D8DE] bg-canvas-soft shadow-[var(--shadow-graph)]"
    >
      <div className="flex items-center justify-between gap-3 border-b border-[#D3D8DE]/80 px-4 py-3 sm:px-5">
        <div className="flex items-center gap-2.5">
          <BrandSignature size="sm" />
          <div>
            <p className="mono-label !text-[10px] !text-system-navy">TZ Systems Graph</p>
            <p className="mt-0.5 font-mono text-[10px] text-ink-muted">
              Conceptual production topology
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="hidden font-mono text-[10px] uppercase tracking-wider text-ink-muted sm:inline">
            {String(activeIndex + 1).padStart(2, "0")} / {String(nodes.length).padStart(2, "0")}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-md border border-system-cyan/35 bg-white px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-system-cyan">
            <span
              className={cn(
                "h-1.5 w-1.5 rounded-full bg-system-cyan",
                !storyComplete && !reduce && "motion-safe:animate-pulse",
              )}
            />
            {storyComplete ? "Ready" : "Boot"}
          </span>
        </div>
      </div>

      <div className="grid gap-2 p-3 md:hidden" role="list" aria-label="Production AI system stages">
        {nodes.map((node) => (
          <button
            key={node.id}
            type="button"
            onClick={() => select(node.id)}
            className={cn(
              "focus-ring flex items-start justify-between gap-3 rounded-md border px-3 py-2.5 text-left transition-colors duration-200",
              active === node.id
                ? "border-system-blue bg-white shadow-[var(--shadow-sm)]"
                : "border-[#D3D8DE] bg-white",
            )}
          >
            <span>
              <span className="block text-xs font-medium text-ink">{node.label}</span>
              <span className="mt-1 block text-[11px] text-ink-muted">{node.detail}</span>
            </span>
            <span className="shrink-0 font-mono text-[10px] text-system-cyan">{node.meta}</span>
          </button>
        ))}
      </div>

      <div className="relative hidden flex-1 bg-canvas-soft md:block">
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 h-full w-full"
          role="img"
          aria-label="Interactive AI system architecture. Use arrow keys to move between nodes."
        >
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--system-blue)" stopOpacity="0.95" />
              <stop offset="100%" stopColor="var(--system-cyan)" stopOpacity="0.95" />
            </linearGradient>
            <filter id={`${gradientId}-shadow`} x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0.4" stdDeviation="0.6" floodColor="rgba(23,63,95,0.12)" />
            </filter>
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
                  stroke={lit ? `url(#${gradientId})` : "rgba(23,63,95,0.14)"}
                  strokeWidth={lit ? 0.55 : 0.28}
                  className="transition-[stroke-width] duration-300"
                />
                {lit && showPulse ? (
                  <line
                    key={`pulse-${pulseKey}-${from}-${to}`}
                    x1={a.x}
                    y1={a.y}
                    x2={b.x}
                    y2={b.y}
                    stroke="var(--system-cyan)"
                    strokeWidth="0.35"
                    strokeDasharray="1.2 2.4"
                    className="tz-flow-dash-once"
                    opacity="0.9"
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

            let fill = "#FFFFFF";
            let stroke = "#D3D8DE";
            let labelFill = "var(--ink)";
            let metaFill = "var(--system-cyan)";

            if (node.hub) {
              fill = "var(--system-navy)";
              stroke = isActive ? "var(--system-blue)" : "var(--system-navy)";
              labelFill = "var(--breakout-text)";
              metaFill = "var(--system-cyan-soft)";
            } else if (node.human && isActive) {
              fill = "#FFFFFF";
              stroke = "var(--signal)";
              metaFill = "var(--signal-strong)";
            } else if (isActive) {
              fill = "#FFFFFF";
              stroke = "var(--system-blue)";
              metaFill = "var(--system-cyan)";
            } else if (lit) {
              stroke = "rgba(45,108,223,0.45)";
            }

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
                filter={isActive || node.hub ? `url(#${gradientId}-shadow)` : undefined}
              >
                {isActive ? (
                  <rect
                    x={node.x - w / 2 - 1.2}
                    y={node.y - h / 2 - 1.2}
                    width={w + 2.4}
                    height={h + 2.4}
                    rx="1.6"
                    fill="none"
                    stroke={node.human ? "var(--signal)" : "var(--system-cyan)"}
                    strokeOpacity="0.45"
                    strokeWidth="0.3"
                  />
                ) : null}
                <rect
                  x={node.x - w / 2}
                  y={node.y - h / 2}
                  width={w}
                  height={h}
                  rx="1.3"
                  fill={fill}
                  stroke={stroke}
                  strokeWidth={node.hub ? 0.45 : isActive ? 0.42 : 0.32}
                  className="transition-[fill,stroke] duration-300"
                />
                <text
                  x={node.x}
                  y={node.y - 0.35}
                  textAnchor="middle"
                  fill={labelFill}
                  fontSize={node.hub ? 2.05 : 1.65}
                  fontFamily="var(--font-mono)"
                  opacity={lit ? 1 : 0.38}
                  className="transition-opacity duration-300"
                >
                  {node.short}
                </text>
                <text
                  x={node.x}
                  y={node.y + 2.1}
                  textAnchor="middle"
                  fill={metaFill}
                  fontSize="1.2"
                  fontFamily="var(--font-mono)"
                  opacity={lit ? 0.95 : 0.28}
                >
                  {node.meta}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="mt-auto border-t border-[#D3D8DE]/80 bg-white/70 px-4 py-3.5 sm:px-5">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className="text-sm font-medium tracking-tight text-ink">
            {activeNode.label}
          </span>
          <span className="font-mono text-[11px] text-system-cyan">{activeNode.meta}</span>
        </div>
        <p className="mt-1.5 max-w-xl text-xs leading-relaxed text-ink-secondary sm:text-[13px]">
          {activeNode.detail}
        </p>
        <p className="mono-label mt-3 !normal-case !tracking-normal !text-[10px] !text-ink-muted">
          Hover · tap · arrow keys — paths illuminate with the active node
        </p>
      </div>
    </div>
  );
}
