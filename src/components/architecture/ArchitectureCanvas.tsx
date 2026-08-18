"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import type { ArchitectureDefinition } from "@/types/content";
import { SystemNode, type NodeState } from "@/components/architecture/SystemNode";
import { cn } from "@/lib/cn";

type ArchitectureCanvasProps = {
  architecture: ArchitectureDefinition;
  className?: string;
  compact?: boolean;
};

/** Derive a rough execution order from edges (BFS from roots). */
function executionOrder(architecture: ArchitectureDefinition): string[] {
  const incoming = new Map<string, number>();
  for (const node of architecture.nodes) incoming.set(node.id, 0);
  for (const edge of architecture.edges) {
    incoming.set(edge.to, (incoming.get(edge.to) ?? 0) + 1);
  }

  const queue = architecture.nodes
    .filter((node) => (incoming.get(node.id) ?? 0) === 0)
    .map((node) => node.id);
  const order: string[] = [];
  const seen = new Set<string>();

  while (queue.length) {
    const id = queue.shift()!;
    if (seen.has(id)) continue;
    seen.add(id);
    order.push(id);
    for (const edge of architecture.edges) {
      if (edge.from === id && !seen.has(edge.to)) {
        queue.push(edge.to);
      }
    }
  }

  for (const node of architecture.nodes) {
    if (!seen.has(node.id)) order.push(node.id);
  }

  return order;
}

/** Semantic architecture canvas driven by project architecture data. */
export function ArchitectureCanvas({
  architecture,
  className,
  compact = false,
}: ArchitectureCanvasProps) {
  const reduce = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [litIds, setLitIds] = useState<Set<string>>(new Set());
  const [played, setPlayed] = useState(false);
  const [entered, setEntered] = useState(false);

  const order = useMemo(() => executionOrder(architecture), [architecture]);

  const related = useMemo(() => {
    if (!activeId) return new Set<string>();
    const set = new Set<string>([activeId]);
    for (const edge of architecture.edges) {
      if (edge.from === activeId) set.add(edge.to);
      if (edge.to === activeId) set.add(edge.from);
    }
    return set;
  }, [activeId, architecture.edges]);

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
      { threshold: 0.35 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!entered || played || reduce) return;

    let index = 0;
    const stepMs = Math.min(160, Math.max(90, 1000 / Math.max(order.length, 1)));

    const id = window.setInterval(() => {
      if (index >= order.length) {
        window.clearInterval(id);
        setPlayed(true);
        setActiveId(null);
        return;
      }
      const nodeId = order[index]!;
      setLitIds((prev) => new Set([...prev, nodeId]));
      setActiveId(nodeId);
      index += 1;
    }, stepMs);

    return () => window.clearInterval(id);
  }, [entered, played, reduce, order]);

  const visibleLit = reduce
    ? new Set(architecture.nodes.map((n) => n.id))
    : litIds;

  function replay() {
    if (reduce) return;
    setLitIds(new Set());
    setActiveId(null);
    setPlayed(false);
  }

  function nodeState(id: string): NodeState {
    if (reduce) {
      if (activeId) {
        if (id === activeId) return "active";
        if (related.has(id)) return "processing";
      }
      return "idle";
    }
    if (activeId) {
      if (id === activeId) return "active";
      if (related.has(id)) return "processing";
      return visibleLit.has(id) ? "success" : "idle";
    }
    if (!played && visibleLit.has(id)) return "processing";
    if (played && visibleLit.has(id)) return "idle";
    return "idle";
  }

  return (
    <div
      ref={rootRef}
      className={cn(
        "rounded-[var(--radius-lg)] border border-border bg-background-elevated/80 p-4 sm:p-6",
        className,
      )}
    >
      <div
        role="list"
        aria-label="System architecture"
        className={cn(
          "grid gap-3",
          compact
            ? "grid-cols-2 sm:grid-cols-3"
            : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4",
        )}
        onClick={replay}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            replay();
          }
        }}
      >
        {architecture.nodes.map((node) => (
          <SystemNode
            key={node.id}
            label={node.label}
            meta={node.meta}
            state={nodeState(node.id)}
            onFocus={() => setActiveId(node.id)}
            className="w-full"
          />
        ))}
      </div>

      <ul className="mt-5 space-y-1.5 border-t border-border pt-4 font-mono text-[11px] text-ink-muted">
        {architecture.edges.slice(0, compact ? 4 : 8).map((edge) => {
          const from = architecture.nodes.find((n) => n.id === edge.from)?.label ?? edge.from;
          const to = architecture.nodes.find((n) => n.id === edge.to)?.label ?? edge.to;
          const lit = activeId
            ? related.has(edge.from) && related.has(edge.to)
            : visibleLit.has(edge.from) && visibleLit.has(edge.to);
          return (
            <li
              key={`${edge.from}-${edge.to}-${edge.label ?? ""}`}
              className={cn("transition-colors duration-200", lit && "text-accent-secondary")}
            >
              {from} → {to}
              {edge.label ? ` · ${edge.label}` : ""}
            </li>
          );
        })}
      </ul>
      <p className="mono-label mt-4 !normal-case !tracking-normal !text-[10px] !text-ink-muted">
        Execution path plays once on view · hover a node or tap the canvas to replay
      </p>
    </div>
  );
}
