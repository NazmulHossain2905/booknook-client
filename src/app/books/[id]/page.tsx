import { BASE_URL } from "@/constants";
import type { Metadata } from "next";
import BookDetailsView from "./_components/book-details-view";

interface BookPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: BookPageProps): Promise<Metadata> {
  const { id } = await params;

  const res = await fetch(`${BASE_URL}/books/${id}`);
  const data = await res.json();

  const book = data.data;

  return {
    title: book ? book.title : "Book Details",
    description: book
      ? `${book.title} by ${book.author} — ${book.category} in the BookNook library.`
      : "Book details in the BookNook library.",
  };
}

export default async function BookDetailsPage({ params }: BookPageProps) {
  const { id } = await params;

  const res = await fetch(`${BASE_URL}/books/${id}`);
  const data = await res.json();

  const book = data.data;

  return <BookDetailsView book={book} />;
}
