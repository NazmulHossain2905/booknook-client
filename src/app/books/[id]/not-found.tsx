import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen } from "lucide-react";
import Link from "next/link";

/** Rendered when `notFound()` is thrown for `/books/[id]`. */
export default function BookNotFound() {
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
        We couldn't find that title on our shelves. It may have been removed by
        the member who added it.
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
