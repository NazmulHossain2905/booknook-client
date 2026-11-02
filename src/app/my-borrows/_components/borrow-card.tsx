import { BookCover } from "@/components/shared/book-cover";
import { Button } from "@/components/ui/button";
import { daysUntil, dueLabel, formatDate } from "@/lib/format";
import { BorrowRecord } from "@/types";
import { cn } from "cn";
import { RotateCcw } from "lucide-react";
import { StatusBadge } from "./status-badge";

export function BorrowCard({
  record,
  onReturn,
}: {
  record: BorrowRecord;
  onReturn: (record: BorrowRecord) => void;
}) {
  return (
    <article className="bg-card rounded-2xl border p-4 shadow-sm">
      <div className="flex gap-4">
        <div className="w-16 shrink-0 overflow-hidden rounded-md shadow-sm">
          <BookCover
            src={record.bookImage}
            alt={`Cover of “${record.bookTitle}”`}
            className="rounded-md"
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-display text-base leading-snug font-semibold">
            {record.bookTitle}
          </p>
          <p className="text-muted-foreground mt-0.5 text-sm">
            by {record.bookAuthor}
          </p>
          <div className="text-muted-foreground mt-2.5 grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs">
            <p>
              <span className="text-foreground font-medium">Borrowed:</span>{" "}
              {formatDate(record.borrowDate)}
            </p>
            <p>
              <span className="text-foreground font-medium">Due:</span>{" "}
              {formatDate(record.returnDate)}
            </p>
          </div>
          {record.status === "borrowed" && (
            <p
              className={cn(
                "mt-1.5 text-xs",
                daysUntil(record.returnDate) < 0
                  ? "text-destructive font-medium"
                  : "text-muted-foreground",
              )}
            >
              {dueLabel(record.returnDate)}
            </p>
          )}
        </div>
        <div className="flex flex-col items-end justify-between gap-2">
          <StatusBadge record={record} />
          {record.status === "borrowed" && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onReturn(record)}
            >
              <RotateCcw aria-hidden className="size-3.5" />
              Return
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}
