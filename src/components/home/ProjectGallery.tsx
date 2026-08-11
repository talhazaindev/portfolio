"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { SectionEnvironment } from "@/components/ui/SectionEnvironment";
import { PointerLabel } from "@/components/ui/PointerLabel";
import { galleryItems, type GalleryItem } from "@/data/gallery";
import { motionTiers } from "@/lib/motion";
import { cn } from "@/lib/cn";
import { track } from "@/lib/analytics";

/** Layout roles for curated observatory gallery — not an equal card grid. */
const LAYOUT: Array<"hero" | "tall" | "wide" | "standard"> = [
  "hero",
  "tall",
  "standard",
  "wide",
  "standard",
  "tall",
  "standard",
];

/** Illuminated product gallery — brightest dark environment before portrait. */
export function ProjectGallery() {
  return (
    <SectionEnvironment
      id="gallery"
      tone="illuminated"
      className="py-24 sm:py-28 lg:py-32"
      aria-labelledby="gallery-heading"
    >
      <Container width="extra-wide">
        <header className="mb-14 max-w-3xl sm:mb-16">
          <Reveal>
            <p className="mono-label mb-4">System interfaces</p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 id="gallery-heading" className="section-display text-balance text-heading">
              Shipped surfaces from systems in the field.
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
              Real product UI — multimodal generation, clinical agents, geospatial retrieval,
              and clinical data platforms.
            </p>
          </Reveal>
        </header>

        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-7 lg:grid-cols-12 lg:gap-8">
          {galleryItems.map((item, index) => (
            <li
              key={item.id}
              className={cn(
                LAYOUT[index] === "hero" && "sm:col-span-2 lg:col-span-7 lg:row-span-2",
                LAYOUT[index] === "tall" && "lg:col-span-5 lg:mt-10",
                LAYOUT[index] === "wide" && "sm:col-span-2 lg:col-span-8 lg:col-start-3",
                LAYOUT[index] === "standard" && "lg:col-span-4",
                !LAYOUT[index] && "lg:col-span-4",
                index === 2 && "lg:mt-16",
                index === 4 && "lg:-mt-6",
              )}
            >
              <GalleryPanel
                item={item}
                index={index}
                layout={LAYOUT[index] ?? "standard"}
              />
            </li>
          ))}
        </ul>
      </Container>
    </SectionEnvironment>
  );
}

function GalleryPanel({
  item,
  index,
  layout,
}: {
  item: GalleryItem;
  index: number;
  layout: "hero" | "tall" | "wide" | "standard";
}) {
  const reduce = useReducedMotion();
  const chromeLabel = `${item.title.toUpperCase()} / PRODUCTION`;

  const panel = (
    <motion.div
      className="group relative h-full overflow-hidden rounded-[var(--radius-md)] frame-chrome transition-[box-shadow] duration-300 hover:shadow-[var(--shadow-elevated)]"
      whileHover={reduce ? undefined : { y: -4 }}
      transition={motionTiers.interface}
    >
      {/* Restrained application chrome */}
      <div className="flex items-center gap-3 border-b border-white/[0.06] bg-[#121a28] px-3.5 py-2.5">
        <div className="flex items-center gap-1.5" aria-hidden>
          <span className="h-2 w-2 rounded-full bg-white/15" />
          <span className="h-2 w-2 rounded-full bg-white/15" />
          <span className="h-2 w-2 rounded-full bg-white/15" />
        </div>
        <p className="truncate font-mono text-[10px] tracking-[0.12em] text-muted">
          {chromeLabel}
        </p>
      </div>

      <div
        className={cn(
          "relative overflow-hidden bg-[#0e1624]",
          layout === "hero" && "aspect-[4/3] sm:aspect-[16/11] lg:aspect-auto lg:h-[calc(100%-2.5rem)] lg:min-h-[26rem]",
          layout === "tall" && "aspect-[4/5] sm:aspect-[3/4]",
          layout === "wide" && "aspect-[21/10] sm:aspect-[2.2/1]",
          layout === "standard" && "aspect-[4/3]",
        )}
      >
        <Image
          src={item.src}
          alt={item.alt}
          fill
          sizes={
            layout === "hero"
              ? "(max-width: 1024px) 100vw, 58vw"
              : layout === "wide"
                ? "(max-width: 1024px) 100vw, 66vw"
                : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          }
          quality={85}
          className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />
        {/* Soft lift only — screenshots supply color */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-surface-0/55 via-transparent to-transparent opacity-80"
        />

        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-4 sm:p-5">
          <div className="min-w-0">
            <p className="mono-label mb-1.5">0{index + 1}</p>
            <h3 className="text-lg tracking-tight text-heading sm:text-xl">
              {item.title}
            </h3>
            <p className="mt-1 max-w-sm text-sm text-muted opacity-90 transition-opacity duration-300 group-hover:opacity-100">
              {item.subtitle}
            </p>
          </div>
          {item.href ? (
            <span className="inline-flex shrink-0 translate-y-1 items-center gap-1 text-sm text-accent-secondary opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 focus-within:opacity-100">
              View system
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
            </span>
          ) : null}
        </div>
      </div>
    </motion.div>
  );

  if (!item.href) {
    return <figure className="h-full">{panel}</figure>;
  }

  return (
    <PointerLabel label="VIEW SYSTEM ↗" className="block h-full">
      <Link
        href={item.href}
        className="focus-ring block h-full rounded-[var(--radius-md)]"
        onClick={() => track("gallery_item_click", { id: item.id, href: item.href })}
      >
        {panel}
      </Link>
    </PointerLabel>
  );
}
