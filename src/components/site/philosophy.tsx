import studioDetail from "@/assets/studio-detail.jpg?url";

const factors = [
  ["Facciones", "Proporciones y rasgos de tu rostro."],
  ["Forma del rostro", "Cómo la ceja acompaña a tu mirada."],
  ["Cejas actuales", "Punto de partida real, sin atajos."],
  ["Densidad del pelo", "Zonas con vello y zonas vacías."],
  ["Tipo de piel", "Determina cómo evoluciona el pigmento."],
  ["Resultado deseado", "Lo natural no significa lo mismo para todas."],
];

export function Philosophy() {
  return (
    <section id="filosofia" className="border-t border-border py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 md:grid-cols-[0.95fr_1.05fr] md:gap-16 md:px-8">
        <div className="reveal">
          <p className="section-kicker">Filosofía</p>
          <h2 className="section-title mt-4">No todas las cejas necesitan la misma técnica.</h2>
          <p className="mt-6 max-w-md font-display text-xl italic leading-snug text-muted-foreground">
            «El objetivo no es crear unas cejas perfectas según un patrón. Es crear unas cejas que encajen contigo.»
          </p>
          <div className="image-frame mt-9 aspect-[4/3]">
            <img
              src={studioDetail}
              alt="Detalle del espacio de trabajo del estudio de cejas"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <ul className="grid gap-px overflow-hidden rounded-sm bg-border sm:grid-cols-2">
          {factors.map(([title, text], i) => (
            <li key={title} className="reveal bg-background p-6">
              <span className="font-mono text-[0.62rem] tracking-[0.16em] text-primary">
                0{i + 1}
              </span>
              <h3 className="mt-3 font-display text-xl tracking-tight">{title}</h3>
              <p className="mt-2 text-[0.85rem] leading-relaxed text-muted-foreground">{text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}