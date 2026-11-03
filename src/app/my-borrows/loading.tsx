import { Container } from "@/components/shared/container";
import { Skeleton } from "@/components/ui/skeleton";
import { MyBorrowsSkeleton } from "./_components/my-borrow-skeleton";

export default function Loading() {
  return (
    <Container size="wide" className="py-10 sm:py-14" aria-busy="true">
      {/* Header */}
      <div className="max-w-2xl space-y-4" aria-hidden>
        <Skeleton className="h-3 w-28 rounded-full" />
        <Skeleton className="h-10 w-44" />
        <Skeleton className="h-4 w-full max-w-lg" />
      </div>

      {/* Summary cards + table */}
      <div className="mt-8" aria-hidden>
        <MyBorrowsSkeleton />
      </div>
    </Container>
  );
}
