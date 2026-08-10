import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/Container";

type SectionProps = {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  id?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
};

/** Standard page section with optional editorial header. */
export function Section({
  children,
  className,
  containerClassName,
  id,
  eyebrow,
  title,
  description,
}: SectionProps) {
  return (
    <section id={id} className={cn("relative py-20 sm:py-24 lg:py-28", className)}>
      <Container className={containerClassName}>
        {(eyebrow || title || description) && (
          <header className="mb-10 max-w-3xl sm:mb-14">
            {eyebrow ? <p className="mono-label mb-4">{eyebrow}</p> : null}
            {title ? <h2 className="section-display text-balance text-foreground">{title}</h2> : null}
            {description ? (
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
                {description}
              </p>
            ) : null}
          </header>
        )}
        {children}
      </Container>
    </section>
  );
}
