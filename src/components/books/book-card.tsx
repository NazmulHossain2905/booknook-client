import { AvailabilityBadge } from "@/components/shared/availability-badge";
import { BookCover } from "@/components/shared/book-cover";
import { CategoryBadge } from "@/components/shared/category-badge";
import { Button } from "@/components/ui/button";
import { Book } from "@/types";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function BookCard({
  book,
  priority = false,
}: {
  book: Book;
  priority?: boolean;
}) {
  return (
    <article className="group bg-card hover:shadow-primary/10 flex h-full w-full flex-col overflow-hidden rounded-xl border p-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <Link
        href={`/books/${book._id}`}
        className="focus-visible:ring-ring/50 relative block overflow-hidden rounded-lg outline-none focus-visible:ring-[3px]"
      >
        <div className="relative overflow-hidden rounded-lg">
          <BookCover
            src={book.image}
            alt={`Cover of “${book.title}” by ${book.author}`}
            loading={priority ? "eager" : "lazy"}
            className="rounded-lg transition-transform duration-500 group-hover:scale-[1.04]"
          />
          <div className="pointer-events-none absolute inset-0 rounded-lg bg-linear-to-t from-black/25 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>
        <CategoryBadge
          category={book.category}
          className="absolute top-2.5 left-2.5 shadow-sm backdrop-blur-sm"
        />
      </Link>

      <div className="flex flex-1 flex-col px-1.5 pt-4 pb-1">
        <h3 className="font-display text-lg leading-snug font-semibold tracking-tight">
          <Link
            href={`/books/${book._id}`}
            className="hover:text-primary focus-visible:ring-ring/50 transition-colors outline-none focus-visible:ring-[3px]"
          >
            {book.title}
          </Link>
        </h3>
        <p className="text-muted-foreground mt-1 text-sm">by {book.author}</p>

        <div className="mt-3">
          <AvailabilityBadge
            available={book.availableCopies}
            total={book.totalCopies}
          />
        </div>

        <Button
          asChild
          variant="outline"
          className="group-hover:border-primary/40 group-hover:bg-primary group-hover:text-primary-foreground dark:group-hover:text-primary mt-4 w-full"
        >
          <Link href={`/books/${book._id}`}>
            View Details
            <ArrowRight
              aria-hidden
              className="size-4 transition-transform group-hover:translate-x-0.5"
            />
          </Link>
        </Button>
      </div>
    </article>
  );
}
