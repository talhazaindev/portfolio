"use client";

import { useMemo, useState } from "react";
import type { ArchitectureDefinition } from "@/types/content";
import { SystemNode, type NodeState } from "@/components/architecture/SystemNode";
import { cn } from "@/lib/cn";

type ArchitectureCanvasProps = {
  architecture: ArchitectureDefinition;
  className?: string;
  compact?: boolean;
};

/** Semantic architecture canvas driven by project architecture data. */
export function ArchitectureCanvas({
  architecture,
  className,
  compact = false,
}: ArchitectureCanvasProps) {
  const [activeId, setActiveId] = useState<string | null>(null);

  const related = useMemo(() => {
    if (!activeId) return new Set<string>();
    const set = new Set<string>([activeId]);
    for (const edge of architecture.edges) {
      if (edge.from === activeId) set.add(edge.to);
      if (edge.to === activeId) set.add(edge.from);
    }
    return set;
  }, [activeId, architecture.edges]);

  function nodeState(id: string): NodeState {
    if (!activeId) return "idle";
    if (id === activeId) return "active";
    if (related.has(id)) return "processing";
    return "idle";
  }

  return (
    <div
      className={cn(
        "rounded-[var(--radius-lg)] border border-border bg-background-elevated/80 p-4 sm:p-6",
        className,
      )}
    >
      {architecture.description ? (
        <p className="mb-5 max-w-3xl text-sm leading-relaxed text-muted">
          {architecture.description}
        </p>
      ) : null}

      <div
        role="list"
        aria-label="System architecture"
        className={cn(
          "grid gap-3",
          compact
            ? "grid-cols-2 sm:grid-cols-3"
            : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4",
        )}
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

      <ul className="mt-5 space-y-1.5 border-t border-border pt-4 font-mono text-[11px] text-muted">
        {architecture.edges.slice(0, compact ? 4 : 8).map((edge) => {
          const from = architecture.nodes.find((n) => n.id === edge.from)?.label ?? edge.from;
          const to = architecture.nodes.find((n) => n.id === edge.to)?.label ?? edge.to;
          const lit = activeId ? related.has(edge.from) && related.has(edge.to) : false;
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
    </div>
  );
}
