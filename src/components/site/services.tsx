import result1 from "@/assets/case-result-1.jpg?url";
import designImg from "@/assets/service-design.jpg?url";
import brow from "@/assets/brow-result.jpg?url";
import { waMessages } from "@/lib/site-config";
import { WhatsappCta } from "./cta";

const phases = [
  {
    step: "01",
    name: "Valoración y diseño",
    image: designImg,
    description:
      "Antes de pigmentar analizamos tus cejas, tu piel y el resultado que buscas. Se dibuja el diseño a mano alzada y se aprueba contigo antes de empezar.",
  },
  {
    step: "02",
    name: "Sesión de microblading",
    image: result1,
    description:
      "Pelo a pelo, con una herramienta de microcuchillas y pigmentos certificados. Se trabaja con anestésico tópico para que la sesión sea cómoda desde el primer momento.",
  },
  {
    step: "03",
    name: "Retoque de perfeccionamiento",
    image: brow,
    description:
      "A las 4-8 semanas se realiza el retoque para ajustar color, rellenar zonas que no hayan retenido pigmento y consolidar el resultado definitivo.",
  },
];

export function Services() {
  return (
    <section id="servicios" className="border-t border-border bg-secondary/40 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="reveal max-w-2xl">
          <p className="section-kicker">Cómo funciona</p>
          <h2 className="section-title mt-4">El proceso del microblading, paso a paso</h2>
          <p className="mt-5 text-[0.95rem] leading-relaxed text-muted-foreground">
            Cada sesión comienza con un diseño personalizado y termina con unas cejas que parecen tuyas.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {phases.map((phase) => (
            <article key={phase.step} className="reveal flex flex-col bg-background p-5 md:p-6">
              <div className="image-frame aspect-[16/11]">
                <img
                  src={phase.image}
                  alt={`${phase.name} — microblading en Palencia`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                />
              </div>
              <p className="mt-6 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-primary">
                Paso {phase.step}
              </p>
              <h3 className="mt-2 font-display text-2xl tracking-tight">{phase.name}</h3>
              <p className="mt-3 text-[0.88rem] leading-relaxed text-muted-foreground">
                {phase.description}
              </p>
              <div className="mt-auto pt-7">
                <WhatsappCta message={waMessages.service("microblading")} variant="outline" className="h-9 px-4 text-xs">
                  Reservar valoración
                </WhatsappCta>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}