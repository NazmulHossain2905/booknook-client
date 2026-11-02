import type { Metadata } from "next";
import MyBorrowsView from "./_components/my-borrows-view";

export const metadata: Metadata = {
  title: "My Borrows",
  description:
    "Your borrowing dashboard — current loans, due dates and returns.",
};

export default function MyBorrowsPage() {
  return <MyBorrowsView />;
}
