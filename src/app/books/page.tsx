import { BASE_URL } from "@/constants";
import type { Metadata } from "next";
import { Book } from "@/types";
import BooksView from "./_components/books-view";

export const metadata: Metadata = {
  title: "All Books",
  description:
    "Browse every title in the BookNook community library — search, filter by shelf and sort.",
};

export default async function BooksPage() {
  const res = await fetch(`${BASE_URL}/books`, { cache: "no-store" });

  const books: Book[] = res.ok
    ? ((await res.json().catch(() => null))?.data as Book[]) ?? []
    : [];

  return <BooksView books={books} />;
}
