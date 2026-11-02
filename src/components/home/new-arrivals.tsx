import { BookCard } from "@/components/books/book-card";
import { Container } from "@/components/shared/container";
import { StaggerGroup, StaggerItem } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { Book } from "@/types";
import { ArrowRight, Clock3 } from "lucide-react";
import Link from "next/link";

export function NewArrivals({ books }: { books: Book[] }) {
  const latest = [...books]
    .sort((a, b) => +new Date(b.addedAt) - +new Date(a.addedAt))
    .slice(0, 6);

  return (
    <section id="new-arrivals" className="py-16 sm:py-20 lg:py-24">
      <Container size="wide">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Fresh on the shelves"
            title="New Arrivals"
            description="The six newest titles donated to the library, hot off our members' bookshelves."
          />
          <Button asChild variant="outline" className="bg-card rounded-full">
            <Link href="/books">
              See All Books
              <ArrowRight aria-hidden className="size-4" />
            </Link>
          </Button>
        </div>

        <StaggerGroup className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {latest.map((book, i) => (
            <StaggerItem key={book._id} className="flex">
              <div className="flex w-full">
                <BookCard book={book} priority={i < 3} />
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <p className="text-muted-foreground mt-8 flex items-center justify-center gap-2 text-center text-xs">
          <Clock3 className="text-gold size-3.5" />
          Updated whenever a neighbor adds a book — check back often.
        </p>
      </Container>
    </section>
  );
}
