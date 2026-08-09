import { PenLine, Ruler, Sparkles, BadgeCheck } from "lucide-react";

const items = [
  [PenLine, "Diseño personalizado", "Cada ceja se adapta a tu rostro, tu estilo y tu punto de partida."],
  [Ruler, "Técnica precisa", "Implantación controlada para un acabado limpio y natural."],
  [Sparkles, "Resultados naturales", "Efecto sutil que realza la mirada sin endurecer el rostro."],
  [BadgeCheck, "Especialización", "Estudio enfocado únicamente en microblading y diseño de cejas."],
] as const;

export function Values() {
  return (
    <section className="border-t border-border bg-secondary/50 py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="reveal max-w-xl">
          <p className="section-kicker">Microblading</p>
          <h2 className="section-title mt-3">Imperceptible</h2>
          <p className="mt-4 text-[0.95rem] leading-relaxed text-muted-foreground">
            Trabajamos cada tratamiento de forma completamente personalizada, respetando la estructura del rostro y la
            calidad de la piel.
          </p>
        </div>
        <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(([Icon, title, text]) => (
            <li key={title} className="reveal">
              <span className="grid h-11 w-11 place-items-center rounded-full border border-border bg-background">
                <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-[0.8rem] font-semibold uppercase tracking-[0.12em]">{title}</h3>
              <p className="mt-2 text-[0.86rem] leading-relaxed text-muted-foreground">{text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}