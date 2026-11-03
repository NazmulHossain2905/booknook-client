"use client";

import { UserAvatar } from "@/components/shared/book-cover";
import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usePageTitle } from "@/hooks/use-page-title";
import { updateUser, useSession } from "@/lib/auth-client";
import { formatDate } from "@/lib/format";
import { Book, BorrowRecord } from "@/types";
import {
  BookMarked,
  BookOpen,
  CalendarDays,
  Loader2,
  Mail,
  Save,
  ScrollText,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

function ProfileContent({
  books,
  borrows,
}: {
  books: Book[];
  borrows: BorrowRecord[];
}) {
  usePageTitle("My Profile");
  const { data: session, isPending } = useSession();
  const user = session?.user;

  const [name, setName] = useState(user?.name ?? "");
  const [photoUrl, setPhotoUrl] = useState(user?.image ?? "");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setPhotoUrl(user.image!);
    }
  }, [user]);

  if (!user) return null;

  const activeBorrows = borrows.filter((b) => b.status === "borrowed");

  const dirty = name.trim() !== user.name || photoUrl.trim() !== user.image;

  const onSave = async () => {
    if (name.trim().length < 2) {
      toast.error("Name too short", {
        description: "Your display name needs at least 2 characters.",
      });
      return;
    }
    setSaving(true);
    await new Promise((r) => setTimeout(r, 600));

    const { data, error } = await updateUser({ name, image: photoUrl });

    if (data?.status) {
      toast.success("Profile updated", {
        description: "Your reader's card has been reprinted.",
      });
    }

    if (error?.message) {
      toast.success("Couldn't update", {
        description: error.message ?? "Failed to update",
      });
    }

    setSaving(false);
  };

  return (
    <Container size="default" className="py-10 sm:py-14">
      <header className="max-w-2xl">
        <p className="eyebrow">Your reader's card</p>
        <h1 className="font-display mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
          My Profile
        </h1>
        <p className="text-muted-foreground mt-4 text-base leading-relaxed">
          A little bit about you, and everything you've brought to the library.
        </p>
      </header>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Left: identity + edit */}
        <div className="space-y-6">
          <section
            aria-label="Profile details"
            className="bg-card rounded-2xl border p-6 shadow-sm sm:p-8"
          >
            <div className="flex flex-wrap items-center gap-5">
              <UserAvatar
                src={photoUrl || user.image!}
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
                  {dirty
                    ? "You have unsaved changes."
                    : "Your card is up to date."}
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
                  Edit or remove titles you've added
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
                  Return books you've finished
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
}: {
  books: Book[];
  borrows: BorrowRecord[];
}) {
  return <ProfileContent books={books} borrows={borrows} />;
}
