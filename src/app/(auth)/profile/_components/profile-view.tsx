"use client";

import { UserAvatar } from "@/components/shared/book-cover";
import { Container } from "@/components/shared/container";
import { EmptyState } from "@/components/shared/empty-state";
import { LoadFailedState } from "@/components/shared/load-failed-state";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usePageTitle } from "@/hooks/use-page-title";
import { updateUser, useSession } from "@/lib/auth-client";
import { formatDate } from "@/lib/format";
import { Book, BorrowRecord, User } from "@/types";
import {
  BookMarked,
  BookOpen,
  CalendarDays,
  Loader2,
  Mail,
  Save,
  ScrollText,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { ProfileSkeleton } from "./profile-skeleton";

/** Identity card — remounted per user so its edits always start from the
    session's current values (React's keyed-reset pattern, no sync effect). */
function ProfileEditorCard({ user }: { user: User }) {
  const [name, setName] = useState(user.name);
  const [photoUrl, setPhotoUrl] = useState(user.image ?? "");
  const [saving, setSaving] = useState(false);

  const dirty =
    name.trim() !== user.name || photoUrl.trim() !== (user.image ?? "");

  const onSave = async () => {
    if (name.trim().length < 2) {
      toast.error("Name too short", {
        description: "Your display name needs at least 2 characters.",
      });
      return;
    }
    setSaving(true);

    const { data, error } = await updateUser({ name, image: photoUrl });

    if (data?.status) {
      toast.success("Profile updated", {
        description: "Your reader's card has been reprinted.",
      });
    }

    if (error?.message) {
      toast.error("Couldn't update", {
        description: error.message ?? "Failed to update",
      });
    }

    setSaving(false);
  };

  return (
    <section
      aria-label="Profile details"
      className="bg-card rounded-2xl border p-6 shadow-sm sm:p-8"
    >
      <div className="flex flex-wrap items-center gap-5">
        <UserAvatar
          src={photoUrl || user.image}
          name={name || user.name}
          className="size-20"
        />
        <div className="min-w-0">
          <h2 className="font-display text-2xl leading-tight font-semibold">
            {name || user.name}
          </h2>
          <p className="text-muted-foreground mt-1 flex items-center gap-2 text-sm">
            <Mail aria-hidden className="size-3.5" />
            {user.email}
          </p>
          <p className="text-muted-foreground mt-1 flex items-center gap-2 text-xs">
            <CalendarDays aria-hidden className="text-gold size-3.5" />
            Member since {formatDate(user.createdAt)}
          </p>
        </div>
      </div>

      <div className="mt-8 space-y-5 border-t pt-6">
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="profile-name">Display name</Label>
            <Input
              id="profile-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="profile-photo">Photo URL</Label>
            <Input
              id="profile-photo"
              type="url"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
              placeholder="https://…"
            />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-muted-foreground text-xs">
            {dirty ? "You have unsaved changes." : "Your card is up to date."}
          </p>
          <Button
            onClick={onSave}
            disabled={!dirty || saving}
            className="rounded-full"
          >
            {saving ? (
              <>
                <Loader2 aria-hidden className="size-4 animate-spin" />
                Saving…
              </>
            ) : (
              <>
                <Save aria-hidden className="size-4" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </div>
    </section>
  );
}

function ProfileContent({
  books,
  borrows,
  error = false,
}: {
  books: Book[];
  borrows: BorrowRecord[];
  error?: boolean;
}) {
  usePageTitle("My Profile");
  const { data: session, isPending } = useSession();
  const user = session?.user;

  // Route data (books/ borrows) streams in via loading.tsx; while the client
  // session card is still loading, mirror the same skeleton.
  if (isPending) return <ProfileSkeleton />;

  if (!user) {
    return (
      <Container size="default" className="py-10 sm:py-14">
        <EmptyState
          icon={UserRound}
          title="You're signed out"
          description="Your session has ended. Sign in again to see your reader's card and library activity."
          action={{ label: "Sign in", href: "/login?redirect=%2Fprofile" }}
        />
      </Container>
    );
  }

  if (error) {
    return (
      <Container size="default" className="py-10 sm:py-14">
        <header className="max-w-2xl">
          <p className="eyebrow">Your reader&apos;s card</p>
          <h1 className="font-display mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            My Profile
          </h1>
        </header>
        <div className="mt-10">
          <LoadFailedState
            title="We couldn't load your library activity"
            description="Your profile is here, but the library didn't return your books and borrows. Nothing has been lost — please try again."
          />
        </div>
      </Container>
    );
  }

  const activeBorrows = borrows.filter((b) => b.status === "borrowed");

  return (
    <Container size="default" className="py-10 sm:py-14">
      <header className="max-w-2xl">
        <p className="eyebrow">Your reader&apos;s card</p>
        <h1 className="font-display mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
          My Profile
        </h1>
        <p className="text-muted-foreground mt-4 text-base leading-relaxed">
          A little bit about you, and everything you&apos;ve brought to the library.
        </p>
      </header>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Left: identity + edit */}
        <div className="space-y-6">
          <ProfileEditorCard key={user.id} user={user} />

          {/* Quick links */}
          <div className="grid gap-4 sm:grid-cols-2">
            <Link
              href="/my-books"
              className="group bg-card flex items-center gap-4 rounded-2xl border p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <span className="bg-primary/10 text-primary flex size-11 items-center justify-center rounded-xl">
                <BookMarked aria-hidden className="size-5" />
              </span>
              <span>
                <span className="block text-sm font-semibold">
                  Manage my books
                </span>
                <span className="text-muted-foreground block text-xs">
                  Edit or remove titles you&apos;ve added
                </span>
              </span>
            </Link>
            <Link
              href="/my-borrows"
              className="group bg-card flex items-center gap-4 rounded-2xl border p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <span className="bg-primary/10 text-primary flex size-11 items-center justify-center rounded-xl">
                <ScrollText aria-hidden className="size-5" />
              </span>
              <span>
                <span className="block text-sm font-semibold">My borrows</span>
                <span className="text-muted-foreground block text-xs">
                  Return books you&apos;ve finished
                </span>
              </span>
            </Link>
          </div>
        </div>

        {/* Right: stats */}
        <aside
          aria-label="Library activity"
          className="space-y-4 lg:sticky lg:top-24 lg:self-start"
        >
          <div className="bg-primary text-primary-foreground rounded-2xl p-6 sm:p-8">
            <h2 className="font-display text-xl font-semibold">
              Library activity
            </h2>
            <dl className="mt-6 space-y-5">
              <div className="flex items-center justify-between border-b border-white/15 pb-5">
                <dt className="text-primary-foreground/80 flex items-center gap-2.5 text-sm">
                  <BookMarked aria-hidden className="text-gold-soft size-4" />
                  Books added
                </dt>
                <dd className="font-display text-3xl font-semibold">
                  {books?.length}
                </dd>
              </div>
              <div className="flex items-center justify-between border-b border-white/15 pb-5">
                <dt className="text-primary-foreground/80 flex items-center gap-2.5 text-sm">
                  <BookOpen aria-hidden className="text-gold-soft size-4" />
                  Currently borrowing
                </dt>
                <dd className="font-display text-3xl font-semibold">
                  {activeBorrows.length}
                </dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-primary-foreground/80 flex items-center gap-2.5 text-sm">
                  <ScrollText aria-hidden className="text-gold-soft size-4" />
                  Total borrows
                </dt>
                <dd className="font-display text-3xl font-semibold">
                  {borrows?.length}
                </dd>
              </div>
            </dl>
          </div>

          <p className="text-muted-foreground rounded-2xl border border-dashed p-5 text-center text-xs leading-relaxed">
            Thank you for growing the collection — every book you add is a gift
            to the next reader in the nook.
          </p>
        </aside>
      </div>
    </Container>
  );
}

export default function ProfileView({
  books,
  borrows,
  error = false,
}: {
  books: Book[];
  borrows: BorrowRecord[];
  error?: boolean;
}) {
  return (
    <ProfileContent books={books} borrows={borrows} error={error} />
  );
}
