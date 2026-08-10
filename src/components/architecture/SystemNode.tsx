import { cn } from "@/lib/cn";

export type NodeState = "idle" | "active" | "success" | "processing";

type SystemNodeProps = {
  label: string;
  meta?: string;
  state?: NodeState;
  className?: string;
  onFocus?: () => void;
  tabIndex?: number;
};

const stateStyles: Record<NodeState, string> = {
  idle: "border-border bg-surface text-foreground",
  active: "border-accent bg-accent-soft text-foreground shadow-[0_0_24px_rgba(59,130,246,0.2)]",
  success: "border-success/50 bg-success/10 text-foreground",
  processing: "border-processing/50 bg-processing/10 text-foreground",
};

/** Architecture diagram node primitive. */
export function SystemNode({
  label,
  meta,
  state = "idle",
  className,
  onFocus,
  tabIndex = 0,
}: SystemNodeProps) {
  return (
    <div
      role="listitem"
      tabIndex={tabIndex}
      onFocus={onFocus}
      onMouseEnter={onFocus}
      className={cn(
        "focus-ring min-w-[7.5rem] rounded-md border px-3 py-2 transition-[border-color,background-color,box-shadow] duration-200",
        stateStyles[state],
        className,
      )}
    >
      <div className="text-xs font-medium tracking-tight">{label}</div>
      {meta ? <div className="mt-1 font-mono text-[10px] uppercase tracking-wider text-muted">{meta}</div> : null}
    </div>
  );
}
