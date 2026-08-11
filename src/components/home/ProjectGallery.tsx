"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { Magnetic } from "@/components/ui/Magnetic";
import { Spotlight } from "@/components/ui/Spotlight";
import { galleryItems, type GalleryItem } from "@/data/gallery";
import { motionTiers } from "@/lib/motion";
import { cn } from "@/lib/cn";
import { track } from "@/lib/analytics";

/** Cinematic scroll-scrubbed product UI gallery for the homepage. */
export function ProjectGallery() {
  const reduce = useReducedMotion();

  if (reduce) {
    return <StaticGallery />;
  }

  return <ScrubGallery />;
}

function GalleryHeader() {
  return (
    <header className="mb-10 max-w-3xl sm:mb-12">
      <Reveal>
        <p className="mono-label mb-4">Interfaces</p>
      </Reveal>
      <Reveal delay={0.06}>
        <h2 id="gallery-heading" className="section-display text-balance text-foreground">
          Product surfaces from systems in the field.
        </h2>
      </Reveal>
      <Reveal delay={0.12}>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
          UI captures across forecasting, clinical data, agents, and conversational platforms—
          scroll to pan the observatory.
        </p>
      </Reveal>
    </header>
  );
}

function StaticGallery() {
  return (
    <section
      id="gallery"
      className="relative border-y border-border/70 bg-background-elevated/30 py-20 sm:py-24 lg:py-28"
      aria-labelledby="gallery-heading"
    >
      <Container>
        <header className="mb-10 max-w-3xl sm:mb-14">
          <p className="mono-label mb-4">Interfaces</p>
          <h2 id="gallery-heading" className="section-display text-balance text-foreground">
            Product surfaces from systems in the field.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            UI captures across forecasting, clinical data, agents, and conversational platforms.
          </p>
        </header>
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {galleryItems.map((item, index) => (
            <li key={item.id}>
              <GalleryPanel item={item} index={index} className="h-full" />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

function ScrubGallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const [travel, setTravel] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const rawX = useTransform(scrollYProgress, [0, 1], [0, -travel]);
  const x = useSpring(rawX, { stiffness: 90, damping: 28, mass: 0.35 });

  const [progressLabel, setProgressLabel] = useState("0%");
  useMotionValueEvent(scrollYProgress, "change", (value) => {
    setProgressLabel(`${Math.round(value * 100)}%`);
  });

  useEffect(() => {
    function measure() {
      const viewport = viewportRef.current;
      const track = trackRef.current;
      if (!viewport || !track) return;
      const next = Math.max(0, track.scrollWidth - viewport.clientWidth);
      setTravel(next);
    }

    measure();
    const observer = new ResizeObserver(measure);
    if (viewportRef.current) observer.observe(viewportRef.current);
    if (trackRef.current) observer.observe(trackRef.current);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="gallery"
      className="relative h-[280vh] border-y border-border/70 bg-background-elevated/30"
      aria-labelledby="gallery-heading"
    >
      <div className="sticky top-0 flex h-[100dvh] flex-col justify-center overflow-hidden pt-24 pb-12 sm:pt-28 sm:pb-16">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            background:
              "radial-gradient(ellipse 55% 45% at 20% 40%, rgba(59,130,246,0.12), transparent 60%), radial-gradient(ellipse 40% 35% at 90% 70%, rgba(103,232,249,0.07), transparent 55%)",
          }}
        />

        <Container className="relative z-10 shrink-0">
          <div className="flex items-end justify-between gap-6">
            <div className="min-w-0">
              <GalleryHeader />
            </div>
            <p className="mono-label mb-10 hidden shrink-0 sm:mb-12 md:block" aria-live="polite">
              Scan {progressLabel}
            </p>
          </div>
        </Container>

        <div ref={viewportRef} className="relative z-10 w-full overflow-hidden">
          <motion.ul
            ref={trackRef}
            style={{ x }}
            className="flex w-max gap-5 px-5 sm:gap-6 sm:px-6 lg:gap-8 lg:px-8"
          >
            {galleryItems.map((item, index) => (
              <li
                key={item.id}
                className={cn(
                  "w-[min(82vw,28rem)] shrink-0 sm:w-[min(70vw,32rem)] lg:w-[min(52vw,38rem)]",
                  index === 0 && "ml-0",
                )}
              >
                <GalleryPanel item={item} index={index} featured={index === 0 || index === 2} />
              </li>
            ))}
          </motion.ul>
        </div>

        <Container className="relative z-10 mt-8 shrink-0">
          <div className="h-px w-full overflow-hidden rounded-full bg-border">
            <motion.div
              className="h-full origin-left bg-accent-secondary/80"
              style={{ scaleX: scrollYProgress }}
            />
          </div>
        </Container>
      </div>
    </section>
  );
}

function GalleryPanel({
  item,
  index,
  featured = false,
  className,
}: {
  item: GalleryItem;
  index: number;
  featured?: boolean;
  className?: string;
}) {
  const content = (
    <Magnetic strength={0.1} className="block w-full">
      <Spotlight
        className={cn(
          "group h-full transition-[border-color,box-shadow] duration-300",
          "hover:border-border-strong hover:shadow-[var(--shadow-soft)]",
          className,
        )}
      >
        <motion.div
          className="relative"
          whileHover={{ y: -4 }}
          transition={motionTiers.interface}
        >
          <div
            className={cn(
              "relative overflow-hidden bg-background/40",
              featured ? "aspect-[4/3] sm:aspect-[16/11]" : "aspect-[4/3]",
            )}
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              sizes="(max-width: 640px) 82vw, (max-width: 1024px) 70vw, 38rem"
              quality={85}
              className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80"
            />
          </div>

          <div className="flex items-end justify-between gap-4 p-4 sm:p-5">
            <div className="min-w-0">
              <p className="mono-label mb-1.5">0{index + 1}</p>
              <h3 className="truncate text-lg tracking-tight text-foreground sm:text-xl">
                {item.title}
              </h3>
              <p className="mt-1 line-clamp-2 text-sm text-muted">{item.subtitle}</p>
            </div>
            {item.href ? (
              <span className="inline-flex shrink-0 items-center gap-1 text-sm text-accent-secondary transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                Open
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
              </span>
            ) : null}
          </div>
        </motion.div>
      </Spotlight>
    </Magnetic>
  );

  if (!item.href) {
    return <figure className="h-full">{content}</figure>;
  }

  return (
    <Link
      href={item.href}
      className="focus-ring block h-full rounded-[var(--radius-lg)]"
      onClick={() => track("gallery_item_click", { id: item.id, href: item.href })}
    >
      {content}
    </Link>
  );
}
