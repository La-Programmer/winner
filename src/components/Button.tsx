import { useEffect, useRef, useState } from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  shy?: boolean;
}

export default function Button({
  children,
  onClick = () => {},
  className = "",
  shy = false,
}: ButtonProps) {
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!shy || reducedMotion || !btnRef.current) return;

    const rect = btnRef.current.getBoundingClientRect();

    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    const dx = e.clientX - cx;
    const dy = e.clientY - cy;

    // Normalize and push away from cursor
    const strength = 14; // max movement in px
    const dist = Math.sqrt(dx * dx + dy * dy) || 1;

    const nx = (-dx / dist) * strength;
    const ny = (-dy / dist) * strength;

    setOffset({ x: nx, y: ny });
  };

  const handleMouseLeave = () => {
    setOffset({ x: 0, y: 0 });
  };

  return (
    <button
      ref={btnRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={shy ? undefined : onClick}
      disabled={shy}
      className={`
        px-6 py-3
        rounded-full
        font-semibold
        shadow-md
        transition-all
        duration-200
        ease-out
        ${
          shy
            ? "bg-pink-300 text-pink-900 cursor-not-allowed opacity-70"
            : "bg-pink-600 text-white hover:bg-pink-700 active:scale-95"
        }
        ${className}
      `}
      style={{
        transform: `translate(${offset.x}px, ${offset.y}px)`,
      }}
    >
      {children}
    </button>
  );
}
