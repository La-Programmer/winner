import { useEffect, useMemo, useRef, useState } from "react";
import CarouselCard, { CarouselItem } from "./CarouselCard";

type AutoCarouselProps = {
  items: CarouselItem[];
  autoPlayMs?: number; // disable with 0/undefined
  className?: string;
};

export default function AutoCarousel({
  items,
  autoPlayMs = 4500,
  className = "",
}: Readonly<AutoCarouselProps>) {
  const [index, setIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const count = items.length;
  const canSlide = count > 1;

  console.log('Items: ', items);

  const prefersReducedMotion = useMemo(() => {
    if (typeof globalThis === "undefined") return true;
    return globalThis.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
  }, []);

  // autoplay only
  useEffect(() => {
    if (!canSlide) return;
    if (!autoPlayMs || autoPlayMs < 1200) return;
    if (prefersReducedMotion) return;

    const id = globalThis.setInterval(() => {
      setIndex((i) => (i + 1) % count);
    }, autoPlayMs);

    return () => globalThis.clearInterval(id);
  }, [autoPlayMs, canSlide, count, prefersReducedMotion]);

  // optional: swipe to change image (mobile-friendly) WITHOUT exposing buttons
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

      if (Math.abs(dy) > Math.abs(dx)) return;

      if (dx < -40) setIndex((i) => (i + 1) % count);
      if (dx > 40) setIndex((i) => (i - 1 + count) % count);
    };

    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("pointerup", onPointerUp);

    return () => {
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointerup", onPointerUp);
    };
  }, [canSlide, count]);

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
      </div>
    </section>
  );
}
