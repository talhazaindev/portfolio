/**
 * Content model types for the Talha Zain personal technology brand.
 */

export type ProjectCategory =
  | "Agentic AI"
  | "Generative AI"
  | "Intelligent Search"
  | "ML Systems"
  | "Data Systems";

export type ProjectDomain =
  | "Healthcare"
  | "Advertising"
  | "Creative AI"
  | "Retail"
  | "Other";

export type ProjectStatus = "production" | "internal" | "prototype";

export type AnatomyLayerId =
  | "ARCHITECTURE"
  | "AI"
  | "DATA"
  | "RELIABILITY"
  | "OBSERVABILITY";

export type ProjectMetric = {
  value: string;
  label: string;
  context?: string;
};

export type ProjectMedia = {
  type: "screenshot" | "diagram" | "interface" | "result";
  src: string;
  alt: string;
  caption?: string;
};

export type ArchitectureNode = {
  id: string;
  label: string;
  meta?: string;
  group?: string;
};

export type ArchitectureEdge = {
  from: string;
  to: string;
  label?: string;
};

export type ArchitectureDefinition = {
  nodes: ArchitectureNode[];
  edges: ArchitectureEdge[];
  description?: string;
};

export type AnatomyLayer = {
  id: AnatomyLayerId;
  title: string;
  summary: string;
  items: string[];
};

export type EngineeringDecision = {
  title: string;
  rationale: string;
};

export type Project = {
  slug: string;
  name: string;
  shortName?: string;
  categories: ProjectCategory[];
  domains: ProjectDomain[];
  status: ProjectStatus;
  featured: boolean;
  caseStudy: boolean;
  headline: string;
  summary: string;
  problem?: string;
  solution?: string;
  role: string;
  responsibilities: string[];
  architecture?: ArchitectureDefinition;
  engineeringDecisions?: EngineeringDecision[];
  reliability?: string[];
  evaluation?: string[];
  technologies: string[];
  metrics: ProjectMetric[];
  outcomes: string[];
  media: ProjectMedia[];
  anatomyLayers?: AnatomyLayer[];
  period?: string;
  liveUrl: string | null;
  github: string | null;
  visualGrammar:
    | "parallel-orchestration"
    | "agent-state-graph"
    | "semantic-spatial"
    | "data-transformation"
    | "generic";
};

export type ExperienceRole = {
  company: string;
  location: string;
  period: string;
  role: string;
  themes: string[];
  impact: string;
  current?: boolean;
};

export type CapabilityDomain = {
  id: string;
  number: string;
  title: string;
  description: string;
  items: string[];
  primary?: boolean;
};

export type SocialLinks = {
  email: string;
  linkedin: string;
  github: string | null;
  resumePath: string | null;
};
