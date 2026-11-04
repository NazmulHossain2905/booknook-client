import { BASE_URL } from "@/constants";
import { auth } from "@/lib/auth";
import { getServerToken } from "@/lib/getServerToken";
import { Book, BorrowRecord } from "@/types";
import type { Metadata } from "next";
import { headers } from "next/headers";
import ProfileView from "./_components/profile-view";

export const metadata: Metadata = {
  title: "My Profile",
  description: "Your BookNook reader's card — profile and library activity.",
};

export default async function ProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;
  const token = user ? await getServerToken() : null;

  if (!user || !token) {
    return <ProfileView books={[]} borrows={[]} error={Boolean(user)} />;
  }

  const booksRes = await fetch(
    `${BASE_URL}/my-books/${encodeURIComponent(user.email)}`,
    {
      cache: "no-store",
      headers: { authorization: token },
    },
  );
  const books = booksRes.ok
    ? (((await booksRes.json().catch(() => null))?.data as Book[]) ?? [])
    : [];

  const borrowsRes = await fetch(
    `${BASE_URL}/borrows/${encodeURIComponent(user.email)}`,
    {
      cache: "no-store",
      headers: { authorization: token },
    },
  );
  const borrows: BorrowRecord[] = borrowsRes.ok
    ? (((await borrowsRes.json().catch(() => null))?.data as BorrowRecord[]) ??
      [])
    : [];

  return (
    <ProfileView
      books={books}
      borrows={borrows}
      error={!booksRes.ok || !borrowsRes.ok}
    />
  );
}
