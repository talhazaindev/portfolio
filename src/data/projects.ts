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
        constraint:
          "Generation latency can exceed a normal HTTP request lifecycle across multimodal providers.",
        rationale:
          "Multimodal jobs are long-running and provider-specific. Queue-based processing with webhook/polling status tracking keeps the API responsive while preserving model-specific parameters.",
        result:
          "Responsive API surface with independently tracked jobs, retries, and status webhooks/polling.",
      },
      {
        title: "Normalized result pipeline",
        constraint:
          "Providers return incompatible payloads and model-specific parameter shapes.",
        rationale:
          "A normalization layer enables comparison UI, history, and asset handling without coupling the product to any single vendor.",
        result: "Side-by-side comparison and shared generation history across the model ecosystem.",
      },
      {
        title: "Staging and production workflow parity",
        constraint:
          "Adding or updating providers risks regressions if environments diverge.",
        rationale:
          "Generation history and parameter preservation across environments reduce regression risk when adding or updating models.",
        result: "Parity between staging and production generation workflows.",
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
    media: [
      {
        type: "interface",
        src: "/ai-compare-hub.png",
        alt: "AI Compare Hub recent generations dashboard with multimodal model outputs and asset history.",
        caption: "Unified multimodal generation workspace",
      },
    ],
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
        constraint:
          "Clinical tasks need structured routing across specialists with inspectable transitions.",
        rationale:
          "A state graph makes agent transitions, tool calls, and approval gates inspectable and controllable.",
        result: "Controllable multi-agent clinical workflows with explicit route selection.",
      },
      {
        title: "Human-in-the-loop gating",
        constraint:
          "High-risk clinical outputs require approval boundaries before release.",
        rationale:
          "HITL gates prevent automatic release of sensitive recommendations without review.",
        result: "Approval gates on sensitive clinical recommendations.",
      },
      {
        title: "Tenant isolation with RBAC",
        constraint:
          "Multi-tenant clinical data cannot share context casually.",
        rationale:
          "Isolation and role controls are first-class architecture constraints, not afterthoughts.",
        result: "Tenant isolation and role-based access as core platform constraints.",
      },
      {
        title: "LangSmith + RAGAS evaluation loop",
        constraint:
          "Agent quality must be measured as orchestration changes.",
        rationale:
          "Tracing and retrieval evaluation close the loop between orchestration changes and measurable behavior.",
        result: "Observable agent behavior with retrieval evaluation feedback.",
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
    media: [
      {
        type: "interface",
        src: "/medic-ai.png",
        alt: "MedicAI clinical operations dashboard with AI agents, appointments, and hospital analytics.",
        caption: "Clinical agents & hospital operations interface",
      },
    ],
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
        constraint: "Campaign language is ambiguous and uneven across advertisers.",
        rationale:
          "Parsing into validated locations and POI types makes retrieval deterministic and auditable.",
        result: "Deterministic geo-intent for inventory retrieval.",
      },
      {
        title: "Weighted business ranking",
        constraint: "Inventory quality is multi-signal — not a single model score.",
        rationale:
          "Explicit weights (30/30/20/20) encode business priorities instead of opaque model scores alone.",
        result: "Auditable ranking across footfall, traffic, POI density, and proximity.",
      },
      {
        title: "Caching, retry/backoff, idempotent upserts",
        constraint: "External APIs and enrichment steps fail under load.",
        rationale:
          "Retry/backoff, caching, conflict resolution, and idempotent writes keep the pipeline production-safe under load.",
        result: "Production-safe enrichment under external API volatility.",
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
    media: [
      {
        type: "interface",
        src: "/mediax.png",
        alt: "MediaX map interface for finding optimal outdoor media spaces across the UAE.",
        caption: "Geospatial OOH media discovery",
      },
    ],
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
        constraint: "Vendor formats diverge across PDF, image, CSV, and waveform inputs.",
        rationale:
          "A single canonical model decouples analytics/ML from upstream format churn.",
        result: "One trusted schema for analytics and ML pipelines.",
      },
      {
        title: "Configurable field mapping",
        constraint: "New vendors and fields appear continuously.",
        rationale:
          "Mapping configuration avoids hard-coded parsers for every source.",
        result: "Reusable mapping without per-vendor hard-coded parsers.",
      },
      {
        title: "ML-ready normalization",
        constraint: "Analyst spreadsheets do not scale into training inputs.",
        rationale:
          "The pipeline targets reusable training/analytics inputs, not one-off analyst spreadsheets.",
        result: "Normalized outputs ready for analytics and ML workloads.",
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
    media: [
      {
        type: "diagram",
        src: "/ecg-unification.png",
        alt: "ECG Data Unification enterprise architecture spanning context engine, platform, and delivery skills.",
        caption: "Clinical signal fusion into one trusted dataset",
      },
    ],
  },
  {
    slug: "noxus",
    name: "Noxus",
    shortName: "Noxus",
    categories: ["Agentic AI"],
    domains: ["Enterprise"],
    status: "production",
    featured: true,
    caseStudy: true,
    visualGrammar: "agent-state-graph",
    period: "2024–Present",
    headline: "Agentic AI workers for complex enterprise operations.",
    summary:
      "Production agent platform that maps SOPs into intelligent workflows—Flows, Agents, and Knowledge Bases—then executes end-to-end inside legacy systems of record with human oversight.",
    problem:
      "Enterprise customer operations stall when AI stops at answers. Complex cases span email, chat, ERP, and policy—generic chatbots deflect instead of completing the work.",
    solution:
      "An agentic execution architecture: knowledge-grounded workers, visual/code flows, multi-channel intake, and human-in-the-loop gates that operate SAP, Oracle, ServiceNow, and custom tools under audit.",
    role: "AI Architecture & Agent Orchestration",
    responsibilities: [
      "AI Architecture",
      "Agent Orchestration",
      "Retrieval",
      "Integration",
      "Productionization",
    ],
    liveUrl: "https://www.noxus.ai/",
    github: null,
    metrics: [
      { value: "30–65%", label: "In-policy automation", context: "End-to-end when policy allows" },
      { value: "~25%", label: "AHT reduction" },
      { value: "HITL", label: "Human oversight gates" },
      { value: "SOC 2", label: "Enterprise controls", context: "ISO 27001 · GDPR" },
    ],
    outcomes: [
      "Agentic co-workers that follow SOPs, process documents, enforce policy, and update systems of record.",
      "Multi-channel intake (email, chat, SMS, voice, API) with audited execution across back-office tools.",
      "Deployable as SaaS or self-hosted with worker pools, SSO, and compliance controls.",
    ],
    technologies: [
      "Agent Orchestration",
      "RAG / Knowledge Bases",
      "Visual Flows",
      "Tool Calling",
      "Worker Pools",
      "OpenTelemetry",
      "Multi-provider LLMs",
      "Python SDK",
      "REST API",
    ],
    engineeringDecisions: [
      {
        title: "Flows + Agents + Knowledge as one platform",
        constraint:
          "Enterprises need both deterministic process graphs and autonomous tool-using agents grounded in proprietary knowledge.",
        rationale:
          "Separating visual flows, conversational agents, and semantic knowledge bases lets teams compose agentic systems without forcing one pattern for every case.",
        result: "Composable agentic automation spanning SOP flows and retrieval-backed workers.",
      },
      {
        title: "Execution inside systems of record",
        constraint: "Value only lands when work updates SAP, Oracle, CRM, and ticketing—not when it drafts a reply.",
        rationale:
          "Agent planning and tool adapters target back-office systems so cases close, not just summarize.",
        result: "End-to-end case handling with ERP and CRM side effects under audit.",
      },
      {
        title: "Human-in-the-loop for customer operations",
        constraint: "Out-of-policy and high-risk actions cannot auto-release.",
        rationale:
          "HITL review sits in the operator inbox alongside AI co-workers, preserving control without abandoning automation.",
        result: "Approval gates on sensitive actions while in-policy work completes autonomously.",
      },
      {
        title: "Isolated worker pools for scale",
        constraint: "Tenant and workload isolation matter for enterprise security zones and GPU-heavy runs.",
        rationale:
          "Pool-based async workers with autoscaling keep control-plane APIs responsive while runs stay isolated.",
        result: "Scalable execution with observability via metrics and distributed tracing.",
      },
    ],
    reliability: [
      "SSO and audit trails",
      "Human-in-the-loop gates",
      "Worker pool isolation",
      "SOC 2 / ISO 27001 / GDPR controls",
      "Multi-cloud and private deployment",
    ],
    evaluation: ["Run analytics", "Observability traces", "Policy compliance checks"],
    architecture: {
      description:
        "Multi-channel intake enters an orchestration control plane that routes Flows and Agents over Knowledge Bases and tool adapters into worker pools, with HITL gates and observability before systems of record update.",
      nodes: [
        { id: "channel", label: "Channels", meta: "Email · Chat · Voice · API" },
        { id: "control", label: "Control Plane", meta: "Auth · Workspaces" },
        { id: "router", label: "Orchestrator", meta: "Flows · Agents" },
        { id: "kb", label: "Knowledge Base", meta: "RAG", group: "capabilities" },
        { id: "tools", label: "Tool Adapters", meta: "ERP · CRM", group: "capabilities" },
        { id: "workers", label: "Worker Pools", meta: "Async runs" },
        { id: "hitl", label: "Human Approval", meta: "When required" },
        { id: "sor", label: "Systems of Record", meta: "SAP · Oracle · ServiceNow" },
        { id: "observe", label: "Observability", meta: "OTel · Metrics" },
      ],
      edges: [
        { from: "channel", to: "control" },
        { from: "control", to: "router" },
        { from: "router", to: "kb" },
        { from: "router", to: "tools" },
        { from: "kb", to: "workers" },
        { from: "tools", to: "workers" },
        { from: "workers", to: "hitl" },
        { from: "hitl", to: "sor" },
        { from: "workers", to: "observe" },
        { from: "sor", to: "observe" },
      ],
    },
    anatomyLayers: [
      {
        id: "ARCHITECTURE",
        title: "Architecture",
        summary: "Control plane, agent/flow orchestration, and isolated worker execution.",
        items: ["Workspaces / RBAC", "Flow graph", "Agent runtime", "Worker pools"],
      },
      {
        id: "AI",
        title: "AI",
        summary: "SOP-following co-workers grounded in enterprise knowledge and tools.",
        items: ["Agent planning", "Knowledge RAG", "Document processing", "Policy enforcement"],
      },
      {
        id: "DATA",
        title: "Data",
        summary: "Knowledge bases and case context across channels and systems of record.",
        items: ["Document corpora", "Case state", "Audit logs", "Integration payloads"],
      },
      {
        id: "RELIABILITY",
        title: "Reliability",
        summary: "Enterprise safeguards for production operations.",
        items: ["HITL gates", "SSO", "Audit trails", "Deployment isolation"],
      },
      {
        id: "OBSERVABILITY",
        title: "Observability",
        summary: "Tracing and metrics across control plane and workers.",
        items: ["OpenTelemetry", "Prometheus metrics", "Run analytics"],
      },
    ],
    media: [
      {
        type: "interface",
        src: "/noxus.png",
        alt: "Noxus homepage showing agentic AI workers for complex enterprise operations.",
        caption: "Agentic execution for customer operations",
      },
    ],
  },
  {
    slug: "mythos",
    name: "MythOS",
    shortName: "MythOS",
    categories: ["Intelligent Search", "Agentic AI"],
    domains: ["Knowledge"],
    status: "production",
    featured: true,
    caseStudy: true,
    visualGrammar: "semantic-spatial",
    period: "2024–Present",
    headline: "AI-native knowledge platform with agent-addressable memory.",
    summary:
      "Living Markdown library where notes become a single source of truth—searchable, citable, and writable by AI agents over MCP and REST—so every model session starts with your memory, not a blank context window.",
    problem:
      "Knowledge is scattered across notebooks, chats, and duplicated CLAUDE.md files. Every new AI session forces re-explanation, and context drifts across tools.",
    solution:
      "A RAG-centered knowledge graph of linked memos with semantic retrieval, memo-level citations, and an MCP/agent API so Claude, Cursor, ChatGPT, and automations read and write one library.",
    role: "AI Architecture & RAG Systems",
    responsibilities: [
      "AI Architecture",
      "Retrieval",
      "Agent Orchestration",
      "Integration",
      "Productionization",
    ],
    liveUrl: "https://mythos.one/",
    github: null,
    metrics: [
      { value: "MCP", label: "Native agent protocol" },
      { value: "48+", label: "Agent tools", context: "Search · CRUD · journal" },
      { value: "BYO", label: "Model keys", context: "OpenAI · Anthropic" },
      { value: "/llms.txt", label: "Agent discovery" },
    ],
    outcomes: [
      "One living library addressable by every MCP-capable client without duplicating context files.",
      "Semantic search with memo-level citations grounded in the author's own writing.",
      "Agents can create, update, and retrieve memos mid-conversation with permission-aware access.",
    ],
    technologies: [
      "RAG",
      "Embeddings",
      "Semantic Search",
      "MCP",
      "Agent API",
      "Markdown Knowledge Graph",
      "Vector Retrieval",
      "LLMs",
      "REST",
    ],
    engineeringDecisions: [
      {
        title: "Memory outside any single model",
        constraint: "Model vendors and chat UIs churn; personal knowledge must survive migrations.",
        rationale:
          "A model-agnostic library with MCP and REST keeps retrieval and writes portable across Claude, ChatGPT, Cursor, and future clients.",
        result: "One source of truth addressable by any HTTP/MCP agent.",
      },
      {
        title: "Living documents over static dumps",
        constraint: "Paste-into-chat context goes stale the moment knowledge changes.",
        rationale:
          "Linked memos with @mentions and #tags form a graph agents can update once for every downstream session.",
        result: "Shared, updatable context without token-bloated duplication.",
      },
      {
        title: "Citation-backed RAG answers",
        constraint: "Library chat must not invent knowledge detached from source memos.",
        rationale:
          "Semantic retrieval returns answers in the author's words with memo-level citations for auditability.",
        result: "Grounded Q&A over personal and team libraries.",
      },
      {
        title: "Permission-aware agent surface",
        constraint: "Private memos must stay private when agents are connected.",
        rationale:
          "MCP/OAuth and API keys inherit per-memo permissions so agents never broaden access by default.",
        result: "Safe co-authoring with private-by-default memos.",
      },
    ],
    reliability: [
      "Private-by-default memos",
      "Permission tags",
      "Markdown export/portability",
      "BYO API keys",
      "Agent-scoped auth",
    ],
    evaluation: ["Citation grounding", "Retrieval relevance", "Agent tool correctness"],
    architecture: {
      description:
        "Authoring and agent clients write into a linked memo graph; embeddings power semantic retrieval; MCP/REST expose search, CRUD, and grounded chat with citation-backed answers.",
      nodes: [
        { id: "author", label: "Author / Editor", meta: "Markdown memos" },
        { id: "agents", label: "AI Clients", meta: "Claude · Cursor · ChatGPT" },
        { id: "mcp", label: "MCP / Agent API" },
        { id: "graph", label: "Memo Graph", meta: "@ · #" },
        { id: "embed", label: "Embeddings", meta: "Index" },
        { id: "retrieve", label: "Semantic Retrieval" },
        { id: "cite", label: "Cited Answer", meta: "Memo-level" },
        { id: "publish", label: "Publish / Automations", meta: "llms.txt · Zapier" },
      ],
      edges: [
        { from: "author", to: "graph" },
        { from: "agents", to: "mcp" },
        { from: "mcp", to: "graph" },
        { from: "graph", to: "embed" },
        { from: "embed", to: "retrieve" },
        { from: "retrieve", to: "cite" },
        { from: "mcp", to: "retrieve" },
        { from: "graph", to: "publish" },
      ],
    },
    anatomyLayers: [
      {
        id: "ARCHITECTURE",
        title: "Architecture",
        summary: "Memo graph + retrieval layer + agent protocol surface.",
        items: ["Living documents", "MCP server", "Agent REST API", "Discovery (/llms.txt)"],
      },
      {
        id: "AI",
        title: "AI",
        summary: "RAG chat and agent co-authoring over personal knowledge.",
        items: ["Semantic search", "Cited answers", "Agent write-back", "BYO models"],
      },
      {
        id: "DATA",
        title: "Data",
        summary: "Markdown-native library with links, tags, and media.",
        items: ["Memos", "Hashtags / mentions", "Embeddings index", "Permissions"],
      },
      {
        id: "RELIABILITY",
        title: "Reliability",
        summary: "Ownership and access controls for agent-connected libraries.",
        items: ["Private by default", "Export anytime", "Scoped API keys"],
      },
      {
        id: "OBSERVABILITY",
        title: "Observability",
        summary: "Agent tool usage and retrieval grounded in source memos.",
        items: ["Citation trails", "Tool audit", "Permission checks"],
      },
    ],
    media: [
      {
        type: "interface",
        src: "/mythos.png",
        alt: "MythOS homepage for an AI-native knowledge platform with living documents.",
        caption: "Agent-addressable single source of truth",
      },
    ],
  },
  {
    slug: "mypop",
    name: "MyPop",
    shortName: "MyPop",
    categories: ["Agentic AI"],
    domains: ["Enterprise"],
    status: "production",
    featured: true,
    caseStudy: true,
    visualGrammar: "agent-state-graph",
    period: "2024–Present",
    headline: "AI agent and agile coach for product teams.",
    summary:
      "Production AI agent that joins the tools teams already use—meetings, Slack, Jira, GitHub—to produce summaries, action items, risk alerts, and continuous-improvement coaching from real work signals.",
    problem:
      "Hybrid product teams lose signal across meetings and boards. Delays, rework, and blockers surface late because no system learns from past delivery mistakes in context.",
    solution:
      "An agent pipeline that ingests meetings and project activity, retrieves prior patterns, orchestrates summaries and ticket actions, and surfaces coaching recommendations with early risk detection.",
    role: "AI Architecture & Agent Orchestration",
    responsibilities: [
      "AI Architecture",
      "Agent Orchestration",
      "Retrieval",
      "Integration",
      "Productionization",
    ],
    liveUrl: "https://mypop.ai/",
    github: null,
    metrics: [
      { value: "Multi-tool", label: "Jira · Slack · Zoom · GitHub" },
      { value: "Auto", label: "Meeting summaries" },
      { value: "Risk", label: "Early blocker alerts" },
      { value: "GDPR", label: "ICO-compliant security" },
    ],
    outcomes: [
      "Automated meeting transcription, summaries, and action capture into team channels.",
      "Voice/context-driven Jira ticket creation with intelligent task suggestions.",
      "AI agile coaching recommendations grounded in team activity and delivery history.",
    ],
    technologies: [
      "Agent Orchestration",
      "RAG",
      "Speech-to-Text",
      "NLP",
      "Tool Calling",
      "Jira / Slack APIs",
      "Meeting Intelligence",
      "Recommendation Engine",
    ],
    engineeringDecisions: [
      {
        title: "Agent over the existing stack",
        constraint: "Teams will not abandon Jira, Slack, and Zoom for a new system of record.",
        rationale:
          "Integrations pull work signals into the agent so coaching and automation land where teams already operate.",
        result: "Unified insights without forcing a workflow migration.",
      },
      {
        title: "Meeting → structured work objects",
        constraint: "Raw transcripts are not actionable for delivery teams.",
        rationale:
          "Agent extraction turns discussion into summaries, decisions, blockers, and ticket candidates with tool writes back to Jira/Slack.",
        result: "Less manual note-taking and fewer dropped action items.",
      },
      {
        title: "Retrieval of past delivery patterns",
        constraint: "Coaching without history repeats the same mistakes.",
        rationale:
          "RAG over prior meetings and project context grounds risk alerts and improvement tips in this team's reality.",
        result: "Recommendations tied to observed patterns, not generic agile slogans.",
      },
      {
        title: "Security-first enterprise packaging",
        constraint: "Meeting and code-adjacent data is sensitive.",
        rationale:
          "Encryption, GDPR/ICO compliance, and SSO on higher tiers make agent access acceptable for product orgs.",
        result: "Deployable coaching agent with compliance controls.",
      },
    ],
    reliability: [
      "Encrypted data at rest and in transit",
      "GDPR / ICO compliance",
      "SSO (Teams+)",
      "Scoped tool integrations",
    ],
    evaluation: ["Summary faithfulness", "Action-item precision", "Risk alert usefulness"],
    architecture: {
      description:
        "Meetings and collaboration tools feed an ingestion layer; the agent retrieves team history, produces structured outputs, writes tickets/messages via tools, and surfaces coaching and risk alerts on a dashboard.",
      nodes: [
        { id: "meet", label: "Meetings", meta: "Zoom · Meet · Teams" },
        { id: "collab", label: "Collab Tools", meta: "Slack · Jira · GitHub" },
        { id: "ingest", label: "Ingestion", meta: "STT · docs" },
        { id: "agent", label: "Team Agent", meta: "Orchestrator" },
        { id: "rag", label: "Team Memory RAG", group: "capabilities" },
        { id: "tools", label: "Tool Actions", meta: "Tickets · Slack", group: "capabilities" },
        { id: "coach", label: "Agile Coach", meta: "Recommendations" },
        { id: "risk", label: "Risk Alerts", meta: "Blockers" },
        { id: "dash", label: "Team Dashboard" },
      ],
      edges: [
        { from: "meet", to: "ingest" },
        { from: "collab", to: "ingest" },
        { from: "ingest", to: "agent" },
        { from: "agent", to: "rag" },
        { from: "agent", to: "tools" },
        { from: "rag", to: "coach" },
        { from: "rag", to: "risk" },
        { from: "tools", to: "dash" },
        { from: "coach", to: "dash" },
        { from: "risk", to: "dash" },
      ],
    },
    anatomyLayers: [
      {
        id: "ARCHITECTURE",
        title: "Architecture",
        summary: "Ingest → agent orchestration → tools and coaching surfaces.",
        items: ["Multi-source ingest", "Agent runtime", "Tool adapters", "Dashboard"],
      },
      {
        id: "AI",
        title: "AI",
        summary: "Meeting intelligence, retrieval, and agile coaching.",
        items: ["Transcription", "Summaries", "Ticket suggestions", "Risk detection"],
      },
      {
        id: "DATA",
        title: "Data",
        summary: "Team activity memory across meetings and project tools.",
        items: ["Transcripts", "Tickets", "Chat signals", "Historical patterns"],
      },
      {
        id: "RELIABILITY",
        title: "Reliability",
        summary: "Enterprise security for meeting and delivery data.",
        items: ["Encryption", "GDPR", "SSO", "Access control"],
      },
    ],
    media: [
      {
        type: "interface",
        src: "/mypop.png",
        alt: "MyPop homepage for an AI agent and agile coach for product teams.",
        caption: "AI agent for product delivery teams",
      },
    ],
  },
  {
    slug: "uplift",
    name: "Uplift",
    shortName: "Uplift",
    categories: ["ML Systems", "Agentic AI"],
    domains: ["Sports"],
    status: "production",
    featured: true,
    caseStudy: true,
    visualGrammar: "data-transformation",
    period: "2024–Present",
    headline: "AI motion capture and coaching from phone video.",
    summary:
      "Production sports performance system that turns iPhone/iPad video into full 3D kinematics, movement Signals, and an AI Coach that translates biomechanics into actionable training recommendations.",
    problem:
      "Marker-based motion labs are expensive and inaccessible. Coaches need biomechanical insight and personalized guidance without $50k capture rooms.",
    solution:
      "A CV → biomechanics → retrieval-backed coaching pipeline: mobile capture, 3D reconstruction, metric extraction, risk/performance Signals, and an AI Coach grounded in validated movement science.",
    role: "AI Architecture & ML Systems",
    responsibilities: [
      "AI Architecture",
      "ML Systems",
      "Retrieval",
      "Evaluation",
      "Productionization",
    ],
    liveUrl: "https://www.uplift.ai/",
    github: null,
    metrics: [
      { value: "1–2", label: "iOS cameras", context: "Markerless capture" },
      { value: "3D", label: "Kinematic reconstruction" },
      { value: "Signals", label: "AI movement insights" },
      { value: "MLB+", label: "Pro / college usage" },
    ],
    outcomes: [
      "Markerless 3D movement analysis from consumer devices instead of lab rigs.",
      "Signals that surface strengths, focus areas, and injury-risk patterns for coaches.",
      "AI Coach that turns complex biomechanics into personalized, guardrailed recommendations.",
    ],
    technologies: [
      "Computer Vision",
      "3D Pose / Kinematics",
      "ML Pipelines",
      "RAG",
      "Generative AI Coach",
      "Mobile Capture",
      "Cloud Analysis",
      "Biomechanics Metrics",
    ],
    engineeringDecisions: [
      {
        title: "Phone-first capture over lab hardware",
        constraint: "Teams need assessments in gyms and fields, not only motion labs.",
        rationale:
          "1–2 iOS devices feeding a cloud CV stack democratizes kinematics without wearables or multi-camera rooms.",
        result: "Production capture usable by pro, college, and youth organizations.",
      },
      {
        title: "Metrics before language",
        constraint: "Generative coaching without biomechanical grounding hallucinates unsafe advice.",
        rationale:
          "CV produces kinematics and Signals first; the AI Coach retrieves validated movement science before recommending drills.",
        result: "Coach outputs tied to measured movement, with guardrails against hallucinated prescriptions.",
      },
      {
        title: "Signals as the coach interface",
        constraint: "Raw joint trajectories overwhelm athletes and staff.",
        rationale:
          "An intermediate Signals layer translates 3D data into strengths, focus areas, and risk flags humans can act on.",
        result: "Actionable reports plus full 3D visualizer for deeper review.",
      },
      {
        title: "Dual product paths, shared pipeline",
        constraint: "Pro capture (multi-cam) and consumer single-cam have different latency budgets.",
        rationale:
          "Shared reconstruction and coaching services with mode-specific capture frontends keep one AI core.",
        result: "Capture for orgs and faster single-cam consumer feedback from one platform.",
      },
    ],
    reliability: [
      "Guardrailed coaching recommendations",
      "Validated biomechanics metrics",
      "Cloud analysis pipeline",
      "Org-level athlete data controls",
    ],
    evaluation: ["Kinematic accuracy", "Signal quality", "Coach recommendation safety"],
    architecture: {
      description:
        "Mobile video uploads into a CV reconstruction service that emits 3D kinematics and metrics; Signals evaluate movement health; an AI Coach retrieves training knowledge to produce recommendations on web/mobile dashboards.",
      nodes: [
        { id: "capture", label: "iOS Capture", meta: "1–2 cameras" },
        { id: "upload", label: "Cloud Ingest" },
        { id: "cv", label: "CV Reconstruction", meta: "3D kinematics" },
        { id: "metrics", label: "Biomechanics Metrics" },
        { id: "signals", label: "Signals", meta: "Strengths · Risk" },
        { id: "rag", label: "Training Knowledge RAG", group: "capabilities" },
        { id: "coach", label: "AI Coach", group: "capabilities" },
        { id: "dash", label: "Dashboard / App", meta: "3D viewer" },
      ],
      edges: [
        { from: "capture", to: "upload" },
        { from: "upload", to: "cv" },
        { from: "cv", to: "metrics" },
        { from: "metrics", to: "signals" },
        { from: "signals", to: "coach" },
        { from: "rag", to: "coach" },
        { from: "coach", to: "dash" },
        { from: "signals", to: "dash" },
        { from: "cv", to: "dash" },
      ],
    },
    anatomyLayers: [
      {
        id: "ARCHITECTURE",
        title: "Architecture",
        summary: "Capture → reconstruct → measure → coach.",
        items: ["Mobile capture", "Cloud CV", "Signals layer", "Coach + dashboard"],
      },
      {
        id: "AI",
        title: "AI",
        summary: "Computer vision kinematics plus retrieval-backed coaching.",
        items: ["3D pose", "Movement Signals", "AI Coach", "Injury-risk flags"],
      },
      {
        id: "DATA",
        title: "Data",
        summary: "Video, keypoints, metrics, and athlete progress history.",
        items: ["Session video", "Joint keypoints", "Kinematic metrics", "Assessment history"],
      },
      {
        id: "RELIABILITY",
        title: "Reliability",
        summary: "Science-grounded recommendations with coaching guardrails.",
        items: ["Metric-first pipeline", "Recommendation guards", "Org dashboards"],
      },
      {
        id: "OBSERVABILITY",
        title: "Observability",
        summary: "Assessment quality and coaching output review.",
        items: ["Pipeline status", "Metric exports", "Coach traceability"],
      },
    ],
    media: [
      {
        type: "interface",
        src: "/uplift.png",
        alt: "Uplift homepage for AI 3D motion capture and sports performance coaching.",
        caption: "Phone-to-3D movement intelligence",
      },
    ],
  },
  {
    slug: "verifast",
    name: "Verifast",
    shortName: "Verifast",
    categories: ["Data Systems", "ML Systems"],
    domains: ["Fintech"],
    status: "production",
    featured: true,
    caseStudy: true,
    visualGrammar: "parallel-orchestration",
    period: "2024–Present",
    headline: "AI verification platform for income, identity, and fraud.",
    summary:
      "Production applicant verification system that orchestrates ID, bank-verified income, credit, criminal, and document checks into decision-ready workflows for multifamily leasing—with fraud detection and human-in-the-loop review.",
    problem:
      "Legacy screening rejects qualified renters on narrow income rules, while fraud and document forgery force slow manual reviews and vacant units.",
    solution:
      "A parallel verification orchestration layer: bank + document income signals, custom OCR, fraud models, cross-checks to identity, and HITL experts—returning portfolio-configurable decisions into property management systems.",
    role: "AI Architecture & ML Systems",
    responsibilities: [
      "AI Architecture",
      "Data Pipelines",
      "ML Systems",
      "Evaluation",
      "Productionization",
    ],
    liveUrl: "https://www.verifast.com/",
    github: null,
    metrics: [
      { value: "1.5M", label: "Renters verified / year" },
      { value: "18.6%", label: "More qualified approvals" },
      { value: "30%", label: "Faster approvals", context: "In 90 days" },
      { value: "36 min", label: "Avg HITL review" },
    ],
    outcomes: [
      "Unified ID, bank income, credit, and criminal checks returned into PMS workflows.",
      "Support for W-2, gig, self-employed, benefits, and other nontraditional income.",
      "Fraud detection plus same-day human review when automation is uncertain.",
    ],
    technologies: [
      "Document OCR",
      "Fraud Detection ML",
      "Bank Verification APIs",
      "Parallel Orchestration",
      "HITL Review",
      "PMS Integrations",
      "Decision Engine",
      "Data Pipelines",
    ],
    engineeringDecisions: [
      {
        title: "Parallel verification fan-out",
        constraint: "Applicants need ID, income, credit, and criminal signals without serial bottlenecks.",
        rationale:
          "Orchestrating checks in parallel and converging into one decision payload keeps time-to-lease short.",
        result: "Decision-ready outputs without Franken-processes across tools.",
      },
      {
        title: "Bank truth + document OCR",
        constraint: "Document-only income is forgeable; bank-only misses some legitimate streams.",
        rationale:
          "Combine instant bank connect with dual-model OCR and cross-checks to identity for full income reality.",
        result: "Higher approval of qualified renters without increasing fraud risk.",
      },
      {
        title: "Custom OCR over off-the-shelf",
        constraint: "Generic OCR failed accuracy bars on messy applicant documents.",
        rationale:
          "A dual-model extraction stack tuned for verification documents outperforms generic OCR in production testing.",
        result: "Reliable structured fields from diverse income paperwork.",
      },
      {
        title: "HITL when models disagree",
        constraint: "Edge cases and fraud patterns still need expert judgment.",
        rationale:
          "Same-day human-in-the-loop review (avg ~36 minutes) closes the loop without making every case manual.",
        result: "Automation when confident; humans when it matters.",
      },
    ],
    reliability: [
      "SOC 2–aligned controls",
      "Fraud model monitoring / drift checks",
      "HITL escalation",
      "Data minimization and retention policy",
      "PMS-native integrations",
    ],
    evaluation: ["Fraud precision/recall", "OCR field accuracy", "Approval quality", "Review SLA"],
    architecture: {
      description:
        "Applicant data from PMS fans out into ID, bank, credit, criminal, and document/OCR paths; fraud models and a decision engine converge results, with optional HITL, before writing decision-ready outputs back to the PMS.",
      nodes: [
        { id: "pms", label: "PMS / Applicant", meta: "Yardi · APIs" },
        { id: "orch", label: "Verification Orchestrator" },
        { id: "id", label: "ID / KYC", group: "checks" },
        { id: "bank", label: "Bank Income", group: "checks" },
        { id: "ocr", label: "Doc OCR", group: "checks" },
        { id: "credit", label: "Credit / Criminal", group: "checks" },
        { id: "fraud", label: "Fraud Models" },
        { id: "decide", label: "Decision Engine" },
        { id: "hitl", label: "HITL Review", meta: "~36 min avg" },
        { id: "out", label: "Decision Packet", meta: "Back to PMS" },
      ],
      edges: [
        { from: "pms", to: "orch" },
        { from: "orch", to: "id" },
        { from: "orch", to: "bank" },
        { from: "orch", to: "ocr" },
        { from: "orch", to: "credit" },
        { from: "id", to: "fraud" },
        { from: "bank", to: "fraud" },
        { from: "ocr", to: "fraud" },
        { from: "credit", to: "decide" },
        { from: "fraud", to: "decide" },
        { from: "decide", to: "hitl" },
        { from: "hitl", to: "out" },
        { from: "out", to: "pms" },
      ],
    },
    anatomyLayers: [
      {
        id: "ARCHITECTURE",
        title: "Architecture",
        summary: "Parallel verification fan-out with decision convergence.",
        items: ["Orchestrator", "Partner checks", "Decision engine", "PMS write-back"],
      },
      {
        id: "AI",
        title: "AI",
        summary: "OCR, fraud detection, and income underwriting signals.",
        items: ["Dual-model OCR", "Fraud models", "Income analytics", "Cross-checks"],
      },
      {
        id: "DATA",
        title: "Data",
        summary: "Applicant identity, bank, documents, and audit packets.",
        items: ["Bank transactions", "Documents", "Screening partners", "Proof PDFs"],
      },
      {
        id: "RELIABILITY",
        title: "Reliability",
        summary: "Compliance, fraud monitoring, and human escalation.",
        items: ["SOC 2–aligned", "Drift monitoring", "HITL SLA", "Data minimization"],
      },
      {
        id: "OBSERVABILITY",
        title: "Observability",
        summary: "Verification funnel and review performance.",
        items: ["Approval rates", "Review latency", "Fraud flags", "OCR quality"],
      },
    ],
    media: [
      {
        type: "interface",
        src: "/verifast.png",
        alt: "Verifast homepage for AI income and identity verification for renters.",
        caption: "Decision-ready applicant verification",
      },
    ],
  },
  {
    slug: "matefi",
    name: "MateFi",
    shortName: "MateFi",
    categories: ["Agentic AI", "ML Systems"],
    domains: ["Fintech"],
    status: "production",
    featured: true,
    caseStudy: true,
    visualGrammar: "agent-state-graph",
    period: "2024–Present",
    headline: "AI financial coach with safe-to-spend guidance.",
    summary:
      "Production personal-finance agent that connects accounts via Plaid, categorizes transactions, tracks goals, and coaches spending decisions—including a safe-to-spend number grounded in bills, subscriptions, and savings set-asides.",
    problem:
      "Bank balances lie. People overspend because apps show charts, not whether they can afford a purchase after rent, bills, and goals.",
    solution:
      "A retrieval- and rules-informed coaching agent over categorized transactions: safe-to-spend computation, anomaly flags, goal decomposition, and an AI coach that suggests fixes without moving money until the user approves.",
    role: "AI Architecture & Agent Orchestration",
    responsibilities: [
      "AI Architecture",
      "Agent Orchestration",
      "Data Pipelines",
      "Retrieval",
      "Productionization",
    ],
    liveUrl: "https://matefi.ai/",
    github: null,
    metrics: [
      { value: "Safe-to-spend", label: "Day · week · month" },
      { value: "Plaid", label: "Bank-grade connect" },
      { value: "15%", label: "Overspend flag", context: "Two budget cycles" },
      { value: "5K+", label: "Waitlist signal" },
    ],
    outcomes: [
      "Automatic categorization and subscription detection without manual tracking.",
      "Safe-to-spend guidance after obligations and goals—not raw bank balance.",
      "Privacy-first coaching: insights only; MateFi never moves user funds.",
    ],
    technologies: [
      "Plaid",
      "Transaction Categorization",
      "Agent Orchestration",
      "RAG",
      "Budgeting Rules Engine",
      "Anomaly Detection",
      "Mobile Apps",
      "Encryption",
    ],
    engineeringDecisions: [
      {
        title: "Safe-to-spend as the primary interface",
        constraint: "Balance-based UX drives overspending against upcoming obligations.",
        rationale:
          "Compute spendable cash after rent, bills, subscriptions, and goal reserves for day/week/month horizons.",
        result: "A decision number users can act on instead of guessing from balances.",
      },
      {
        title: "Coach that cannot move money",
        constraint: "Financial agents that auto-transfer create trust and liability risk.",
        rationale:
          "The agent explains overspend math and suggested fixes; nothing moves until the user approves outside the coach.",
        result: "Informational coaching with clear non-custodial boundaries.",
      },
      {
        title: "Plaid-mediated bank access",
        constraint: "Storing bank credentials is unacceptable for a consumer finance app.",
        rationale:
          "Plaid handles authentication so MateFi never sees bank logins; data is encrypted in transit and at rest.",
        result: "Bank-level connect with privacy-first data handling.",
      },
      {
        title: "Habit retrieval for personalized coaching",
        constraint: "Generic budgeting tips ignore a user's actual categories and goals.",
        rationale:
          "The coach retrieves recent spending patterns and goal state before recommending category-level adjustments.",
        result: "Personalized guidance grounded in the user's transaction history.",
      },
    ],
    reliability: [
      "No fund movement by the agent",
      "Plaid-mediated auth",
      "Encryption in transit and at rest",
      "User-controlled unlink / data removal",
    ],
    evaluation: ["Categorization accuracy", "Safe-to-spend correctness", "Coach suggestion usefulness"],
    architecture: {
      description:
        "Plaid-linked accounts sync transactions into categorization and subscription detection; a rules engine computes safe-to-spend and goals; an AI coach retrieves habit context to advise—never executing money movement.",
      nodes: [
        { id: "bank", label: "Bank Accounts", meta: "Plaid" },
        { id: "sync", label: "Transaction Sync" },
        { id: "cat", label: "Categorization", meta: "Subscriptions" },
        { id: "rules", label: "Safe-to-Spend Engine", meta: "Bills · Goals" },
        { id: "memory", label: "Spending Memory RAG", group: "capabilities" },
        { id: "coach", label: "AI Coach", group: "capabilities" },
        { id: "goals", label: "Goals Tracker" },
        { id: "app", label: "Mobile App", meta: "Insights only" },
      ],
      edges: [
        { from: "bank", to: "sync" },
        { from: "sync", to: "cat" },
        { from: "cat", to: "rules" },
        { from: "cat", to: "memory" },
        { from: "rules", to: "app" },
        { from: "goals", to: "rules" },
        { from: "memory", to: "coach" },
        { from: "rules", to: "coach" },
        { from: "coach", to: "app" },
        { from: "goals", to: "app" },
      ],
    },
    anatomyLayers: [
      {
        id: "ARCHITECTURE",
        title: "Architecture",
        summary: "Bank sync → categorize → safe-to-spend → coach.",
        items: ["Plaid connect", "Categorization", "Rules engine", "Coach agent"],
      },
      {
        id: "AI",
        title: "AI",
        summary: "Habit-aware coaching over structured finance state.",
        items: ["Category ML", "Anomaly flags", "RAG coach", "Goal guidance"],
      },
      {
        id: "DATA",
        title: "Data",
        summary: "Transactions, budgets, goals—never bank credentials.",
        items: ["Transactions", "Categories", "Subscriptions", "Goal state"],
      },
      {
        id: "RELIABILITY",
        title: "Reliability",
        summary: "Privacy-first, non-custodial financial coaching.",
        items: ["No money movement", "Encryption", "Unlink anytime", "Paid = customer not product"],
      },
    ],
    media: [
      {
        type: "interface",
        src: "/matefi.png",
        alt: "MateFi homepage for an AI financial coach with safe-to-spend guidance.",
        caption: "AI coach for everyday spending decisions",
      },
    ],
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
    media: [
      {
        type: "interface",
        src: "/IMG_3080.png",
        alt: "MoverGPT no-code AI chatbot platform admin dashboard and conversation interface.",
        caption: "No-code AI chatbot platform",
      },
    ],
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
  {
    slug: "forecasting-engine",
    name: "Retail Forecasting Engine",
    shortName: "Forecasting",
    categories: ["ML Systems", "Data Systems"],
    domains: ["Retail"],
    status: "prototype",
    featured: false,
    caseStudy: false,
    visualGrammar: "data-transformation",
    period: "2024–2025",
    headline: "Retail sales forecasting with promotion and stockout intelligence.",
    summary:
      "Machine-learning and time-series forecasting system for retail sales prediction, promotional impact analysis, and stockout risk—built on FreshRetailNet-50K with a FastAPI surface and Supabase/PostgreSQL storage.",
    problem:
      "Retail teams need store–product forecasts that also explain promotional lift and stockout risk, not only a single demand number.",
    solution:
      "A forecasting API over city/store/product combinations with dedicated endpoints for promotional impact and stockout risk, backed by ML models and a structured retail dataset pipeline.",
    role: "ML / Backend Engineering",
    responsibilities: ["ML Systems", "Backend Engineering", "Data Engineering"],
    liveUrl: null,
    github: "https://github.com/talhazaindev/Forecasting-engine",
    metrics: [
      { value: "3", label: "Forecast APIs", context: "Sales · promotions · stockout" },
    ],
    outcomes: [
      "Sales forecast API by city, store, and product.",
      "Promotional impact analysis for store–product pairs.",
      "Stockout risk scoring from historical retail signal patterns.",
    ],
    technologies: [
      "Python",
      "FastAPI",
      "Time Series ML",
      "PostgreSQL",
      "Supabase",
      "Hugging Face",
      "FreshRetailNet-50K",
    ],
    media: [],
  },
  {
    slug: "bioinformatics-ai",
    name: "AI Bioinformatics Platform",
    shortName: "Genomics AI",
    categories: ["ML Systems", "Data Systems"],
    domains: ["Healthcare"],
    status: "prototype",
    featured: false,
    caseStudy: false,
    visualGrammar: "generic",
    period: "2024–2025",
    headline: "Genomic analysis, drug discovery, and literature mining in one platform.",
    summary:
      "AI-powered bioinformatics platform for genomic variant interpretation, drug-response prediction, biomarker discovery, molecule generation, and NLP literature mining across gene–disease and drug–target relationships.",
    problem:
      "Genomics research workflows span heterogeneous datasets and models—variant scoring, drug response, biomarkers, and literature—without a unified analysis platform.",
    solution:
      "Modular FastAPI + React platform with ML services (PyTorch/TensorFlow/Transformers), Snakemake preprocessing, MinIO dataset storage, and Redis-backed services for research collaboration.",
    role: "AI / Platform Engineering",
    responsibilities: ["AI Architecture", "ML Systems", "Backend Engineering", "Data Pipelines"],
    liveUrl: null,
    github: "https://github.com/talhazaindev/Bioinformatics-with-ai",
    metrics: [
      { value: "8", label: "Core AI modules" },
    ],
    outcomes: [
      "DL pathogenicity prediction and clinical variant prioritization.",
      "Multi-modal drug-response and biomarker discovery workflows.",
      "Literature mining for gene–disease and drug–target extraction.",
    ],
    technologies: [
      "Python",
      "FastAPI",
      "React",
      "TypeScript",
      "PyTorch",
      "TensorFlow",
      "Hugging Face",
      "PostgreSQL",
      "Supabase",
      "MinIO",
      "Snakemake",
      "Redis",
      "Docker",
    ],
    media: [],
  },
  {
    slug: "recruiter-ai",
    name: "Recruiter AI",
    shortName: "Recruiter",
    categories: ["Agentic AI", "Generative AI"],
    domains: ["Other"],
    status: "prototype",
    featured: false,
    caseStudy: false,
    visualGrammar: "agent-state-graph",
    period: "2025",
    headline: "AI recruitment with voice agents for initial screening.",
    summary:
      "AI-powered recruitment platform that uses voice agents to run initial screening calls—capturing candidate intent, structuring responses, and accelerating early-funnel evaluation before human interviewers engage.",
    problem:
      "Early recruitment screening is manual, inconsistent, and slow to schedule—especially for high-volume roles.",
    solution:
      "Voice-agent screening workflows that conduct structured first-pass interviews, summarize outcomes, and hand off qualified candidates into the hiring pipeline.",
    role: "AI Engineering",
    responsibilities: ["Agentic AI", "Voice Agents", "Backend Engineering", "Integration"],
    liveUrl: null,
    github: "https://github.com/talhazaindev/recruiter-ai",
    metrics: [],
    outcomes: [
      "Automated initial screening calls via conversational voice agents.",
      "Structured candidate signals captured before human review.",
    ],
    technologies: ["Voice Agents", "LLM Systems", "Agentic Workflows", "APIs"],
    media: [],
  },
  {
    slug: "legal-data-fusion",
    name: "Legal Data Fusion",
    shortName: "Legal Fusion",
    categories: ["Agentic AI", "Data Systems"],
    domains: ["Other"],
    status: "prototype",
    featured: false,
    caseStudy: false,
    visualGrammar: "data-transformation",
    period: "2025",
    headline: "Heterogeneous legal datasets consolidated into Golden Schemas.",
    summary:
      "End-to-end pipeline for normalizing, discovering, and consolidating heterogeneous legal datasets into unified Golden Schemas—using agentic LLM workflows for semantic understanding and conflict resolution across disparate sources.",
    problem:
      "Legal datasets arrive in incompatible schemas with overlapping entities and unresolved conflicts, blocking reliable downstream analytics and search.",
    solution:
      "Agentic LLM workflows that discover structure, map semantics, resolve conflicts, and consolidate sources into stable Golden Schemas for unified legal data use.",
    role: "AI / Data Systems Engineering",
    responsibilities: ["Agentic AI", "Data Architecture", "LLM Systems", "Pipeline Engineering"],
    liveUrl: null,
    github: "https://github.com/talhazaindev/Legal-Data-Fusion",
    metrics: [],
    outcomes: [
      "Normalized discovery and consolidation across heterogeneous legal sources.",
      "Conflict-aware semantic mapping into unified Golden Schemas.",
    ],
    technologies: [
      "Agentic LLM Workflows",
      "Semantic Mapping",
      "Data Normalization",
      "Python",
      "Schema Consolidation",
    ],
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

/** First product visual for list/cover treatments, if present. */
export function getProjectCover(project: Project): Project["media"][number] | undefined {
  return project.media[0];
}

/** Homepage production signals derived from real project metrics. */
export const productionSignals = [
  {
    value: "30+",
    label: "Image Models",
    projectSlug: "ai-compare-hub",
  },
  {
    value: "HITL",
    label: "Human Approval Gates",
    projectSlug: "medicai",
  },
  {
    value: "290+",
    label: "UAE POI Categories",
    projectSlug: "mediax",
  },
  {
    value: "1.5M",
    label: "Renters Verified / Year",
    projectSlug: "verifast",
  },
  {
    value: "MCP",
    label: "Agent-Addressable Memory",
    projectSlug: "mythos",
  },
  {
    value: "Safe-to-spend",
    label: "AI Finance Coach",
    projectSlug: "matefi",
  },
  {
    value: "3D",
    label: "Motion Capture Coaching",
    projectSlug: "uplift",
  },
] as const;
