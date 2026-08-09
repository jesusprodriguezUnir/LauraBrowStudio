import { useState } from "react";
import before1 from "@/assets/case-before-1.jpg?url";
import design1 from "@/assets/case-design-1.jpg?url";
import result1 from "@/assets/case-result-1.jpg?url";
import before2 from "@/assets/case-before-2.jpg?url";
import result2 from "@/assets/case-result-2.jpg?url";
import healedFresh from "@/assets/healed-fresh.jpg?url";
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
  { id: "02", technique: "Shading", outcome: "Definición suave", before: before2, design: design1, result: result2 },
  { id: "03", technique: "Técnica mixta", outcome: "Natural y definido", before: before1, design: design1, result: healedHealed },
  { id: "04", technique: "Microblading", outcome: "Recuperación de forma", before: before2, design: design1, result: browResult },
  { id: "05", technique: "Diseño de cejas", outcome: "Simetría equilibrada", before: before1, design: design1, result: healedFresh },
  { id: "06", technique: "Shading", outcome: "Efecto maquillado", before: before2, design: design1, result: result2 },
  { id: "07", technique: "Técnica mixta", outcome: "Más densidad", before: before1, design: design1, result: result1 },
  { id: "08", technique: "Microblading", outcome: "Acabado pelo a pelo", before: before2, design: design1, result: healedHealed },
];

const tabs = [
  { key: "before", label: "Antes" },
  { key: "design", label: "Diseño" },
  { key: "result", label: "Resultado" },
] as const;

function CaseCard({ item }: { item: Case }) {
  const [tab, setTab] = useState<(typeof tabs)[number]["key"]>("result");
  const src = item[tab];

  return (
    <article className="reveal">
      <div className="image-frame aspect-[4/5]">
        <img
          key={src}
          src={src}
          alt={`Caso ${item.id} — ${tabs.find((t) => t.key === tab)?.label} · ${item.technique}`}
          loading="lazy"
          width={1024}
          height={1280}
          className="h-full w-full object-cover transition-opacity duration-500"
        />
        <span className="placeholder-tag absolute bottom-3 left-3 bg-background/85">Imagen de ejemplo</span>
      </div>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {tabs.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setTab(t.key)}
            aria-pressed={tab === t.key}
            className={`rounded-full px-3 py-1.5 text-[0.62rem] uppercase tracking-[0.14em] transition-colors duration-300 ${
              tab === t.key ? "bg-foreground text-background" : "border border-border text-muted-foreground"
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
  return (
    <section id="resultados" className="border-t border-border bg-secondary/40 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="reveal max-w-2xl">
          <p className="section-kicker">Antes y después</p>
          <h2 className="section-title mt-4">Resultados que hablan por sí solos</h2>
          <p className="mt-5 text-[0.95rem] leading-relaxed text-muted-foreground">
            Cada ceja se diseña de forma individual para respetar tus facciones y conseguir un resultado natural.
          </p>
        </div>

        <div className="reveal mt-12 grid gap-8 md:grid-cols-[1fr_0.85fr] md:items-center">
          <ComparisonSlider
            beforeSrc={before1}
            afterSrc={result1}
            beforeAlt="Ceja antes del tratamiento de microblading"
            afterAlt="Ceja después del tratamiento de microblading"
          />
          <div>
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-primary">Comparador</p>
            <h3 className="section-title mt-3 !text-[clamp(1.7rem,3.6vw,2.5rem)]">Desliza para ver el cambio</h3>
            <p className="mt-4 text-[0.9rem] leading-relaxed text-muted-foreground">
              Arrastra sobre la imagen para comparar el punto de partida con el resultado. Todas las fotografías son
              provisionales y se sustituirán por casos reales del estudio.
            </p>
            <WhatsappCta message={waMessages.general} variant="outline" className="mt-7">
              Consultar mi caso
            </WhatsappCta>
          </div>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {cases.map((item) => (
            <CaseCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}