import portrait from "@/assets/portrait-professional.jpg?url";
import { site, waMessages } from "@/lib/site-config";
import { WhatsappCta } from "./cta";

export function About() {
  return (
    <section id="sobre-mi" className="border-t border-border py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 md:grid-cols-[1fr_1.1fr] md:gap-16 md:px-8">
        <div className="reveal relative">
          <div className="image-frame aspect-[4/5]">
            <img
              src={portrait}
              alt={`${site.name}, especialista en diseño de cejas y micropigmentación en ${site.city}`}
              loading="lazy"
              width={1024}
              height={1280}
              className="h-full w-full object-cover"
            />
          </div>
          <span className="placeholder-tag absolute bottom-3 left-3 bg-background/85">Fotografía provisional</span>
        </div>

        <div className="reveal">
          <p className="section-kicker">Sobre la profesional</p>
          <h2 className="section-title mt-4">Detrás de cada ceja hay una persona.</h2>
          <p className="mt-6 max-w-lg text-[0.95rem] leading-relaxed text-muted-foreground">
            «Soy {site.name}, especialista en diseño de cejas y micropigmentación. Mi objetivo es ayudarte a conseguir
            unas cejas que encajen contigo y conserven un aspecto natural.»
          </p>
          <dl className="mt-9 grid gap-px overflow-hidden rounded-sm bg-border sm:grid-cols-2">
            {[
              ["Formación", "[FORMACIÓN PENDIENTE]"],
              ["Certificaciones", "[CERTIFICACIONES PENDIENTES]"],
              ["Estudio", site.address],
              ["Zona de trabajo", `${site.city}, ${site.region}`],
            ].map(([k, v]) => (
              <div key={k} className="bg-background p-5">
                <dt className="text-[0.6rem] uppercase tracking-[0.18em] text-muted-foreground">{k}</dt>
                <dd className="mt-1.5 text-[0.85rem] leading-snug">{v}</dd>
              </div>
            ))}
          </dl>
          <WhatsappCta message={waMessages.general} className="mt-9" />
        </div>
      </div>
    </section>
  );
}