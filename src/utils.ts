// slides.ts (or inside your component file)

import { CarouselItem } from "./components/CarouselCard";

const carouselImages = import.meta.glob(
  "./assets/*carousel*.(png|jpg|jpeg|webp)",
  { eager: true, import: "default" }
) as Record<string, string>;

function sortByTrailingNumber(a: string, b: string) {
  const getN = (s: string) => {
    const m = s.match(/(\d+)(?=\D*$)/); // last number in string
    return m ? parseInt(m[1], 10) : Number.MAX_SAFE_INTEGER;
  };
  return getN(a) - getN(b);
}

export function getSlidesFromAssets(): CarouselItem[] {
  console.log('Carousel images: ', carouselImages);
  const keys = Object.keys(carouselImages).sort(sortByTrailingNumber);
  const urls = keys.map((k) => carouselImages[k]);

  console.log('Keys: ', keys);
  console.log('Urls: ', urls);

  return urls.map((image) => ({
    image,
  }));
}
