import type { Metadata } from "next";
import MyBooksView from "./_components/my-books-view";

export const metadata: Metadata = {
  title: "My Books",
  description: "Manage the books you have added to the BookNook library.",
};

export default function MyBooksPage() {
  return <MyBooksView />;
}
