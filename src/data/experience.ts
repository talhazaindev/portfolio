import type { ExperienceRole } from "@/types/content";

/** Engineering trajectory — increasing system ownership over time. */
export const experience: ExperienceRole[] = [
  {
    company: "BoolMind",
    location: "Lahore",
    period: "Jul 2025 — Present",
    role: "ML Engineer — Applied / Generative AI",
    current: true,
    themes: [
      "Production AI",
      "Recommendation systems",
      "Semantic / geospatial search",
      "LangGraph",
      "RAG",
      "AI evaluation",
      "Production APIs",
      "Cloud deployment",
    ],
    impact:
      "Architected an LLM-powered semantic advertising recommendation engine translating campaign requirements into structured geo-intent and ranking OOH inventory across 290+ UAE categories.",
  },
  {
    company: "IT Genics",
    location: "Lahore",
    period: "Jan 2024 — Jun 2025",
    role: "Associate AI Engineer",
    themes: [
      "No-code conversational AI",
      "LLM workflows",
      "Voice AI",
      "Llama",
      "NLP",
      "Twilio",
      "Predictive analytics",
      "Computer vision",
      "Production APIs",
      "Containerized deployment",
    ],
    impact:
      "Built no-code conversational and voice AI workflows integrating Llama, NLP pipelines, Twilio, and business actions—packaged behind production APIs and containerized services.",
  },
  {
    company: "IT Solutions World Wide",
    location: "Islamabad",
    period: "Jul 2023 — Dec 2023",
    role: "Junior AI Engineer",
    themes: [
      "GPT",
      "Llama",
      "BERT",
      "Falcon",
      "Transfer learning",
      "Fine-tuning",
      "TensorFlow",
      "PyTorch",
      "NLP pipelines",
    ],
    impact:
      "Built NLP applications with GPT-3, Llama, BERT, and Falcon, applying transfer learning and fine-tuning to move experiments into reusable services.",
  },
];
