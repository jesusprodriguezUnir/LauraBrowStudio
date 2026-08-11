import { useState, useCallback, useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import before1 from "@/assets/case-before-1.jpg?url";
import design1 from "@/assets/case-design-1.jpg?url";
import result1 from "@/assets/case-result-1.jpg?url";
import before2 from "@/assets/case-before-2.jpg?url";
import result2 from "@/assets/case-result-2.jpg?url";
import healedHealed from "@/assets/healed-healed.jpg?url";
import browResult from "@/assets/brow-result.jpg?url";
import { ComparisonSlider } from "./comparison-slider";
import { WhatsappCta } from "./cta";
import { waMessages } from "@/lib/site-config";

type Case = {
  id: string;
  technique: string;
  outcome: string;
  before: string;
  design: string;
  result: string;
};

const cases: Case[] = [
  { id: "01", technique: "Microblading", outcome: "Resultado natural", before: before1, design: design1, result: result1 },
  { id: "02", technique: "Microblading", outcome: "Definición pelo a pelo", before: before2, design: design1, result: result2 },
  { id: "03", technique: "Microblading", outcome: "Natural y simétrico", before: before1, design: design1, result: healedHealed },
  { id: "04", technique: "Microblading", outcome: "Recuperación de forma", before: before2, design: design1, result: browResult },
];

const tabs = [
  { key: "before", label: "Antes" },
  { key: "design", label: "Diseño" },
  { key: "result", label: "Resultado" },
] as const;

type TabKey = (typeof tabs)[number]["key"];

function CaseCard({
  item,
  onOpen,
}: {
  item: Case;
  onOpen: (src: string, label: string) => void;
}) {
  const [tab, setTab] = useState<TabKey>("result");
  const src = item[tab];
  const label = tabs.find((t) => t.key === tab)?.label;

  return (
    <article className="reveal">
      <button
        type="button"
        onClick={() => onOpen(src, `${item.technique} — ${label}`)}
        className="image-frame block aspect-[4/5] w-full cursor-zoom-in text-left"
        aria-label={`Ampliar ${item.technique} · ${label} (caso ${item.id})`}
      >
        <img key={src} src={src} alt="" loading="lazy" width={1024} height={1280} className="h-full w-full object-cover transition-opacity duration-500" />
      </button>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {tabs.map((t) => (
          <button
            key={t.key}
            type="button"
            aria-pressed={tab === t.key}
            onClick={() => setTab(t.key)}
            className={`rounded-full px-3 py-1.5 text-[0.62rem] uppercase tracking-[0.14em] transition-colors duration-300 ${
              tab === t.key ? "bg-primary text-primary-foreground" : "border border-border text-muted-foreground hover:border-foreground"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="mt-3">
        <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-primary">Caso {item.id}</p>
        <h3 className="mt-1 font-display text-lg tracking-tight">{item.technique}</h3>
        <p className="text-[0.8rem] text-muted-foreground">{item.outcome}</p>
      </div>
    </article>
  );
}

export function BeforeAfter() {
  const [lightbox, setLightbox] = useState<{ src: string; label: string } | null>(null);

  // Sin autoplay: la marca solo admite el reveal en scroll, y un carrusel que
  // se mueve solo no respetaría prefers-reduced-motion.
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: "start", dragFree: true });

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  // El lightbox se cierra con Escape y bloquea el scroll del fondo mientras
  // está abierto; antes solo se podía cerrar con el ratón.
  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
    };
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [lightbox]);

  return (
    <section id="resultados" className="border-t border-border bg-secondary/40 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="reveal max-w-2xl">
          <p className="section-kicker">Antes y después</p>
          <h2 className="section-title mt-4">El punto de partida importa</h2>
          <p className="mt-5 text-[0.95rem] leading-relaxed text-muted-foreground">
            Cada ceja se diseña de forma individual, así que el mismo tratamiento no da el mismo resultado en dos
            personas. Estas son las fases por las que pasa cada caso.
          </p>
          <p className="mt-4">
            <span className="placeholder-tag">Fotografías provisionales</span>
          </p>
        </div>

        <div className="reveal mt-12 grid gap-8 md:grid-cols-[1fr_0.85fr] md:items-center">
          <ComparisonSlider
            freshSrc={before1}
            healedSrc={result1}
            beforeAlt="Ceja antes del tratamiento de microblading"
            afterAlt="Ceja después del tratamiento de microblading"
          />
          <div>
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-primary">Comparador</p>
            <h3 className="section-title mt-3 !text-[clamp(1.7rem,3.6vw,2.5rem)]">Desliza para ver el cambio</h3>
            <p className="mt-4 text-[0.9rem] leading-relaxed text-muted-foreground">
              Arrastra sobre la imagen para comparar el punto de partida con el resultado.
            </p>
            <WhatsappCta message={waMessages.general} variant="outline" className="mt-7">
              Consultar mi caso
            </WhatsappCta>
          </div>
        </div>

        <div className="mt-16 relative group">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex touch-pan-y -ml-4 md:-ml-6">
              {cases.map((item) => (
                <div key={item.id} className="min-w-0 flex-none pl-4 md:pl-6 w-[85vw] sm:w-[45vw] md:w-[35vw] lg:w-[25vw]">
                  <CaseCard item={item} onOpen={(src, label) => setLightbox({ src, label })} />
                </div>
              ))}
            </div>
          </div>
          
          <button
            type="button"
            aria-label="Ver casos anteriores"
            onClick={scrollPrev}
            className="absolute left-0 top-[30%] z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-border bg-background/90 text-foreground opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100 focus-visible:opacity-100 md:-left-2"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="Ver más casos"
            onClick={scrollNext}
            className="absolute right-0 top-[30%] z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-border bg-background/90 text-foreground opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100 focus-visible:opacity-100 md:-right-2"
          >
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-6 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={lightbox.label}
          onClick={() => setLightbox(null)}
        >
          <div className="relative max-h-[90vh] w-full max-w-2xl" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => setLightbox(null)}
              aria-label="Cerrar imagen ampliada"
              className="absolute -top-11 right-0 grid h-9 w-9 place-items-center rounded-full bg-background text-foreground"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
            <img src={lightbox.src} alt={lightbox.label} className="h-full max-h-[85vh] w-full rounded-sm object-contain" />
          </div>
        </div>
      )}
    </section>
  );
}