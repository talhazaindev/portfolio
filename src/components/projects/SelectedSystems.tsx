import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Spotlight } from "@/components/ui/Spotlight";
import { getFeaturedProjects, getProjectCover } from "@/data/projects";
import { cn } from "@/lib/cn";

/** Homepage featured systems — distinct compositions, not identical cards. */
export function SelectedSystems() {
  const featured = getFeaturedProjects();

  return (
    <Section
      id="work"
      eyebrow="Selected systems"
      title="Production systems across generative AI, healthcare, retrieval and data infrastructure."
      description="Flagship case studies. Additional systems live in the Engineering Archive."
    >
      <div className="space-y-6">
        {featured.map((project, index) => {
          const odd = index % 2 === 1;
          const cover = getProjectCover(project);

          return (
            <Spotlight key={project.slug} className="group">
              <Link
                href={`/work/${project.slug}`}
                className={cn(
                  "focus-ring relative grid gap-6 overflow-hidden p-5 sm:p-8",
                  cover
                    ? "lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch"
                    : "lg:grid-cols-[1.1fr_0.9fr] lg:items-end",
                  odd && cover && "lg:grid-cols-[0.95fr_1.05fr]",
                  odd && !cover && "lg:grid-cols-[0.9fr_1.1fr]",
                )}
              >
                {cover ? (
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-[0.14] transition-opacity duration-300 group-hover:opacity-[0.22]"
                  >
                    <Image
                      src={cover.src}
                      alt=""
                      fill
                      sizes="100vw"
                      quality={60}
                      className="object-cover object-top blur-[2px] scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/90 to-surface/70" />
                  </div>
                ) : null}

                <div className={cn("relative z-10", odd && "lg:order-2")}>
                  <div className="mono-label mb-3 flex flex-wrap gap-x-3 gap-y-1">
                    <span>0{index + 1}</span>
                    <span>{project.categories.join(" / ")}</span>
                    <span>{project.status}</span>
                  </div>
                  <h3 className="text-2xl tracking-tight text-foreground sm:text-3xl">
                    {project.name}
                  </h3>
                  <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
                    {project.summary}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.metrics.slice(0, 3).map((metric) => (
                      <span
                        key={`${metric.label}-${metric.value}`}
                        className="rounded-md border border-border bg-background/50 px-2.5 py-1 font-mono text-[11px] text-muted"
                      >
                        <span className="text-foreground">{metric.value}</span> {metric.label}
                      </span>
                    ))}
                  </div>
                </div>

                <div
                  className={cn(
                    "relative z-10 flex flex-col justify-between gap-4",
                    odd && "lg:order-1",
                  )}
                >
                  {cover ? (
                    <div className="relative aspect-[16/10] overflow-hidden rounded-[var(--radius-md)] border border-border/80 bg-background/40 shadow-[var(--shadow-soft)]">
                      <Image
                        src={cover.src}
                        alt={cover.alt}
                        fill
                        sizes="(max-width: 1024px) 100vw, 40vw"
                        quality={80}
                        className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                      <p className="absolute bottom-3 left-3 right-3 text-sm text-foreground/90">
                        {project.headline}
                      </p>
                    </div>
                  ) : (
                    <p className="max-w-xs text-sm text-muted">{project.headline}</p>
                  )}
                  <span className="inline-flex items-center gap-1 self-end text-sm text-accent-secondary transition-transform duration-200 group-hover:translate-x-0.5">
                    Case study
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                  </span>
                </div>
              </Link>
            </Spotlight>
          );
        })}
      </div>
      <div className="mt-8">
        <Link
          href="/work"
          className="focus-ring inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-foreground"
        >
          View all systems
          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
        </Link>
      </div>
    </Section>
  );
}
