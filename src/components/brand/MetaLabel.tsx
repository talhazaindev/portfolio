import { cn } from "@/lib/cn";

type MetaLabelProps = {
  /** Leading keyword — may receive signal color when `signal` is true. */
  keyword: string;
  value: string;
  /** Amber on keyword or leading dot — use only for genuine signals. */
  signal?: boolean;
  className?: string;
};

/**
 * Sparse metadata language: SYSTEM / 01 · SIGNAL / 02 · OUTCOME / &lt;5S
 */
export function MetaLabel({ keyword, value, signal = false, className }: MetaLabelProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-muted",
        className,
      )}
    >
      {signal ? (
        <span className="h-1 w-1 shrink-0 rounded-full bg-signal" aria-hidden />
      ) : null}
      <span>
        <span className={signal ? "text-signal" : undefined}>{keyword}</span>
        <span className="text-muted"> / </span>
        <span className="text-foreground/80">{value}</span>
      </span>
    </span>
  );
}
