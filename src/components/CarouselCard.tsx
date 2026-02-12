export type CarouselItem = {
  image: string;
};

type CarouselCardProps = {
  item: CarouselItem;
  priority?: boolean;
};

export default function CarouselCard({ item, priority = false }: Readonly<CarouselCardProps>) {
  return (
    <div className="w-full">
      <div className="relative overflow-hidden rounded-3xl border border-pink-200 shadow-xl bg-white/40">
        <img
          src={item.image}
          alt={item.image}
          loading={priority ? "eager" : "lazy"}
          className="h-[360px] w-full object-cover sm:h-[420px]"
          draggable={false}
        />
      </div>
    </div>
  );
}
