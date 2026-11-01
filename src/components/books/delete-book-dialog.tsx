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
import { Book } from "@/types";
import { Loader2, Trash2 } from "lucide-react";
import * as React from "react";
import { toast } from "sonner";

interface DeleteBookDialogProps {
  book: Book | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DeleteBookDialog({
  book,
  open,
  onOpenChange,
}: DeleteBookDialogProps) {
  const [deleting, setDeleting] = React.useState(false);

  const onDelete = async () => {
    if (!book) return;
    setDeleting(true);
    try {
      // await deleteBook(book.id);
      // toast.success("Book removed", {
      //   description: `“${book.title}” has been taken off the shelves.`,
      // });
      onOpenChange(false);
    } catch {
      toast.error("Could not remove the book", {
        description: "Please try again in a moment.",
      });
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => !deleting && onOpenChange(next)}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">
            Remove this book?
          </DialogTitle>
          <DialogDescription>
            It will disappear from the library for every reader, along with its
            borrow history. This can't be undone.
          </DialogDescription>
        </DialogHeader>

        {book && (
          <div className="bg-secondary/50 flex items-center gap-4 rounded-xl border p-4">
            <div className="w-14 shrink-0">
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
            </div>
          </div>
        )}

        <DialogFooter className="mt-2 gap-2 sm:gap-0">
          <Button
            variant="ghost"
            onClick={() => onOpenChange(false)}
            disabled={deleting}
          >
            Keep it on the shelf
          </Button>
          <Button variant="destructive" onClick={onDelete} disabled={deleting}>
            {deleting ? (
              <>
                <Loader2 aria-hidden className="size-4 animate-spin" />
                Removing…
              </>
            ) : (
              <>
                <Trash2 aria-hidden className="size-4" />
                Delete Book
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
