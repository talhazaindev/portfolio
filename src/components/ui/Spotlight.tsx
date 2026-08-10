"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/cn";

type SpotlightProps = {
  children: React.ReactNode;
  className?: string;
};

/**
 * Cursor spotlight surface adapted from 21st.dev spotlight-card patterns,
 * restyled to observatory tokens. Tap-safe: no hover requirement for content.
 */
export function Spotlight({ children, className }: SpotlightProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(false);

  function onMove(event: React.MouseEvent<HTMLDivElement>) {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setCoords({ x: event.clientX - rect.left, y: event.clientY - rect.top });
    setActive(true);
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => setActive(false)}
      className={cn(
        "relative overflow-hidden rounded-[var(--radius-lg)] border border-border bg-surface/70",
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 md:group-hover:opacity-100"
        style={{
          opacity: active ? 1 : 0,
          background: `radial-gradient(420px circle at ${coords.x}px ${coords.y}px, rgba(59,130,246,0.14), transparent 55%)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
