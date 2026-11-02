export type Category = "Fiction" | "Science" | "History" | "Kids" | "Others";

export const CATEGORIES: Category[] = [
  "Fiction",
  "Science",
  "History",
  "Kids",
  "Others",
];

export interface User {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  emailVerified: boolean;
  name: string;
  image?: string | null | undefined;
}

export interface Book {
  _id: string;
  title: string;
  author: string;
  category: Category;
  image: string;
  description: string;
  totalCopies: number;
  availableCopies: number;
  /** Display name of the member who added the book */
  addedBy: string;
  /** Email of the member who added the book — used for ownership checks */
  addedByEmail: string;
  /** ISO date the book was added */
  addedAt: string;
}

export type BorrowStatus = "borrowed" | "returned";

export interface BorrowRecord {
  id: string;
  bookId: string;
  /** Snapshot of book details so deleted books still render in history */
  bookTitle: string;
  bookImage: string;
  bookAuthor: string;
  userEmail: string;
  /** ISO date the book was borrowed */
  borrowDate: string;
  /** ISO date the book is due back */
  returnDate: string;
  /** ISO date the book was actually returned, null while still on loan */
  returnedAt: string | null;
  status: BorrowStatus;
}

export type SortOption = "newest" | "oldest" | "title-asc" | "title-desc";

export const SORT_LABELS: Record<SortOption, string> = {
  newest: "Newest first",
  oldest: "Oldest first",
  "title-asc": "Title A–Z",
  "title-desc": "Title Z–A",
};
