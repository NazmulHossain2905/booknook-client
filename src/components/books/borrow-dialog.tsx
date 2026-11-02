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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { demoUser } from "@/data";
import { formatDate } from "@/lib/format";
import { Book } from "@/types";
import { CalendarDays, Loader2 } from "lucide-react";
import { useMemo, useState } from "react";

interface BorrowDialogProps {
  book: Book;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const LOAN_DAYS = 14;

export function BorrowDialog({ book, open, onOpenChange }: BorrowDialogProps) {
  const user = demoUser;
  const [submitting, setSubmitting] = useState(false);

  const dueDate = useMemo(() => {
    const now = new Date();
    return formatDate(
      new Date(now.getTime() + LOAN_DAYS * 24 * 60 * 60 * 1000).toISOString(),
    );
  }, [open]);

  const onConfirm = async () => {
    setSubmitting(true);
    // try {
    //   const result = await borrowBook(book);
    //   if (result.ok) {
    //     toast.success("Borrowed!", {
    //       description: `“${book.title}” is yours until ${dueDate}. Happy reading!`,
    //     });
    //     onOpenChange(false);
    //   } else {
    //     toast.error("Could not borrow this book", {
    //       description: result.message ?? "Please try again in a moment.",
    //     });
    //   }
    // } finally {
    //   setSubmitting(false);
    // }
  };

  if (!user) return null;

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => !submitting && onOpenChange(next)}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">
            Confirm your borrow
          </DialogTitle>
          <DialogDescription>
            You're about to check this title out of the library for {LOAN_DAYS}{" "}
            days.
          </DialogDescription>
        </DialogHeader>

        <div className="bg-secondary/50 flex gap-4 rounded-xl border p-4">
          <div className="w-16 shrink-0">
            <BookCover
              src={book.image}
              alt={`Cover of “${book.title}”`}
              className="rounded-md shadow-sm"
            />
          </div>
          <div className="min-w-0">
            <p className="font-display text-lg leading-snug font-semibold">
              {book.title}
            </p>
            <p className="text-muted-foreground mt-0.5 text-sm">
              by {book.author}
            </p>
            <p className="text-muted-foreground mt-2 flex items-center gap-1.5 text-xs">
              <CalendarDays aria-hidden className="text-gold size-3.5" />
              Return by {dueDate}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="borrow-name">Your name</Label>
            <Input
              id="borrow-name"
              value={user.name}
              readOnly
              className="bg-muted/60"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="borrow-email">Your email</Label>
            <Input
              id="borrow-email"
              value={user.email}
              readOnly
              className="bg-muted/60"
            />
          </div>
        </div>

        <DialogFooter className="mt-2 gap-2 sm:gap-0">
          <Button
            variant="ghost"
            onClick={() => onOpenChange(false)}
            disabled={submitting}
          >
            Cancel
          </Button>
          <Button onClick={onConfirm} disabled={submitting}>
            {submitting ? (
              <>
                <Loader2 aria-hidden className="size-4 animate-spin" />
                Reserving your copy…
              </>
            ) : (
              "Confirm Borrow"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
