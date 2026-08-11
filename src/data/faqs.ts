/**
 * Homepage FAQ copy — collaboration and services clarity.
 */

export type FaqItem = {
  question: string;
  answer: string;
};

export const faqs: FaqItem[] = [
  {
    question: "What type of services do you provide?",
    answer:
      "I design and build production AI systems—agentic workflows, LLM applications, RAG pipelines, multimodal generation platforms, and the backend, evaluation, and deployment layers that make them reliable. Engagements usually center on architecture, implementation, and shipping—not slide decks.",
  },
  {
    question: "Do you focus on prototypes or production systems?",
    answer:
      "Production. That means orchestration, retrieval quality, APIs, observability, evaluation, and deployment paths that hold up under real use. I can start from a prototype when needed, but the goal is a system you can operate.",
  },
  {
    question: "What kinds of problems are a good fit?",
    answer:
      "Multi-agent clinical or product workflows, LLM systems that need grounding and evaluation, semantic search and retrieval, multimodal comparison platforms, and clinical or operational data pipelines that must become ML-ready. Hard, system-shaped problems—not one-off notebook models.",
  },
  {
    question: "How do engagements usually work?",
    answer:
      "Most work starts with clarifying the system boundary, constraints, and success metrics, then moves into architecture and iterative implementation. I collaborate with founders, product teams, and engineering leads—either leading the AI architecture or embedding alongside an existing team.",
  },
  {
    question: "Can you work with an existing codebase and stack?",
    answer:
      "Yes. I regularly integrate with FastAPI backends, LangGraph-style orchestration, vector retrieval, cloud deployment, and product UIs already in flight. The preference is to strengthen what you have rather than rewrite for its own sake.",
  },
  {
    question: "How should I start a conversation?",
    answer:
      "Email with context on the problem, timeline, and what “done” looks like. If it’s a fit, we’ll scope the architecture and next steps from there.",
  },
];
