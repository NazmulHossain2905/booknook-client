import { Container } from "@/components/shared/container";
import { BookGridSkeleton } from "@/components/shared/book-grid-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <Container size="wide" className="py-10 sm:py-14">
      {/* Header */}
      <div className="max-w-2xl space-y-4" aria-hidden>
        <Skeleton className="h-3 w-28 rounded-full" />
        <Skeleton className="h-10 w-56" />
        <Skeleton className="h-4 w-full max-w-lg" />
      </div>

      {/* Controls bar */}
      <Skeleton className="mt-8 h-24 rounded-2xl" aria-hidden />

      {/* Grid */}
      <div className="mt-8" aria-hidden>
        <BookGridSkeleton count={6} />
      </div>
    </Container>
  );
}
