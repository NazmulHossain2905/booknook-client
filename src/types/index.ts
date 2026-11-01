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
  name: string;
  email: string;
  avatar: string;
  joinedAt: string;
}

export interface Book {
  id: string;
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
