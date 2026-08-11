import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Spotlight } from "@/components/ui/Spotlight";
import { PointerLabel } from "@/components/ui/PointerLabel";
import { getFeaturedProjects, getProjectCover } from "@/data/projects";
import type { Project } from "@/types/content";
import { cn } from "@/lib/cn";

/** Per-project ambient fields — extremely subtle local illumination */
const PROJECT_AMBIENT: Record<string, string> = {
  "ai-compare-hub":
    "radial-gradient(circle at 30% 45%, rgba(45,108,223,0.07), transparent 40%)",
  medicai:
    "radial-gradient(circle at 70% 40%, rgba(28,181,176,0.06), transparent 42%)",
  mediax:
    "radial-gradient(circle at 40% 55%, rgba(45,108,223,0.05), transparent 44%)",
  "ecg-intelligence":
    "radial-gradient(circle at 55% 40%, rgba(23,63,95,0.05), transparent 40%)",
};

/** Homepage featured systems — soft ivory environment + editorial hierarchy. */
export function SelectedSystems() {
  const featured = getFeaturedProjects();

  return (
    <Section
      id="work"
      eyebrow="Selected systems"
      title="Production systems across generative AI, healthcare, retrieval and data infrastructure."
      description="Flagship case studies. Additional systems live in the Engineering Archive."
      tone="system"
      ghost="SYSTEMS"
      containerWidth="extra-wide"
      className="!py-24 sm:!py-28 lg:!py-32"
    >
      <div className="space-y-14 lg:space-y-20">
        {featured.map((project, index) => {
          const odd = index % 2 === 1;
          const cover = getProjectCover(project);
          const flagship = index < 2;
          const indexLabel = String(index + 1).padStart(2, "0");
          const ambient = PROJECT_AMBIENT[project.slug];
          const isCompareHub = project.slug === "ai-compare-hub";

          return (
            <PointerLabel key={project.slug} label="View case study ↗">
              <Spotlight
                className={cn(
                  "group !border-transparent !bg-transparent !shadow-none",
                  isCompareHub && "rounded-none",
                )}
              >
                <Link
                  href={`/work/${project.slug}`}
                  className={cn(
                    "focus-ring relative grid gap-8 overflow-hidden sm:gap-10",
                    cover
                      ? flagship
                        ? "lg:grid-cols-[1.15fr_0.85fr] lg:items-stretch"
                        : "lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch"
                      : "lg:grid-cols-[1.1fr_0.9fr] lg:items-end",
                    odd && cover && !flagship && "lg:grid-cols-[0.95fr_1.05fr]",
                    odd && cover && flagship && "lg:grid-cols-[0.85fr_1.15fr]",
                    odd && !cover && "lg:grid-cols-[0.9fr_1.1fr]",
                    index === 0 && "lg:min-h-[22rem]",
                  )}
                >
                  {ambient ? (
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0 opacity-90"
                      style={{ background: ambient }}
                    />
                  ) : null}

                  <div className={cn("relative z-10", odd && "lg:order-2")}>
                    <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-2">
                      <span
                        className="font-mono text-sm tracking-[0.08em] text-signal"
                        aria-label={`System ${indexLabel}`}
                      >
                        {indexLabel}
                      </span>
                      <span className="mono-label !text-ink-muted">
                        {project.categories.join(" / ")}
                      </span>
                      <span className="mono-label !text-ink-muted">{project.status}</span>
                    </div>
                    <h3
                      className={cn(
                        "tracking-tight text-system-navy",
                        flagship ? "text-3xl sm:text-4xl lg:text-[2.75rem]" : "text-2xl sm:text-3xl",
                      )}
                    >
                      {project.name}
                    </h3>
                    <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink-secondary sm:text-base">
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
                      isCompareHub ? (
                        <div className="overflow-hidden rounded-[var(--radius-md)] bg-system-navy-deep p-3 sm:p-4">
                          <div
                            className={cn(
                              "relative overflow-hidden rounded-[calc(var(--radius-md)-2px)]",
                              "border border-[rgba(247,244,238,0.12)] bg-breakout-deep",
                              "shadow-[0_22px_55px_rgba(12,31,46,0.35)]",
                              "aspect-[16/10] lg:aspect-[16/9] lg:min-h-[300px]",
                            )}
                          >
                            <Image
                              src={cover.src}
                              alt={cover.alt}
                              fill
                              sizes="(max-width: 1024px) 100vw, 55vw"
                              quality={80}
                              className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                            />
                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-system-navy-deep/75 via-transparent to-transparent" />
                            <p className="absolute bottom-3 left-3 right-3 text-sm text-breakout-text/90">
                              {project.headline}
                            </p>
                          </div>
                          <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.14em] text-breakout-muted">
                            Parallel model execution · dark system moment
                          </p>
                        </div>
                      ) : (
                        <div
                          className={cn(
                            "relative overflow-hidden shadow-[var(--shadow-md)]",
                            "border border-[rgba(23,33,43,0.10)] bg-white",
                            flagship
                              ? "aspect-[16/10] rounded-[var(--radius-md)] lg:aspect-[16/9] lg:min-h-[300px]"
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
                            className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                          />
                          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-strong/50 via-transparent to-transparent" />
                          <p className="absolute bottom-3 left-3 right-3 text-sm text-breakout-text/90">
                            {project.headline}
                          </p>
                        </div>
                      )
                    ) : (
                      <p className="max-w-xs text-sm text-ink-muted">{project.headline}</p>
                    )}
                    <span className="inline-flex items-center gap-1 self-end text-sm text-system-blue transition-transform duration-200 group-hover:translate-x-0.5">
                      Explore the architecture
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                    </span>
                  </div>
                </Link>
              </Spotlight>
            </PointerLabel>
          );
        })}
      </div>
      <div className="mt-12">
        <Link
          href="/work"
          className="focus-ring inline-flex items-center gap-1 text-sm text-ink-muted transition-colors hover:text-ink-strong"
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
    <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-border pt-5">
      <div>
        <dt className="mono-label mb-1 !text-ink-muted">Domain</dt>
        <dd className="text-xs text-ink sm:text-sm">{system}</dd>
      </div>
      <div>
        <dt className="mono-label mb-1 !text-ink-muted">Scale</dt>
        <dd className="text-xs text-ink sm:text-sm">
          {signalMetric ? (
            <>
              <span className="text-signal">{signalMetric.value}</span>{" "}
              <span className="text-ink-muted">{signalMetric.label}</span>
            </>
          ) : scale ? (
            `${scale.value} ${scale.label}`
          ) : (
            project.status
          )}
        </dd>
      </div>
      <div>
        <dt className="mono-label mb-1 !text-ink-muted">Role</dt>
        <dd className="text-xs text-ink sm:text-sm">{role}</dd>
      </div>
    </dl>
  );
}
