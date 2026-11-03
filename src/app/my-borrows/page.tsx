import { BASE_URL } from "@/constants";
import { auth } from "@/lib/auth";
import { getServerToken } from "@/lib/getServerToken";
import { BorrowRecord } from "@/types";
import type { Metadata } from "next";
import { headers } from "next/headers";
import MyBorrowsView from "./_components/my-borrows-view";

export const metadata: Metadata = {
  title: "My Borrows",
  description:
    "Your borrowing dashboard — current loans, due dates and returns.",
};

export default async function MyBorrowsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;
  const token = await getServerToken();

  const res = user
    ? await fetch(`${BASE_URL}/borrows/${encodeURIComponent(user.email)}`, {
        cache: "no-store",
        headers: { authorization: token },
      })
    : null;
  const borrows: BorrowRecord[] =
    res && res.ok
      ? (((await res.json().catch(() => null))?.data as BorrowRecord[]) ?? [])
      : [];

  return <MyBorrowsView borrows={borrows} />;
}
