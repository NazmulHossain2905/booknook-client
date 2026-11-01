import { HeroSlider } from "@/components/home/hero-slider";
import { INITIAL_BOOKS } from "@/data";

export default function Home() {
  const books = INITIAL_BOOKS;

  return (
    <>
      <HeroSlider books={books} />
    </>
  );
}
