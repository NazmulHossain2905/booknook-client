"use client";

import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import { usePageTitle } from "@/hooks/use-page-title";
import { AlertTriangle, ArrowLeft, RefreshCw } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

interface ErrorPageProps {
  error: Error & { digest?: string };
  retry: () => void;
}

export default function ErrorPage({ error, retry }: ErrorPageProps) {
  usePageTitle("Something went wrong");

  useEffect(() => {
    // Server errors arrive with a generic message + digest in production, so
    // this is safe to log without leaking anything the client can't already see.
    console.error("BookNook route error:", error);
  }, [error]);

  return (
    <Container
      size="narrow"
      className="flex min-h-[70vh] flex-col items-center justify-center py-16 text-center"
    >
      <div
        aria-hidden
        className="bg-destructive/10 ring-destructive/20 mb-8 flex size-16 items-center justify-center rounded-full ring-1"
      >
        <AlertTriangle className="text-destructive size-7" />
      </div>

      <p className="eyebrow justify-center">Something fell off the shelf</p>
      <h1 className="font-display mt-4 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
        We hit a snag loading this page.
      </h1>
      <p className="text-muted-foreground mx-auto mt-4 max-w-md text-base leading-relaxed">
        The library is still here — this was a temporary hiccup while fetching
        the page. Try again and it should pick right back up.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Button size="lg" className="rounded-full px-7" onClick={() => retry()}>
          <RefreshCw aria-hidden className="size-4.5" />
          Try again
        </Button>
        <Button
          asChild
          variant="outline"
          size="lg"
          className="rounded-full px-6"
        >
          <Link href="/">
            <ArrowLeft aria-hidden className="size-4.5" />
            Back to Home
          </Link>
        </Button>
      </div>

      {error?.digest && (
        <p className="text-muted-foreground/70 mt-10 font-mono text-xs">
          Reference: {error.digest}
        </p>
      )}
    </Container>
  );
}
