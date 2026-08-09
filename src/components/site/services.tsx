import result1 from "@/assets/case-result-1.jpg?url";
import result2 from "@/assets/case-result-2.jpg?url";
import tools from "@/assets/service-tools.jpg?url";
import designImg from "@/assets/service-design.jpg?url";
import { waMessages } from "@/lib/site-config";
import { WhatsappCta } from "./cta";

const services = [
  {
    name: "Microblading",
    image: result1,
    description:
      "Técnica pelo a pelo para aportar definición y densidad manteniendo un acabado natural.",
    fit: "Puede encajar si buscas un resultado muy natural y tienes algo de vello propio.",
  },
  {
    name: "Shading",
    image: result2,
    description: "Sombreado para conseguir un efecto más definido y maquillado.",
    fit: "Puede encajar si te gusta llevar la ceja rellena y con más presencia.",
  },
  {
    name: "Técnica mixta",
    image: tools,
    description: "Combinación de pelo a pelo y sombreado en la misma ceja.",
    fit: "Puede encajar si quieres densidad y definición a la vez.",
  },
  {
    name: "Diseño de cejas",
    image: designImg,
    description: "Estudio y diseño personalizado de la forma de la ceja.",
    fit: "Puede encajar si quieres recuperar la forma antes de decidir una técnica.",
  },
];

export function Services() {
  return (
    <section id="servicios" className="border-t border-border bg-secondary/40 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="reveal max-w-2xl">
          <p className="section-kicker">Servicios</p>
          <h2 className="section-title mt-4">Técnicas de micropigmentación de cejas</h2>
          <p className="mt-5 text-[0.95rem] leading-relaxed text-muted-foreground">
            La técnica se elige después de valorar tus cejas, tu piel y el resultado que quieres conseguir.
          </p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2">
          {services.map((service) => (
            <article key={service.name} className="reveal flex flex-col bg-background p-5 md:p-6">
              <div className="image-frame aspect-[16/11]">
                <img
                  src={service.image}
                  alt={`${service.name} — cejas en Palencia`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                />
              </div>
              <h3 className="mt-6 font-display text-2xl tracking-tight">{service.name}</h3>
              <p className="mt-3 text-[0.88rem] leading-relaxed text-muted-foreground">{service.description}</p>
              <p className="mt-4 border-l border-primary/40 pl-3 text-[0.82rem] leading-relaxed text-muted-foreground">
                {service.fit}
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-5">
                <span className="placeholder-tag">Precio próximamente</span>
                <WhatsappCta message={waMessages.service(service.name)} variant="outline">
                  Consultar valoración
                </WhatsappCta>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}