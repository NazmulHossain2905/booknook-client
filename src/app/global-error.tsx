"use client";

import { AlertTriangle, RefreshCw } from "lucide-react";
import "./globals.css";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  retry: () => void;
}

/**
 * Replaces the root layout when it — or something rendered by it — fails, so
 * it must render its own <html>/<body> and pull in the global styles itself.
 * Nothing (styles, fonts, theme provider) is inherited from `layout.tsx` here,
 * which also means the `.dark` class from next-themes can't reach us and this
 * always renders in the light theme.
 */
export default function GlobalError({ error, retry }: GlobalErrorProps) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground font-sans antialiased">
        <main className="flex min-h-screen flex-col items-center justify-center px-4 py-16 text-center">
          <p className="eyebrow justify-center">BookNook</p>

          <div
            aria-hidden
            className="bg-destructive/10 ring-destructive/20 mt-8 flex size-16 items-center justify-center rounded-full ring-1"
          >
            <AlertTriangle className="text-destructive size-7" />
          </div>

          <h1 className="font-display mt-6 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            BookNook hit an unexpected error.
          </h1>
          <p className="text-muted-foreground mx-auto mt-4 max-w-md text-base leading-relaxed">
            The application couldn&apos;t recover from this one. Reloading the
            page usually puts the books back on the shelves.
          </p>

          <button
            type="button"
            onClick={() => retry()}
            className="bg-primary text-primary-foreground hover:bg-primary/90 mt-8 inline-flex h-11 items-center gap-2 rounded-full px-7 text-sm font-medium transition-colors"
          >
            <RefreshCw aria-hidden className="size-4" />
            Try again
          </button>

          {error?.digest && (
            <p className="text-muted-foreground/70 mt-10 font-mono text-xs">
              Reference: {error.digest}
            </p>
          )}
        </main>
      </body>
    </html>
  );
}
