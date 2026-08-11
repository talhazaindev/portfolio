"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/cn";

type PointerLabelProps = {
  label?: string;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
};

function subscribeFinePointer(onStoreChange: () => void) {
  const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
  mq.addEventListener("change", onStoreChange);
  return () => mq.removeEventListener("change", onStoreChange);
}

function getFinePointerSnapshot() {
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

function getServerSnapshot() {
  return false;
}

/**
 * Desktop-only follow label for project / interface targets.
 * Disabled on touch devices.
 */
export function PointerLabel({
  label = "VIEW SYSTEM ↗",
  children,
  className,
  disabled = false,
}: PointerLabelProps) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const finePointer = useSyncExternalStore(
    subscribeFinePointer,
    getFinePointerSnapshot,
    getServerSnapshot,
  );
  const [portalReady, setPortalReady] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setPortalReady(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  const active = portalReady && finePointer && !disabled;

  return (
    <div
      className={cn("relative", className)}
      onMouseEnter={() => active && setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onMouseMove={(event) => {
        if (!active) return;
        setPos({ x: event.clientX, y: event.clientY });
      }}
    >
      {children}
      {active && visible
        ? createPortal(
            <div
              aria-hidden
              className="pointer-events-none fixed z-[70] -translate-x-1/2 -translate-y-[140%] whitespace-nowrap rounded border border-border bg-surface/95 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-accent-secondary shadow-[var(--shadow-soft)]"
              style={{ left: pos.x, top: pos.y }}
            >
              {label}
            </div>,
            document.body,
          )
        : null}
    </div>
  );
}
