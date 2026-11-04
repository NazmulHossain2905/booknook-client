import { CategoryShowcase } from "@/components/home/category-showcase";
import { CommunitySection } from "@/components/home/community-section";
import { CtaBand } from "@/components/home/cta-band";
import { HeroSlider } from "@/components/home/hero-slider";
import { NewArrivals } from "@/components/home/new-arrivals";
import { BASE_URL } from "@/constants";
import { Book } from "@/types";

export default async function Home() {
  const books = await getFeaturedBooks();

  return (
    <>
      <HeroSlider books={books} />
      <NewArrivals books={books} />
      <CategoryShowcase books={books} />
      <CommunitySection />
      <CtaBand />
    </>
  );
}

async function getFeaturedBooks(): Promise<Book[]> {
  try {
    const res = await fetch(`${BASE_URL}/books`, { cache: "no-store" });

    if (!res.ok) return [];

    const data = await res.json().catch(() => null);

    return Array.isArray(data?.data) ? (data.data as Book[]) : [];
  } catch {
    return [];
  }
}
