import { LogoWordMark } from "@/components/layout/logo";
import { Container } from "@/components/shared/container";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  XIcon,
  YoutubeIcon,
} from "@/components/shared/social-icons";
import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

const QUICK_LINKS = [
  { href: "/", label: "Home" },
  { href: "/books", label: "All Books" },
  { href: "/add-book", label: "Add a Book" },
  { href: "/my-books", label: "My Books" },
  { href: "/my-borrows", label: "My Borrows" },
];

const CATEGORY_LINKS = [
  { href: "/books?category=Fiction", label: "Fiction" },
  { href: "/books?category=Science", label: "Science" },
  { href: "/books?category=History", label: "History" },
  { href: "/books?category=Kids", label: "Kids" },
  { href: "/books?category=Others", label: "Others" },
];

const SOCIALS = [
  { label: "Facebook", href: "https://facebook.com", icon: FacebookIcon },
  { label: "Instagram", href: "https://instagram.com", icon: InstagramIcon },
  { label: "X", href: "https://x.com", icon: XIcon },
  { label: "YouTube", href: "https://youtube.com", icon: YoutubeIcon },
  { label: "LinkedIn", href: "https://linkedin.com", icon: LinkedInIcon },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-deep text-deep-foreground mt-auto">
      <Container size="wide" className="py-14 sm:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* Brand */}
          <div className="max-w-sm">
            <div className="[&_span.font-display]:text-deep-foreground [&_span.text-primary]:text-gold-soft">
              <LogoWordMark />
            </div>
            <p className="text-deep-foreground/70 mt-5 text-sm leading-relaxed">
              A small online library with a big heart. Add a book, borrow a
              book, return a book — and pass the love of reading along.
            </p>
            <div className="mt-6 flex items-center gap-1">
              {SOCIALS.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-deep-foreground/70 hover:text-deep-foreground flex size-9 items-center justify-center rounded-full transition-colors hover:bg-white/10"
                  >
                    <Icon className="size-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick links */}
          <nav aria-label="Footer navigation">
            <h3 className="font-display text-gold-soft text-sm font-semibold tracking-[0.18em] uppercase">
              Explore
            </h3>
            <ul className="mt-4 space-y-2.5">
              {QUICK_LINKS.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className="text-deep-foreground/70 hover:text-deep-foreground text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Categories */}
          <nav aria-label="Browse by category">
            <h3 className="font-display text-gold-soft text-sm font-semibold tracking-[0.18em] uppercase">
              Shelves
            </h3>
            <ul className="mt-4 space-y-2.5">
              {CATEGORY_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-deep-foreground/70 hover:text-deep-foreground text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h3 className="font-display text-gold-soft text-sm font-semibold tracking-[0.18em] uppercase">
              Visit the Nook
            </h3>
            <ul className="text-deep-foreground/70 mt-4 space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin
                  aria-hidden
                  className="text-gold-soft mt-0.5 size-4 shrink-0"
                />
                <span>
                  42 Paper Lane, Second Floor
                  <br />
                  Jashore, OR 97205
                </span>
              </li>
              <li>
                <a
                  href="mailto:hello@booknook.app"
                  className="hover:text-deep-foreground flex items-center gap-3 transition-colors"
                >
                  <Mail
                    aria-hidden
                    className="text-gold-soft size-4 shrink-0"
                  />
                  hello@booknook.app
                </a>
              </li>
              <li>
                <a
                  href="tel:+12345678901"
                  className="hover:text-deep-foreground flex items-center gap-3 transition-colors"
                >
                  <Phone
                    aria-hidden
                    className="text-gold-soft size-4 shrink-0"
                  />
                  +880 1234-567891
                </a>
              </li>
            </ul>
          </div>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container
          size="wide"
          className="text-deep-foreground/60 flex flex-col items-center justify-between gap-3 py-6 text-xs sm:flex-row"
        >
          <p>© {year} BookNook. All stories reserved.</p>
          <p className="flex items-center gap-1.5">
            <span
              aria-hidden
              className="bg-gold-soft inline-block size-1.5 rounded-full"
            />
            BookNook — brewed with Next.js, Tailwind & a love of libraries.
          </p>
        </Container>
      </div>
    </footer>
  );
}
