import emblemGold from "@/assets/logos/emblem.png?url";
import emblemIvory from "@/assets/logos/emblem-ivory.png?url";
import wordmarkGold from "@/assets/logos/wordmark.png?url";
import wordmarkIvory from "@/assets/logos/wordmark-ivory.png?url";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

/** Cabecera: rombo + wordmark. El lockup `primary` no cabe por debajo de 110 px. */
export function BrandLockup({ className }: Props) {
  return (
    <span className={cn("flex shrink-0 items-center gap-2 md:gap-2.5", className)}>
      <span className="relative shrink-0">
        <img
          src={emblemGold}
          alt=""
          width={319}
          height={281}
          draggable={false}
          className="brand-light h-8 w-auto md:h-10"
        />
        <img
          src={emblemIvory}
          alt=""
          width={319}
          height={281}
          draggable={false}
          className="brand-dark h-8 w-auto md:h-10"
        />
      </span>
      <span className="relative shrink-0">
        <img
          src={wordmarkGold}
          alt=""
          width={566}
          height={134}
          draggable={false}
          className="brand-light h-7 w-auto md:h-8"
        />
        <img
          src={wordmarkIvory}
          alt=""
          width={566}
          height={134}
          draggable={false}
          className="brand-dark h-7 w-auto md:h-8"
        />
      </span>
    </span>
  );
}
