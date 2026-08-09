import { site, waMessages } from "@/lib/site-config";
import { WhatsappCta } from "./cta";

export function FinalCta() {
  return (
    <section id="contacto" className="border-t border-border bg-secondary/60 py-24 md:py-32">
      <div className="reveal mx-auto max-w-3xl px-5 text-center md:px-8">
        <p className="section-kicker">Contacto</p>
        <h2 className="display-xl mt-5">¿Hablamos de tus cejas?</h2>
        <p className="mx-auto mt-6 max-w-xl text-[0.95rem] leading-relaxed text-muted-foreground">
          Cuéntanos qué buscas y te orientaremos sobre la técnica que mejor puede encajar contigo.
        </p>
        <div className="mt-10 flex flex-col items-center gap-4">
          <WhatsappCta message={waMessages.general} className="px-9 py-4">
            Hablar por WhatsApp
          </WhatsappCta>
          <p className="text-[0.72rem] uppercase tracking-[0.2em] text-muted-foreground">
            {site.city} · {site.country}
          </p>
          <p className="text-[0.8rem] text-muted-foreground">
            {site.phoneDisplay} · {site.email}
          </p>
        </div>
      </div>
    </section>
  );
}