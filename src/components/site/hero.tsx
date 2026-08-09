import heroImage from "@/assets/brow-hero.jpg?url";
import { site, waMessages } from "@/lib/site-config";
import { WhatsappCta } from "./cta";

export function Hero() {
  return (
    <section id="inicio" className="relative -mt-[72px] md:-mt-[84px]">
      <div className="relative min-h-[92svh] w-full overflow-hidden">
        <img
          src={heroImage}
          alt="Primer plano de una ceja natural trabajada con microblading"
          width={1024}
          height={1280}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, color-mix(in oklab, var(--color-foreground) 78%, transparent) 0%, color-mix(in oklab, var(--color-foreground) 34%, transparent) 48%, transparent 100%)",
          }}
        />
        <div
          className="absolute inset-x-0 top-0 h-40"
          style={{
            background:
              "linear-gradient(to bottom, color-mix(in oklab, var(--color-foreground) 55%, transparent) 0%, transparent 100%)",
          }}
        />
        <div className="relative mx-auto flex min-h-[92svh] max-w-6xl flex-col justify-end px-5 pb-16 pt-32 md:px-8 md:pb-24">
          <div className="max-w-2xl text-background">
            <h1 className="display-xl">
              Microblading de cejas con <strong>resultados naturales</strong>
            </h1>
            <p className="mt-6 max-w-lg text-[0.95rem] leading-relaxed text-background/85">
              Estudio <strong className="font-semibold">especializado exclusivamente en cejas</strong> en {site.city}.
              Diseño personalizado según tus facciones, con una técnica precisa que respeta tu piel.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <WhatsappCta message={waMessages.general} className="bg-primary text-primary-foreground hover:bg-primary/85">
                Reservar cita
              </WhatsappCta>
              <a
                href="#resultados"
                className="inline-flex items-center justify-center rounded-full border border-background/50 px-6 py-3 text-[0.78rem] uppercase tracking-[0.14em] text-background transition-colors duration-300 hover:bg-background/10"
              >
                Ver resultados
              </a>
            </div>
          </div>
        </div>
        <p className="placeholder-tag absolute bottom-4 right-4 border-background/40 bg-foreground/30 text-background/80">
          Imagen de ejemplo
        </p>
      </div>
    </section>
  );
}