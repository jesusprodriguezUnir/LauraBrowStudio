import { useState } from "react";
import { Menu, X, MessageCircle, Sun, Moon } from "lucide-react";
import logoMocha from "@/assets/logo-wordmark-mocha.png?url";
import { site, waLink, waMessages } from "@/lib/site-config";
import { WhatsappCta } from "./cta";

const nav = [
  { label: "Inicio", href: "#inicio" },
  { label: "Microblading", href: "#microblading" },
  { label: "Técnicas", href: "#servicios" },
  { label: "Test", href: "#test" },
  { label: "Resultados", href: "#resultados" },
  { label: "Sobre mí", href: "#sobre-mi" },
  { label: "FAQ", href: "#faq" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);

  const toggleTheme = () => {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    setDark(next);
    try {
      localStorage.setItem("lbs-theme", next ? "dark" : "light");
    } catch {
      /* sin almacenamiento disponible */
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 text-foreground backdrop-blur-md transition-colors duration-300">
      <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-4 md:px-8">
        <a href="#inicio" className="flex min-w-0 items-center" aria-label={`${site.name}, inicio`}>
          <img
            src={logoMocha}
            alt=""
            width={480}
            height={180}
            className="h-11 max-w-[14rem] object-contain transition duration-500 md:h-14 md:max-w-[16rem]"
          />
          <span className="sr-only">
            <span className="block truncate text-base font-semibold uppercase tracking-[0.08em] md:text-lg">
              {site.name}
            </span>
            <span className="mt-0.5 block truncate text-[0.6rem] uppercase tracking-[0.22em] text-muted-foreground">
              Cejas · Micropigmentación · {site.city}
            </span>
          </span>
        </a>

        <div className="flex shrink-0 items-center gap-2">
          <nav className="hidden items-center gap-6 lg:flex">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-[0.72rem] uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={dark ? "Activar tema claro" : "Activar tema oscuro"}
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:text-foreground"
          >
            {dark ? <Sun className="h-4 w-4" aria-hidden="true" /> : <Moon className="h-4 w-4" aria-hidden="true" />}
          </button>
          <WhatsappCta
            message={waMessages.general}
            className="hidden bg-foreground text-background hover:bg-primary hover:text-background md:inline-flex"
          >
            Reservar cita
          </WhatsappCta>
          <a
            href={waLink(waMessages.general)}
            {...(waLink(waMessages.general).startsWith("http")
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            aria-label="Consultar por WhatsApp"
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-foreground text-background md:hidden"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-border lg:hidden"
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
            <li className="py-4">
              <WhatsappCta message={waMessages.general} className="w-full">
                Reservar cita
              </WhatsappCta>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}