import { Skeleton } from "@/components/ui/skeleton";

export function MyBooksSkeleton() {
  return (
    <div className="bg-card space-y-4 rounded-2xl border p-6">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex items-center gap-4">
          <Skeleton className="aspect-2/3 w-10 rounded-md" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-3 w-1/4" />
          </div>
          <Skeleton className="h-8 w-20 rounded-md" />
        </div>
      ))}
    </div>
  );
}
