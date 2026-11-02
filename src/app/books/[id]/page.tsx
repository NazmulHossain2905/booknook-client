import { INITIAL_BOOKS } from "@/data";
import type { Metadata } from "next";
import BookDetailsView from "./_components/book-details-view";

interface BookPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: BookPageProps): Promise<Metadata> {
  const { id } = await params;
  const book = INITIAL_BOOKS.find((b) => b.id === id);
  return {
    title: book ? book.title : "Book Details",
    description: book
      ? `${book.title} by ${book.author} — ${book.category} in the BookNook library.`
      : "Book details in the BookNook library.",
  };
}

export default async function BookDetailsPage({ params }: BookPageProps) {
  return <BookDetailsView />;
}
