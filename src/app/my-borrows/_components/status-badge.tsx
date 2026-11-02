import { daysUntil } from "@/lib/format";
import { BorrowRecord } from "@/types";
import { cn } from "cn";
import { Hourglass, RotateCcw } from "lucide-react";

export function StatusBadge({ record }: { record: BorrowRecord }) {
  if (record.status === "returned") {
    return (
      <span className="bg-secondary text-muted-foreground inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold">
        <RotateCcw aria-hidden className="size-3" />
        Returned
      </span>
    );
  }
  const overdue = daysUntil(record.returnDate) < 0;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold",
        overdue
          ? "bg-destructive/10 text-destructive"
          : "bg-primary/10 text-primary",
      )}
    >
      <Hourglass aria-hidden className="size-3" />
      {overdue ? "Overdue" : "Borrowed"}
    </span>
  );
}
