"use client";

import { BookCard } from "@/components/books/book-card";
import { BorrowDialog } from "@/components/books/borrow-dialog";
import { AvailabilityBadge } from "@/components/shared/availability-badge";
import { BookCover, UserAvatar } from "@/components/shared/book-cover";
import { CategoryBadge } from "@/components/shared/category-badge";
import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import { demoUser, MOCK_CONTRIBUTORS } from "@/data";
import { usePageTitle } from "@/hooks/use-page-title";
import { useSimulatedLoading } from "@/hooks/use-simulated-loading";
import { formatDate } from "@/lib/format";
import { Book, BorrowRecord, User } from "@/types";
import {
  ArrowLeft,
  BookOpen,
  CalendarPlus,
  Check,
  Layers,
  PenLine,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { BookDetailsSkeleton } from "./book-details-skeleton";

export default function BookDetailsView() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const {
    books,
    borrows,
    user,
  }: { books: Book[]; borrows: BorrowRecord[]; user: User } = {
    books: [],
    borrows: [],
    user: demoUser,
  };
  const loading = useSimulatedLoading(600);
  const [borrowOpen, setBorrowOpen] = useState(false);

  const book = books.find((b) => b.id === params.id);
  usePageTitle(book ? book.title : "Book Details");

  const alreadyBorrowed = useMemo(
    () =>
      !!book &&
      !!user &&
      borrows.some(
        (b) =>
          b.bookId === book.id &&
          b.userEmail.toLowerCase() === user.email.toLowerCase() &&
          b.status === "borrowed",
      ),
    [book, borrows, user],
  );

  const related = useMemo(() => {
    if (!book) return [];
    return books
      .filter((b) => b.category === book.category && b.id !== book.id)
      .slice(0, 4);
  }, [books, book]);

  if (loading) return <BookDetailsSkeleton />;

  if (!book) {
    return (
      <Container
        size="narrow"
        className="flex min-h-[60vh] flex-col items-center justify-center py-16 text-center"
      >
        <div className="bg-secondary text-primary flex size-16 items-center justify-center rounded-full">
          <BookOpen aria-hidden className="size-7" />
        </div>
        <h1 className="font-display mt-6 text-3xl font-semibold">
          This book has been returned… elsewhere
        </h1>
        <p className="text-muted-foreground mt-3 max-w-md">
          We couldn't find that title on our shelves. It may have been removed
          by the member who added it.
        </p>
        <Button asChild className="mt-8 rounded-full px-6">
          <Link href="/books">
            <ArrowLeft aria-hidden className="size-4" />
            Back to All Books
          </Link>
        </Button>
      </Container>
    );
  }

  const isAvailable = book.availableCopies > 0;
  const contributor = MOCK_CONTRIBUTORS.find(
    (c) => c.email === book.addedByEmail,
  );

  const onBorrowClick = () => {
    if (!user) {
      toast.info("Sign in to borrow", {
        description:
          "Create a free account or use the demo login — we'll bring you right back.",
      });
      router.push(`/login?redirect=${encodeURIComponent(`/books/${book.id}`)}`);
      return;
    }
    if (alreadyBorrowed) {
      toast.error("Already on your shelf", {
        description: `You have “${book.title}” on loan — return it before borrowing another copy.`,
      });
      return;
    }
    if (!isAvailable) {
      toast.error("Not available", {
        description: "Every copy of this book is currently on loan.",
      });
      return;
    }
    setBorrowOpen(true);
  };

  return (
    <Container size="wide" className="py-10 sm:py-14">
      <nav aria-label="Breadcrumb">
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="text-muted-foreground -ml-2 rounded-full"
        >
          <Link href="/books">
            <ArrowLeft aria-hidden className="size-4" />
            Back to Books
          </Link>
        </Button>
      </nav>

      <div className="mt-6 grid gap-10 lg:grid-cols-[340px_1fr] lg:gap-14 xl:grid-cols-[380px_1fr]">
        {/* Cover */}
        <div className="mx-auto w-full max-w-[320px] lg:sticky lg:top-24 lg:mx-0 lg:max-w-none">
          <div className="relative">
            <div
              aria-hidden
              className="bg-gold/15 absolute inset-x-4 top-8 -bottom-3 rounded-xl"
            />
            <div className="shadow-primary/15 relative overflow-hidden rounded-xl shadow-xl ring-1 ring-black/5">
              <BookCover
                src={book.image}
                alt={`Cover of “${book.title}” by ${book.author}`}
                className="rounded-none"
                loading="eager"
              />
            </div>
          </div>
          <p className="text-muted-foreground mt-4 text-center text-xs lg:text-left">
            Added to the library {formatDate(book.addedAt)}
          </p>
        </div>

        {/* Details */}
        <div>
          <div className="flex flex-wrap items-center gap-2.5">
            <CategoryBadge category={book.category} />
            <AvailabilityBadge
              available={book.availableCopies}
              total={book.totalCopies}
            />
          </div>

          <h1 className="font-display mt-4 text-3xl leading-tight font-semibold tracking-tight text-balance sm:text-4xl lg:text-[2.75rem]">
            {book.title}
          </h1>

          <p className="text-muted-foreground mt-3 flex items-center gap-2 text-base">
            <PenLine aria-hidden className="text-gold size-4" />
            by {book.author}
          </p>

          {/* Meta cards */}
          <dl className="mt-7 grid gap-3 sm:grid-cols-3">
            <div className="bg-card rounded-xl border p-4">
              <dt className="text-muted-foreground flex items-center gap-1.5 text-xs font-medium tracking-wide uppercase">
                <Layers aria-hidden className="text-gold size-3.5" />
                Total copies
              </dt>
              <dd className="font-display mt-1.5 text-2xl font-semibold">
                {book.totalCopies}
              </dd>
            </div>
            <div className="bg-card rounded-xl border p-4">
              <dt className="text-muted-foreground flex items-center gap-1.5 text-xs font-medium tracking-wide uppercase">
                <Check aria-hidden className="text-gold size-3.5" />
                Available now
              </dt>
              <dd className="font-display mt-1.5 text-2xl font-semibold">
                {book.availableCopies}
              </dd>
            </div>
            <div className="bg-card rounded-xl border p-4">
              <dt className="text-muted-foreground flex items-center gap-1.5 text-xs font-medium tracking-wide uppercase">
                <CalendarPlus aria-hidden className="text-gold size-3.5" />
                Added
              </dt>
              <dd className="font-display mt-1.5 text-2xl font-semibold">
                {formatDate(book.addedAt)}
              </dd>
            </div>
          </dl>

          {/* Description */}
          <section aria-label="Book description" className="mt-7">
            <h2 className="font-display text-lg font-semibold">
              About this book
            </h2>
            <p className="text-muted-foreground mt-3 max-w-2xl text-base leading-relaxed">
              {book.description}
            </p>
          </section>

          {/* Added by */}
          <div className="bg-secondary/50 mt-7 flex items-center gap-3 rounded-xl border p-4">
            <UserAvatar
              src={contributor?.avatar}
              name={book.addedBy}
              className="size-11"
            />
            <div className="flex-1">
              <p className="text-muted-foreground flex items-center gap-1.5 text-xs font-medium tracking-wide uppercase">
                <UserRound aria-hidden className="size-3.5" />
                Shared with the library by
              </p>
              <p className="mt-0.5 text-sm font-semibold">{book.addedBy}</p>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            {alreadyBorrowed ? (
              <>
                <Button size="lg" disabled className="rounded-full px-7">
                  <Check aria-hidden className="size-4.5" />
                  Currently borrowed by you
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="rounded-full"
                >
                  <Link href="/my-borrows">View My Borrows</Link>
                </Button>
              </>
            ) : isAvailable ? (
              <Button
                size="lg"
                className="rounded-full px-7"
                onClick={onBorrowClick}
              >
                <BookOpen aria-hidden className="size-4.5" />
                Borrow This Book
              </Button>
            ) : (
              <Button size="lg" disabled className="rounded-full px-7">
                Not Available
              </Button>
            )}
          </div>
          {!isAvailable && !alreadyBorrowed && (
            <p className="text-muted-foreground mt-3 text-sm">
              Every copy is out with other readers right now — check back soon,
              or browse{" "}
              <Link
                href={`/books?category=${encodeURIComponent(book.category)}`}
                className="text-primary font-medium underline-offset-4 hover:underline"
              >
                more {book.category} titles
              </Link>
              .
            </p>
          )}
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section
          aria-labelledby="related-heading"
          className="mt-16 border-t pt-12 sm:mt-20"
        >
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Keep browsing</p>
              <h2
                id="related-heading"
                className="font-display mt-2 text-2xl font-semibold sm:text-3xl"
              >
                More from the {book.category} shelf
              </h2>
            </div>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((b) => (
              <BookCard key={b.id} book={b} />
            ))}
          </div>
        </section>
      )}

      <BorrowDialog
        book={book}
        open={borrowOpen}
        onOpenChange={setBorrowOpen}
      />
    </Container>
  );
}
