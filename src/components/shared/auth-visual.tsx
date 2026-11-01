"use client";

import { BookCover } from "@/components/shared/book-cover";
import { BookOpen, LibraryBig, Quote, Users } from "lucide-react";

export function AuthVisual({ covers }: { covers: string[] }) {
  return (
    <aside className="bg-deep text-deep-foreground relative hidden overflow-hidden p-10 lg:flex lg:flex-col lg:justify-between">
      <div className="pattern-dots pointer-events-none absolute inset-0 opacity-25" />
      <div className="border-gold-soft/20 pointer-events-none absolute -top-24 -right-24 size-72 rounded-full border" />
      <div className="border-gold-soft/15 pointer-events-none absolute -bottom-16 -left-16 size-64 rounded-full border" />

      <div className="relative">
        <p className="text-gold-soft flex items-center gap-2 text-[11px] font-semibold tracking-[0.22em] uppercase">
          <BookOpen className="size-4" />
          The BookNook promise
        </p>
        <h2 className="font-display mt-5 max-w-md text-4xl leading-tight font-semibold">
          A library is not a building — it's a promise between readers.
        </h2>
        <p className="text-deep-foreground/70 mt-4 max-w-md text-sm leading-relaxed">
          Borrow generously, return kindly, and leave the shelves a little
          better than you found them.
        </p>
      </div>

      {/* Cover fan */}
      <div className="relative mx-auto flex w-full max-w-sm items-end justify-center">
        {covers.slice(0, 3).map((src, i) => (
          <div
            key={src}
            className="w-28 overflow-hidden rounded-lg shadow-xl ring-1 shadow-black/30 ring-white/10 xl:w-32"
            style={{
              transform: `rotate(${(i - 1) * 8}deg) translateY(${Math.abs(i - 1) * -14}px)`,
              zIndex: 3 - Math.abs(i - 1),
              marginLeft: i === 0 ? 0 : -18,
            }}
          >
            <BookCover src={src} alt="" />
          </div>
        ))}
      </div>

      <dl className="relative grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
        {[
          { icon: LibraryBig, value: "1,200+", label: "books shared" },
          { icon: Users, value: "380", label: "readers" },
          { icon: Quote, value: "4.9★", label: "member rating" },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label}>
              <Icon className="text-gold-soft size-4" />
              <dd className="font-display mt-2 text-xl leading-none font-semibold">
                {stat.value}
              </dd>
              <dt className="text-deep-foreground/60 mt-1.5 text-[11px]">
                {stat.label}
              </dt>
            </div>
          );
        })}
      </dl>
    </aside>
  );
}
