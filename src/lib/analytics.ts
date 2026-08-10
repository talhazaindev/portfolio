/**
 * Privacy-conscious analytics helpers.
 * Isolates provider usage so tracking can be swapped without touching UI.
 */

type AnalyticsPayload = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    va?: (event: "event", name: string, data?: AnalyticsPayload) => void;
  }
}

/** Track a named product event without sending PII. */
export function track(event: string, payload?: AnalyticsPayload): void {
  if (typeof window === "undefined") return;

  try {
    window.va?.("event", event, payload);
  } catch {
    // Analytics must never break UX.
  }

  if (process.env.NODE_ENV === "development") {
    console.debug("[analytics]", event, payload ?? {});
  }
}

export const AnalyticsEvents = {
  caseStudyView: "case_study_view",
  liveProductClick: "live_product_click",
  githubClick: "github_click",
  linkedinClick: "linkedin_click",
  resumeClick: "resume_click",
  contactClick: "contact_click",
  emailClick: "email_click",
} as const;
