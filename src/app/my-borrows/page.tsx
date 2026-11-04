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
  const token = user ? await getServerToken() : null;

  const res =
    user && token
      ? await fetch(`${BASE_URL}/borrows/${encodeURIComponent(user.email)}`, {
          cache: "no-store",
          headers: { authorization: token },
        })
      : null;
  const borrows: BorrowRecord[] =
    res && res.ok
      ? (((await res.json().catch(() => null))?.data as BorrowRecord[]) ?? [])
      : [];

  // `res === null` means we never got to make the call (no user/session token).
  const failed = !res || !res.ok;

  return <MyBorrowsView borrows={borrows} error={failed} />;
}
