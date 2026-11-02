import { CategoryShowcase } from "@/components/home/category-showcase";
import { CommunitySection } from "@/components/home/community-section";
import { CtaBand } from "@/components/home/cta-band";
import { HeroSlider } from "@/components/home/hero-slider";
import { NewArrivals } from "@/components/home/new-arrivals";
import { BASE_URL } from "@/constants";

export default async function Home() {
  const res = await fetch(`${BASE_URL}/books`);
  const data = await res.json();

  const books = data.data;

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
