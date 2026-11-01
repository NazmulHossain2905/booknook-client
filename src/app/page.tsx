import { CategoryShowcase } from "@/components/home/category-showcase";
import { CommunitySection } from "@/components/home/community-section";
import { HeroSlider } from "@/components/home/hero-slider";
import { NewArrivals } from "@/components/home/new-arrivals";
import { INITIAL_BOOKS } from "@/data";

export default function Home() {
  const books = INITIAL_BOOKS;

  return (
    <>
      <HeroSlider books={books} />
      <NewArrivals books={books} />
      <CategoryShowcase books={books} />
      <CommunitySection />
    </>
  );
}
