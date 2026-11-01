import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "default" | "wide" | "narrow";
}

/** Consistent page gutter + max width used across the whole app. */
export function Container({
  size = "default",
  className,
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        size === "wide" && "max-w-7xl",
        size === "default" && "max-w-6xl",
        size === "narrow" && "max-w-3xl",
        className,
      )}
      {...props}
    />
  );
}
