"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { MetaLabel } from "@/components/brand/MetaLabel";
import { SignalLine } from "@/components/brand/SignalLine";
import { siteConfig } from "@/data/site";
import { motionTiers } from "@/lib/motion";

const PORTRAIT_SRC = "/images/talha-zain-portrait.webp";

/**
 * Editorial brand portrait — the human signal inside the system.
 * Cool system light around the frame; amber only on identity markers.
 */
export function EngineerPortrait() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const rawY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [18, -18]);
  const y = useSpring(rawY, { stiffness: 80, damping: 28, mass: 0.4 });

  return (
    <section
      ref={sectionRef}
      id="engineer"
      className="relative overflow-hidden border-y border-border/70 py-20 sm:py-24 lg:py-28"
      aria-labelledby="engineer-heading"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(ellipse 50% 55% at 18% 45%, rgba(59,130,246,0.10), transparent 58%), radial-gradient(ellipse 35% 40% at 88% 30%, rgba(103,232,249,0.05), transparent 50%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 hidden w-[48%] grid-overlay opacity-40 lg:block"
      />

      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14 xl:gap-16">
          <motion.div
            className="group relative mx-auto w-full max-w-md lg:mx-0 lg:max-w-none"
            initial={reduce ? false : { opacity: 0, y: 20, scale: 0.985 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={motionTiers.cinematic}
          >
            <motion.div
              style={{ y: reduce ? 0 : y }}
              className="relative aspect-[4/5] overflow-hidden sm:aspect-[5/6]"
            >
              <Image
                src={PORTRAIT_SRC}
                alt="Portrait of Talha Zain, Applied AI Engineer"
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                quality={85}
                className="object-cover object-[50%_18%] transition-[filter] duration-500 ease-out group-hover:brightness-[1.03]"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-background opacity-0 lg:opacity-90"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-70 lg:opacity-50"
              />
              {/* Cool system rim — no amber wash on the portrait */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  boxShadow: "inset -12px 0 28px -18px rgba(103,232,249,0.35)",
                }}
              />
            </motion.div>
          </motion.div>

          <div className="relative z-10 max-w-xl">
            <motion.div
              className="mb-4 flex flex-wrap items-center gap-3"
              initial={reduce ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={motionTiers.interface}
            >
              <MetaLabel keyword="SIGNAL" value="01" signal />
              <SignalLine compact />
            </motion.div>

            <motion.h2
              id="engineer-heading"
              className="section-display text-balance text-foreground"
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ ...motionTiers.cinematic, delay: reduce ? 0 : 0.06 }}
            >
              The engineer
              <br />
              behind the systems
            </motion.h2>

            <motion.p
              className="mt-5 max-w-md text-base leading-relaxed text-muted sm:text-lg"
              initial={reduce ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ ...motionTiers.interface, delay: reduce ? 0 : 0.1 }}
            >
              Models are only one component. I focus on orchestration, retrieval, state,
              tools, evaluation, APIs, reliability and deployment — the layers that turn AI
              capability into a production system.
            </motion.p>

            <motion.dl
              className="mt-8 grid gap-4 sm:grid-cols-2"
              initial={reduce ? false : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ ...motionTiers.interface, delay: reduce ? 0 : 0.14 }}
            >
              <div>
                <dt className="mono-label">Identity</dt>
                <dd className="mt-1.5 text-sm text-foreground">
                  {siteConfig.name}
                  <span className="mt-0.5 block text-muted">{siteConfig.role}</span>
                </dd>
              </div>
              <div>
                <dt className="mono-label">Based</dt>
                <dd className="mt-1.5 text-sm text-foreground">{siteConfig.location}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="mono-label">Focus</dt>
                <dd className="mt-1.5 text-sm text-foreground">
                  Agentic systems · LLM · RAG · Production AI
                </dd>
              </div>
            </motion.dl>

            <motion.div
              className="mt-9"
              initial={reduce ? false : { opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ ...motionTiers.interface, delay: reduce ? 0 : 0.18 }}
            >
              <Link
                href="/about"
                className="focus-ring inline-flex items-center gap-1.5 text-sm text-accent-secondary transition-colors hover:text-foreground"
              >
                About Talha
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
              </Link>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
