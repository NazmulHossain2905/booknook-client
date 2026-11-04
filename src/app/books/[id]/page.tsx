import { BASE_URL } from "@/constants";
import { auth } from "@/lib/auth";
import { getServerToken } from "@/lib/getServerToken";
import { Book, BorrowRecord } from "@/types";
import type { Metadata } from "next";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import BookDetailsView from "./_components/book-details-view";

interface BookPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: BookPageProps): Promise<Metadata> {
  const { id } = await params;
  const token = await getServerToken();

  let book: Book | null = null;

  try {
    const res = await fetch(`${BASE_URL}/books/${id}`, {
      cache: "no-store",
      ...(token ? { headers: { authorization: token } } : {}),
    });

    book = res.ok
      ? (((await res.json().catch(() => null))?.data as Book | null) ?? null)
      : null;
  } catch {
    book = null;
  }

  return {
    title: book ? book.title : "Book Details",
    description: book
      ? `${book.title} by ${book.author} — ${book.category} in the BookNook library.`
      : "Book details in the BookNook library.",
  };
}

export default async function BookDetailsPage({ params }: BookPageProps) {
  const { id } = await params;
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  const token = user ? await getServerToken() : null;

  const bookRes = await fetch(`${BASE_URL}/books/${id}`, {
    cache: "no-store",
    ...(token ? { headers: { authorization: token } } : {}),
  }).catch(() => null);

  if (!bookRes) {
    throw new Error(`Could not reach the library for book "${id}".`);
  }

  if (bookRes.status === 404) {
    notFound();
  }

  if (bookRes.status === 401 || bookRes.status === 403) {
    redirect(`/login?redirect=${encodeURIComponent(`/books/${id}`)}`);
  }

  const book = bookRes.ok
    ? (((await bookRes.json().catch(() => null))?.data as Book | null) ?? null)
    : null;

  const booksRes = await fetch(`${BASE_URL}/books`, {
    cache: "no-store",
    ...(token ? { headers: { authorization: token } } : {}),
  }).catch(() => null);
  const books =
    booksRes && booksRes.ok
      ? (((await booksRes.json().catch(() => null))?.data as Book[]) ?? [])
      : [];

  const borrowsRes =
    user && token
      ? await fetch(`${BASE_URL}/borrows/${encodeURIComponent(user.email)}`, {
          cache: "no-store",
          headers: { authorization: token },
        }).catch(() => null)
      : null;
  const borrows: BorrowRecord[] =
    borrowsRes && borrowsRes.ok
      ? (((await borrowsRes.json().catch(() => null))
          ?.data as BorrowRecord[]) ?? [])
      : [];

  return <BookDetailsView book={book} books={books} borrows={borrows} />;
}
