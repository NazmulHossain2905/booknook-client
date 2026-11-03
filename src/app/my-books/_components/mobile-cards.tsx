import { AvailabilityBadge } from "@/components/shared/availability-badge";
import { BookCover } from "@/components/shared/book-cover";
import { CategoryBadge } from "@/components/shared/category-badge";
import { Button } from "@/components/ui/button";
import { Book } from "@/types";
import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

export default function MobileCards({
  books,
  setDeleting,
  setEditing,
}: {
  books: Book[];
  setEditing: Dispatch<SetStateAction<Book | null>>;
  setDeleting: Dispatch<SetStateAction<Book | null>>;
}) {
  return (
    <div className="grid gap-4 md:hidden">
      {books?.map((book) => (
        <article
          key={book._id}
          className="bg-card rounded-2xl border p-4 shadow-sm"
        >
          <div className="flex gap-4">
            <Link
              href={`/books/${book._id}`}
              aria-label={`View ${book.title}`}
              className="w-16 shrink-0 overflow-hidden rounded-md shadow-sm"
            >
              <BookCover
                src={book.image}
                alt={`Cover of “${book.title}”`}
                className="rounded-md"
              />
            </Link>
            <div className="min-w-0 flex-1">
              <Link
                href={`/books/${book._id}`}
                className="font-display hover:text-primary text-base leading-snug font-semibold"
              >
                {book.title}
              </Link>
              <p className="text-muted-foreground mt-0.5 text-sm">
                by {book.author}
              </p>
              <div className="mt-2.5 flex flex-wrap items-center gap-2">
                <CategoryBadge category={book.category} />
                <AvailabilityBadge
                  available={book.availableCopies}
                  total={book.totalCopies}
                />
              </div>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setEditing(book)}
            >
              <Pencil aria-hidden className="size-3.5" />
              Edit
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setDeleting(book)}
              className="text-destructive hover:border-destructive/50 hover:bg-destructive/10 hover:text-destructive"
            >
              <Trash2 aria-hidden className="size-3.5" />
              Delete
            </Button>
          </div>
        </article>
      ))}
    </div>
  );
}
