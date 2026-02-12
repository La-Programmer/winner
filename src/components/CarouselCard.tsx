import Caption from "./Caption";

export type CarouselItem = {
  image: string;
  caption: string;
};

type CarouselCardProps = {
  item: CarouselItem;
  priority?: boolean;
};

export default function CarouselCard({ item, priority = false }: CarouselCardProps) {
  return (
    <div className="w-full">
      <div className="relative overflow-hidden rounded-3xl border border-pink-200 shadow-xl bg-white/40">
        <img
          src={item.image}
          alt={item.caption}
          loading={priority ? "eager" : "lazy"}
          className="h-[360px] w-full object-cover sm:h-[420px]"
          draggable={false}
        />

        {/* soft bottom fade so caption always reads well */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/25 to-transparent" />
      </div>

      <Caption>{item.caption}</Caption>
    </div>
  );
}
