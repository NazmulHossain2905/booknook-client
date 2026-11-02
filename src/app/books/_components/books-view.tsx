"use client";

import { BookCard } from "@/components/books/book-card";
import { BookGridSkeleton } from "@/components/shared/book-grid-skeleton";
import { Container } from "@/components/shared/container";
import { EmptyState } from "@/components/shared/empty-state";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { INITIAL_BOOKS } from "@/data";
import { usePageTitle } from "@/hooks/use-page-title";
import { useSimulatedLoading } from "@/hooks/use-simulated-loading";
import { cn } from "@/lib/utils";
import {
  Book,
  CATEGORIES,
  SORT_LABELS,
  type Category,
  type SortOption,
} from "@/types";
import { ArrowUpDown, BookX, LibraryBig, Search, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useMemo, useState } from "react";

function BooksContent() {
  usePageTitle("All Books");
  const books: Book[] = INITIAL_BOOKS;
  const router = useRouter();
  const searchParams = useSearchParams();
  const loading = useSimulatedLoading(650);

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Category | "All">(() => {
    const param = searchParams.get("category");
    return CATEGORIES.includes(param as Category) ? (param as Category) : "All";
  });
  const [sort, setSort] = useState<SortOption>("newest");

  const applyCategory = (next: Category | "All") => {
    setCategory(next);
    const params = new URLSearchParams(searchParams.toString());
    if (next === "All") params.delete("category");
    else params.set("category", next);
    const qs = params.toString();
    router.replace(qs ? `/books?${qs}` : "/books", { scroll: false });
  };

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = books.filter((book) => {
      const matchesCategory = category === "All" || book.category === category;
      const matchesQuery =
        !q ||
        book.title.toLowerCase().includes(q) ||
        book.author.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });

    list = [...list].sort((a, b) => {
      switch (sort) {
        case "newest":
          return +new Date(b.addedAt) - +new Date(a.addedAt);
        case "oldest":
          return +new Date(a.addedAt) - +new Date(b.addedAt);
        case "title-asc":
          return a.title.localeCompare(b.title);
        case "title-desc":
          return b.title.localeCompare(a.title);
      }
    });
    return list;
  }, [books, query, category, sort]);

  const hasFilters = query.trim() !== "" || category !== "All";

  return (
    <Container size="wide" className="py-10 sm:py-14">
      {/* Page header */}
      <header className="max-w-2xl">
        <p className="eyebrow">The collection</p>
        <h1 className="font-display mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
          All Books
        </h1>
        <p className="text-muted-foreground mt-4 text-base leading-relaxed">
          Every title our members have carried through the door — search by name
          or author, pick a shelf, and find your next two weeks of reading.
        </p>
      </header>

      {/* Controls */}
      <section className="bg-card mt-8 rounded-2xl border p-4 shadow-sm sm:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <Search
              aria-hidden
              className="text-muted-foreground pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2"
            />
            <Input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by title or author…"
              aria-label="Search books by title or author"
              className="bg-background h-11 rounded-full pr-10 pl-10"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="text-muted-foreground hover:bg-accent hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2 rounded-full p-1 transition-colors"
              >
                <X aria-hidden className="size-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            <ArrowUpDown
              aria-hidden
              className="text-muted-foreground size-4 shrink-0"
            />
            <Select
              value={sort}
              onValueChange={(v) => setSort(v as SortOption)}
            >
              <SelectTrigger
                aria-label="Sort books"
                className="bg-background h-11 w-42.5 rounded-full"
              >
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                {(Object.keys(SORT_LABELS) as SortOption[]).map((option) => (
                  <SelectItem key={option} value={option}>
                    {SORT_LABELS[option]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Category pills */}
        <div
          className="mt-4 flex scrollbar-thin gap-2 overflow-x-auto pb-1"
          role="group"
          aria-label="Filter by category"
        >
          {(["All", ...CATEGORIES] as const).map((option) => (
            <button
              key={option}
              type="button"
              aria-pressed={category === option}
              onClick={() => applyCategory(option)}
              className={cn(
                "shrink-0 rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
                category === option
                  ? "border-primary bg-primary text-primary-foreground"
                  : "bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground",
              )}
            >
              {option}
            </button>
          ))}
        </div>
      </section>

      {/* Count */}
      <p className="text-muted-foreground mt-6 text-sm" aria-live="polite">
        Showing{" "}
        <span className="text-foreground font-semibold">{visible.length}</span>{" "}
        {visible.length === 1 ? "title" : "titles"}
        {category !== "All" && (
          <>
            on the{" "}
            <span className="text-foreground font-semibold">{category}</span>{" "}
            shelf
          </>
        )}
        {query.trim() && (
          <>
            matching “
            <span className="text-foreground font-semibold">
              {query.trim()}
            </span>
            ”
          </>
        )}
      </p>

      {/* Grid */}
      <div className="mt-4">
        {loading ? (
          <BookGridSkeleton count={6} />
        ) : visible.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((book, i) => (
              <BookCard key={book._id} book={book} priority={i < 3} />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={hasFilters ? BookX : LibraryBig}
            title={
              hasFilters
                ? "No books match your search"
                : "The shelves are empty"
            }
            description={
              hasFilters
                ? "Try a different spelling, clear the filters, or browse another shelf — new titles arrive all the time."
                : "Be the first to add a book and start the collection for everyone."
            }
            action={
              hasFilters
                ? {
                    label: "Clear search & filters",
                    onClick: () => {
                      setQuery("");
                      applyCategory("All");
                    },
                  }
                : { label: "Browse books", href: "/books" }
            }
            className="mt-2"
          />
        )}
      </div>
    </Container>
  );
}

export default function BooksView() {
  return (
    <Suspense fallback={null}>
      <BooksContent />
    </Suspense>
  );
}
