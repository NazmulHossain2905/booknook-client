import { BASE_URL } from "@/constants";
import { auth } from "@/lib/auth";
import { getServerToken } from "@/lib/getServerToken";
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

  const token = await getServerToken();

  const res = await fetch(`${BASE_URL}/my-books/${user?.email}`, {
    headers: { authorization: token },
  });
  const data = await res.json();

  const myBooks = data.data;

  return <MyBooksView myBooks={myBooks} />;
}
