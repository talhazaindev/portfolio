/**
 * Global site configuration and brand copy.
 */

export const siteConfig = {
  name: "Talha Zain",
  title: "Talha Zain — Applied AI Engineer | Agentic AI, LLM Systems & RAG",
  description:
    "Applied AI Engineer designing production agentic AI, LLM, RAG, multimodal and machine-learning systems across healthcare, generative media, semantic search and data platforms.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://talhazain.com"),
  location: "Pakistan",
  role: "Applied AI Engineer",
  positioning: "AI Systems Architect",
  tagline: "Building production AI systems that reason, retrieve, orchestrate and act.",
  specialties: [
    "Agentic AI",
    "LLM Systems",
    "Retrieval-Augmented Generation",
    "Production AI Engineering",
  ] as const,
  supportingCapabilities: [
    "Machine Learning",
    "Backend Systems",
    "Cloud Deployment",
    "Computer Vision",
    "Data Engineering",
  ] as const,
  /** Reserved for future technical writing without restructuring navigation. */
  futureNav: [{ label: "Writing", href: "/writing", enabled: false }] as const,
} as const;

export const education = {
  school: "National University of Computer & Emerging Sciences (FAST-NUCES), Islamabad",
  degree: "Bachelor of Computer Science",
  period: "2019–2023",
} as const;

export const certifications = [
  "Microsoft Azure Fundamentals AZ-900",
  "IBM Machine Learning with Python",
  "IBM Databases & SQL for Data Science",
  "IBM Data Analysis with Python",
  "IBM Data Science Methodology",
  "Tools for Data Science",
] as const;
