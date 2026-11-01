import type { Metadata } from "next";
import AddBookView from "./_components/add-book-view";

export const metadata: Metadata = {
  title: "Add Book",
  description:
    "Share a book from your own shelves with the BookNook community.",
};

export default function AddBookPage() {
  return <AddBookView />;
}
