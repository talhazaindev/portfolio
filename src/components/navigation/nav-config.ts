import { siteConfig } from "@/data/site";

/** Primary navigation — kept lean; capabilities live on homepage + command palette. */
export const primaryNav = [
  { label: "Home", href: "/" },
  { label: "Systems", href: "/work" },
  { label: "Experience", href: "/experience" },
  { label: "About", href: "/about" },
] as const;

export const futureNav = siteConfig.futureNav;
