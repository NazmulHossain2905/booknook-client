"use client";

import { EmptyState } from "@/components/shared/empty-state";
import { CloudOff } from "lucide-react";
import { useRouter } from "next/navigation";

interface LoadFailedStateProps {
  title?: string;
  description?: string;
}

/**
 * Rendered when a list fetch failed. Without this, a 401/500 collapses into an
 * empty array and the member is told "you have nothing yet" — which reads as
 * data rather than as an error.
 */
export function LoadFailedState({
  title = "We couldn't load this shelf",
  description = "The library didn't answer our request. Nothing has been lost — please try again in a moment.",
}: LoadFailedStateProps) {
  const router = useRouter();

  return (
    <EmptyState
      icon={CloudOff}
      title={title}
      description={description}
      action={{ label: "Try again", onClick: () => router.refresh() }}
    />
  );
}
