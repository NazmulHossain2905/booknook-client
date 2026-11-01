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
import { usePathname } from "next/navigation";
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
import { demoUser } from "@/data";
import { User } from "@/types";
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

  const user: User = demoUser;

  const links = [...PUBLIC_LINKS, ...(user ? PRIVATE_LINKS : [])];
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
        </div>

        {/* Right cluster */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <ThemeToggle />

          {user ? (
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
              <UserMenu />
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
                {user ? (
                  <>
                    <div className="flex items-center gap-3">
                      <UserAvatar src={user.avatar} name={user.name} />
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold">
                          {user.name}
                        </p>
                        <p className="text-muted-foreground truncate text-xs">
                          {user.email}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        setOpen(false);
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
