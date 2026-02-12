import { useEffect, useMemo, useRef, useState } from "react";
import CarouselCard, { CarouselItem } from "./CarouselCard";

type CarouselProps = {
  items: CarouselItem[];
  autoPlayMs?: number; // set to 0/undefined to disable
  className?: string;
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export default function Carousel({ items, autoPlayMs = 4500, className = "" }: CarouselProps) {
  const [index, setIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const count = items.length;
  const canSlide = count > 1;

  const prefersReducedMotion = useMemo(() => {
    if (typeof window === "undefined") return true;
    return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
  }, []);

  const goTo = (next: number) => setIndex(clamp(next, 0, count - 1));
  const next = () => goTo(index + 1);
  const prev = () => goTo(index - 1);

  // keyboard support
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (!canSlide) return;
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, canSlide]);

  // autoplay
  useEffect(() => {
    if (!canSlide) return;
    if (!autoPlayMs || autoPlayMs < 1200) return;
    if (prefersReducedMotion) return;

    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % count);
    }, autoPlayMs);

    return () => window.clearInterval(id);
  }, [autoPlayMs, canSlide, count, prefersReducedMotion]);

  // Touch swipe
  useEffect(() => {
    const el = trackRef.current;
    if (!el || !canSlide) return;

    let startX = 0;
    let startY = 0;
    let isDown = false;

    const onPointerDown = (e: PointerEvent) => {
      isDown = true;
      startX = e.clientX;
      startY = e.clientY;
      el.setPointerCapture?.(e.pointerId);
    };

    const onPointerUp = (e: PointerEvent) => {
      if (!isDown) return;
      isDown = false;

      const dx = e.clientX - startX;
      const dy = e.clientY - startY;

      // ignore mostly vertical gestures
      if (Math.abs(dy) > Math.abs(dx)) return;

      if (dx < -40) next();
      if (dx > 40) prev();
    };

    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("pointerup", onPointerUp);

    return () => {
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointerup", onPointerUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, canSlide]);

  if (!items.length) {
    return (
      <div className="rounded-3xl border border-pink-200 bg-white/70 p-6 text-center">
        <p className="font-romantic text-gray-700">No photos yet.</p>
      </div>
    );
  }

  return (
    <section className={["w-full", className].join(" ")}>
      <div className="relative">
        {/* Track */}
        <div
          ref={trackRef}
          className="overflow-hidden rounded-3xl"
          aria-roledescription="carousel"
          aria-label="Photo slideshow"
        >
          <div
            className={[
              "flex w-full",
              prefersReducedMotion ? "" : "transition-transform duration-500 ease-out",
            ].join(" ")}
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {items.map((item, i) => (
              <div key={`${i}-${item.image}`} className="min-w-full px-0">
                <CarouselCard item={item} priority={i === 0} />
              </div>
            ))}
          </div>
        </div>

        {/* Controls */}
        {canSlide && (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label="Previous slide"
              className="absolute left-3 top-[40%] -translate-y-1/2 rounded-full bg-white/80 backdrop-blur px-3 py-2 border border-pink-200 shadow hover:bg-white"
            >
              ‹
            </button>

            <button
              type="button"
              onClick={next}
              aria-label="Next slide"
              className="absolute right-3 top-[40%] -translate-y-1/2 rounded-full bg-white/80 backdrop-blur px-3 py-2 border border-pink-200 shadow hover:bg-white"
            >
              ›
            </button>
          </>
        )}
      </div>

      {/* Dots */}
      {canSlide && (
        <div className="mt-4 flex items-center justify-center gap-2">
          {items.map((_, i) => {
            const active = i === index;
            return (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={[
                  "h-2.5 rounded-full transition-all border border-pink-200",
                  active ? "w-8 bg-pink-500" : "w-2.5 bg-white/80 hover:bg-white",
                ].join(" ")}
              />
            );
          })}
        </div>
      )}
    </section>
  );
}
