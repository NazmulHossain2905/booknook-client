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
import { BASE_URL } from "@/constants";
import { formatDate } from "@/lib/format";
import { getClientToken } from "@/lib/getClientToken";
import { BorrowRecord } from "@/types";
import { Loader2, RotateCcw } from "lucide-react";
import { useRouter } from "next/navigation";
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
  const router = useRouter();

  const onReturn = async () => {
    if (!record) return;
    setReturning(true);
    try {
      const token = await getClientToken();

      if (!token) {
        toast.error("Your session has expired", {
          description: "Please sign in again to return this book.",
        });
        return;
      }

      const res = await fetch(`${BASE_URL}/borrows/${record._id}`, {
        method: "PATCH",
        headers: { authorization: token },
      });

      const result = await res.json().catch(() => null);

      if (!res.ok || !result?.success) {
        toast.error(result?.message ?? "Could not return the book", {
          description: "Please try again in a moment.",
        });
        return;
      }

      toast.success("Returned — thank you!", {
        description: `“${record.bookTitle}” is back on the shelf for the next reader.`,
      });

      router.refresh();

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

        <DialogFooter className="mt-2 gap-2">
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
