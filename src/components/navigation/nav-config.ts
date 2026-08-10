import { siteConfig } from "@/data/site";

/** Primary navigation — Writing reserved for future enablement. */
export const primaryNav = [
  { label: "Work", href: "/work" },
  { label: "Experience", href: "/experience" },
  { label: "Capabilities", href: "/#capabilities" },
  { label: "About", href: "/about" },
] as const;

export const futureNav = siteConfig.futureNav;
