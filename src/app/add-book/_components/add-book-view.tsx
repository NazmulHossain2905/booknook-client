"use client";

import { BookForm } from "@/components/books/book-form";
import { LivePreview } from "@/components/books/live-preview";
import { ReadOnlyMemberFields } from "@/components/books/read-only-member";
import { Container } from "@/components/shared/container";
import { demoUser } from "@/data";
import { usePageTitle } from "@/hooks/use-page-title";
import type { BookFormValues } from "@/schemas/book.schema";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { toast } from "sonner";

function AddBookContent() {
  usePageTitle("Add Book");
  const user = demoUser;

  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const [previewValues, setPreviewValues] = useState<BookFormValues>();

  const handleWatchValues = useCallback((values: BookFormValues) => {
    setPreviewValues(values);
  }, []);

  const onSubmit = async (values: BookFormValues) => {
    setSubmitting(true);
    try {
      // const book = await addBook({
      //   title: values.title,
      //   author: values.author,
      //   category: values.category,
      //   image: values.image,
      //   description: values.description,
      //   totalCopies: values.totalCopies,
      // });
      // toast.success("Added to the library", {
      //   description: `“${book.title}” is now on the ${book.category} shelf, ready for borrowers.`,
      // });
      router.push("/books");
    } catch {
      toast.error("Something went wrong", {
        description: "The book wasn't added. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container size="wide" className="py-10 sm:py-14">
      <header className="max-w-2xl">
        <p className="eyebrow">Grow the collection</p>
        <h1 className="font-display mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
          Add a Book
        </h1>
        <p className="text-muted-foreground mt-4 text-base leading-relaxed">
          Share a title from your own shelves. It takes under a minute — and
          someone in the nook has been waiting for it, we promise.
        </p>
      </header>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
        {/* Form */}
        <section aria-label="Add book form">
          {user && (
            <div className="bg-card rounded-2xl border p-6 shadow-sm sm:p-8">
              <BookForm
                submitLabel="Add Book"
                submitting={submitting}
                onWatchValues={handleWatchValues}
                onSubmit={onSubmit}
                footer={<ReadOnlyMemberFields user={user} />}
              />
            </div>
          )}
        </section>

        {/* Live preview */}
        <LivePreview preview={previewValues!} />
      </div>
    </Container>
  );
}

export default function AddBookView() {
  return <AddBookContent />;
}
