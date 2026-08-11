import { forwardRef } from "react";
import { cn } from "@/lib/cn";

export type EnvironmentTone =
  | "void"
  | "lifted"
  | "system"
  | "illuminated"
  | "deep"
  | "quiet"
  | "human"
  | "signal";

const TONE_CLASS: Record<EnvironmentTone, string> = {
  void: "env-void",
  lifted: "env-lifted",
  system: "env-system",
  illuminated: "env-illuminated",
  deep: "env-deep",
  quiet: "env-quiet",
  human: "env-human",
  signal: "env-signal",
};

type SectionEnvironmentProps = {
  children: React.ReactNode;
  tone: EnvironmentTone;
  /** Intentional technical grid — use sparingly */
  grid?: boolean;
  gridClassName?: string;
  /** Large editorial ghost typography (max 1–2 per page) */
  ghost?: string;
  className?: string;
  id?: string;
  "aria-labelledby"?: string;
};

/**
 * Homepage visual environment — depth, illumination, and temperature
 * without hard color bands.
 */
export const SectionEnvironment = forwardRef<HTMLElement, SectionEnvironmentProps>(
  function SectionEnvironment(
    {
      children,
      tone,
      grid = false,
      gridClassName,
      ghost,
      className,
      id,
      "aria-labelledby": ariaLabelledBy,
    },
    ref,
  ) {
    return (
      <section
        ref={ref}
        id={id}
        aria-labelledby={ariaLabelledBy}
        className={cn("relative overflow-hidden", TONE_CLASS[tone], className)}
      >
        {grid ? (
          <div
            aria-hidden
            className={cn(
              "pointer-events-none absolute inset-0 grid-overlay opacity-55",
              gridClassName,
            )}
          />
        ) : null}
        {ghost ? (
          <div
            aria-hidden
            className="env-ghost-type absolute -right-4 top-8 hidden select-none lg:block xl:right-8"
          >
            {ghost}
          </div>
        ) : null}
        {children}
      </section>
    );
  },
);
