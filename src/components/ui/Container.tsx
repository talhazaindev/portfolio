import { cn } from "@/lib/cn";

type ContainerWidth = "medium" | "wide" | "extra-wide" | "full";

const WIDTH: Record<ContainerWidth, string> = {
  medium: "max-w-5xl",
  wide: "max-w-6xl",
  "extra-wide": "max-w-7xl",
  full: "max-w-[90rem]",
};

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section" | "article";
  id?: string;
  /** Page-width rhythm — default remains wide (max-w-6xl) */
  width?: ContainerWidth;
};

/** Responsive content width with intentional horizontal padding. */
export function Container({
  children,
  className,
  as: Tag = "div",
  id,
  width = "wide",
}: ContainerProps) {
  return (
    <Tag
      id={id}
      className={cn("mx-auto w-full px-5 sm:px-6 lg:px-8", WIDTH[width], className)}
    >
      {children}
    </Tag>
  );
}
