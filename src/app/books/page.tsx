import { BASE_URL } from "@/constants";
import type { Metadata } from "next";
import BooksView from "./_components/books-view";

export const metadata: Metadata = {
  title: "All Books",
  description:
    "Browse every title in the BookNook community library — search, filter by shelf and sort.",
};

export default async function BooksPage() {
  const res = await fetch(`${BASE_URL}/books`);
  const data = await res.json();

  const books = data.data;

  return <BooksView books={books} />;
}
