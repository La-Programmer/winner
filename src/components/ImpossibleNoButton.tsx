import { useRef, useState } from "react";

const REPLIES = [
  "You can’t 🙅‍♀️",
  "Really? 😔",
  "Not an option",
  "Nice try 😅",
  "Nope 🙈",
  "Absolutely not",
];

interface ImpossibleNoButtonProps {
  className?: string;
}

export default function ImpossibleNoButton({
  className = "",
}: ImpossibleNoButtonProps) {
  const [label, setLabel] = useState("No");
  const [animating, setAnimating] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  const handleTap = () => {
    if (animating) return;

    const reply = REPLIES[Math.floor(Math.random() * REPLIES.length)];

    setAnimating(true);
    setLabel(reply);

    // Return back to "No" after a brief moment
    timeoutRef.current = window.setTimeout(() => {
      setLabel("No");
      setAnimating(false);
    }, 900);
  };

  return (
    <button
      type="button"
      aria-disabled="true"
      onClick={handleTap}
      className={`
        px-6 py-3
        rounded-full
        font-semibold
        bg-pink-300
        text-pink-900
        shadow-md
        transition-all
        duration-200
        select-none
        ${animating ? "animate-shy-shake scale-95 opacity-80" : ""}
        ${className}
      `}
    >
      {label}
    </button>
  );
}
