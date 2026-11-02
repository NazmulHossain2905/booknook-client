"use client";

import { BookCover } from "@/components/shared/book-cover";
import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Book } from "@/types";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Swiper as SwiperClass } from "swiper";
import "swiper/css";
import "swiper/css/effect-fade";
import { A11y, Autoplay, EffectFade, Keyboard } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

interface Slide {
  eyebrow: string;
  title: string;
  highlight: string;
  description: string;
  secondary: { label: string; href: string };
  meta: string;
  /** Book ids featured in this slide's cover stack */
  bookIds: string[];
  /** Tailwind classes for the slide backdrop */
  backdrop: string;
}

const slides: Slide[] = [
  {
    eyebrow: "Welcome to BookNook",
    title: "Every book is a",
    highlight: "doorway.",
    description:
      "A small online library with a big heart — discover well-loved titles, meet fellow readers, and find the story that changes your week.",
    secondary: { label: "Join the Library", href: "/register" },
    meta: "Free to join · 14 curated titles · 5 shelves",
    bookIds: [
      "6ae82e94b80dda82b06f5b9e",
      "6ae82e94b80dda82b06f5b9f",
      "6ae82e94b80dda82b06f5ba0",
    ],
    backdrop: "pattern-dots",
  },
  {
    eyebrow: "Borrow · Read · Return",
    title: "Borrow the",
    highlight: "stories you love.",
    description:
      "Reserve a copy in seconds and keep it for a full fortnight. Returning is one click — and the shelf stays generous for the next reader.",
    secondary: { label: "See how it works", href: "/#community" },
    meta: "Two-week loans · No late fees · One-click returns",
    bookIds: [
      "6ae82e94b80dda82b06f5ba1",
      "6ae82e94b80dda82b06f5ba2",
      "6ae82e94b80dda82b06f5ba3",
    ],
    backdrop: "bg-[#edf2ea] dark:bg-[#161d16]",
  },
  {
    eyebrow: "Share your shelves",
    title: "Your shelf,",
    highlight: "shared with the world.",
    description:
      "Add a book from your own collection in under a minute. Give it a home on our shelves and watch readers queue up to borrow it.",
    secondary: { label: "Add a book", href: "/add-book" },
    meta: "Add books in minutes · Own your catalogue · Edit anytime",
    bookIds: [
      "6ae82e94b80dda82b06f5ba4",
      "6ae82e94b80dda82b06f5ba5",
      "6ae82e94b80dda82b06f5ba6",
    ],
    backdrop: "bg-[#f6efe0] dark:bg-[#1d1a12]",
  },
];

