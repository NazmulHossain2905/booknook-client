# 📚 BookNook Client

> A modern, responsive digital library web application where readers discover, share, borrow, and return books — built with **Next.js 16**, **TypeScript**, and **Tailwind CSS**.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss)
![Better Auth](https://img.shields.io/badge/Better_Auth-1.7-F97316)

---

## ✨ Features

### 🏠 Home

- Animated **hero slider** showcasing featured titles (Swiper + Framer Motion)
- **Category showcase** for quick browsing (Fiction, Science, History, Kids, Others)
- **New arrivals** section with the latest community books
- Community stats and call-to-action sections with scroll **reveal animations**

### 📖 Books

- Browse **all books** fetched live from the backend
- **Search** by title or author, **filter** by category, **sort** (newest / oldest / title A–Z / Z–A)
- Category selection is synced to the URL (`/books?category=Fiction`) so filters are shareable
- Detailed **book page** with description, availability, contributor info, and related books
- **Availability badge** showing live copy counts

### ➖ Borrowing & Returns

- Borrow a book through a **confirmation dialog** with an auto-calculated due date (14-day loan)
- **Return dialog** to hand a book back early
- **My Borrows** dashboard with status badges (`borrowed` / `returned`) and friendly due labels like _"Due in 3 days"_ or _"Overdue by 2 days"_

### ➕ Contribution (CRUD)

- **Add a book** to the library with a **live preview** card as you type
- **Edit** your books through a slide-in sheet
- **Delete** with a protected confirmation dialog
- **My Books** dashboard — responsive table on desktop, cards on mobile — with search + category filters

### 👤 Authentication & Profile

- **Email & password** sign-up / sign-in with a live **password strength checklist**
- **Google OAuth** social login
- Sessions handled by **Better Auth** with **JWT** tokens and 7-day cookie caching
- **Profile page** summarizing your contributions and borrow activity

### 💎 UI/UX

- **Dark / light mode** toggle (persisted, system-aware via `next-themes`)
- Fully **responsive** from mobile to widescreen
- **Skeletons** on every data-driven page for smooth loading states
- Contextual **toast notifications** (Sonner) and accessible **empty states**
- Custom typography system — Geist, Inter, and Frances display font

### 🔒 Route Protection

- **Next.js proxy (middleware)** guards private routes (`/add-book`, `/my-books`, `/my-borrows`, `/profile`, `/books/[id]`) and redirects logged-in users away from `/login` and `/register`

---

## 🛠️ Tech Stack

| Layer      | Technology                                                                                                    |
| ---------- | ------------------------------------------------------------------------------------------------------------- |
| Framework  | [Next.js 16](https://nextjs.org) (App Router, Turbopack)                                                      |
| Language   | [TypeScript 5](https://www.typescriptlang.org)                                                                |
| UI Library | [React 19](https://react.dev)                                                                                 |
| Styling    | [Tailwind CSS 4](https://tailwindcss.com) + `tw-animate-css`                                                  |
| Components | [shadcn/ui](https://ui.shadcn.com) on [Radix UI](https://www.radix-ui.com)                                    |
| Auth       | [Better Auth](https://better-auth.com) + MongoDB adapter + JWT plugin                                         |
| Database   | [MongoDB](https://www.mongodb.com) (auth data)                                                                |
| Forms      | [React Hook Form](https://react-hook-form.com) + [Zod-style resolvers](https://github.com/hookform/resolvers) |
| Animation  | [Framer Motion](https://motion.dev), [Swiper](https://swiperjs.com)                                           |
| Icons      | [Lucide React](https://lucide.dev)                                                                            |
| Dates      | [date-fns](https://date-fns.org)                                                                              |
| Toasts     | [Sonner](https://sonner.emilkowal.ski)                                                                        |
| Theming    | [next-themes](https://github.com/pacocoursey/next-themes)                                                     |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js 20+**
- **npm** (or any compatible package manager)
- A running instance of the **BookNook backend API** (defaults to `http://localhost:5000`)
- A **MongoDB** connection string (local Atlas/cluster instance)
- **Google OAuth** credentials (optional — only needed for Google sign-in)

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/booknook-client.git
cd booknook-client
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```bash
# Auth
BETTER_AUTH_SECRET=<your-auth-secret>          # Secret used to sign auth tokens
BETTER_AUTH_URL=http://localhost:3000          # Base URL of this app

# Backend API (BookNook server)
NEXT_PUBLIC_API_URL=http://localhost:5000      # Base URL of the backend API

# Database (auth users, sessions)
MONGODB_URI=<your-mongodb-connection-string>

# Google OAuth (optional)
GOOGLE_CLIENT_ID=<your-google-client-id>
GOOGLE_CLIENT_SECRET=<your-google-client-secret>
```

> ⚠️ **Never commit real credentials.** Keep `.env` out of version control (it is already in `.gitignore`).

### 4. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Production build

```bash
npm run build
npm start
```

---

## 🧪 Available Scripts

| Command                  | Description                                              |
| ------------------------ | -------------------------------------------------------- |
| `npm run dev`            | Start the development server (Turbopack) with hot reload |
| `npm run build`          | Build the app for production                             |
| `npm start`              | Serve the production build                               |
| `npm run lint`           | Run ESLint checks                                        |
| `npx prettier . --write` | Format the codebase with Prettier                        |

---

## 🗺️ Pages & Routes

| Route                | Access     | Description                                              |
| -------------------- | ---------- | -------------------------------------------------------- |
| `/`                  | Public     | Landing page — hero, categories, new arrivals, community |
| `/books?category=…`  | Public     | Browse all books with search, filter & sort              |
| `/books/[id]`        | 🔒 Private | Book details, borrow, edit/delete (owner), related books |
| `/add-book`          | 🔒 Private | Add a new book with live preview                         |
| `/my-books`          | 🔒 Private | Manage your contributed books (edit / delete)            |
| `/my-borrows`        | 🔒 Private | Your borrow history and returns                          |
| `/profile`           | 🔒 Private | Profile overview: stats, contributions, borrows          |
| `/login`             | Guest only | Sign in (email/password or Google)                       |
| `/register`          | Guest only | Create an account with password checklist                |
| `/api/auth/[...all]` | Public     | Better Auth API handler                                  |
| `*`                  | Public     | Custom 404 — not found page                              |

---

## 🔗 Backend API Contract

The client is a thin, read/write layer over a separate REST backend (`NEXT_PUBLIC_API_URL`). Requests to protected endpoints carry a `Bearer` JWT obtained from Better Auth (via `getServerToken` on the server or `getClientToken` in the browser).

| Endpoint             | Method        | Used for                                |
| -------------------- | ------------- | --------------------------------------- |
| `/books`             | `GET`         | All books (home, browse, related lists) |
| `/books`             | `POST`        | Add a book                              |
| `/books/:id`         | `GET`         | Single book details                     |
| `/books/:id`         | `PUT / PATCH` | Edit a book (owner only)                |
| `/books/:id`         | `DELETE`      | Remove a book (owner only)              |
| `/my-books/:email`   | `GET`         | Books added by a member                 |
| `/borrows`           | `POST`        | Borrow a book                           |
| `/borrows/:email`    | `GET`         | Borrow history for a member             |
| `/borrows/:recordId` | `PATCH`       | Mark a book as returned                 |

### Data models

- **`Book`** — `_id`, `title`, `author`, `category`, `image`, `description`, `totalCopies`, `availableCopies`, `addedBy`, `addedByEmail`, `addedAt`
- **`BorrowRecord`** — `_id`, `bookId`, book detail _snapshots_ (title/image/author), `userEmail`, `borrowDate`, `returnDate`, `returnedAt`, `status`
- **`Category`** — `"Fiction" | "Science" | "History" | "Kids" | "Others"`

---

## 🏗️ Project Structure

```
src/
├── app/                        # Next.js App Router pages
│   ├── (auth)/                 # Route group: auth pages (no URL prefix)
│   │   ├── login/              #   /login     (+ _components/)
│   │   ├── register/           #   /register  (+ password checklist)
│   │   └── profile/            #   /profile   (+ skeleton, view)
│   ├── add-book/               # /add-book form page
│   ├── books/                  # /books listing
│   │   └── [id]/               # /books/:id dynamic details (SSR)
│   ├── my-books/               # /my-books dashboard (table + mobile cards)
│   ├── my-borrows/             # /my-borrows dashboard
│   ├── api/auth/[...all]/      # Better Auth catch-all route
│   ├── layout.tsx              # Root layout: navbar, footer, providers, fonts
│   ├── page.tsx                # Home page
│   ├── not-found.tsx           # Custom 404
│   └── globals.css             # Tailwind + design tokens
│
├── components/
│   ├── books/                  # Feature: book-card, book-form, borrow/return/delete
│   │                            # dialogs, edit sheet, live preview
│   ├── home/                   # Feature: hero slider, categories, new arrivals, CTA
│   ├── layout/                 # App shell: navbar, footer, logo, theme toggle, user menu
│   ├── providers/              # Theme + app-level providers
│   ├── shared/                 # Cross-feature: container, empty state, skeletons,
│   │                            # badges, book cover, section heading, reveal
│   └── ui/                     # shadcn/ui primitives (button, dialog, form, table…)
│
├── constants/                  # BASE_URL and shared constants
├── data/                       # Static/mock data (e.g. avatar contributors)
├── hooks/                      # Custom hooks (use-page-title)
├── lib/                        # auth, auth-client, token helpers, formatters, utils
├── schemas/                    # Form validation schemas (auth, book)
├── types/                      # TypeScript types, categories, sort options
└── proxy.ts                    # Route protection (Next.js proxy/middleware)
```

### Conventions

- **Colocation** — page-specific components live in `_components/` next to their `page.tsx`. Files starting with `_` are excluded from routing.
- **View pattern** — server pages fetch data and pass it to a `"use client"` _view_ component for interactivity.
- **Loading states** — every data page ships a `loading.tsx` + skeleton components.
- **Feature/shared split** — feature components live under `components/<feature>`, reusable pieces under `components/shared`, primitives under `components/ui`.

---

## 🔑 Authentication Flow

1. Users register or sign in via `/register` / `/login` (email/password or Google OAuth).
2. **Better Auth** validates credentials, persists users/sessions in MongoDB, and issues a **JWT**.
3. Sessions are cached in an httpOnly cookie for up to **7 days** (`cookieCache` strategy).
4. `src/proxy.ts` checks the session on every protected navigation and redirects to `/login` when unauthenticated.
5. Server components call `getServerToken()` (reads the event headers) and client dialogs call `getClientToken()` to attach `Authorization: Bearer …` headers to backend API requests.

---

## 🎨 Design System

- **Fonts** — Geist (UI), Inter (body fallback), Fraunces (`font-display` headings)
- **Theme tokens** — Tailwind CSS 4 design tokens defined in `globals.css` (`--primary`, `--muted`, `--card`, etc.)
- **Dark mode** — class-based via `next-themes`, toggled from the navbar, persisted per user
- **Spacing/layout** — `Container` component with `wide` / default sizes for consistent page rhythm

---

## 🧭 Roadmap

- [ ] Pagination or infinite scroll on the books page
- [ ] Book cover uploads to cloud storage
- [ ] Wishlist / favourites
- [ ] Email notifications before due dates
- [ ] Admin dashboard & librarian role

---

## 🤝 Contributing

1. Fork the project
2. Create your feature branch: `git checkout -b feature/awesome-feature`
3. Commit your changes: `git commit -m "feat: add awesome feature"`
4. Push to the branch: `git push origin feature/awesome-feature`
5. Open a pull request

Before opening a PR, run `npm run lint` and verify the production build succeeds with `npm run build`.

---

## 📄 License

Distributed under the [MIT License](https://opensource.org/licenses/MIT). See the repository's license file for details.

---

<div align="center">
  <sub>Built with ❤️ for readers everywhere — <em>BookNook, the library that fits in your browser.</em></sub>
</div>
