import { BorrowRecord, User } from "@/types";

export const demoUser: User = {
  image: "https://avatars.githubusercontent.com/u/110978821?v=4",
  email: "nazmul@example.com",
  id: "sdfa",
  createdAt: new Date(),
  name: "Nazmul Hossain",
  emailVerified: false,
  updatedAt: new Date(),
};

const cover = (isbn: string) =>
  `https://wsrv.nl/?url=covers.openlibrary.org/b/isbn/${isbn}-L.jpg&w=480&fit=cover`;

export const INITIAL_BORROWS: BorrowRecord[] = [
  {
    _id: "br-1",
    bookId: "bk-atomic-habits",
    bookTitle: "Atomic Habits",
    bookImage: cover("9780735211292"),
    bookAuthor: "James Clear",
    userEmail: "alex@example.com",
    borrowDate: "2026-10-28T10:45:00.000Z",
    returnDate: "2026-11-11T10:45:00.000Z",
    returnedAt: null,
    status: "borrowed",
  },
  {
    _id: "br-2",
    bookId: "bk-guns-germs-steel",
    bookTitle: "Guns, Germs, and Steel",
    bookImage: cover("9780393354324"),
    bookAuthor: "Jared Diamond",
    userEmail: "alex@example.com",
    borrowDate: "2026-10-16T09:10:00.000Z",
    returnDate: "2026-10-30T09:10:00.000Z",
    returnedAt: null,
    status: "borrowed",
  },
  {
    _id: "br-3",
    bookId: "bk-cosmos",
    bookTitle: "Cosmos",
    bookImage: cover("9780345539434"),
    bookAuthor: "Carl Sagan",
    userEmail: "alex@example.com",
    borrowDate: "2026-10-20T15:00:00.000Z",
    returnDate: "2026-11-03T15:00:00.000Z",
    returnedAt: null,
    status: "borrowed",
  },
  {
    _id: "br-4",
    bookId: "bk-sapiens",
    bookTitle: "Sapiens",
    bookImage: cover("9780062316097"),
    bookAuthor: "Yuval Noah Harari",
    userEmail: "alex@example.com",
    borrowDate: "2026-10-02T11:30:00.000Z",
    returnDate: "2026-10-16T11:30:00.000Z",
    returnedAt: "2026-10-12T16:20:00.000Z",
    status: "returned",
  },
  {
    _id: "br-5",
    bookId: "bk-book-thief",
    bookTitle: "The Book Thief",
    bookImage: cover("9780375842207"),
    bookAuthor: "Markus Zusak",
    userEmail: "alex@example.com",
    borrowDate: "2026-09-18T08:00:00.000Z",
    returnDate: "2026-10-02T08:00:00.000Z",
    returnedAt: "2026-09-25T19:45:00.000Z",
    status: "returned",
  },
  {
    _id: "br-6",
    bookId: "bk-alchemist",
    bookTitle: "The Alchemist",
    bookImage: cover("9780062315007"),
    bookAuthor: "Paulo Coelho",
    userEmail: "alex@example.com",
    borrowDate: "2026-09-05T13:15:00.000Z",
    returnDate: "2026-09-19T13:15:00.000Z",
    returnedAt: "2026-09-10T10:05:00.000Z",
    status: "returned",
  },
];

/** Mock members who added books — used for avatar fallbacks on the details page. */
export const MOCK_CONTRIBUTORS = [
  {
    name: "Alex Morgan",
    email: "alex@example.com",
    avatar: "https://i.pravatar.cc/160?img=12",
  },
  {
    name: "Priya Sharma",
    email: "priya@example.com",
    avatar: "https://i.pravatar.cc/160?img=47",
  },
  {
    name: "Daniel Chen",
    email: "daniel@example.com",
    avatar: "https://i.pravatar.cc/160?img=33",
  },
  {
    name: "Maya Okafor",
    email: "maya@example.com",
    avatar: "https://i.pravatar.cc/160?img=32",
  },
];
