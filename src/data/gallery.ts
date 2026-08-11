/**
 * Homepage visual gallery — product UI mockups and interface captures.
 * Content lives here so the gallery component stays presentational.
 */

export type GalleryItem = {
  id: string;
  src: string;
  alt: string;
  title: string;
  subtitle: string;
  href?: string;
};

export const galleryItems: GalleryItem[] = [
  {
    id: "ai-compare-hub",
    src: "/ai-compare-hub.png",
    alt: "AI Compare Hub recent generations dashboard with multimodal model outputs and asset history.",
    title: "AI Compare Hub",
    subtitle: "Unified multimodal generation workspace",
    href: "/work/ai-compare-hub",
  },
  {
    id: "mediax",
    src: "/mediax.png",
    alt: "MediaX map interface for finding optimal outdoor media spaces across the UAE.",
    title: "MediaX",
    subtitle: "Geospatial OOH media discovery",
    href: "/work/mediax",
  },
  {
    id: "ecg-data-unification",
    src: "/ecg-unification.png",
    alt: "ECG Data Unification enterprise architecture spanning context engine, platform, and delivery skills.",
    title: "ECG Data Unification",
    subtitle: "Clinical signal fusion into one trusted dataset",
    href: "/work/ecg-intelligence",
  },
  {
    id: "medic-ai",
    src: "/medic-ai.png",
    alt: "MedicAI clinical operations dashboard with AI agents, appointments, and hospital analytics.",
    title: "MedicAI",
    subtitle: "Clinical agents & hospital operations",
    href: "/work/medicai",
  },
  {
    id: "demandpulse-ai",
    src: encodeURI("/DemandPulse AI.png"),
    alt: "DemandPulse AI dashboard showing sales forecasts, inventory planning, and field metrics across desktop and tablet.",
    title: "DemandPulse AI",
    subtitle: "Sales forecast & inventory planning",
  },
  {
    id: "trust-is-must",
    src: "/IMG_3009.png",
    alt: "Trust Is Must ecommerce tool that verifies product reviews before purchase decisions.",
    title: "Trust Is Must",
    subtitle: "Verify reviews before you buy",
  },
  {
    id: "movergpt",
    src: "/IMG_3080.png",
    alt: "MoverGPT no-code AI chatbot platform admin dashboard and conversation interface.",
    title: "MoverGPT",
    subtitle: "No-code AI chatbot platform",
    href: "/work",
  },
];
