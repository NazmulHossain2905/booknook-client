"use client";

import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { cn } from "@/lib/utils";
import { Book, Category } from "@/types";
import {
  ArrowUpRight,
  Blocks,
  BookHeart,
  FlaskConical,
  Landmark,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

const CATEGORY_CARDS: {
  category: Category;
  tagline: string;
  blurb: string;
  icon: typeof BookHeart;
  className: string;
  iconClassName: string;
}[] = [
  {
    category: "Fiction",
    tagline: "Lives you haven't lived yet",
    blurb: "Novels and stories that sweep you somewhere else entirely.",
    icon: BookHeart,
    className: "lg:col-span-2 bg-[#1e4d3b] text-[#f2eddd]",
    iconClassName: "bg-[#2c6b50] text-[#d9c08a]",
  },
  {
    category: "Science",
    tagline: "Curiosity, fact-checked",
    blurb: "Cosmos, cells and the people who decoded them.",
    icon: FlaskConical,
    className:
      "bg-[#eee7d6] text-[#2a3328] dark:bg-[#242b25] dark:text-[#e8e6da]",
    iconClassName: "bg-[#2f5d3a]/15 text-[#2f5d3a] dark:text-[#a8cfa8]",
  },
  {
    category: "History",
    tagline: "Everything once happened",
    blurb: "Diaries, empires and the long view of humankind.",
    icon: Landmark,
    className:
      "bg-[#f0e6cf] text-[#4a3c19] dark:bg-[#332c19] dark:text-[#dcc27c]",
    iconClassName: "bg-[#7a5d1e]/15 text-[#7a5d1e] dark:text-[#dcc27c]",
  },
  {
    category: "Kids",
    tagline: "Small readers, big worlds",
    blurb: "First chapters to read aloud, under a blanket.",
    icon: Blocks,
    className:
      "bg-[#e9e2f0] text-[#453355] dark:bg-[#2a2333] dark:text-[#c5b0d8]",
    iconClassName: "bg-[#5c4470]/15 text-[#5c4470] dark:text-[#c5b0d8]",
  },
  {
    category: "Others",
    tagline: "The beautiful miscellany",
    blurb: "Memoirs, habits and everything between the shelves.",
    icon: Sparkles,
    className:
      "bg-[#e4e7e2] text-[#3c4434] dark:bg-[#242923] dark:text-[#b7c1af]",
    iconClassName: "bg-[#4a5442]/15 text-[#4a5442] dark:text-[#b7c1af]",
  },
];

export function CategoryShowcase({ books }: { books: Book[] }) {
  const countFor = (category: Category) =>
    books.filter((b) => b.category === category).length;

  return (
    <section className="border-border/70 bg-secondary/40 dark:bg-secondary/30 border-y py-16 sm:py-20 lg:py-24">
      <Container size="wide">
        <SectionHeading
          align="center"
          eyebrow="Browse by mood"
          title="Your Next Favorite Chapter"
          description="Five shelves, five moods. Pick a doorway and see which titles are waiting on the other side."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORY_CARDS.map((card, i) => {
            const Icon = card.icon;
            const count = countFor(card.category);
            return (
              <Reveal
                key={card.category}
                delay={i * 0.07}
                className={cn(
                  "h-full",
                  card.className.includes("col-span") &&
                    "sm:col-span-2 lg:col-span-2",
                )}
              >
                <Link
                  href={`/books?category=${encodeURIComponent(card.category)}`}
                  className={cn(
                    "group focus-visible:ring-ring/60 flex h-full min-h-55 flex-col justify-between overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl focus-visible:shadow-xl focus-visible:ring-[3px] focus-visible:outline-none",
                    card.className,
                  )}
                >
                  <div className="flex items-start justify-between">
                    <span
                      className={cn(
                        "flex size-11 items-center justify-center rounded-xl",
                        card.iconClassName,
                      )}
                    >
                      <Icon aria-hidden className="size-5.5" />
                    </span>
                    <ArrowUpRight
                      aria-hidden
                      className="size-5 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-80"
                    />
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold tracking-[0.2em] uppercase opacity-70">
                      {count} {count === 1 ? "title" : "titles"} ·{" "}
                      {card.tagline}
                    </p>
                    <h3 className="font-display mt-2 text-2xl font-semibold">
                      {card.category}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed opacity-75">
                      {card.blurb}
                    </p>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
