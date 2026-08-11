import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/Container";
import {
  SectionEnvironment,
  type EnvironmentTone,
} from "@/components/ui/SectionEnvironment";

type SectionProps = {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  id?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  /** Visual environment tone — omit for transparent (inherits page) */
  tone?: EnvironmentTone;
  grid?: boolean;
  ghost?: string;
  containerWidth?: "medium" | "wide" | "extra-wide" | "full";
};

/** Standard page section with optional editorial header and environment. */
export function Section({
  children,
  className,
  containerClassName,
  id,
  eyebrow,
  title,
  description,
  tone,
  grid,
  ghost,
  containerWidth = "wide",
}: SectionProps) {
  const body = (
    <Container width={containerWidth} className={containerClassName}>
      {(eyebrow || title || description) && (
        <header className="mb-10 max-w-3xl sm:mb-14">
          {eyebrow ? <p className="mono-label mb-4">{eyebrow}</p> : null}
          {title ? (
            <h2 className="section-display text-balance text-heading">{title}</h2>
          ) : null}
          {description ? (
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-body sm:text-lg">
              {description}
            </p>
          ) : null}
        </header>
      )}
      {children}
    </Container>
  );

  if (tone) {
    return (
      <SectionEnvironment
        id={id}
        tone={tone}
        grid={grid}
        ghost={ghost}
        className={cn("py-20 sm:py-24 lg:py-28", className)}
      >
        {body}
      </SectionEnvironment>
    );
  }

  return (
    <section id={id} className={cn("relative py-20 sm:py-24 lg:py-28", className)}>
      {body}
    </section>
  );
}