function CoverStack({ books }: { books: Book[] }) {
  const reduceMotion = useReducedMotion();
  const [main, left, right] = books;
  if (!main) return null;

  return (
    <div
      aria-hidden
      className="relative mx-auto flex h-85 w-full max-w-105 items-center justify-center sm:h-105 lg:h-120"
    >
      {/* gold halo */}
      <div className="bg-gold/15 absolute top-1/2 left-1/2 size-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl" />
      <div className="border-gold/25 absolute top-1/2 left-1/2 size-[92%] -translate-x-1/2 -translate-y-1/2 rounded-3xl border" />

      {/* side covers */}
      {left && (
        <div className="absolute top-[16%] left-0 w-[38%] rotate-[-9deg] rounded-lg shadow-xl shadow-black/20">
          <BookCover src={left.image} alt="" className="opacity-90" />
        </div>
      )}
      {right && (
        <div className="absolute right-0 bottom-[10%] w-[38%] rotate-[8deg] rounded-lg shadow-xl shadow-black/20">
          <BookCover src={right.image} alt="" className="opacity-90" />
        </div>
      )}

      {/* main cover */}
      <motion.div
        className="relative z-10 w-[54%]"
        animate={reduceMotion ? undefined : { y: [0, -12, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="shadow-primary/25 rounded-lg shadow-2xl ring-1 ring-black/5">
          <BookCover src={main.image} alt="" />
        </div>
        {/* floating availability chip */}
        <div className="bg-card ring-border absolute -top-5 -right-6 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-semibold shadow-lg ring-1">
          <Sparkles aria-hidden className="text-gold size-3" />
          Community pick
        </div>
      </motion.div>
    </div>
  );
}

export function HeroSlider({ books }: { books: Book[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperClass | null>(null);
  const reduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Pause autoplay when the visitor prefers reduced motion.
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
      swiperRef.current?.autoplay
    ) {
      swiperRef.current.autoplay.stop();
    }
  }, []);

  const byId = useMemo(() => new Map(books.map((b) => [b._id, b])), [books]);
  const slideBooks = slides.map(
    (s) => s.bookIds.map((id) => byId.get(id)).filter(Boolean) as Book[],
  );

  const go = (index: number) => swiperRef.current?.slideToLoop(index);

  return (
    <section className="border-border/70 relative border-b">
      <Swiper
        modules={[Autoplay, EffectFade, Keyboard, A11y]}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        loop
        speed={900}
        allowTouchMove
        keyboard={{ enabled: true, onlyInViewport: true }}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        className="hero-swiper"
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={slide.title} virtualIndex={i}>
            <div className={cn("relative", slide.backdrop)}>
              <Container size="wide" className="relative">
                <div className="grid items-center gap-10 py-14 sm:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:py-20">
                  {/* Copy */}
                  <div className="max-w-xl">
                    <motion.p
                      initial={
                        mounted && !reduceMotion ? { opacity: 0, y: 14 } : false
                      }
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.05 }}
                      className="eyebrow"
                    >
                      {slide.eyebrow}
                    </motion.p>
                    <motion.h1
                      initial={
                        mounted && !reduceMotion ? { opacity: 0, y: 18 } : false
                      }
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.12 }}
                      className="font-display mt-4 text-4xl leading-[1.08] font-semibold tracking-tight text-balance sm:text-5xl lg:text-[3.4rem]"
                    >
                      {slide.title}{" "}
                      <span className="text-primary relative inline-block">
                        {slide.highlight}
                        <svg
                          aria-hidden
                          viewBox="0 0 220 12"
                          preserveAspectRatio="none"
                          className="text-gold absolute -bottom-1.5 left-0 h-2.5 w-full"
                        >
                          <path
                            d="M3 9c40-6 140-8 214-4"
                            stroke="currentColor"
                            strokeWidth="5"
                            strokeLinecap="round"
                            fill="none"
                          />
                        </svg>
                      </span>
                    </motion.h1>
                    <motion.p
                      initial={
                        mounted && !reduceMotion ? { opacity: 0, y: 18 } : false
                      }
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="text-muted-foreground mt-5 text-base leading-relaxed sm:text-lg"
                    >
                      {slide.description}
                    </motion.p>
                    <motion.div
                      initial={
                        mounted && !reduceMotion ? { opacity: 0, y: 18 } : false
                      }
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.28 }}
                      className="mt-8 flex flex-wrap items-center gap-3"
                    >
                      <Button
                        asChild
                        size="lg"
                        className="rounded-full px-7 text-[15px]"
                      >
                        <Link href="/books">
                          <BookOpen aria-hidden className="size-4.5" />
                          Browse Books
                        </Link>
                      </Button>
                      <Button
                        asChild
                        variant="ghost"
                        size="lg"
                        className="text-foreground hover:bg-accent rounded-full px-5 text-[15px]"
                      >
                        <Link href={slide.secondary.href}>
                          {slide.secondary.label}
                          <ArrowRight aria-hidden className="size-4" />
                        </Link>
                      </Button>
                    </motion.div>
                    <motion.p
                      initial={
                        mounted && !reduceMotion ? { opacity: 0 } : false
                      }
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.36 }}
                      className="text-muted-foreground mt-6 text-xs font-medium tracking-wide"
                    >
                      {slide.meta}
                    </motion.p>
                  </div>

                  {/* Visual */}
                  <div className="order-first lg:order-0">
                    <CoverStack books={slideBooks[i]} />
                  </div>
                </div>
              </Container>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Controls */}
      <div className="pointer-events-none absolute inset-x-0 bottom-5 z-10">
        <Container size="wide" className="flex items-center justify-between">
          <div
            className="pointer-events-auto flex items-center gap-2"
            role="tablist"
            aria-label="Choose hero slide"
          >
            {slides.map((slide, i) => (
              <button
                key={slide.title}
                type="button"
                role="tab"
                aria-selected={activeIndex === i}
                aria-label={`Slide ${i + 1}: ${slide.eyebrow}`}
                onClick={() => go(i)}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  activeIndex === i
                    ? "bg-gold w-8"
                    : "bg-foreground/25 hover:bg-foreground/45 w-2",
                )}
              />
            ))}
          </div>
          <div className="pointer-events-auto hidden items-center gap-2 sm:flex">
            <Button
              variant="outline"
              size="icon"
              aria-label="Previous slide"
              className="bg-card/80 size-9 rounded-full backdrop-blur"
              onClick={() => swiperRef.current?.slidePrev()}
            >
              <ChevronLeft aria-hidden className="size-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              aria-label="Next slide"
              className="bg-card/80 size-9 rounded-full backdrop-blur"
              onClick={() => swiperRef.current?.slideNext()}
            >
              <ChevronRight aria-hidden className="size-4" />
            </Button>
          </div>
        </Container>
      </div>
    </section>
  );
}
