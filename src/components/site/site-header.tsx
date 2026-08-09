import { useEffect, useState } from "react";
import { Menu, X, MessageCircle } from "lucide-react";
import logoMocha from "@/assets/logo-wordmark-mocha.png?url";
import logoIvory from "@/assets/logo-wordmark-ivory.png?url";
import { site, waLink, waMessages } from "@/lib/site-config";
import { WhatsappCta } from "./cta";

const nav = [
  { label: "Inicio", href: "#inicio" },
  { label: "Microblading", href: "#microblading" },
  { label: "Servicios", href: "#servicios" },
  { label: "Cuidados", href: "#cuidados" },
  { label: "Resultados", href: "#resultados" },
  { label: "Sobre mí", href: "#sobre-mi" },
  { label: "Preguntas frecuentes", href: "#faq" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-border bg-background/90 text-foreground backdrop-blur-md"
          : "bg-transparent text-background"
      }`}
    >
      <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-4 md:px-8">
        <a href="#inicio" className="flex min-w-0 items-center" aria-label={`${site.name}, inicio`}>
          <img
            src={scrolled ? logoMocha : logoIvory}
            alt={site.name}
            width={480}
            height={180}
            className="brand-logo h-9 max-w-[10rem] object-left transition md:h-10 md:max-w-[11rem]"
          />
          <span className="sr-only">
            <span className="block truncate text-base font-semibold uppercase tracking-[0.08em] md:text-lg">
              {site.name}
            </span>
            <span
              className={`mt-0.5 block truncate text-[0.6rem] uppercase tracking-[0.22em] ${
                scrolled ? "text-muted-foreground" : "text-background/70"
              }`}
            >
              Cejas · Micropigmentación · {site.city}
            </span>
          </span>
        </a>

        <div className="flex shrink-0 items-center gap-2">
          <nav className="hidden items-center gap-6 lg:flex">
            {nav.slice(1).map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`text-[0.72rem] uppercase tracking-[0.12em] transition-colors ${
                  scrolled
                    ? "text-muted-foreground hover:text-foreground"
                    : "text-background/85 hover:text-background"
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <WhatsappCta
            message={waMessages.general}
            className="hidden bg-primary text-primary-foreground hover:bg-primary/85 md:inline-flex"
          >
            Reservar cita
          </WhatsappCta>
          <a
            href={waLink(waMessages.general)}
            {...(waLink(waMessages.general).startsWith("http")
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            aria-label="Consultar por WhatsApp"
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground md:hidden"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            className={`grid h-11 w-11 shrink-0 place-items-center rounded-full border lg:hidden ${
              scrolled ? "border-border" : "border-background/50"
            }`}
          >
            {open ? (
              <X className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Menu className="h-4 w-4" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-border bg-background text-foreground lg:hidden">
          <ul className="mx-auto max-w-6xl px-5 py-2 md:px-8">
            {nav.map((item) => (
              <li key={item.href} className="border-b border-border/60 last:border-0">
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block py-4 text-sm font-medium uppercase tracking-[0.12em]"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
