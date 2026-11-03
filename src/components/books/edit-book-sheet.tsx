"use client";

import { BookForm } from "@/components/books/book-form";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { BASE_URL } from "@/constants";
import { getClientToken } from "@/lib/getClientToken";
import { BookFormValues } from "@/schemas/book.schema";
import { Book } from "@/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface EditBookSheetProps {
  book: Book | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditBookSheet({
  book,
  open,
  onOpenChange,
}: EditBookSheetProps) {
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const onSubmit = async (values: BookFormValues) => {
    if (!book) return;

    setSubmitting(true);

    try {
      const updatedBook = {
        title: values.title,
        author: values.author,
        category: values.category,
        image: values.image,
        description: values.description,
        totalCopies: values.totalCopies,
      };

      const token = await getClientToken();

      const res = await fetch(`${BASE_URL}/books/${book._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", authorization: token },
        body: JSON.stringify(updatedBook),
      });

      const result = await res.json();

      if (result.success) {
        toast.success("Book updated", {
          description: `“${values.title}” now reflects your changes on the shelves.`,
        });
      } else {
        toast.error(result.message, {
          description: "The book wasn't added. Please try again.",
        });
      }

      router.refresh();
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
              key={book._id + String(open)}
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
