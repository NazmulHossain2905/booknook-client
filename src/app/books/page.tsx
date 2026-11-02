import type { Metadata } from "next";
import BooksView from "./_components/books-view";

export const metadata: Metadata = {
  title: "All Books",
  description:
    "Browse every title in the BookNook community library — search, filter by shelf and sort.",
};

export default function BooksPage() {
  return <BooksView />;
}
