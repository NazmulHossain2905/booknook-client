"use client";

import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import { usePageTitle } from "@/hooks/use-page-title";
import { ArrowLeft, BookOpen, BookX, SearchX } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  usePageTitle("Page Not Found");

  return (
    <Container
      size="narrow"
      className="flex min-h-[70vh] flex-col items-center justify-center py-16 text-center"
    >
      {/* Tilted book stack illustration */}
      <div
        aria-hidden
        className="relative mb-10 flex h-40 w-64 items-end justify-center"
      >
        <div className="absolute top-6 left-4 h-28 w-18 -rotate-12 rounded-md bg-[#8c5a3c] shadow-lg">
          <span className="mt-3 block px-3 text-[9px] font-semibold tracking-widest text-white/70 uppercase">
            Volume
          </span>
        </div>
        <div className="absolute top-10 right-4 h-24 w-16 rotate-12 rounded-md bg-[#4a5442] shadow-lg">
          <span className="mt-3 block px-2.5 text-[9px] font-semibold tracking-widest text-white/70 uppercase">
            Lost
          </span>
        </div>
        <div className="bg-primary absolute inset-x-0 bottom-0 mx-auto h-32 w-20 rotate-3 rounded-md shadow-xl">
          <span className="text-primary-foreground/70 mt-4 block px-3 text-[10px] font-semibold tracking-widest uppercase">
            404
          </span>
          <span className="font-display text-gold-soft mt-1 block px-3 text-2xl font-bold">
            ??
          </span>
        </div>
        <div className="bg-card text-primary ring-border absolute -top-2 -right-2 flex size-11 items-center justify-center rounded-full shadow-md ring-1">
          <SearchX aria-hidden className="size-5" />
        </div>
      </div>

      <p className="eyebrow justify-center">Error 404 · Shelf not found</p>
      <h1 className="font-display mt-4 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
        This page has been checked out.
      </h1>
      <p className="text-muted-foreground mx-auto mt-4 max-w-md text-base leading-relaxed">
        We searched every shelf, card catalogue and reading chair, but the page
        you were after isn't in this library. It may have been moved, renamed,
        or borrowed by a very fast reader.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Button asChild size="lg" className="rounded-full px-7">
          <Link href="/">
            <ArrowLeft aria-hidden className="size-4.5" />
            Back to Home
          </Link>
        </Button>
        <Button
          asChild
          variant="outline"
          size="lg"
          className="rounded-full px-6"
        >
          <Link href="/books">
            <BookOpen aria-hidden className="size-4.5" />
            Browse the Library
          </Link>
        </Button>
      </div>

      <p className="text-muted-foreground mt-10 flex items-center gap-2 text-xs">
        <BookX aria-hidden className="text-gold size-3.5" />
        Psst — the librarians hang out on the All Books page if you need
        directions.
      </p>
    </Container>
  );
}
