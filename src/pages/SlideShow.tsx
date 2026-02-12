import Button from "../components/Button";
import Card from "../components/Card";
import Carousel from "../components/Carousel";
import type { CarouselItem } from "../components/CarouselCard";

interface SlideShowProps {
  nickname: string;
  getSlides: () => CarouselItem[]; // [{ image, caption }]
  onNext?: () => void;    // optional if you're routing from parent
  onBack?: () => void;
}

export default function SlideShow({ nickname, getSlides, onNext, onBack }: SlideShowProps) {

  const slides = getSlides();

  return (
    <div className="flex flex-col items-center gap-6">
      <Card className="w-full max-w-md px-6 py-7">
        <div className="text-center">
          <h1 className="font-script text-4xl text-pink-700">
            {nickname}&rsquo;s Moments
          </h1>
          <p className="mt-2 font-romantic text-sm text-gray-700 italic">
            Little memories with captions from the heart 💞
          </p>
        </div>

        <div className="mt-6">
          <Carousel items={slides} />
        </div>

        <div className="mt-7 flex flex-col items-center gap-3">
          {onNext ? (
            <Button className="w-48 text-base" onClick={onNext}>
              Continue 💌
            </Button>
          ) : null}

          {onBack ? (
            <button
              type="button"
              onClick={onBack}
              className="text-sm text-white/90 underline underline-offset-4 hover:text-white"
            >
              Back
            </button>
          ) : null}
        </div>
      </Card>
    </div>
  );
}
