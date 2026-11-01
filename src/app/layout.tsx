import type { Metadata } from "next";
import { Fraunces, Inter, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

export const metadata: Metadata = {
  title: "BookNook — A Modern Community Library",
  description:
    "BookNook is a small online library where readers discover, share, borrow and return books. Add a book, borrow a book, return a book.",
  keywords: ["BookNook", "library", "books", "borrow", "read", "community"],
  icons: { icon: "/booknook.svg" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth" className={cn("font-sans", geist.variable)}>
      <body
        className={`${inter.variable} ${fraunces.variable} font-sans antialiased`}
      >
        <div className="flex min-h-screen flex-col">
          <main id="main" className="flex-1">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
