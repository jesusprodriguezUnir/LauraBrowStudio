import { site, waMessages } from "@/lib/site-config";
import { WhatsappCta } from "./cta";

export function Hero() {
  return (
    <section id="inicio" className="relative pt-32 pb-20 md:pt-40 md:pb-28">
      <div className="relative mx-auto flex max-w-6xl flex-col items-center text-center px-5 md:px-8">
        <div className="max-w-3xl">
          <h1 className="display-xl text-foreground">
            Microblading de cejas con <strong>resultados naturales</strong>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-[0.95rem] leading-relaxed text-muted-foreground">
            Estudio <strong className="font-semibold text-foreground">especializado exclusivamente en cejas</strong> en {site.city}.
            Diseño personalizado según tus facciones, con una técnica precisa que respeta tu piel.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <WhatsappCta message={waMessages.general} className="w-full sm:w-auto">
              Reservar cita
            </WhatsappCta>
            <a
              href="#resultados"
              className="inline-flex w-full items-center justify-center rounded-full border border-border px-6 py-3 text-[0.78rem] uppercase tracking-[0.14em] text-foreground transition-colors duration-300 hover:bg-secondary sm:w-auto"
            >
              Ver resultados
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}