import { HeroSlider } from "@/components/home/hero-slider";
import { NewArrivals } from "@/components/home/new-arrivals";
import { INITIAL_BOOKS } from "@/data";

export default function Home() {
  const books = INITIAL_BOOKS;

  return (
    <>
      <HeroSlider books={books} />
      <NewArrivals books={books} />
    </>
  );
}
