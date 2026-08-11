"use client";

import { useState } from "react";
import type { AnatomyLayer } from "@/types/content";
import { cn } from "@/lib/cn";

type SystemAnatomyProps = {
  layers: AnatomyLayer[];
};

/** Interactive layered view of a flagship system's engineering anatomy. */
export function SystemAnatomy({ layers }: SystemAnatomyProps) {
  const [active, setActive] = useState(layers[0]?.id);
  const layer = layers.find((item) => item.id === active) ?? layers[0];
  const activeIndex = Math.max(
    0,
    layers.findIndex((item) => item.id === layer?.id),
  );

  if (!layer) return null;

  function onTabKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft" && event.key !== "Home" && event.key !== "End") {
      return;
    }
    event.preventDefault();
    let next = activeIndex;
    if (event.key === "ArrowRight") next = (activeIndex + 1) % layers.length;
    if (event.key === "ArrowLeft") next = (activeIndex - 1 + layers.length) % layers.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = layers.length - 1;
    setActive(layers[next]?.id);
  }

  return (
    <div className="rounded-[var(--radius-lg)] border border-border bg-surface/50">
      <div
        role="tablist"
        aria-label="System anatomy layers"
        className="flex gap-1 overflow-x-auto border-b border-border p-2"
        onKeyDown={onTabKeyDown}
      >
        {layers.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            id={`anatomy-tab-${item.id}`}
            aria-controls={`anatomy-panel-${item.id}`}
            aria-selected={item.id === layer.id}
            tabIndex={item.id === layer.id ? 0 : -1}
            className={cn(
              "focus-ring shrink-0 rounded-md px-3 py-2 font-mono text-[11px] uppercase tracking-wider transition-colors duration-180",
              item.id === layer.id
                ? "bg-accent-soft text-foreground"
                : "text-muted hover:text-foreground",
            )}
            onClick={() => setActive(item.id)}
          >
            {item.id}
          </button>
        ))}
      </div>
      <div
        role="tabpanel"
        id={`anatomy-panel-${layer.id}`}
        aria-labelledby={`anatomy-tab-${layer.id}`}
        className="p-5 sm:p-6"
      >
        <h3 className="text-lg tracking-tight text-foreground">{layer.title}</h3>
        <p className="mt-2 text-sm text-muted">{layer.summary}</p>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {layer.items.map((item) => (
            <li
              key={item}
              className="rounded-md border border-border bg-background/50 px-3 py-2 text-sm text-foreground/90"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
