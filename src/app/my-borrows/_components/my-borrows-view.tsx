"use client";

import { ReturnDialog } from "@/components/books/return-dialog";
import { Container } from "@/components/shared/container";
import { EmptyState } from "@/components/shared/empty-state";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { demoUser, INITIAL_BORROWS } from "@/data";
import { usePageTitle } from "@/hooks/use-page-title";
import { useSimulatedLoading } from "@/hooks/use-simulated-loading";
import { BorrowRecord } from "@/types";
import { BookOpen, BookPlus, ScrollText } from "lucide-react";
import { useMemo, useState } from "react";
import { BorrowCard } from "./borrow-card";
import { BorrowRow } from "./borrow-row";
import { MyBorrowsSkeleton } from "./my-borrow-skeleton";

export default function MyBorrowsView() {
  usePageTitle("My Borrows");
  const user = demoUser;
  const borrows: BorrowRecord[] = INITIAL_BORROWS;
  const loading = useSimulatedLoading(600);
  const [returning, setReturning] = useState<BorrowRecord | null>(null);

  const myBorrows = useMemo(() => {
    if (!user) return [];
    return borrows
      .filter((b) => b.userEmail.toLowerCase() === user.email.toLowerCase())
      .sort((a, b) => {
        if (a.status !== b.status) return a.status === "borrowed" ? -1 : 1;
        return +new Date(b.borrowDate) - +new Date(a.borrowDate);
      });
  }, [borrows, user]);

  const active = myBorrows.filter((b) => b.status === "borrowed");
  const returned = myBorrows.filter((b) => b.status === "returned");

  return (
    <Container size="wide" className="py-10 sm:py-14">
      <header className="max-w-2xl">
        <p className="eyebrow">Your reading nook</p>
        <h1 className="font-display mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
          My Borrows
        </h1>
        <p className="text-muted-foreground mt-4 text-base leading-relaxed">
          Everything you've checked out of the library — what you're reading
          now, and what you've already passed along.
        </p>
      </header>

      {loading ? (
        <div className="mt-8">
          <MyBorrowsSkeleton />
        </div>
      ) : myBorrows.length === 0 ? (
        <div className="mt-8">
          <EmptyState
            icon={ScrollText}
            title="Your reading nook is quiet"
            description="You haven't borrowed anything yet. Wander the shelves and pick your first fortnight of reading."
            action={{ label: "Browse the shelves", href: "/books" }}
          />
        </div>
      ) : (
        <>
          {/* Summary cards */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="bg-card flex items-center gap-4 rounded-2xl border p-5 shadow-sm">
              <span className="bg-primary/10 text-primary flex size-12 shrink-0 items-center justify-center rounded-xl">
                <BookOpen aria-hidden className="size-5.5" />
              </span>
              <div>
                <p className="font-display text-3xl leading-none font-semibold">
                  {active.length}
                </p>
                <p className="text-muted-foreground mt-1.5 text-sm">
                  {active.length === 1
                    ? "book currently borrowed"
                    : "books currently borrowed"}
                </p>
              </div>
            </div>
            <div className="bg-card flex items-center gap-4 rounded-2xl border p-5 shadow-sm">
              <span className="bg-secondary text-muted-foreground flex size-12 shrink-0 items-center justify-center rounded-xl">
                <BookPlus aria-hidden className="size-5.5" />
              </span>
              <div>
                <p className="font-display text-3xl leading-none font-semibold">
                  {returned.length}
                </p>
                <p className="text-muted-foreground mt-1.5 text-sm">
                  {returned.length === 1 ? "book returned" : "books returned"}
                </p>
              </div>
            </div>
          </div>

          {/* Table (desktop) */}
          <div className="bg-card mt-6 hidden overflow-hidden rounded-2xl border shadow-sm md:block">
            <Table>
              <TableHeader>
                <TableRow className="bg-secondary/50 hover:bg-secondary/50">
                  <TableHead className="w-[36%] pl-6">Book</TableHead>
                  <TableHead>Borrow Date</TableHead>
                  <TableHead>Return Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="pr-6 text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {myBorrows.map((record) => (
                  <BorrowRow
                    key={record.id}
                    record={record}
                    onReturn={setReturning}
                  />
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Cards (mobile) */}
          <div className="mt-6 grid gap-4 md:hidden">
            {myBorrows.map((record) => (
              <BorrowCard
                key={record.id}
                record={record}
                onReturn={setReturning}
              />
            ))}
          </div>
        </>
      )}

      <ReturnDialog
        record={returning}
        open={!!returning}
        onOpenChange={(next) => {
          if (next) return;
          setReturning(null);
        }}
      />
    </Container>
  );
}
