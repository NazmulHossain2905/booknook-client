"use client";

import { BookForm } from "@/components/books/book-form";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { BookFormValues } from "@/schemas/book.schema";
import { Book } from "@/types";
import { useState } from "react";
import { toast } from "sonner";

interface EditBookSheetProps {
  book: Book | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/** Side drawer for editing a book you added. */
export function EditBookSheet({
  book,
  open,
  onOpenChange,
}: EditBookSheetProps) {
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (values: BookFormValues) => {
    if (!book) return;
    setSubmitting(true);
    try {
      // await updateBook(book.id, {
      //   title: values.title,
      //   author: values.author,
      //   category: values.category,
      //   image: values.image,
      //   description: values.description,
      //   totalCopies: values.totalCopies,
      // });
      // toast.success("Book updated", {
      //   description: `“${values.title}” now reflects your changes on the shelves.`,
      // });
      onOpenChange(false);
    } catch {
      toast.error("Could not save changes", {
        description: "Please try again in a moment.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Sheet
      open={open}
      onOpenChange={(next) => !submitting && onOpenChange(next)}
    >
      <SheetContent
        side="right"
        className="flex w-full scrollbar-thin flex-col gap-0 overflow-y-auto p-0 sm:max-w-lg"
      >
        <SheetHeader className="border-border/70 border-b p-6">
          <SheetTitle className="font-display text-2xl">Edit book</SheetTitle>
          <SheetDescription>
            Update the details — the shelf reorganizes itself the moment you
            save.
          </SheetDescription>
        </SheetHeader>
        <div className="p-6">
          {book && (
            <BookForm
              key={book.id + String(open)}
              defaultValues={{
                title: book.title,
                author: book.author,
                category: book.category,
                image: book.image,
                description: book.description,
                totalCopies: book.totalCopies,
              }}
              submitLabel="Save Changes"
              submitting={submitting}
              onSubmit={onSubmit}
            />
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
