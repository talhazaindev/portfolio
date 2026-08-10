"use client";

import Link from "next/link";
import { track } from "@/lib/analytics";

type TrackLinkProps = {
  href: string;
  event: string;
  payload?: Record<string, string | number | boolean | undefined>;
  className?: string;
  children: React.ReactNode;
  external?: boolean;
};

/** Link wrapper that emits an analytics event on click. */
export function TrackLink({
  href,
  event,
  payload,
  className,
  children,
  external,
}: TrackLinkProps) {
  const isExternal = external ?? /^https?:\/\//.test(href);

  return (
    <Link
      href={href}
      className={className}
      onClick={() => track(event, payload)}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </Link>
  );
}
