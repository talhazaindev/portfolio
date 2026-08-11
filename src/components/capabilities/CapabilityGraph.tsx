"use client";

import { useState } from "react";
import { capabilityGraphBranches } from "@/data/capabilities";
import { cn } from "@/lib/cn";

/** Interactive systems map — Production AI at the center; reduced chrome. */
export function CapabilityGraph() {
  const [active, setActive] = useState<string | null>("agentic");
  const branch = capabilityGraphBranches.find((b) => b.id === active);

  return (
    <div className="relative p-1 sm:p-2">
      <div className="mono-label mb-6">Capability graph / production AI</div>

      <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-stretch lg:justify-between lg:gap-6">
        <div className="flex flex-wrap justify-center gap-2 lg:max-w-[13rem] lg:flex-col">
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
          <div
            className="absolute h-36 w-36 rounded-full bg-accent-soft/50 blur-2xl"
            aria-hidden
          />
          <div className="relative rounded-full border border-accent/45 bg-surface-0/80 px-6 py-5 text-center shadow-[0_0_40px_rgba(57,118,246,0.14)]">
            <div className="mono-label mb-1 text-accent-secondary">Center</div>
            <div className="text-sm font-semibold tracking-tight text-heading">
              PRODUCTION AI
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-2 lg:max-w-[13rem] lg:flex-col lg:items-end">
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
        <div className="mt-8 pt-5">
          <p className="text-sm font-medium text-heading">{branch.label}</p>
          <div className="mt-3 flex flex-wrap gap-x-3 gap-y-2">
            {branch.technologies.map((tech) => (
              <span key={tech} className="font-mono text-[11px] text-muted">
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
        "focus-ring px-2 py-1.5 text-left text-xs transition-colors duration-180",
        active
          ? "text-foreground"
          : "text-muted hover:text-foreground",
      )}
    >
      <span
        className={cn(
          "mr-2 inline-block h-1 w-1 rounded-full align-middle",
          active ? "bg-system-cyan" : "bg-border-strong",
        )}
        aria-hidden
      />
      {label}
    </button>
  );
}
