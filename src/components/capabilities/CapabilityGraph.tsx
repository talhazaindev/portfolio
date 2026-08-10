"use client";

import { useState } from "react";
import { capabilityGraphBranches } from "@/data/capabilities";
import { cn } from "@/lib/cn";

/** Interactive systems map — Production AI at the center. */
export function CapabilityGraph() {
  const [active, setActive] = useState<string | null>("agentic");
  const branch = capabilityGraphBranches.find((b) => b.id === active);

  return (
    <div className="rounded-[var(--radius-lg)] border border-border bg-surface/60 p-4 sm:p-6">
      <div className="mono-label mb-5">Capability graph / production AI</div>

      <div className="flex flex-col items-center gap-6 lg:flex-row lg:items-stretch lg:justify-between">
        <div className="flex flex-wrap justify-center gap-2 lg:max-w-[14rem] lg:flex-col">
          {capabilityGraphBranches.slice(0, 4).map((item) => (
            <BranchChip
              key={item.id}
              label={item.label}
              active={active === item.id}
              onSelect={() => setActive(item.id)}
            />
          ))}
        </div>

        <div className="relative flex min-h-[10rem] flex-1 items-center justify-center">
          <div className="absolute h-40 w-40 rounded-full border border-accent/30 bg-accent-soft/40 blur-2xl" aria-hidden />
          <div className="relative rounded-full border border-accent/50 bg-background px-6 py-5 text-center shadow-[0_0_40px_rgba(59,130,246,0.15)]">
            <div className="mono-label mb-1 text-accent-secondary">Center</div>
            <div className="text-sm font-semibold tracking-tight">PRODUCTION AI</div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-2 lg:max-w-[14rem] lg:flex-col lg:items-end">
          {capabilityGraphBranches.slice(4).map((item) => (
            <BranchChip
              key={item.id}
              label={item.label}
              active={active === item.id}
              onSelect={() => setActive(item.id)}
            />
          ))}
        </div>
      </div>

      {branch ? (
        <div className="mt-6 border-t border-border pt-4">
          <p className="text-sm font-medium text-foreground">{branch.label}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {branch.technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-border bg-background/60 px-2.5 py-1 font-mono text-[11px] text-muted"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function BranchChip({
  label,
  active,
  onSelect,
}: {
  label: string;
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "focus-ring rounded-md border px-3 py-2 text-left text-xs transition-colors duration-180",
        active
          ? "border-accent bg-accent-soft text-foreground"
          : "border-border bg-background/40 text-muted hover:text-foreground",
      )}
    >
      {label}
    </button>
  );
}
