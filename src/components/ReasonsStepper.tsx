import { useMemo, useState } from "react";


type ReasonsStepperProps = {
  reasons: string[];
  className?: string;
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export default function ReasonsStepper({ reasons, className = "" }: ReasonsStepperProps) {
  const [index, setIndex] = useState(0);
  const count = reasons.length;
  const canSlide = count > 1;

  const current = useMemo(() => reasons[index], [reasons, index]);

  const goTo = (next: number) => setIndex(clamp(next, 0, count - 1));
  const next = () => goTo(index + 1);
  const prev = () => goTo(index - 1);

  if (!count) return null;

  return (
    <section className={["w-full", className].join(" ")}>
      <div className="relative rounded-3xl border border-pink-200 bg-white/80 backdrop-blur px-3 py-3 shadow">
        {/* Text */}
        <div className="p-3">
          <p className="text-center font-romantic text-gray-800">
            {current}
          </p>
        </div>

        {/* Controls */}
        {canSlide && (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label="Previous reason"
              disabled={index === 0}
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 px-1 py-2 disabled:opacity-40"
            >
              ‹
            </button>

            <button
              type="button"
              onClick={next}
              aria-label="Next reason"
              disabled={index === count - 1}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 px-1 py-2 disabled:opacity-40"
            >
              ›
            </button>
          </>
        )}
      </div>

      {/* Dots */}
      {canSlide && (
        <div className="mt-3 flex items-center justify-center gap-2">
          {reasons.map((_, i) => {
            const active = i === index;
            return (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Go to reason ${i + 1}`}
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
