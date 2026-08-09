import brow from "@/assets/brow-result.jpg?url";
import { waMessages } from "@/lib/site-config";
import { WhatsappCta } from "./cta";

const facts = [
  ["Duración de la sesión", "Entre 2 h y 2 h 30, incluyendo valoración, diseño y pigmentación."],
  ["Sesiones necesarias", "Primera sesión + retoque de perfeccionamiento a las 4-8 semanas."],
  ["Duración del resultado", "De 12 a 18 meses de media, según piel, cuidados y sol."],
  ["Molestias", "Bajas: se aplica anestésico tópico durante todo el procedimiento."],
  ["Recuperación", "Vida normal desde el primer día; descamación leve entre el día 5 y 10."],
  ["Material", "Uso individual y desechable, pigmentos certificados y protocolo higiénico-sanitario."],
];

const goodFor = [
  "Cejas finas, con poco vello o asimétricas",
  "Zonas despobladas por depilación excesiva o cicatrices",
  "Ganas de dejar de rellenar la ceja cada mañana",
  "Piel normal o seca (en piel grasa se valora shading o mixta)",
];

const notFor = [
  "Embarazo o lactancia",
  "Diabetes descompensada, problemas de coagulación o tratamiento con anticoagulantes",
  "Tratamientos oncológicos activos, isotretinoína reciente o cicatrización queloide",
  "Piel de la zona irritada, con dermatitis, herida o brote de acné",
];

export function MicrobladingInfo() {
  return (
    <section id="microblading" className="border-t border-border py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="grid gap-12 md:grid-cols-[1.05fr_0.95fr] md:gap-16">
          <div className="reveal">
            <p className="section-kicker">Microblading</p>
            <h2 className="section-title mt-4">¿Qué es exactamente el microblading?</h2>
            <p className="mt-6 text-[0.95rem] leading-relaxed text-muted-foreground">
              El microblading es una técnica manual de micropigmentación de cejas. Con una herramienta de
              microcuchillas se depositan trazos finísimos de pigmento en la capa más superficial de la piel,
              imitando el pelo natural uno a uno. El resultado es una ceja definida, simétrica y con densidad,
              pero que sigue pareciendo tu propia ceja.
            </p>
            <p className="mt-4 text-[0.95rem] leading-relaxed text-muted-foreground">
              No es un tatuaje: el pigmento no llega a la dermis profunda, por eso es de larga duración pero
              no permanente y se va aclarando de forma progresiva. Antes de pigmentar se realiza siempre un
              diseño medido a mano alzada que se aprueba contigo, y se elige el tono del pigmento según tu
              piel, tu vello y tu color de cabello.
            </p>
            <div className="mt-8">
              <WhatsappCta message={waMessages.general}>Reservar mi valoración</WhatsappCta>
            </div>
          </div>

          <div className="reveal image-frame aspect-[4/5]">
            <img
              src={brow}
              alt="Resultado de microblading pelo a pelo en cejas realizado en Palencia"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <ul className="mt-14 grid gap-px overflow-hidden rounded-sm bg-border sm:grid-cols-2 lg:grid-cols-3">
          {facts.map(([title, text]) => (
            <li key={title} className="reveal bg-background p-6">
              <h3 className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-primary">{title}</h3>
              <p className="mt-3 text-[0.88rem] leading-relaxed text-muted-foreground">{text}</p>
            </li>
          ))}
        </ul>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <div className="reveal bg-secondary/50 p-7">
            <h3 className="text-[0.72rem] font-semibold uppercase tracking-[0.14em]">
              El microblading puede ser para ti si…
            </h3>
            <ul className="mt-5 space-y-3">
              {goodFor.map((item) => (
                <li key={item} className="border-l border-primary/50 pl-3 text-[0.88rem] leading-relaxed text-muted-foreground">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="reveal bg-secondary/50 p-7">
            <h3 className="text-[0.72rem] font-semibold uppercase tracking-[0.14em]">
              No se puede realizar en casos de…
            </h3>
            <ul className="mt-5 space-y-3">
              {notFor.map((item) => (
                <li key={item} className="border-l border-border pl-3 text-[0.88rem] leading-relaxed text-muted-foreground">
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-[0.78rem] leading-relaxed text-muted-foreground">
              Ante cualquier duda médica se solicita informe o autorización antes de la sesión.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
