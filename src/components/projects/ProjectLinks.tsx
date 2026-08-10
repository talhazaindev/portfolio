"use client";

import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { AnalyticsEvents, track } from "@/lib/analytics";
import type { Project } from "@/types/content";

type ProjectLinksProps = {
  project: Project;
  size?: "sm" | "md";
};

/** Live / GitHub CTAs — hidden when URLs are null. */
export function ProjectLinks({ project }: ProjectLinksProps) {
  if (!project.liveUrl && !project.github) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {project.liveUrl ? (
        <Button
          href={project.liveUrl}
          variant="primary"
          external
          onClick={() =>
            track(AnalyticsEvents.liveProductClick, {
              project: project.slug,
            })
          }
        >
          Visit Live Product
          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
        </Button>
      ) : null}
      {project.github ? (
        <Button
          href={project.github}
          variant="secondary"
          external
          onClick={() =>
            track(AnalyticsEvents.githubClick, {
              project: project.slug,
            })
          }
        >
          GitHub
          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
        </Button>
      ) : null}
    </div>
  );
}
