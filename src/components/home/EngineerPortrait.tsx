"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionEnvironment } from "@/components/ui/SectionEnvironment";
import { MetaLabel } from "@/components/brand/MetaLabel";
import { SignalLine } from "@/components/brand/SignalLine";
import { siteConfig } from "@/data/site";
import { motionTiers } from "@/lib/motion";

const PORTRAIT_SRC = "/images/talha-zain-portrait.webp";

/**
 * Editorial brand portrait — warm cinematic dark environment.
 * Person beat: working style and curiosity, not another architecture lecture.
 */
export function EngineerPortrait() {
  const reduce = useReducedMotion();

  return (
    <SectionEnvironment
      id="engineer"
      tone="human"
      className="py-24 sm:py-28 lg:py-32"
      aria-labelledby="engineer-heading"
    >
      <Container width="wide">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16 xl:gap-20">
          <div className="group relative mx-auto w-full max-w-lg lg:mx-0 lg:max-w-none">
            <div className="relative aspect-[4/5] overflow-hidden sm:aspect-[5/6]">
              <Image
                src={PORTRAIT_SRC}
                alt="Portrait of Talha Zain, Applied AI Engineer"
                fill
                sizes="(max-width: 1024px) 100vw, 46vw"
                quality={85}
                className="object-cover object-[50%_18%] transition-[filter] duration-500 ease-out group-hover:brightness-[1.03]"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#090b11] opacity-0 lg:opacity-80"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#090b11] via-transparent to-transparent opacity-60 lg:opacity-40"
              />
            </div>
          </div>

          <div className="relative z-10 max-w-xl lg:pl-2">
            <div className="mb-5 flex flex-wrap items-center gap-3">
              <MetaLabel keyword="SIGNAL" value="01" signal />
              <SignalLine compact />
            </div>

            <motion.h2
              id="engineer-heading"
              className="section-display text-balance text-heading"
              initial={reduce ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={motionTiers.section}
            >
              The engineer
              <br />
              behind the systems
            </motion.h2>

            <p className="mt-6 max-w-md text-base leading-relaxed text-muted sm:text-lg">
              I care about systems that stay reliable after the demo — clear ownership
              boundaries, honest evaluation, and problems where retrieval, agents, and
              infrastructure have to cooperate. Curious by default; deliberate in production.
            </p>

            <dl className="mt-10 grid gap-5 sm:grid-cols-2">
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
            </dl>

            <div className="mt-10">
              <Link
                href="/about"
                className="focus-ring inline-flex items-center gap-1.5 text-sm text-accent-secondary transition-colors hover:text-foreground"
              >
                About Talha
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </SectionEnvironment>
  );
}
