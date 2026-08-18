"use client";

import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/cn";

type NavItem = {
  id: string;
  label: string;
};

type CaseStudyNavProps = {
  items: NavItem[];
};

/** Desktop sticky section navigator for long case studies. */
export function CaseStudyNav({ items }: CaseStudyNavProps) {
  const [active, setActive] = useState(items[0]?.id ?? "");

  const ids = useMemo(() => items.map((item) => item.id), [items]);

  useEffect(() => {
    if (!ids.length) return;

    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) {
          setActive(visible[0].target.id);
        }
      },
      {
        rootMargin: "-20% 0px -55% 0px",
        threshold: [0.1, 0.25, 0.5],
      },
    );

    for (const el of elements) observer.observe(el);
    return () => observer.disconnect();
  }, [ids]);

  if (items.length < 3) return null;

  return (
    <nav
      aria-label="Case study sections"
      className="pointer-events-none fixed top-1/2 right-6 z-30 hidden -translate-y-1/2 lg:block xl:right-10"
    >
      <ol className="pointer-events-auto space-y-1.5 rounded-[var(--radius-md)] border border-border/80 bg-surface/90 p-3 shadow-[var(--shadow-sm)] backdrop-blur-sm">
        {items.map((item, index) => {
          const isActive = active === item.id;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={cn(
                  "focus-ring flex items-center gap-2 rounded-md px-2.5 py-1.5 transition-colors duration-180",
                  isActive
                    ? "bg-signal-08 text-ink-strong"
                    : "text-ink-muted hover:text-ink-strong",
                )}
                aria-current={isActive ? "location" : undefined}
              >
                <span className="font-mono text-[10px] tracking-wider">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-[11px] tracking-tight">{item.label}</span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
