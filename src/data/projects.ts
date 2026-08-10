import type { Project } from "@/types/content";

/**
 * Central project content. Add archive or case-study systems here without
 * modifying page components — set featured / caseStudy accordingly.
 */
export const projects: Project[] = [
  {
    slug: "ai-compare-hub",
    name: "AI Compare Hub",
    shortName: "Compare Hub",
    categories: ["Generative AI"],
    domains: ["Creative AI"],
    status: "production",
    featured: true,
    caseStudy: true,
    visualGrammar: "parallel-orchestration",
    period: "2024–Present",
    headline: "Unified multi-model generative media platform.",
    summary:
      "Production multimodal generation platform giving users unified access to a large ecosystem of image, video, and audio models—with side-by-side comparison from a single prompt.",
    problem:
      "Teams evaluating generative media models face fragmented provider UIs, inconsistent parameters, and no reliable way to compare outputs under identical prompts.",
    solution:
      "A normalized multi-provider orchestration layer with asynchronous job execution, status tracking, and a shared generation history across staging and production.",
    role: "Applied AI / Platform Engineering",
    responsibilities: [
      "AI Architecture",
      "Backend Engineering",
      "Integration",
      "Productionization",
    ],
    liveUrl: "https://ai-compare-hub.com/",
    github: null,
    metrics: [
      { value: "30+", label: "Image models", context: "Unified provider access" },
      { value: "20+", label: "Video models" },
      { value: "5+", label: "Audio models" },
      { value: "4", label: "Models per prompt", context: "Simultaneous comparison" },
    ],
    outcomes: [
      "Unified access across Flux, Kling, Veo, Seedream/Seedance, Runway, Luma, Ideogram, Stable Diffusion, MiniMax, and OpenAI.",
      "Side-by-side comparison of up to four models from one prompt.",
      "Async generation with queues, webhooks/polling, retries, and cloud asset handling across staging and production.",
    ],
    technologies: [
      "Python",
      "FastAPI",
      "Async Queues",
      "Webhooks",
      "Cloud Storage",
      "Flux",
      "Kling",
      "Veo",
      "OpenAI",
      "Runway",
      "Stable Diffusion",
    ],
    engineeringDecisions: [
      {
        title: "Asynchronous generation architecture",
        rationale:
          "Multimodal jobs are long-running and provider-specific. Queue-based processing with webhook/polling status tracking keeps the API responsive while preserving model-specific parameters.",
      },
      {
        title: "Normalized result pipeline",
        rationale:
          "Providers return incompatible payloads. A normalization layer enables comparison UI, history, and asset handling without coupling the product to any single vendor.",
      },
      {
        title: "Staging and production workflow parity",
        rationale:
          "Generation history and parameter preservation across environments reduce regression risk when adding or updating models.",
      },
    ],
    reliability: [
      "Queue-based processing",
      "Webhook and polling status tracking",
      "Retries on provider failures",
      "Cloud asset handling",
      "Model-specific parameter preservation",
    ],
    architecture: {
      description:
        "Prompt intake fans out through a model router into parallel provider executions, then converges through async orchestration into a normalized asset pipeline.",
      nodes: [
        { id: "prompt", label: "Prompt", meta: "User intent" },
        { id: "router", label: "Model Router", meta: "Provider selection" },
        { id: "flux", label: "Flux", group: "providers" },
        { id: "kling", label: "Kling", group: "providers" },
        { id: "veo", label: "Veo", group: "providers" },
        { id: "openai", label: "OpenAI", group: "providers" },
        { id: "async", label: "Async Orchestration", meta: "Queues · retries" },
        { id: "status", label: "Webhook / Polling", meta: "Status tracking" },
        { id: "normalize", label: "Normalized Result", meta: "Unified schema" },
        { id: "assets", label: "Asset Pipeline", meta: "History · cloud" },
      ],
      edges: [
        { from: "prompt", to: "router" },
        { from: "router", to: "flux" },
        { from: "router", to: "kling" },
        { from: "router", to: "veo" },
        { from: "router", to: "openai" },
        { from: "flux", to: "async" },
        { from: "kling", to: "async" },
        { from: "veo", to: "async" },
        { from: "openai", to: "async" },
        { from: "async", to: "status" },
        { from: "status", to: "normalize" },
        { from: "normalize", to: "assets" },
      ],
    },
    anatomyLayers: [
      {
        id: "ARCHITECTURE",
        title: "Architecture",
        summary: "Multi-provider fan-out with async job orchestration.",
        items: [
          "Model router",
          "Parallel provider execution",
          "Normalized result schema",
          "Generation history",
        ],
      },
      {
        id: "AI",
        title: "AI",
        summary: "Image, video, and audio generation across provider ecosystems.",
        items: [
          "Text-to-image / image-to-image",
          "Text-to-video / image-to-video",
          "Extend / merge video",
          "Text-to-music / speech / A-V",
        ],
      },
      {
        id: "DATA",
        title: "Data",
        summary: "Cloud assets and generation history for staging and production.",
        items: ["Cloud asset storage", "Job status records", "Parameter snapshots"],
      },
      {
        id: "RELIABILITY",
        title: "Reliability",
        summary: "Provider volatility handled through queues, retries, and status tracking.",
        items: ["Queues", "Webhooks / polling", "Retries", "Staging ↔ production parity"],
      },
    ],
    media: [],
  },
  {
    slug: "medicai",
    name: "MedicAI",
    shortName: "MedicAI",
    categories: ["Agentic AI"],
    domains: ["Healthcare"],
    status: "internal",
    featured: true,
    caseStudy: true,
    visualGrammar: "agent-state-graph",
    period: "2025",
    headline: "Multi-tenant multi-agent clinical AI platform.",
    summary:
      "LangGraph-orchestrated clinical platform with specialized agents, Agentic RAG, tenant isolation, human-in-the-loop gates, and evaluation via LangSmith and RAGAS.",
    problem:
      "Clinical workflows require specialized reasoning, retrieval, and strict controls—single-prompt chatbots cannot safely handle coding, documentation, triage, and imaging in a multi-tenant environment.",
    solution:
      "A stateful multi-agent system with structured routing, tool execution, retrieval, validation, and human approval where required—observed and evaluated in production-minded workflows.",
    role: "AI Architecture & Agent Orchestration",
    responsibilities: [
      "AI Architecture",
      "Agent Orchestration",
      "Retrieval",
      "Evaluation",
      "Productionization",
    ],
    liveUrl: null,
    github: "https://github.com/talhazaindev/MedicAI",
    metrics: [
      { value: "Multi-agent", label: "LangGraph orchestration" },
      { value: "HITL", label: "Human approval gates" },
      { value: "RBAC", label: "Tenant isolation" },
    ],
    outcomes: [
      "Specialized agents for ICD-10, SOAP docs, scheduling, imaging, triage, and clinical Q&A.",
      "Production controls: tenant isolation, Redis/PostgreSQL state, guardrails, schema validation.",
      "Observability and retrieval evaluation with LangSmith and RAGAS.",
    ],
    technologies: [
      "LangGraph",
      "LangChain",
      "Agentic RAG",
      "Redis",
      "PostgreSQL",
      "LangSmith",
      "RAGAS",
      "FastAPI",
      "Python",
    ],
    engineeringDecisions: [
      {
        title: "Explicit LangGraph state orchestration",
        rationale:
          "Clinical tasks need structured routing across specialists. A state graph makes agent transitions, tool calls, and approval gates inspectable and controllable.",
      },
      {
        title: "Human-in-the-loop gating",
        rationale:
          "High-risk clinical outputs require approval boundaries. HITL gates prevent automatic release of sensitive recommendations without review.",
      },
      {
        title: "Tenant isolation with RBAC",
        rationale:
          "Multi-tenant clinical data cannot share context casually. Isolation and role controls are first-class architecture constraints, not afterthoughts.",
      },
      {
        title: "LangSmith + RAGAS evaluation loop",
        rationale:
          "Agent quality must be measured. Tracing and retrieval evaluation close the loop between orchestration changes and measurable behavior.",
      },
    ],
    reliability: [
      "Tenant isolation / RBAC",
      "Schema validation",
      "Guardrails",
      "Human-in-the-loop gates",
      "Structured routing",
    ],
    evaluation: ["LangSmith tracing", "RAGAS retrieval evaluation"],
    architecture: {
      description:
        "Authenticated tenant context enters a LangGraph router that dispatches specialized clinical agents with RAG, tools, memory, and workflow paths—then validation, optional HITL, and observability.",
      nodes: [
        { id: "request", label: "Request" },
        { id: "auth", label: "Auth / Tenant", meta: "RBAC" },
        { id: "router", label: "LangGraph Router", meta: "State machine" },
        { id: "agents", label: "Specialized Agents", meta: "ICD-10 · SOAP · Triage" },
        { id: "rag", label: "Agentic RAG", group: "capabilities" },
        { id: "tools", label: "Tools", group: "capabilities" },
        { id: "memory", label: "Memory", meta: "Redis", group: "capabilities" },
        { id: "clinical", label: "Clinical Workflow", group: "capabilities" },
        { id: "validate", label: "Validation / Guardrails" },
        { id: "hitl", label: "Human Approval", meta: "When required" },
        { id: "output", label: "Output" },
        { id: "observe", label: "LangSmith / RAGAS", meta: "Observability" },
      ],
      edges: [
        { from: "request", to: "auth" },
        { from: "auth", to: "router" },
        { from: "router", to: "agents" },
        { from: "agents", to: "rag" },
        { from: "agents", to: "tools" },
        { from: "agents", to: "memory" },
        { from: "agents", to: "clinical" },
        { from: "rag", to: "validate" },
        { from: "tools", to: "validate" },
        { from: "memory", to: "validate" },
        { from: "clinical", to: "validate" },
        { from: "validate", to: "hitl" },
        { from: "hitl", to: "output" },
        { from: "output", to: "observe" },
      ],
    },
    anatomyLayers: [
      {
        id: "ARCHITECTURE",
        title: "Architecture",
        summary: "LangGraph orchestration with structured routing across specialists.",
        items: ["State graph", "Router", "Specialized agents", "Tool execution"],
      },
      {
        id: "AI",
        title: "AI",
        summary: "Clinical specialists backed by Agentic RAG and tools.",
        items: ["ICD-10 coding", "SOAP documentation", "Triage", "Clinical Q&A", "Imaging workflows"],
      },
      {
        id: "DATA",
        title: "Data",
        summary: "PostgreSQL persistence with Redis state/memory patterns.",
        items: ["PostgreSQL", "Redis state", "Retrieval corpora", "Tenant-scoped data"],
      },
      {
        id: "RELIABILITY",
        title: "Reliability",
        summary: "Production controls for clinical safety and multi-tenancy.",
        items: ["RBAC", "Schema validation", "Guardrails", "HITL gates"],
      },
      {
        id: "OBSERVABILITY",
        title: "Observability",
        summary: "Tracing and retrieval evaluation on agent behavior.",
        items: ["LangSmith", "RAGAS", "Routing traces"],
      },
    ],
    media: [],
  },
  {
    slug: "mediax",
    name: "MediaX",
    shortName: "MediaX",
    categories: ["Intelligent Search"],
    domains: ["Advertising"],
    status: "production",
    featured: true,
    caseStudy: true,
    visualGrammar: "semantic-spatial",
    period: "2025",
    headline: "Semantic and geospatial OOH recommendation engine.",
    summary:
      "LLM-driven system that transforms natural-language campaign requirements into structured geographic intent, retrieves inventory, and ranks placements across 290+ UAE categories in under five seconds.",
    problem:
      "OOH campaign planning requires translating vague location language into validated geo-intent and ranking inventory against footfall, traffic, POI density, and proximity—manually and inconsistently.",
    solution:
      "An intent parser plus geospatial retrieval and weighted ranking pipeline with enrichment, caching, retries, and idempotent upserts for reliable recommendation responses.",
    role: "Applied AI / Search Systems",
    responsibilities: [
      "AI Architecture",
      "Retrieval",
      "Backend Engineering",
      "Data Pipelines",
      "Productionization",
    ],
    liveUrl: "https://map.mediaxnetwork.com/",
    github: null,
    metrics: [
      { value: "290+", label: "UAE POI categories" },
      { value: "< 5s", label: "Recommendation response" },
      { value: "30%", label: "Footfall weight" },
      { value: "30%", label: "Traffic weight" },
      { value: "20%", label: "POI density" },
      { value: "20%", label: "Proximity" },
    ],
    outcomes: [
      "Natural-language campaigns mapped to structured geo-intent and POI types.",
      "Weighted ranking across footfall, traffic, POI density, and proximity.",
      "Optimized recommendations returned in under five seconds.",
    ],
    technologies: [
      "Python",
      "FastAPI",
      "LLMs",
      "Semantic Search",
      "Geospatial Retrieval",
      "Redis",
      "PostgreSQL",
      "MongoDB",
      "Caching",
    ],
    engineeringDecisions: [
      {
        title: "Structured geo-intent extraction",
        rationale:
          "Campaign language is ambiguous. Parsing into validated locations and POI types makes retrieval deterministic and auditable.",
      },
      {
        title: "Weighted business ranking",
        rationale:
          "Inventory quality is multi-signal. Explicit weights (30/30/20/20) encode business priorities instead of opaque model scores alone.",
      },
      {
        title: "Caching, retry/backoff, idempotent upserts",
        rationale:
          "External APIs and enrichment steps fail. Retry/backoff, caching, conflict resolution, and idempotent writes keep the pipeline production-safe under load.",
      },
    ],
    reliability: [
      "Retry / backoff",
      "Caching",
      "Conflict resolution",
      "Idempotent upserts",
      "Location semantic validation",
    ],
    architecture: {
      description:
        "Natural-language campaigns flow through intent parsing, geo/POI resolution, semantic validation, geospatial retrieval, and a weighted ranking engine into inventory recommendations.",
      nodes: [
        { id: "nl", label: "NL Campaign" },
        { id: "intent", label: "Intent Parser", meta: "LLM" },
        { id: "geo", label: "Geo + POI Resolution" },
        { id: "validate", label: "Semantic Validation" },
        { id: "retrieve", label: "Geospatial Retrieval" },
        { id: "rank", label: "Ranking Engine", meta: "30/30/20/20" },
        { id: "reco", label: "Inventory Recommendation" },
      ],
      edges: [
        { from: "nl", to: "intent" },
        { from: "intent", to: "geo" },
        { from: "geo", to: "validate" },
        { from: "validate", to: "retrieve" },
        { from: "retrieve", to: "rank" },
        { from: "rank", to: "reco" },
      ],
    },
    anatomyLayers: [
      {
        id: "ARCHITECTURE",
        title: "Architecture",
        summary: "Intent → geo resolution → retrieval → weighted ranking.",
        items: ["Intent parser", "Geo/POI resolution", "Ranking engine", "API enrichment"],
      },
      {
        id: "AI",
        title: "AI",
        summary: "LLM semantic understanding of campaign language and locations.",
        items: ["NL intent extraction", "Semantic location mapping", "POI type inference"],
      },
      {
        id: "DATA",
        title: "Data",
        summary: "Geospatial inventory and enrichment across 290+ UAE categories.",
        items: ["OOH inventory", "POI categories", "Footfall / traffic signals", "Cache layer"],
      },
      {
        id: "RELIABILITY",
        title: "Reliability",
        summary: "External API volatility handled with retries and idempotency.",
        items: ["Retry/backoff", "Caching", "Conflict resolution", "Idempotent upserts"],
      },
    ],
    media: [],
  },
  {
    slug: "ecg-intelligence",
    name: "ECG Intelligence Platform",
    shortName: "ECG Intelligence",
    categories: ["Data Systems", "ML Systems"],
    domains: ["Healthcare"],
    status: "internal",
    featured: true,
    caseStudy: true,
    visualGrammar: "data-transformation",
    period: "2024–2025",
    headline: "Vendor-agnostic clinical data unification for ML readiness.",
    summary:
      "Unified heterogeneous PDF, image, CSV, and waveform inputs into a canonical clinical schema with configurable field mapping—eliminating recurring manual analyst work and enabling analytics/ML pipelines.",
    problem:
      "Clinical ECG-related data arrives in incompatible vendor formats. Analysts spend hours normalizing fields before analytics or ML training can begin.",
    solution:
      "A configurable normalization and field-mapping pipeline that produces a vendor-agnostic canonical schema suitable for downstream analytics and machine-learning readiness.",
    role: "Data / ML Infrastructure Engineering",
    responsibilities: [
      "Data Pipelines",
      "AI Architecture",
      "Backend Engineering",
      "Productionization",
    ],
    liveUrl: null,
    github: "https://github.com/talhazaindev/ECG-Data-Unification",
    metrics: [
      {
        value: "3–4 hrs/week",
        label: "Manual work eliminated",
        context: "Recurring analyst effort",
      },
      { value: "4", label: "Input modalities", context: "PDF · Image · CSV · Waveform" },
    ],
    outcomes: [
      "Heterogeneous clinical inputs mapped into a canonical schema.",
      "Reusable normalization pipelines for analytics and ML training.",
      "Approximately 3–4 hours of recurring manual analyst effort eliminated per week.",
    ],
    technologies: [
      "Python",
      "ETL",
      "Schema Mapping",
      "PDF Parsing",
      "Image Processing",
      "CSV Pipelines",
      "Waveform Data",
      "ML Readiness",
    ],
    engineeringDecisions: [
      {
        title: "Canonical clinical schema",
        rationale:
          "Vendor formats diverge. A single canonical model decouples analytics/ML from upstream format churn.",
      },
      {
        title: "Configurable field mapping",
        rationale:
          "New vendors and fields appear continuously. Mapping configuration avoids hard-coded parsers for every source.",
      },
      {
        title: "ML-ready normalization",
        rationale:
          "The pipeline targets reusable training/analytics inputs, not one-off analyst spreadsheets.",
      },
    ],
    reliability: [
      "Configurable field mapping",
      "Heterogeneous input handling",
      "Reusable normalization workflows",
    ],
    architecture: {
      description:
        "PDF, image, CSV, and waveform sources flow through extraction and normalization into a vendor-agnostic canonical schema consumed by analytics and ML pipelines.",
      nodes: [
        { id: "pdf", label: "PDF", group: "sources" },
        { id: "image", label: "Image", group: "sources" },
        { id: "csv", label: "CSV", group: "sources" },
        { id: "wave", label: "Waveform", group: "sources" },
        { id: "extract", label: "Extraction" },
        { id: "normalize", label: "Normalization", meta: "Field mapping" },
        { id: "canonical", label: "Canonical Schema", meta: "Vendor-agnostic" },
        { id: "ml", label: "Analytics / ML Pipeline" },
      ],
      edges: [
        { from: "pdf", to: "extract" },
        { from: "image", to: "extract" },
        { from: "csv", to: "extract" },
        { from: "wave", to: "extract" },
        { from: "extract", to: "normalize" },
        { from: "normalize", to: "canonical" },
        { from: "canonical", to: "ml" },
      ],
    },
    anatomyLayers: [
      {
        id: "ARCHITECTURE",
        title: "Architecture",
        summary: "Heterogeneous intake → normalize → canonical → ML readiness.",
        items: ["Multi-format intake", "Field mapping", "Canonical schema", "Downstream pipelines"],
      },
      {
        id: "DATA",
        title: "Data",
        summary: "Clinical records unified across vendors and modalities.",
        items: ["PDF", "Image", "CSV", "Waveform", "Canonical fields"],
      },
      {
        id: "AI",
        title: "AI",
        summary: "ML-ready datasets for analytics and model training.",
        items: ["Training readiness", "Analytics compatibility", "Reusable features"],
      },
      {
        id: "RELIABILITY",
        title: "Reliability",
        summary: "Configurable mapping reduces brittle one-off scripts.",
        items: ["Configurable maps", "Reusable workflows", "Vendor-agnostic outputs"],
      },
    ],
    media: [],
  },
  // ——— Engineering Archive (caseStudy: false unless expanded later) ———
  {
    slug: "conversational-ai-platform",
    name: "No-Code Conversational AI Platform",
    categories: ["Agentic AI", "Generative AI"],
    domains: ["Other"],
    status: "internal",
    featured: false,
    caseStudy: false,
    visualGrammar: "generic",
    period: "2024–2025",
    headline: "Configurable domain assistants without bespoke chatbot builds.",
    summary:
      "No-code conversational AI platform enabling organizations to configure and launch custom domain assistants—reducing dependence on one-off chatbot development.",
    role: "AI Engineering",
    responsibilities: ["AI Architecture", "Backend Engineering", "Integration", "Productionization"],
    liveUrl: null,
    github: null,
    metrics: [],
    outcomes: [
      "Organizations could configure domain assistants without writing custom chatbot code.",
      "LLM workflows packaged behind production APIs and containerized services.",
    ],
    technologies: ["Llama", "NLP", "FastAPI", "Docker", "Conversational AI"],
    media: [],
  },
  {
    slug: "voice-ai-workflows",
    name: "Voice AI Workflows",
    categories: ["Generative AI"],
    domains: ["Other"],
    status: "internal",
    featured: false,
    caseStudy: false,
    visualGrammar: "generic",
    period: "2024–2025",
    headline: "LLM-powered conversational and voice automation.",
    summary:
      "Voice and conversational workflows integrating Llama, NLP pipelines, Twilio, APIs, and business actions for support, booking, information retrieval, and automation.",
    role: "AI Engineering",
    responsibilities: ["Integration", "Backend Engineering", "Productionization"],
    liveUrl: null,
    github: null,
    metrics: [],
    outcomes: [
      "Twilio-integrated voice/LLM workflows for support and booking automation.",
      "Business actions triggered from conversational intent behind production APIs.",
    ],
    technologies: ["Llama", "Twilio", "NLP", "Voice AI", "APIs", "Docker"],
    media: [],
  },
  {
    slug: "domain-nlp-services",
    name: "Domain NLP Services",
    categories: ["ML Systems"],
    domains: ["Other"],
    status: "internal",
    featured: false,
    caseStudy: false,
    visualGrammar: "generic",
    period: "2023",
    headline: "Transfer learning and fine-tuning into reusable language services.",
    summary:
      "NLP applications using GPT-3, Llama, BERT, and Falcon—applying transfer learning and fine-tuning to domain-specific conversational and language-processing use cases.",
    role: "Junior AI Engineer",
    responsibilities: ["AI Architecture", "Backend Engineering"],
    liveUrl: null,
    github: null,
    metrics: [],
    outcomes: [
      "Domain NLP experiments moved into reusable services and cross-functional delivery.",
    ],
    technologies: ["GPT-3", "Llama", "BERT", "Falcon", "PyTorch", "TensorFlow"],
    media: [],
  },
];

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

export function getArchiveProjects(): Project[] {
  return projects.filter((p) => !p.featured);
}

export function getCaseStudyProjects(): Project[] {
  return projects.filter((p) => p.caseStudy);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getNextCaseStudy(slug: string): Project | undefined {
  const list = getCaseStudyProjects();
  const index = list.findIndex((p) => p.slug === slug);
  if (index === -1) return undefined;
  return list[(index + 1) % list.length];
}

/** Homepage production signals derived from real project metrics. */
export const productionSignals = [
  {
    value: "30+",
    label: "Image Models",
    projectSlug: "ai-compare-hub",
  },
  {
    value: "20+",
    label: "Video Models",
    projectSlug: "ai-compare-hub",
  },
  {
    value: "5+",
    label: "Audio Models",
    projectSlug: "ai-compare-hub",
  },
  {
    value: "290+",
    label: "UAE POI Categories",
    projectSlug: "mediax",
  },
  {
    value: "< 5s",
    label: "Recommendation Response",
    projectSlug: "mediax",
  },
  {
    value: "3–4 hrs/week",
    label: "Manual Work Eliminated",
    projectSlug: "ecg-intelligence",
  },
] as const;
