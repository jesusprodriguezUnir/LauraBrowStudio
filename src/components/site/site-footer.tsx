
import logoMocha from "@/assets/logo-wordmark-mocha.png?url";
import { site } from "@/lib/site-config";

export function SiteFooter() {
  return (
    <footer className="border-t border-border py-14 pb-28 md:pb-14">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-[1.2fr_1fr_1fr] md:px-8">
        <div>
          <img
            src={logoMocha}
            alt={site.name}
            width={480}
            height={180}
            loading="lazy"
            className="brand-logo mb-5 h-12 max-w-[12rem] object-left"
          />
          <p className="mt-2 max-w-xs text-[0.82rem] leading-relaxed text-muted-foreground">
            {site.claim}
          </p>
        </div>
        <div>
          <p className="text-[0.6rem] uppercase tracking-[0.18em] text-muted-foreground">
            Contacto
          </p>
          <ul className="mt-3 space-y-1.5 text-[0.84rem]">
            <li>WhatsApp: {site.phoneDisplay}</li>
            <li>Teléfono: {site.phoneDisplay}</li>
            <li>Email: {site.email}</li>
            <li>{site.address}</li>
            <li>Instagram: {site.instagram}</li>
          </ul>
        </div>
        <div>
          <p className="text-[0.6rem] uppercase tracking-[0.18em] text-muted-foreground">Legal</p>
          <ul className="mt-3 space-y-1.5 text-[0.84rem]">
            <li>
              <a href="/aviso-legal" className="nav-link">
                Aviso legal
              </a>
            </li>
            <li>
              <a href="/politica-de-privacidad" className="nav-link">
                Política de privacidad
              </a>
            </li>
            <li>
              <a href="/politica-de-cookies" className="nav-link">
                Política de cookies
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-12 max-w-6xl px-5 md:px-8">
        <p className="border-t border-border pt-6 text-[0.7rem] uppercase tracking-[0.16em] text-muted-foreground">
          {site.city} · {site.country}
        </p>
      </div>
    </footer>
  );
}
