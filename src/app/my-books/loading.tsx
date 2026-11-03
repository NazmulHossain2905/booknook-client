import { Container } from "@/components/shared/container";
import { Skeleton } from "@/components/ui/skeleton";
import { MyBooksSkeleton } from "./_components/book-skeleton";

export default function Loading() {
  return (
    <Container size="wide" className="py-10 sm:py-14" aria-busy="true">
      {/* Header */}
      <div className="flex items-end justify-between gap-4">
        <div className="max-w-2xl space-y-4" aria-hidden>
          <Skeleton className="h-3 w-28 rounded-full" />
          <Skeleton className="h-10 w-44" />
          <Skeleton className="h-4 w-full max-w-lg" />
        </div>
        <Skeleton className="hidden h-20 rounded-2xl px-5 py-4" />
      </div>

      {/* Controls */}
      <Skeleton className="mt-8 h-10 max-w-sm rounded-full" aria-hidden />

      {/* List */}
      <div className="mt-8" aria-hidden>
        <MyBooksSkeleton />
      </div>
    </Container>
  );
}
