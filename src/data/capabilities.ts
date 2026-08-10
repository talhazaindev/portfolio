import type { CapabilityDomain } from "@/types/content";

/** Capability domains ordered by brand specialization hierarchy. */
export const capabilities: CapabilityDomain[] = [
  {
    id: "agentic",
    number: "01",
    title: "Agentic Systems",
    description: "Orchestrated multi-agent workflows with state, tools, and human gates.",
    primary: true,
    items: [
      "LangGraph",
      "LangChain",
      "Multi-Agent Systems",
      "Agentic RAG",
      "Tool Calling",
      "Human-in-the-Loop",
      "Structured Outputs",
    ],
  },
  {
    id: "llm",
    number: "02",
    title: "LLM Infrastructure",
    description: "Model access, retrieval, evaluation, and observability for production LLM systems.",
    primary: true,
    items: [
      "OpenAI",
      "Claude",
      "Llama",
      "Hugging Face",
      "Embeddings",
      "Retrieval",
      "RAGAS",
      "LangSmith",
      "Observability",
    ],
  },
  {
    id: "ml",
    number: "03",
    title: "Machine Learning",
    description: "Classical and deep learning for prediction, language, and vision workloads.",
    items: [
      "PyTorch",
      "TensorFlow",
      "Scikit-learn",
      "XGBoost",
      "LightGBM",
      "NLP",
      "Computer Vision",
      "Forecasting",
      "Classification",
      "Regression",
      "Clustering",
    ],
  },
  {
    id: "production",
    number: "04",
    title: "Production Engineering",
    description: "APIs, data stores, async systems, and cloud deployment for AI products.",
    primary: true,
    items: [
      "Python",
      "FastAPI",
      "REST",
      "Async Systems",
      "PostgreSQL",
      "pgvector",
      "Redis",
      "MongoDB",
      "Docker",
      "CI/CD",
      "AWS",
      "GCP",
      "Azure",
      "ETL",
    ],
  },
];

export const capabilityGraphBranches = [
  {
    id: "agentic",
    label: "Agentic Systems",
    technologies: ["LangGraph", "Multi-Agent", "Tool Calling", "HITL"],
  },
  {
    id: "retrieval",
    label: "Retrieval",
    technologies: ["RAG", "pgvector", "Embeddings", "Semantic Search"],
  },
  {
    id: "models",
    label: "Models",
    technologies: ["OpenAI", "Claude", "Llama", "Multimodal"],
  },
  {
    id: "data",
    label: "Data",
    technologies: ["PostgreSQL", "Redis", "ETL", "Canonical Schema"],
  },
  {
    id: "infra",
    label: "Infrastructure",
    technologies: ["FastAPI", "Docker", "Async Queues", "Cloud"],
  },
  {
    id: "eval",
    label: "Evaluation",
    technologies: ["RAGAS", "LangSmith", "Latency", "Quality"],
  },
  {
    id: "deploy",
    label: "Deployment",
    technologies: ["CI/CD", "AWS", "GCP", "Azure"],
  },
] as const;

export const buildPipeline = [
  {
    step: "01",
    title: "Understand",
    detail: "Business problem / constraints",
  },
  {
    step: "02",
    title: "Design",
    detail: "Architecture / data / tools",
  },
  {
    step: "03",
    title: "Orchestrate",
    detail: "Models / agents / retrieval",
  },
  {
    step: "04",
    title: "Evaluate",
    detail: "Quality / latency / reliability",
  },
  {
    step: "05",
    title: "Ship",
    detail: "APIs / containers / cloud",
  },
  {
    step: "06",
    title: "Observe",
    detail: "Tracing / monitoring / iteration",
  },
] as const;
