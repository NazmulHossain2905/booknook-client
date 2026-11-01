import { BookFormValues } from "@/schemas/book.schema";
import { Category } from "@/types";
import { LibraryBig, Sparkles } from "lucide-react";
import { AvailabilityBadge } from "../shared/availability-badge";
import { BookCover } from "../shared/book-cover";
import { CategoryBadge } from "../shared/category-badge";

export function LivePreview({ preview }: { preview: BookFormValues }) {
  return (
    <aside className="lg:sticky lg:top-24 lg:self-start">
      <div className="bg-secondary/40 rounded-2xl border border-dashed p-6 sm:p-8">
        <p className="text-muted-foreground flex items-center gap-2 text-xs font-semibold tracking-[0.18em] uppercase">
          <Sparkles aria-hidden className="text-gold size-3.5" />
          Live preview
        </p>
        <p className="text-muted-foreground mt-1.5 text-xs leading-relaxed">
          This is how your book will appear on the shelves.
        </p>

        <div className="bg-card mx-auto mt-6 max-w-60 rounded-xl border p-3 shadow-sm">
          <div className="overflow-hidden rounded-lg">
            <BookCover
              key={preview?.image}
              src={preview?.image || ""}
              alt="Book cover preview"
              className="rounded-lg"
            />
          </div>
          <div className="px-1 pt-4 pb-1">
            <h2 className="font-display text-lg leading-snug font-semibold">
              {preview?.title?.trim() || "Your book's title"}
            </h2>
            <p className="text-muted-foreground mt-1 text-sm">
              {preview?.author?.trim()
                ? `by ${preview.author}`
                : "by its brilliant author"}
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              {preview?.category && (
                <CategoryBadge category={preview.category as Category} />
              )}
              <AvailabilityBadge
                available={
                  Number(preview?.totalCopies) > 0
                    ? Number(preview.totalCopies)
                    : 0
                }
                total={Number(preview?.totalCopies) || 0}
              />
            </div>
          </div>
        </div>

        <p className="text-muted-foreground mt-6 text-center text-xs">
          {preview?.description?.trim()
            ? `“${preview.description.trim().slice(0, 90)}${preview.description.trim().length > 90 ? "…" : ""}”`
            : "The description will appear here as you type."}
        </p>
      </div>

      <div className="bg-card text-muted-foreground mt-5 flex items-start gap-3 rounded-xl border p-4 text-sm">
        <LibraryBig aria-hidden className="text-gold mt-0.5 size-5 shrink-0" />
        <p className="leading-relaxed">
          Books you add show up under{" "}
          <span className="text-foreground font-medium">My Books</span>, where
          you can edit details or retire them anytime.
        </p>
      </div>
    </aside>
  );
}
