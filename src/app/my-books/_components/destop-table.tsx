import { AvailabilityBadge } from "@/components/shared/availability-badge";
import { BookCover } from "@/components/shared/book-cover";
import { CategoryBadge } from "@/components/shared/category-badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Book } from "@/types";
import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

export function DesktopTable({
  books,
  setDeleting,
  setEditing,
}: {
  books: Book[];
  setEditing: Dispatch<SetStateAction<Book | null>>;
  setDeleting: Dispatch<SetStateAction<Book | null>>;
}) {
  return (
    <div className="bg-card hidden overflow-hidden rounded-2xl border shadow-sm md:block">
      <Table>
        <TableHeader>
          <TableRow className="bg-secondary/50 hover:bg-secondary/50">
            <TableHead className="w-[42%] pl-6">Book</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Availability</TableHead>
            <TableHead className="pr-6 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {books.map((book) => (
            <TableRow key={book.id} className="group">
              <TableCell className="pl-6">
                <div className="flex items-center gap-4 py-2">
                  <Link
                    href={`/books/${book.id}`}
                    aria-label={`View ${book.title}`}
                    className="focus-visible:ring-ring/50 w-10 shrink-0 overflow-hidden rounded-md shadow-sm transition-transform outline-none hover:scale-105 focus-visible:ring-[3px]"
                  >
                    <BookCover
                      src={book.image}
                      alt={`Cover of “${book.title}”`}
                      className="rounded-md"
                    />
                  </Link>
                  <div className="min-w-0">
                    <Link
                      href={`/books/${book.id}`}
                      className="font-display hover:text-primary text-[15px] leading-snug font-semibold"
                    >
                      {book.title}
                    </Link>
                    <p className="text-muted-foreground mt-0.5 truncate text-sm">
                      by {book.author}
                    </p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <CategoryBadge category={book.category} />
              </TableCell>
              <TableCell>
                <AvailabilityBadge
                  available={book.availableCopies}
                  total={book.totalCopies}
                />
              </TableCell>
              <TableCell className="pr-6">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditing(book)}
                    aria-label={`Edit ${book.title}`}
                  >
                    <Pencil aria-hidden className="size-3.5" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setDeleting(book)}
                    aria-label={`Delete ${book.title}`}
                    className="text-destructive hover:border-destructive/50 hover:bg-destructive/10 hover:text-destructive"
                  >
                    <Trash2 aria-hidden className="size-3.5" />
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
