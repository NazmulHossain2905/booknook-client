import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/shared/reveal";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";
import Link from "next/link";

export function CtaBand() {
  return (
    <section className="bg-deep text-deep-foreground relative overflow-hidden py-16 sm:py-20">
      {/* decorative rings */}
      <div className="border-gold-soft/20 pointer-events-none absolute -top-24 -left-24 size-72 rounded-full border" />
      <div className="border-gold-soft/15 pointer-events-none absolute -right-16 -bottom-32 size-96 rounded-full border" />
      <div className="pattern-dots pointer-events-none absolute inset-0 opacity-30" />

      <Container size="wide" className="relative">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow text-gold-soft! justify-center">
            No card, no fines, no catch
          </p>
          <h2
            id="cta-heading"
            className="font-display mt-4 text-3xl leading-tight font-semibold text-balance sm:text-4xl lg:text-[2.75rem]"
          >
            Your next favorite chapter is already on our shelves.
          </h2>
          <p className="text-deep-foreground/70 mx-auto mt-4 max-w-xl text-base leading-relaxed">
            Browse the collection, borrow what calls to you, and pass it along
            when you&apos;re done. The library grows every time a neighbor adds a
            book — maybe the next one is yours.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button
              asChild
              size="lg"
              className="bg-gold-soft hover:bg-gold-soft/90 rounded-full px-7 text-[#241c05]"
            >
              <Link href="/books">
                <BookOpen className="size-4.5" />
                Explore the Library
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="ghost"
              className="text-deep-foreground hover:text-deep-foreground rounded-full border border-white/20 px-6 hover:bg-white/10"
            >
              <Link href="/register">Create a free account</Link>
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
