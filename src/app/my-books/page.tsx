import { BASE_URL } from "@/constants";
import { auth } from "@/lib/auth";
import { getServerToken } from "@/lib/getServerToken";
import { Book } from "@/types";
import type { Metadata } from "next";
import { headers } from "next/headers";
import MyBooksView from "./_components/my-books-view";

export const metadata: Metadata = {
  title: "My Books",
  description: "Manage the books you have added to the BookNook library.",
};

export default async function MyBooksPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  const token = user ? await getServerToken() : null;

  const res =
    user && token
      ? await fetch(`${BASE_URL}/my-books/${encodeURIComponent(user.email)}`, {
          cache: "no-store",
          headers: { authorization: token },
        })
      : null;
  const myBooks: Book[] =
    res && res.ok
      ? ((await res.json().catch(() => null))?.data as Book[]) ?? []
      : [];

  // `res === null` means we never got to make the call (no user/session token).
  const failed = !res || !res.ok;

  return <MyBooksView myBooks={myBooks} error={failed} />;
}
