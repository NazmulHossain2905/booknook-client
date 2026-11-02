"use client";

import { BookCover } from "@/components/shared/book-cover";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { formatDate } from "@/lib/format";
import { BorrowRecord } from "@/types";
import { Loader2, RotateCcw } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface ReturnDialogProps {
  record: BorrowRecord | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/** Confirmation before returning a borrowed book. */
export function ReturnDialog({
  record,
  open,
  onOpenChange,
}: ReturnDialogProps) {
  const [returning, setReturning] = useState(false);

  const onReturn = async () => {
    if (!record) return;
    setReturning(true);
    try {
      // await returnBook(record.id);
      // toast.success("Returned — thank you!", {
      //   description: `“${record.bookTitle}” is back on the shelf for the next reader.`,
      // });
      onOpenChange(false);
    } catch {
      toast.error("Could not return the book", {
        description: "Please try again in a moment.",
      });
    } finally {
      setReturning(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => !returning && onOpenChange(next)}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">
            Return this book?
          </DialogTitle>
          <DialogDescription>
            The copy goes straight back onto the shelf and becomes available to
            other readers immediately.
          </DialogDescription>
        </DialogHeader>

        {record && (
          <div className="bg-secondary/50 flex items-center gap-4 rounded-xl border p-4">
            <div className="w-14 shrink-0">
              <BookCover
                src={record.bookImage}
                alt={`Cover of “${record.bookTitle}”`}
                className="rounded-md shadow-sm"
              />
            </div>
            <div className="min-w-0">
              <p className="font-display text-lg leading-snug font-semibold">
                {record.bookTitle}
              </p>
              <p className="text-muted-foreground mt-0.5 text-sm">
                by {record.bookAuthor}
              </p>
              <p className="text-muted-foreground mt-1.5 text-xs">
                Borrowed {formatDate(record.borrowDate)} · due{" "}
                {formatDate(record.returnDate)}
              </p>
            </div>
          </div>
        )}

        <DialogFooter className="mt-2 gap-2 sm:gap-0">
          <Button
            variant="ghost"
            onClick={() => onOpenChange(false)}
            disabled={returning}
          >
            Keep reading
          </Button>
          <Button onClick={onReturn} disabled={returning}>
            {returning ? (
              <>
                <Loader2 aria-hidden className="size-4 animate-spin" />
                Returning…
              </>
            ) : (
              <>
                <RotateCcw aria-hidden className="size-4" />
                Return Book
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
