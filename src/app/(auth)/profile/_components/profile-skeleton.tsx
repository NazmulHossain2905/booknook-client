import { Container } from "@/components/shared/container";
import { Skeleton } from "@/components/ui/skeleton";

/** Layout-matching placeholder for the profile page while data streams in. */
export function ProfileSkeleton() {
  return (
    <Container size="default" className="py-10 sm:py-14" aria-busy="true">
      {/* Header */}
      <div className="max-w-2xl space-y-4" aria-hidden>
        <Skeleton className="h-3 w-32 rounded-full" />
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-4 w-full max-w-md" />
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Left: identity card + quick links */}
        <div className="space-y-6">
          <div
            className="bg-card rounded-2xl border p-6 shadow-sm sm:p-8"
            aria-hidden
          >
            <div className="flex flex-wrap items-center gap-5">
              <Skeleton className="size-20 shrink-0 rounded-full" />
              <div className="min-w-0 flex-1 space-y-2">
                <Skeleton className="h-6 w-40 max-w-full" />
                <Skeleton className="h-4 w-52 max-w-full" />
                <Skeleton className="h-3 w-36 max-w-full" />
              </div>
            </div>
            <div className="mt-8 space-y-5 border-t pt-6">
              <div className="grid gap-5 sm:grid-cols-2">
                <Skeleton className="h-9 w-full" />
                <Skeleton className="h-9 w-full" />
              </div>
              <div className="flex items-center justify-between">
                <Skeleton className="h-3 w-28" />
                <Skeleton className="h-9 w-32 rounded-full" />
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2" aria-hidden>
            <Skeleton className="h-20 rounded-2xl" />
            <Skeleton className="h-20 rounded-2xl" />
          </div>
        </div>

        {/* Right: activity stats */}
        <div
          className="bg-primary text-primary-foreground rounded-2xl p-6 sm:p-8"
          aria-hidden
        >
          <Skeleton className="bg-primary-foreground/20 h-6 w-40" />
          <div className="mt-6 space-y-5">
            <div className="flex items-center justify-between border-b border-white/15 pb-5">
              <Skeleton className="bg-primary-foreground/20 h-4 w-28" />
              <Skeleton className="bg-primary-foreground/20 h-9 w-16" />
            </div>
            <div className="flex items-center justify-between border-b border-white/15 pb-5">
              <Skeleton className="bg-primary-foreground/20 h-4 w-36" />
              <Skeleton className="bg-primary-foreground/20 h-9 w-16" />
            </div>
            <div className="flex items-center justify-between">
              <Skeleton className="bg-primary-foreground/20 h-4 w-32" />
              <Skeleton className="bg-primary-foreground/20 h-9 w-16" />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
