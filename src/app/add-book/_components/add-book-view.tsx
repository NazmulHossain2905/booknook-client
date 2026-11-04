"use client";

import { BookForm } from "@/components/books/book-form";
import { LivePreview } from "@/components/books/live-preview";
import { ReadOnlyMemberFields } from "@/components/books/read-only-member";
import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { BASE_URL } from "@/constants";
import { usePageTitle } from "@/hooks/use-page-title";
import { useSession } from "@/lib/auth-client";
import { getClientToken } from "@/lib/getClientToken";
import type { BookFormValues } from "@/schemas/book.schema";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { toast } from "sonner";

function AddBookContent() {
  usePageTitle("Add Book");

  const { data: session, isPending } = useSession();
  const user = session?.user;

  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const [previewValues, setPreviewValues] = useState<BookFormValues>();

  const handleWatchValues = useCallback((values: BookFormValues) => {
    setPreviewValues(values);
  }, []);

  const onSubmit = async (values: BookFormValues) => {
    setSubmitting(true);

    try {
      const newBook = {
        title: values.title,
        author: values.author,
        category: values.category,
        image: values.image,
        description: values.description,
        totalCopies: values.totalCopies,
        addedBy: user?.name,
        addedByEmail: user?.email,
      };

      const token = await getClientToken();

      if (!token) {
        toast.error("Your session has expired", {
          description: "Please sign in again to add your book.",
        });
        return;
      }

      const res = await fetch(`${BASE_URL}/books`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
        body: JSON.stringify(newBook),
      });

      const result = await res.json().catch(() => null);

      if (!res.ok || !result?.success) {
        toast.error(result?.message ?? "Could not add the book", {
          description: "The book wasn't added. Please try again.",
        });
        return;
      }

      const created = result.data;
      const shelfTitle = created?.title ?? values.title;
      const shelfCategory = created?.category ?? values.category;

      toast.success("Added to the library", {
        description: `“${shelfTitle}” is now on the ${shelfCategory} shelf, ready for borrowers.`,
      });

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
          {isPending ? (
            <div
              className="bg-card space-y-5 rounded-2xl border p-6 shadow-sm sm:p-8"
              aria-busy="true"
              aria-hidden
            >
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-11 w-full" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-11 w-full" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-11 w-full" />
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-11 w-36 rounded-full" />
            </div>
          ) : user ? (
            <div className="bg-card rounded-2xl border p-6 shadow-sm sm:p-8">
              <BookForm
                submitLabel="Add Book"
                submitting={submitting}
                onWatchValues={handleWatchValues}
                onSubmit={onSubmit}
                footer={<ReadOnlyMemberFields user={user} />}
              />
            </div>
          ) : (
            <div className="bg-card rounded-2xl border p-6 text-center shadow-sm sm:p-8">
              <p className="font-display text-xl font-semibold">
                Sign in to add a book
              </p>
              <p className="text-muted-foreground mx-auto mt-2 max-w-sm text-sm leading-relaxed">
                Your reader&apos;s card is needed before you can contribute a
                title to the shared shelves.
              </p>
              <Button asChild size="lg" className="mt-6 rounded-full">
                <Link href="/login?redirect=%2Fadd-book">Sign In</Link>
              </Button>
            </div>
          )}
        </section>

        {/* Live preview */}
        <LivePreview preview={previewValues} />
      </div>
    </Container>
  );
}

export default function AddBookView() {
  return <AddBookContent />;
}
