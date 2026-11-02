import { Skeleton } from "@/components/ui/skeleton";

export function BookGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      aria-busy="true"
      aria-live="polite"
    >
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-card rounded-xl border p-3">
          <Skeleton className="aspect-2/3 w-full rounded-lg" />
          <div className="space-y-2.5 px-1 pt-4 pb-1">
            <Skeleton className="h-4 w-20 rounded-full" />
            <Skeleton className="h-5 w-4/5" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-9 w-full rounded-md" />
          </div>
        </div>
      ))}
    </div>
  );
}
