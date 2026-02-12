type CaptionProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Caption({ children, className = "" }: CaptionProps) {
  return (
    <div
      className={[
        "mt-3 rounded-2xl bg-white/75 backdrop-blur-md border border-pink-200 px-4 py-3",
        className,
      ].join(" ")}
    >
      <p className="font-romantic text-sm leading-relaxed text-gray-800 text-center italic">
        {children}
      </p>
    </div>
  );
}
