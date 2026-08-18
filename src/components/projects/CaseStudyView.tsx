"use client";

import { useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { EngineeringDecision, Project } from "@/types/content";
import { Container } from "@/components/ui/Container";
import { ProjectLinks } from "@/components/projects/ProjectLinks";
import { CaseStudyNav } from "@/components/projects/CaseStudyNav";
import { SystemAnatomy } from "@/components/anatomy/SystemAnatomy";
import { ArchitectureCanvas } from "@/components/architecture/ArchitectureCanvas";
import { ProjectVisual } from "@/components/architecture/ProjectVisual";
import { getProjectCover } from "@/data/projects";
import { AnalyticsEvents, track } from "@/lib/analytics";

type CaseStudyViewProps = {
  project: Project;
  next?: Project;
};

/** Flagship case study — editorial rhythm over numbered documentation. */
export function CaseStudyView({ project, next }: CaseStudyViewProps) {
  useEffect(() => {
    track(AnalyticsEvents.caseStudyView, { project: project.slug });
  }, [project.slug]);

  const cover = getProjectCover(project);
  const nextCover = next ? getProjectCover(next) : undefined;
  const leadMetric = project.metrics[0];

  const navItems = useMemo(() => {
    const items: { id: string; label: string }[] = [
      { id: "overview", label: "Overview" },
    ];
    if (project.problem || project.solution) {
      items.push({ id: "problem", label: "Problem" });
    }
    if (project.architecture) {
      items.push({ id: "architecture", label: "Architecture" });
    }
    if (project.engineeringDecisions?.length) {
      items.push({ id: "decisions", label: "Decisions" });
    }
    if (project.reliability?.length) {
      items.push({ id: "reliability", label: "Reliability" });
    }
    items.push({ id: "results", label: "Results" });
    return items;
  }, [project]);

  return (
    <article className="pb-24 pt-28 sm:pt-32">
      <CaseStudyNav items={navItems} />
      <Container>
        <header id="overview" className="max-w-3xl scroll-mt-28">
          <p className="mono-label mb-4">
            {project.categories.join(" / ")} · {project.domains.join(" / ")} · {project.status}
          </p>
          <h1 className="section-display text-balance">{project.name}</h1>
          <p className="mt-4 text-lg text-ink-muted">{project.headline}</p>
          <p className="mt-4 text-base leading-relaxed text-ink-secondary">{project.summary}</p>
          <div className="mt-8">
            <ProjectLinks project={project} />
          </div>
        </header>

        {/* Recruiter-scan snapshot */}
        <section
          aria-label="Project snapshot"
          className="mt-10 grid gap-3 rounded-[var(--radius-lg)] border border-border bg-surface/50 p-5 sm:grid-cols-2 sm:p-6 lg:grid-cols-5"
        >
          <SnapshotCell
            label="Problem"
            value={
              project.problem
                ? project.problem.length > 90
                  ? `${project.problem.slice(0, 87).trimEnd()}…`
                  : project.problem
                : project.summary
            }
          />
          <SnapshotCell
            label="System"
            value={
              project.solution
                ? project.solution.length > 90
                  ? `${project.solution.slice(0, 87).trimEnd()}…`
                  : project.solution
                : project.headline
            }
          />
          <SnapshotCell label="Role" value={project.role} />
          <SnapshotCell label="Status" value={project.status} />
          <SnapshotCell
            label="Outcome"
            value={
              leadMetric ? `${leadMetric.value} ${leadMetric.label}` : project.outcomes[0] ?? "—"
            }
            emphasize
          />
        </section>

        <section className="mt-12 rounded-[var(--radius-lg)] border border-border bg-surface/40 p-5 sm:p-7">
          <h2 className="mono-label mb-3">My role</h2>
          <p className="text-2xl tracking-tight text-ink-strong sm:text-3xl">{project.role}</p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {project.responsibilities.map((item) => (
              <li
                key={item}
                className="rounded-md border border-accent/30 bg-accent-soft px-2.5 py-1 text-xs text-ink"
              >
                {item}
              </li>
            ))}
          </ul>
          {project.period ? (
            <p className="mono-label mt-6">Period / {project.period}</p>
          ) : null}
        </section>

        {cover ? (
          <div className="relative mt-12 aspect-[21/9] overflow-hidden rounded-[var(--radius-lg)] border border-border bg-surface/40 sm:aspect-[2.4/1]">
            <Image
              src={cover.src}
              alt={cover.alt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 72rem"
              quality={85}
              className="object-cover object-top"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
            {cover.caption ? (
              <p className="absolute bottom-4 left-4 right-4 text-sm text-ink-strong/90 sm:left-6">
                {cover.caption}
              </p>
            ) : null}
          </div>
        ) : null}

        <div id="problem" className="mt-14 grid scroll-mt-28 gap-6 lg:grid-cols-2">
          <ProjectVisual project={project} />
          <div className="flex flex-col gap-6">
            {project.problem ? (
              <div className="rounded-[var(--radius-lg)] border border-border bg-background/40 p-5 sm:p-6">
                <h2 className="mono-label mb-3">Problem</h2>
                <p className="text-sm leading-relaxed text-ink-muted sm:text-base">
                  {project.problem}
                </p>
              </div>
            ) : null}
            {project.solution ? (
              <div className="rounded-[var(--radius-lg)] border border-border bg-surface/40 p-5 sm:p-6">
                <h2 className="mono-label mb-3">System</h2>
                <p className="text-sm leading-relaxed text-ink-muted sm:text-base">
                  {project.solution}
                </p>
              </div>
            ) : null}
          </div>
        </div>

        {project.architecture ? (
          <section id="architecture" className="mt-16 scroll-mt-28">
            <h2 className="mono-label mb-4">Architecture</h2>
            <p className="mb-6 max-w-2xl text-xl tracking-tight text-ink-strong sm:text-2xl">
              {project.architecture.description ?? project.headline}
            </p>
            <ArchitectureCanvas architecture={project.architecture} />
          </section>
        ) : null}

        {project.anatomyLayers?.length ? (
          <section className="mt-16">
            <h2 className="mono-label mb-4">System anatomy</h2>
            <SystemAnatomy layers={project.anatomyLayers} />
          </section>
        ) : null}

        {project.engineeringDecisions?.length ? (
          <section id="decisions" className="mt-16 scroll-mt-28">
            <h2 className="mono-label mb-6">Engineering decisions</h2>
            <div className="space-y-4">
              {project.engineeringDecisions.map((decision) => (
                <DecisionModule key={decision.title} decision={decision} />
              ))}
            </div>
          </section>
        ) : null}

        {project.reliability?.length ? (
          <section id="reliability" className="mt-16 scroll-mt-28">
            <h2 className="mono-label mb-4">Reliability</h2>
            <ul className="grid gap-2 sm:grid-cols-2">
              {project.reliability.map((item) => (
                <li
                  key={item}
                  className="flex items-center justify-between gap-4 rounded-md border border-border bg-background/40 px-4 py-3 font-mono text-xs"
                >
                  <span className="text-ink-muted uppercase tracking-wider">{item}</span>
                  <span className="text-accent-secondary">ACTIVE</span>
                </li>
              ))}
            </ul>
            {project.evaluation?.length ? (
              <div className="mt-6">
                <p className="mono-label mb-2">Evaluation</p>
                <div className="flex flex-wrap gap-2">
                  {project.evaluation.map((item) => (
                    <span
                      key={item}
                      className="rounded border border-border px-2 py-1 font-mono text-[11px] text-ink-muted"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}
          </section>
        ) : null}

        <section id="results" className="mt-16 scroll-mt-28 border-y border-border/70 py-12">
          <h2 className="mono-label mb-8">
            <span className="text-signal">Outcome</span>
            <span className="text-ink-muted"> / </span>
            <span className="text-ink-strong/80">Results</span>
          </h2>
          {project.metrics.length ? (
            <div className="mb-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
              {project.metrics.map((metric) => {
                const emphasize = /response|eliminated|manual|hrs\/week|< 5s|3–4|hitl/i.test(
                  `${metric.value} ${metric.label}`,
                );
                return (
                  <div key={`${metric.value}-${metric.label}`}>
                    <div
                      className={`font-mono text-3xl tracking-tight sm:text-4xl ${
                        emphasize ? "text-signal" : "text-ink-strong"
                      }`}
                    >
                      {metric.value}
                    </div>
                    <div className="mt-2 text-sm uppercase tracking-wider text-ink-muted">
                      {metric.label}
                    </div>
                    {emphasize ? (
                      <span className="mt-3 block h-px w-8 bg-signal/70" aria-hidden />
                    ) : null}
                  </div>
                );
              })}
            </div>
          ) : null}
          <ul className="max-w-3xl space-y-4">
            {project.outcomes.map((outcome, outcomeIndex) => (
              <li
                key={outcome}
                className={`border-l-2 pl-4 text-sm sm:text-base ${
                  outcomeIndex === 0
                    ? "border-signal/60 text-ink-strong/90"
                    : "border-accent/50 text-ink-muted"
                }`}
              >
                {outcome}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-14">
          <h2 className="mono-label mb-4">Stack</h2>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-border bg-surface/50 px-2.5 py-1 font-mono text-[11px] text-ink-muted"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        {project.media.length ? (
          <section className="mt-14">
            <h2 className="mono-label mb-4">Product visuals</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {project.media.map((item) => (
                <figure
                  key={item.src}
                  className="overflow-hidden rounded-md border border-border bg-background/40"
                >
                  <div className="relative aspect-[16/10]">
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, 50vw"
                      quality={80}
                      className="object-cover object-top"
                    />
                  </div>
                  {item.caption ? (
                    <figcaption className="px-3 py-2 text-xs text-ink-muted">
                      {item.caption}
                    </figcaption>
                  ) : null}
                </figure>
              ))}
            </div>
          </section>
        ) : null}

        <section className="mt-14">
          <h2 className="mono-label mb-4">Links</h2>
          <ProjectLinks project={project} />
        </section>

        {next ? (
          <div className="mt-16 border-t border-border pt-10">
            <p className="mono-label mb-3">Next system</p>
            <Link
              href={`/work/${next.slug}`}
              className="focus-ring group grid overflow-hidden rounded-[var(--radius-lg)] border border-border bg-surface/40 sm:grid-cols-[12rem_1fr]"
            >
              {nextCover ? (
                <div className="relative aspect-[16/10] sm:aspect-auto sm:min-h-[7.5rem]">
                  <Image
                    src={nextCover.src}
                    alt={nextCover.alt}
                    fill
                    sizes="192px"
                    quality={70}
                    className="object-cover object-top transition-transform duration-[240ms] group-hover:scale-[1.02]"
                  />
                </div>
              ) : null}
              <div className="flex flex-col justify-between gap-4 p-6 sm:flex-row sm:items-end">
                <div>
                  <h2 className="text-2xl tracking-tight group-hover:text-accent-secondary">
                    {next.name}
                  </h2>
                  <p className="mt-2 max-w-xl text-sm text-ink-muted">{next.headline}</p>
                </div>
                <span className="inline-flex items-center gap-1 text-sm text-accent-secondary">
                  Continue
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </Link>
          </div>
        ) : null}
      </Container>
    </article>
  );
}

function SnapshotCell({
  label,
  value,
  emphasize = false,
}: {
  label: string;
  value: string;
  emphasize?: boolean;
}) {
  return (
    <div>
      <p className="mono-label mb-1.5">{label}</p>
      <p
        className={
          emphasize
            ? "text-sm leading-snug text-signal sm:text-[13px]"
            : "text-sm leading-snug text-ink-secondary sm:text-[13px]"
        }
      >
        {value}
      </p>
    </div>
  );
}

function DecisionModule({ decision }: { decision: EngineeringDecision }) {
  return (
    <article className="grid gap-0 overflow-hidden rounded-[var(--radius-lg)] border border-border sm:grid-cols-[1fr_1.2fr]">
      <div className="border-b border-border bg-surface/50 p-5 sm:border-b-0 sm:border-r sm:p-6">
        <p className="mono-label mb-2">Decision</p>
        <h3 className="text-lg tracking-tight text-ink-strong sm:text-xl">{decision.title}</h3>
      </div>
      <div className="space-y-3 p-5 sm:p-6">
        {decision.constraint ? (
          <>
            <div>
              <p className="mono-label mb-1.5">Constraint</p>
              <p className="text-sm leading-relaxed text-ink-muted">{decision.constraint}</p>
            </div>
            <p className="mono-label !text-ink-muted/60" aria-hidden>
              ↓
            </p>
          </>
        ) : null}
        <div>
          <p className="mono-label mb-1.5">{decision.constraint ? "Approach" : "Why"}</p>
          <p className="text-sm leading-relaxed text-ink-muted">{decision.rationale}</p>
        </div>
        {decision.result ? (
          <>
            <p className="mono-label !text-ink-muted/60" aria-hidden>
              ↓
            </p>
            <div>
              <p className="mono-label mb-1.5">
                <span className="text-signal">Result</span>
              </p>
              <p className="text-sm leading-relaxed text-ink-strong/90">{decision.result}</p>
            </div>
          </>
        ) : null}
      </div>
    </article>
  );
}
