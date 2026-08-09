import { useState } from "react";

type Props = {
  freshSrc: string;
  healedSrc: string;
  beforeLabel?: string;
  afterLabel?: string;
  beforeAlt: string;
  afterAlt: string;
};

export function ComparisonSlider({
  freshSrc,
  healedSrc,
  beforeLabel = "Antes",
  afterLabel = "Resultado",
  beforeAlt,
  afterAlt,
}: Props) {
  const [value, setValue] = useState(50);

  return (
    <div className="image-frame aspect-[4/5]">
      <img src={healedSrc} alt={afterAlt} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
      <img
        src={freshSrc}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ clipPath: `inset(0 ${100 - value}% 0 0)` }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 w-px bg-background/90"
        style={{ left: `${value}%` }}
        aria-hidden="true"
      />
      <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-background/85 px-2.5 py-1 text-[0.6rem] uppercase tracking-[0.16em]">
        {beforeLabel}
      </span>
      <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-foreground/80 px-2.5 py-1 text-[0.6rem] uppercase tracking-[0.16em] text-background">
        {afterLabel}
      </span>
      <input
        type="range"
        min={2}
        max={98}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        aria-label={`${beforeAlt} ${afterAlt} — desliza para comparar`}
        className="absolute inset-0 h-full w-full cursor-ew-resize appearance-none bg-transparent"
      />
    </div>
  );
}