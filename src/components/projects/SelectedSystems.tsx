import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Spotlight } from "@/components/ui/Spotlight";
import { PointerLabel } from "@/components/ui/PointerLabel";
import { getFeaturedProjects, getProjectCover } from "@/data/projects";
import type { Project } from "@/types/content";
import { cn } from "@/lib/cn";

/** Homepage featured systems — flagship moments + editorial index language. */
export function SelectedSystems() {
  const featured = getFeaturedProjects();

  return (
    <Section
      id="work"
      eyebrow="Selected systems"
      title="Production systems across generative AI, healthcare, retrieval and data infrastructure."
      description="Flagship case studies. Additional systems live in the Engineering Archive."
    >
      <div className="space-y-8 lg:space-y-12">
        {featured.map((project, index) => {
          const odd = index % 2 === 1;
          const cover = getProjectCover(project);
          const flagship = index < 2;
          const indexLabel = String(index + 1).padStart(2, "0");

          return (
            <PointerLabel key={project.slug} label="VIEW SYSTEM ↗">
              <Spotlight className="group">
                <Link
                  href={`/work/${project.slug}`}
                  className={cn(
                    "focus-ring relative grid gap-6 overflow-hidden",
                    flagship
                      ? "border border-border/60 bg-surface/30 p-5 sm:p-8 lg:-mx-4 lg:p-10 xl:-mx-8"
                      : "p-5 sm:p-8",
                    cover
                      ? flagship
                        ? "lg:grid-cols-[1.15fr_0.85fr] lg:items-stretch"
                        : "lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch"
                      : "lg:grid-cols-[1.1fr_0.9fr] lg:items-end",
                    odd && cover && !flagship && "lg:grid-cols-[0.95fr_1.05fr]",
                    odd && cover && flagship && "lg:grid-cols-[0.85fr_1.15fr]",
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
                    <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-2">
                      <span
                        className="font-mono text-sm tracking-[0.08em] text-signal"
                        aria-label={`System ${indexLabel}`}
                      >
                        {indexLabel}
                      </span>
                      <span className="mono-label text-system-cyan/80">
                        {project.categories.join(" / ")}
                      </span>
                      <span className="mono-label">{project.status}</span>
                    </div>
                    <h3
                      className={cn(
                        "tracking-tight text-foreground",
                        flagship ? "text-3xl sm:text-4xl lg:text-[2.75rem]" : "text-2xl sm:text-3xl",
                      )}
                    >
                      {project.name}
                    </h3>
                    <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
                      {project.summary}
                    </p>
                    <ProofStrip project={project} />
                  </div>

                  <div
                    className={cn(
                      "relative z-10 flex flex-col justify-between gap-4",
                      odd && "lg:order-1",
                    )}
                  >
                    {cover ? (
                      <div
                        className={cn(
                          "relative overflow-hidden border border-border/80 bg-background/40 shadow-[var(--shadow-soft)]",
                          flagship
                            ? "aspect-[16/10] rounded-[var(--radius-md)] lg:aspect-[16/9] lg:min-h-[280px]"
                            : "aspect-[16/10] rounded-[var(--radius-md)]",
                        )}
                      >
                        <Image
                          src={cover.src}
                          alt={cover.alt}
                          fill
                          sizes={
                            flagship
                              ? "(max-width: 1024px) 100vw, 55vw"
                              : "(max-width: 1024px) 100vw, 40vw"
                          }
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
            </PointerLabel>
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

function ProofStrip({ project }: { project: Project }) {
  const system = project.categories[0] ?? "AI System";
  const scale = project.metrics[0];
  const role = project.responsibilities[0] ?? project.role;
  const signalMetric = project.metrics.find(
    (m) =>
      m.label.toLowerCase().includes("response") ||
      m.label.toLowerCase().includes("eliminated") ||
      m.label.toLowerCase().includes("manual"),
  );

  return (
    <dl className="mt-6 grid grid-cols-3 gap-3 border-t border-border/80 pt-4">
      <div>
        <dt className="mono-label mb-1">System</dt>
        <dd className="text-xs text-foreground sm:text-sm">{system}</dd>
      </div>
      <div>
        <dt className="mono-label mb-1">Scale</dt>
        <dd className="text-xs text-foreground sm:text-sm">
          {signalMetric ? (
            <>
              <span className="text-signal">{signalMetric.value}</span>{" "}
              <span className="text-muted">{signalMetric.label}</span>
            </>
          ) : scale ? (
            `${scale.value} ${scale.label}`
          ) : (
            project.status
          )}
        </dd>
      </div>
      <div>
        <dt className="mono-label mb-1">Role</dt>
        <dd className="text-xs text-foreground sm:text-sm">{role}</dd>
      </div>
    </dl>
  );
}
