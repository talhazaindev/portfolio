"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import type { Project, ProjectCategory, ProjectDomain } from "@/types/content";
import { getProjectCover } from "@/data/projects";
import { cn } from "@/lib/cn";
import { motionTiers } from "@/lib/motion";

const typeFilters: Array<"ALL" | ProjectCategory> = [
  "ALL",
  "Agentic AI",
  "Generative AI",
  "Intelligent Search",
  "ML Systems",
  "Data Systems",
];

const domainFilters: Array<"ALL" | ProjectDomain> = [
  "ALL",
  "Healthcare",
  "Advertising",
  "Creative AI",
  "Retail",
  "Other",
];

type WorkIndexProps = {
  featured: Project[];
  archive: Project[];
};

export function WorkIndex({ featured, archive }: WorkIndexProps) {
  const [type, setType] = useState<(typeof typeFilters)[number]>("ALL");
  const [domain, setDomain] = useState<(typeof domainFilters)[number]>("ALL");
  const reduce = useReducedMotion();

  const featuredFiltered = useMemo(
    () =>
      featured.filter((project) => {
        const typeOk = type === "ALL" || project.categories.includes(type);
        const domainOk = domain === "ALL" || project.domains.includes(domain);
        return typeOk && domainOk;
      }),
    [featured, type, domain],
  );
  const archiveFiltered = useMemo(
    () =>
      archive.filter((project) => {
        const typeOk = type === "ALL" || project.categories.includes(type);
        const domainOk = domain === "ALL" || project.domains.includes(domain);
        return typeOk && domainOk;
      }),
    [archive, type, domain],
  );

  return (
    <div>
      <div className="mb-10 space-y-4">
        <FilterRow label="System type" options={typeFilters} value={type} onChange={setType} />
        <FilterRow label="Domain" options={domainFilters} value={domain} onChange={setDomain} />
      </div>

      <LayoutGroup>
        <section className="mb-16">
          <h2 className="mono-label mb-5">Featured systems</h2>
          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {featuredFiltered.map((project) => {
                const cover = getProjectCover(project);
                return (
                  <motion.article
                    key={project.slug}
                    layout={!reduce}
                    initial={reduce ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? undefined : { opacity: 0, y: -8 }}
                    transition={motionTiers.interface}
                    className="group overflow-hidden rounded-[var(--radius-lg)] border border-border bg-surface/50"
                  >
                    <Link
                      href={project.caseStudy ? `/work/${project.slug}` : "/work"}
                      className={cn(
                        "focus-ring grid gap-4 p-5 sm:p-7",
                        cover
                          ? "sm:grid-cols-[11rem_1fr_auto] sm:items-center"
                          : "sm:grid-cols-[1fr_auto]",
                      )}
                    >
                      {cover ? (
                        <div className="relative aspect-[16/10] overflow-hidden rounded-[var(--radius-md)] border border-border/70 bg-background/40 sm:aspect-[5/4] sm:h-28 sm:w-44">
                          <Image
                            src={cover.src}
                            alt={cover.alt}
                            fill
                            sizes="176px"
                            quality={75}
                            className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
                          />
                        </div>
                      ) : null}
                      <div>
                        <div className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-1">
                          <span className="font-mono text-sm tracking-[0.08em] text-signal">
                            {String(
                              featured.findIndex((p) => p.slug === project.slug) + 1,
                            ).padStart(2, "0")}
                          </span>
                          <span className="mono-label">
                            {project.categories.join(" · ")} / {project.domains.join(" · ")}
                          </span>
                        </div>
                        <h3 className="text-2xl tracking-tight text-foreground">{project.name}</h3>
                        <p className="mt-2 max-w-2xl text-sm text-muted">{project.summary}</p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {project.metrics.slice(0, 3).map((metric) => (
                            <span
                              key={`${metric.value}-${metric.label}`}
                              className="rounded border border-border px-2 py-1 font-mono text-[11px] text-muted"
                            >
                              <span className="text-foreground">{metric.value}</span> {metric.label}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-end justify-between gap-3 sm:flex-col sm:items-end">
                        <span className="font-mono text-[10px] uppercase tracking-wider text-muted">
                          {project.status}
                        </span>
                        {project.caseStudy ? (
                          <span className="inline-flex items-center gap-1 text-sm text-accent-secondary">
                            Case study <ArrowUpRight className="h-3.5 w-3.5" />
                          </span>
                        ) : null}
                      </div>
                    </Link>
                  </motion.article>
                );
              })}
            </AnimatePresence>
            {featuredFiltered.length === 0 ? (
              <p className="text-sm text-muted">No featured systems match these filters.</p>
            ) : null}
          </div>
        </section>

        <section>
          <h2 className="mono-label mb-2">Engineering archive</h2>
          <p className="mb-5 max-w-2xl text-sm text-muted">
            Additional systems across retail, healthcare, recruitment, legal data, and applied NLP.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            <AnimatePresence mode="popLayout">
              {archiveFiltered.map((project) => {
                const cover = getProjectCover(project);
                return (
                  <motion.article
                    key={project.slug}
                    layout={!reduce}
                    initial={reduce ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? undefined : { opacity: 0 }}
                    transition={motionTiers.interface}
                    className="overflow-hidden rounded-[var(--radius-md)] border border-border bg-background/40"
                  >
                    {cover ? (
                      <div className="relative aspect-[21/9] border-b border-border/70">
                        <Image
                          src={cover.src}
                          alt={cover.alt}
                          fill
                          sizes="(max-width: 640px) 100vw, 50vw"
                          quality={70}
                          className="object-cover object-top"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                      </div>
                    ) : null}
                    <div className="p-5">
                      <div className="mono-label mb-2">
                        {project.categories[0]} · {project.domains[0]} · {project.status}
                      </div>
                      <h3 className="text-lg tracking-tight">{project.name}</h3>
                      <p className="mt-2 text-sm text-muted">{project.summary}</p>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {project.technologies.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="rounded border border-border px-1.5 py-0.5 font-mono text-[10px] text-muted"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      {project.github ? (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="focus-ring mt-4 inline-flex items-center gap-1 text-sm text-system-blue transition-colors hover:text-system-navy"
                        >
                          View on GitHub
                          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                        </a>
                      ) : null}
                    </div>
                  </motion.article>
                );
              })}
            </AnimatePresence>
          </div>
          {archiveFiltered.length === 0 ? (
            <p className="mt-4 text-sm text-muted">No archive systems match these filters.</p>
          ) : null}
        </section>
      </LayoutGroup>
    </div>
  );
}

function FilterRow<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: readonly T[];
  value: T;
  onChange: (value: T) => void;
}) {
  return (
    <div>
      <div className="mono-label mb-2">{label}</div>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className={cn(
              "focus-ring rounded-md border px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider transition-colors duration-180",
              value === option
                ? "border-accent bg-accent-soft text-foreground"
                : "border-border text-muted hover:text-foreground",
            )}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
