import { site } from "@/lib/site-config";

export function LocalSeo() {
  return (
    <section className="border-t border-border py-20 md:py-24">
      <div className="mx-auto max-w-3xl px-5 md:px-8">
        <div className="reveal">
          <p className="section-kicker">Zona</p>
          <h2 className="section-title mt-4">Microblading en {site.city}</h2>
          <div className="mt-6 space-y-4 text-[0.95rem] leading-relaxed text-muted-foreground">
            <p>
              El estudio trabaja en {site.city} con cita previa, en {site.address}. Si vives en la ciudad o en algún
              municipio cercano, puedes venir a una valoración sin compromiso para ver qué técnica encaja mejor con tus
              cejas.
            </p>
            <p>
              Aquí no hay un catálogo de cejas iguales para todas. En cada valoración miramos tu rostro, tu vello y tu
              piel, y a partir de ahí decidimos si tiene más sentido un microblading pelo a pelo, un shading o una
              técnica mixta. También puedes venir solo por el diseño de cejas si prefieres empezar por ahí.
            </p>
            <p>
              La forma más rápida de empezar es escribir por WhatsApp contando qué te gustaría cambiar. Te respondemos
              con una orientación y, si lo ves claro, buscamos hueco para la valoración.
            </p>
          </div>
          <dl className="mt-10 grid gap-px overflow-hidden rounded-sm bg-border sm:grid-cols-3">
            {[
              ["Estudio", site.name],
              ["Dirección", site.address],
              ["Teléfono", site.phoneDisplay],
            ].map(([k, v]) => (
              <div key={k} className="bg-background p-5">
                <dt className="text-[0.6rem] uppercase tracking-[0.18em] text-muted-foreground">{k}</dt>
                <dd className="mt-1.5 text-[0.85rem] leading-snug">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}