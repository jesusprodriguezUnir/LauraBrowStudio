import { useEffect, useState } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { site, waMessages } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { BrandLockup } from "./brand-lockup";
import { WhatsappCta } from "./cta";

const nav = [
  { label: "Inicio", href: "/" },
  { label: "Microblading", href: "/microblading" },
  { label: "Resultados", href: "/resultados" },
  { label: "Sobre mí", href: "/sobre-mi" },
  { label: "Contacto", href: "/contacto" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [current, setCurrent] = useState("");

  // El script anti-FOUC de Layout.astro ya ha puesto la clase antes de
  // hidratar: leemos de ahí en vez de asumir tema claro, que dejaba el icono
  // y el aria-label invertidos en la primera carga en oscuro.
  useEffect(() => {
    const sync = () => {
      setDark(document.documentElement.classList.contains("dark"));
      setCurrent(window.location.pathname.replace(/\/$/, "") || "/");
      setOpen(false);
    };
    sync();
    document.addEventListener("astro:page-load", sync);
    return () => document.removeEventListener("astro:page-load", sync);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

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
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 text-foreground backdrop-blur-md transition-colors duration-300">
      <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-5 py-3 md:gap-4 md:px-8 md:py-3.5">
        <a href="/" className="flex min-w-0 items-center" aria-label={`${site.name}, inicio`}>
          <BrandLockup />
        </a>

        <div className="flex shrink-0 items-center gap-2">
          <nav className="hidden items-center gap-6 lg:flex">
            {nav.map((item) => {
              const active = current === item.href.replace(/\/$/, "");
              return (
                <a
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "text-[0.8125rem] uppercase tracking-[0.14em] transition-colors duration-300 hover:text-foreground",
                    active ? "text-foreground" : "text-muted-foreground",
                  )}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={dark ? "Activar tema claro" : "Activar tema oscuro"}
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:text-foreground"
          >
            {dark ? <Sun className="h-4 w-4" aria-hidden="true" /> : <Moon className="h-4 w-4" aria-hidden="true" />}
          </button>
          <div className="hidden md:contents">
            <WhatsappCta message={waMessages.general} size="sm">
              Reservar cita
            </WhatsappCta>
          </div>
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
                  aria-current={current === item.href.replace(/\/$/, "") ? "page" : undefined}
                  className={cn(
                    "block py-4 text-sm font-medium uppercase tracking-[0.14em]",
                    current === item.href.replace(/\/$/, "") ? "text-foreground" : "text-muted-foreground",
                  )}
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
