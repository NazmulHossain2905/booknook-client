import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

export function AvailabilityBadge({
  available,
  total,
  className,
}: {
  available: number;
  total: number;
  className?: string;
}) {
  const isAvailable = available > 0;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold",
        isAvailable
          ? "bg-primary/10 text-primary dark:bg-primary/15"
          : "bg-destructive/10 text-destructive",
        className,
      )}
    >
      {isAvailable ? (
        <>
          <Check aria-hidden className="size-3" />
          {available} of {total} available
        </>
      ) : (
        <>
          <span aria-hidden className="size-1.5 rounded-full bg-current" />
          Not available
        </>
      )}
    </span>
  );
}
