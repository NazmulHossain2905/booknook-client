"use client";

import { cn } from "cn";
import Link from "next/link";
import { LogoWordMark } from "./logo";

import {
  BookMarked,
  BookOpen,
  Home,
  LibraryBig,
  LogOut,
  Menu,
  PlusCircle,
  ScrollText,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";
import { ThemeToggle } from "./theme-toggle";
import { UserMenu } from "./user-menu";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { signOut, useSession } from "@/lib/auth-client";
import { toast } from "sonner";
import { UserAvatar } from "../shared/book-cover";

const PUBLIC_LINKS = [
  { href: "/", label: "Home", icon: Home },
  { href: "/books", label: "All Books", icon: LibraryBig },
];

const PRIVATE_LINKS = [
  { href: "/add-book", label: "Add Book", icon: PlusCircle },
  { href: "/my-books", label: "My Books", icon: BookMarked },
  { href: "/my-borrows", label: "My Borrows", icon: ScrollText },
];

function NavLink({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
        active
          ? "text-primary"
          : "text-muted-foreground hover:bg-accent hover:text-foreground",
      )}
    >
      {label}
      {active && (
        <span className="bg-gold absolute inset-x-3.5 -bottom-3.25 h-0.5 rounded-full" />
      )}
    </Link>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const { data: session, isPending } = useSession();
  const user = session?.user;

  const router = useRouter();

  const handleSignOut = async () => {
    try {
      const { data } = await signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push("/login");
            // router.refresh();
          },
        },
      });

      if (data?.success) {
        toast.success("Sign-out successfully");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const links = [...PUBLIC_LINKS, ...(!isPending && user ? PRIVATE_LINKS : [])];
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="border-border/80 bg-background/85 sticky top-0 z-50 border-b backdrop-blur-md">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8"
      >
        {/* Brand */}
        <Link
          href="/"
          aria-label="BookNook — home"
          className="focus-visible:ring-ring/50 rounded-md outline-none focus-visible:ring-[3px]"
        >
          <LogoWordMark />
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-0.5 lg:flex">
          {links.map((link) => (
            <NavLink
              key={link.href}
              href={link.href}
              label={link.label}
              active={isActive(link.href)}
            />
          ))}
          {/* Session skeletons — placeholders for the private links while
              the session is still loading, so the layout doesn't jump */}
          {isPending &&
            PRIVATE_LINKS.map((link) => (
              <Skeleton
                key={link.href}
                aria-hidden
                className="mx-0.5 h-9 w-24 rounded-full"
              />
            ))}
        </div>

        {/* Right cluster */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <ThemeToggle />

          {isPending ? (
            <>
              <Skeleton
                aria-hidden
                className="hidden h-9 w-28 rounded-full sm:block"
              />
              <Skeleton aria-hidden className="size-8 rounded-full" />
            </>
          ) : user ? (
            <>
              <Button
                asChild
                variant="ghost"
                className="text-muted-foreground hover:text-foreground hidden sm:inline-flex"
              >
                <Link href="/add-book">
                  <PlusCircle aria-hidden className="size-4" />
                  Add Book
                </Link>
              </Button>
              <UserMenu user={user} />
            </>
          ) : (
            <div className="hidden items-center gap-2 sm:flex">
              <Button asChild variant="ghost" size="sm">
                <Link href="/login">Sign in</Link>
              </Button>
              <Button asChild size="sm" className="rounded-full px-5">
                <Link href="/register">
                  <BookOpen aria-hidden className="size-4" />
                  Join the Library
                </Link>
              </Button>
            </div>
          )}

          {/* Mobile menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Open navigation menu"
                className="rounded-full lg:hidden"
              >
                <Menu aria-hidden className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex w-75 flex-col gap-0 p-0">
              <SheetHeader className="border-border/70 border-b p-5">
                <SheetTitle asChild>
                  <div>
                    <LogoWordMark compact />
                  </div>
                </SheetTitle>
                <SheetDescription className="sr-only">
                  Main navigation menu for BookNook
                </SheetDescription>
              </SheetHeader>

              <nav
                aria-label="Mobile navigation"
                className="flex-1 scrollbar-thin space-y-1 overflow-y-auto p-4"
              >
                {links.map((link) => {
                  const Icon = link.icon;
                  const active = isActive(link.href);
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                        active
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-accent hover:text-foreground",
                      )}
                    >
                      <Icon aria-hidden className="size-4.5" />
                      {link.label}
                    </Link>
                  );
                })}
              </nav>

              <div className="border-border/70 space-y-3 border-t p-5">
                {isPending ? (
                  <div aria-hidden className="flex items-center gap-3">
                    <Skeleton className="size-9 shrink-0 rounded-full" />
                    <div className="min-w-0 flex-1 space-y-2">
                      <Skeleton className="h-4 w-28 max-w-full" />
                      <Skeleton className="h-3 w-40 max-w-full" />
                    </div>
                  </div>
                ) : user ? (
                  <>
                    <div className="flex items-center gap-3">
                      <UserAvatar src={user.image} name={user.name} />
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold">
                          {user?.name}
                        </p>
                        <p className="text-muted-foreground truncate text-xs">
                          {user?.email}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        setOpen(false);
                        handleSignOut();
                      }}
                    >
                      <LogOut aria-hidden className="size-4" />
                      Log out
                    </Button>
                  </>
                ) : (
                  <div className="grid gap-2">
                    <Button
                      asChild
                      variant="outline"
                      onClick={() => setOpen(false)}
                    >
                      <Link href="/login">Sign in</Link>
                    </Button>
                    <Button asChild onClick={() => setOpen(false)}>
                      <Link href="/register">
                        <BookOpen aria-hidden className="size-4" />
                        Join the Library
                      </Link>
                    </Button>
                  </div>
                )}
                <p className="text-muted-foreground flex items-center justify-between pt-1 text-xs">
                  <span>Appearance</span>
                  <ThemeToggle />
                </p>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
