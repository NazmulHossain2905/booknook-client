import { Container } from "@/components/shared/container";
import { Skeleton } from "@/components/ui/skeleton";

export function BookDetailsSkeleton() {
  return (
    <Container size="wide" className="py-10 sm:py-14">
      <Skeleton className="h-5 w-36" />
      <div className="mt-8 grid gap-10 lg:grid-cols-[380px_1fr] lg:gap-14">
        <div>
          <Skeleton className="aspect-2/3 w-full rounded-xl" />
        </div>
        <div className="space-y-5">
          <Skeleton className="h-6 w-28 rounded-full" />
          <Skeleton className="h-12 w-4/5" />
          <Skeleton className="h-5 w-52" />
          <div className="grid gap-3 sm:grid-cols-3">
            <Skeleton className="h-20 rounded-xl" />
            <Skeleton className="h-20 rounded-xl" />
            <Skeleton className="h-20 rounded-xl" />
          </div>
          <Skeleton className="h-24 w-full rounded-xl" />
          <Skeleton className="h-12 w-56 rounded-full" />
        </div>
      </div>
    </Container>
  );
}
