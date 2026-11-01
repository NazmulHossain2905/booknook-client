"use client";

import { DeleteBookDialog } from "@/components/books/delete-book-dialog";
import { EditBookSheet } from "@/components/books/edit-book-sheet";
import { Container } from "@/components/shared/container";
import { EmptyState } from "@/components/shared/empty-state";
import { Input } from "@/components/ui/input";

import { demoUser, INITIAL_BOOKS } from "@/data";
import { usePageTitle } from "@/hooks/use-page-title";
import { useSimulatedLoading } from "@/hooks/use-simulated-loading";
import { cn } from "@/lib/utils";
import { Book, CATEGORIES, Category } from "@/types";
import { BookMarked, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { MyBooksSkeleton } from "./book-skeleton";
import { DesktopTable } from "./destop-table";
import MobileCards from "./mobile-cards";

function MyBooksContent() {
  usePageTitle("My Books");
  const user = demoUser;
  const books = INITIAL_BOOKS;

  const loading = useSimulatedLoading(600);

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Category | "All">("All");
  const [editing, setEditing] = useState<Book | null>(null);
  const [deleting, setDeleting] = useState<Book | null>(null);

  const myBooks = useMemo(() => {
    if (!user) return [];
    return books.filter(
      (b) => b.addedByEmail.toLowerCase() === user.email.toLowerCase(),
    );
  }, [books, user]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return myBooks.filter((book) => {
      const matchesCategory = category === "All" || book.category === category;
      const matchesQuery =
        !q ||
        book.title.toLowerCase().includes(q) ||
        book.author.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [myBooks, query, category]);

  const hasFilters = query.trim() !== "" || category !== "All";

  return (
    <Container size="wide" className="py-10 sm:py-14">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-2xl">
          <p className="eyebrow">Your contributions</p>
          <h1 className="font-display mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            My Books
          </h1>
          <p className="text-muted-foreground mt-4 text-base leading-relaxed">
            The titles you've carried into the library. Tidy them up, restock
            the copies, or take one home for good.
          </p>
        </div>
        <div className="bg-card rounded-2xl border px-5 py-4 text-center shadow-sm">
          <p className="font-display text-primary text-3xl leading-none font-semibold">
            {myBooks.length}
          </p>
          <p className="text-muted-foreground mt-1.5 text-xs font-medium tracking-wide uppercase">
            {myBooks.length === 1 ? "book added" : "books added"}
          </p>
        </div>
      </header>

      {/* Controls */}
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1 sm:max-w-sm">
          <Search
            aria-hidden
            className="text-muted-foreground pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2"
          />
          <Input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search your books…"
            aria-label="Search your books"
            className="bg-card h-10 rounded-full pl-10"
          />
        </div>
        <div
          className="flex scrollbar-thin gap-2 overflow-x-auto pb-1"
          role="group"
          aria-label="Filter your books by category"
        >
          {(["All", ...CATEGORIES] as const).map((option) => (
            <button
              key={option}
              type="button"
              aria-pressed={category === option}
              onClick={() => setCategory(option)}
              className={cn(
                "shrink-0 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
                category === option
                  ? "border-primary bg-primary text-primary-foreground"
                  : "bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground",
              )}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="mt-6">
        {loading ? (
          <MyBooksSkeleton />
        ) : visible.length === 0 ? (
          <EmptyState
            icon={BookMarked}
            title={
              hasFilters ? "Nothing matches here" : "Your shelf is waiting"
            }
            description={
              hasFilters
                ? "None of your books match the current search or shelf filter."
                : "You haven't added any books yet. Share the first one — the library grows book by book."
            }
            action={
              hasFilters
                ? {
                    label: "Clear filters",
                    onClick: () => {
                      setQuery("");
                      setCategory("All");
                    },
                  }
                : { label: "Add your first book", href: "/add-book" }
            }
          />
        ) : (
          <>
            {/* Desktop table */}
            <DesktopTable
              books={visible}
              setDeleting={setDeleting}
              setEditing={setEditing}
            />

            {/* Mobile cards */}
            <MobileCards
              books={visible}
              setDeleting={setDeleting}
              setEditing={setEditing}
            />
          </>
        )}
      </div>

      <EditBookSheet
        book={editing}
        open={!!editing}
        onOpenChange={(next) => {
          if (next) return;
          setEditing(null);
        }}
      />
      <DeleteBookDialog
        book={deleting}
        open={!!deleting}
        onOpenChange={(next) => {
          if (next) return;
          setDeleting(null);
        }}
      />
    </Container>
  );
}

export default function MyBooksView() {
  return <MyBooksContent />;
}
