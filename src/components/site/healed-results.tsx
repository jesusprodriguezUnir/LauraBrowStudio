import fresh from "@/assets/healed-fresh.jpg?url";
import healed from "@/assets/healed-healed.jpg?url";
import { ComparisonSlider } from "./comparison-slider";

export function HealedResults() {
  return (
    <section className="border-t border-border bg-foreground py-20 text-background md:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 md:grid-cols-[1.1fr_1fr] md:gap-16 md:px-8">
        <div className="reveal">
          <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-background/60">
            Resultados cicatrizados
          </p>
          <h2 className="section-title mt-4">El resultado no termina el día del tratamiento.</h2>
          <p className="mt-6 max-w-lg text-[0.95rem] leading-relaxed text-background/70">
            Recién realizado, el pigmento se ve más intenso. Con la cicatrización, el color se asienta y aparece el
            resultado real. Por eso mostramos las dos fases: transparencia antes que efectismo.
          </p>
          <div className="mt-9 grid max-w-md grid-cols-2 gap-4 border-t border-background/20 pt-6">
            <div>
              <p className="text-[0.6rem] uppercase tracking-[0.18em] text-background/50">Fase 1</p>
              <p className="mt-1 font-display text-xl">Recién realizado</p>
            </div>
            <div>
              <p className="text-[0.6rem] uppercase tracking-[0.18em] text-background/50">Fase 2</p>
              <p className="mt-1 font-display text-xl">Cicatrizado</p>
            </div>
          </div>
        </div>
        <div className="reveal">
          <ComparisonSlider
            beforeSrc={fresh}
            afterSrc={healed}
            beforeLabel="Recién realizado"
            afterLabel="Cicatrizado"
            beforeAlt="Ceja recién realizada, con el pigmento más intenso"
            afterAlt="Ceja cicatrizada, con el pigmento asentado y aspecto natural"
          />
        </div>
      </div>
    </section>
  );
}