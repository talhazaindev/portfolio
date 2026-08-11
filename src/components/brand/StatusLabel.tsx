import { cn } from "@/lib/cn";

type StatusLabelProps = {
  label: string;
  value: string;
  className?: string;
  /** One-shot pulse on mount — never a permanent loop. */
  pulseOnce?: boolean;
};

/** Sparse system-status brand detail — amber node = production signal. */
export function StatusLabel({
  label,
  value,
  className,
  pulseOnce = false,
}: StatusLabelProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-muted",
        className,
      )}
    >
      <span
        className={cn(
          "relative inline-flex h-1.5 w-1.5 rounded-full bg-signal",
          pulseOnce && "tz-signal-pulse-once",
        )}
        aria-hidden
      />
      <span>
        {label} / <span className="text-ink-secondary">{value}</span>
      </span>
    </span>
  );
}
