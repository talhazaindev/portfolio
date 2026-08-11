"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/types/content";
import { Container } from "@/components/ui/Container";
import { ProjectLinks } from "@/components/projects/ProjectLinks";
import { SystemAnatomy } from "@/components/anatomy/SystemAnatomy";
import { ArchitectureCanvas } from "@/components/architecture/ArchitectureCanvas";
import { ProjectVisual } from "@/components/architecture/ProjectVisual";
import { getProjectCover } from "@/data/projects";
import { AnalyticsEvents, track } from "@/lib/analytics";

type CaseStudyViewProps = {
  project: Project;
  next?: Project;
};

/** Flagship technical case study — role, anatomy, decisions, semantic architecture. */
export function CaseStudyView({ project, next }: CaseStudyViewProps) {
  useEffect(() => {
    track(AnalyticsEvents.caseStudyView, { project: project.slug });
  }, [project.slug]);

  const cover = getProjectCover(project);
  const nextCover = next ? getProjectCover(next) : undefined;

  return (
    <article className="pb-24 pt-28 sm:pt-32">
      <Container>
        <header className="max-w-3xl">
          <p className="mono-label mb-4">
            {project.categories.join(" / ")} · {project.domains.join(" / ")} · {project.status}
          </p>
          <h1 className="section-display text-balance">{project.name}</h1>
          <p className="mt-4 text-lg text-muted">{project.headline}</p>
          <p className="mt-4 text-base leading-relaxed text-foreground/85">{project.summary}</p>
          <div className="mt-8">
            <ProjectLinks project={project} />
          </div>
        </header>

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
              <p className="absolute bottom-4 left-4 right-4 text-sm text-foreground/90 sm:left-6">
                {cover.caption}
              </p>
            ) : null}
          </div>
        ) : null}

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <ProjectVisual project={project} />
          <section className="rounded-[var(--radius-lg)] border border-border bg-surface/40 p-5 sm:p-6">
            <h2 className="mono-label mb-3">My role</h2>
            <p className="text-xl tracking-tight text-foreground">{project.role}</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {project.responsibilities.map((item) => (
                <li
                  key={item}
                  className="rounded-md border border-accent/30 bg-accent-soft px-2.5 py-1 text-xs text-foreground"
                >
                  {item}
                </li>
              ))}
            </ul>
            {project.period ? (
              <p className="mono-label mt-6">Period / {project.period}</p>
            ) : null}
          </section>
        </div>


        <SectionBlock number="01" title="Overview">
          <p className="text-muted">{project.summary}</p>
        </SectionBlock>

        {project.problem ? (
          <SectionBlock number="02" title="Problem">
            <p className="text-muted">{project.problem}</p>
          </SectionBlock>
        ) : null}

        {project.solution ? (
          <SectionBlock number="03" title="System">
            <p className="text-muted">{project.solution}</p>
          </SectionBlock>
        ) : null}

        {project.anatomyLayers?.length ? (
          <SectionBlock number="04" title="System anatomy">
            <SystemAnatomy layers={project.anatomyLayers} />
          </SectionBlock>
        ) : null}

        {project.architecture ? (
          <SectionBlock number="05" title="Architecture">
            <ArchitectureCanvas architecture={project.architecture} />
          </SectionBlock>
        ) : null}

        {project.engineeringDecisions?.length ? (
          <SectionBlock number="06" title="Engineering decisions">
            <div className="grid gap-3 sm:grid-cols-2">
              {project.engineeringDecisions.map((decision) => (
                <article
                  key={decision.title}
                  className="rounded-[var(--radius-md)] border border-border bg-surface/40 p-5"
                >
                  <h3 className="text-base text-foreground">{decision.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{decision.rationale}</p>
                </article>
              ))}
            </div>
          </SectionBlock>
        ) : null}

        {project.reliability?.length ? (
          <SectionBlock number="07" title="Reliability / production">
            <ul className="grid gap-2 sm:grid-cols-2">
              {project.reliability.map((item) => (
                <li
                  key={item}
                  className="rounded-md border border-border bg-background/40 px-3 py-2 text-sm text-muted"
                >
                  {item}
                </li>
              ))}
            </ul>
            {project.evaluation?.length ? (
              <div className="mt-4">
                <p className="mono-label mb-2">Evaluation</p>
                <div className="flex flex-wrap gap-2">
                  {project.evaluation.map((item) => (
                    <span
                      key={item}
                      className="rounded border border-border px-2 py-1 font-mono text-[11px] text-muted"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}
          </SectionBlock>
        ) : null}

        <SectionBlock number="08" title="Stack">
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-border bg-surface/50 px-2.5 py-1 font-mono text-[11px] text-muted"
              >
                {tech}
              </span>
            ))}
          </div>
        </SectionBlock>

        <SectionBlock number="09" title="Outcomes">
          <ul className="space-y-3">
            {project.outcomes.map((outcome) => (
              <li key={outcome} className="border-l-2 border-accent/50 pl-4 text-sm text-muted">
                {outcome}
              </li>
            ))}
          </ul>
          {project.metrics.length ? (
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {project.metrics.map((metric) => (
                <div
                  key={`${metric.value}-${metric.label}`}
                  className="rounded-md border border-border bg-surface/40 p-3"
                >
                  <div className="font-mono text-xl text-foreground">{metric.value}</div>
                  <div className="mt-1 text-xs text-muted">{metric.label}</div>
                </div>
              ))}
            </div>
          ) : null}
        </SectionBlock>

        <SectionBlock number="10" title="Links">
          <ProjectLinks project={project} />
        </SectionBlock>

        {project.media.length ? (
          <SectionBlock number="Media" title="Product visuals">
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
                    <figcaption className="px-3 py-2 text-xs text-muted">{item.caption}</figcaption>
                  ) : null}
                </figure>
              ))}
            </div>
          </SectionBlock>
        ) : null}

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
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
              ) : null}
              <div className="flex flex-col justify-between gap-4 p-6 sm:flex-row sm:items-end">
                <div>
                  <h2 className="text-2xl tracking-tight group-hover:text-accent-secondary">
                    {next.name}
                  </h2>
                  <p className="mt-2 max-w-xl text-sm text-muted">{next.headline}</p>
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

function SectionBlock({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-14 border-t border-border/70 pt-10">
      <div className="mono-label mb-3">
        {number} — {title}
      </div>
      <h2 className="sr-only">{title}</h2>
      {children}
    </section>
  );
}
