import { BookCover } from "@/components/shared/book-cover";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { daysUntil, dueLabel, formatDate } from "@/lib/format";
import { BorrowRecord } from "@/types";
import { cn } from "cn";
import { RotateCcw } from "lucide-react";
import { StatusBadge } from "./status-badge";

export function BorrowRow({
  record,
  onReturn,
}: {
  record: BorrowRecord;
  onReturn: (record: BorrowRecord) => void;
}) {
  return (
    <TableRow>
      <TableCell className="pl-6">
        <div className="flex items-center gap-4 py-2">
          <div className="w-10 shrink-0 overflow-hidden rounded-md shadow-sm">
            <BookCover
              src={record.bookImage}
              alt={`Cover of “${record.bookTitle}”`}
              className="rounded-md"
            />
          </div>
          <div className="min-w-0">
            <p className="font-display text-[15px] leading-snug font-semibold">
              {record.bookTitle}
            </p>
            <p className="text-muted-foreground mt-0.5 truncate text-sm">
              by {record.bookAuthor}
            </p>
          </div>
        </div>
      </TableCell>
      <TableCell className="text-muted-foreground text-sm whitespace-nowrap">
        {formatDate(record.borrowDate)}
      </TableCell>
      <TableCell className="whitespace-nowrap">
        <p className="text-sm">{formatDate(record.returnDate)}</p>
        {record.status === "borrowed" && (
          <p
            className={cn(
              "mt-0.5 text-xs",
              daysUntil(record.returnDate) < 0
                ? "text-destructive"
                : "text-muted-foreground",
            )}
          >
            {dueLabel(record.returnDate)}
          </p>
        )}
        {record.status === "returned" && record.returnedAt && (
          <p className="text-muted-foreground mt-0.5 text-xs">
            Returned {formatDate(record.returnedAt)}
          </p>
        )}
      </TableCell>
      <TableCell>
        <StatusBadge record={record} />
      </TableCell>
      <TableCell className="pr-6 text-right">
        {record.status === "borrowed" ? (
          <Button variant="outline" size="sm" onClick={() => onReturn(record)}>
            <RotateCcw aria-hidden className="size-3.5" />
            Return Book
          </Button>
        ) : (
          <span className="text-muted-foreground text-xs">—</span>
        )}
      </TableCell>
    </TableRow>
  );
}
