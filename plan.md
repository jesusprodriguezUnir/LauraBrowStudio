# Plan de mejora — LauraBrowStudio

> Web Astro 5 + React 19 + Tailwind 4 + shadcn/ui de un estudio de microblading en Palencia (España). Contenido en español.
> Estado objetivo: publicable, con SEO local fuerte, rendimiento 90+, accesible, con sistema de reservas por WhatsApp + formulario, y todos los datos de negocio centralizados en `site-config.ts` / variables de entorno.

## Decisiones de negocio (tomadas con el propietario)

- **Reservas:** Solo WhatsApp + formulario (sin agenda pública).
- **Datos reales:** Pendientes. Se usarán placeholders claramente marcados `[Pendiente — sustituir]` y `.env.example` para que la semana siguiente se sustituyan sin tocar código.
- **Catálogo:** Solo microblading pelo a pelo. Nada de shading ni técnica mixta.
- **Idioma:** Solo español.

---

## Fase 0 — Limpieza técnica (~2 h)

- Borrar residuo Lovable: `src/lib/error-capture.ts`, `src/lib/error-page.ts`, `src/lib/lovable-error-reporting.ts`, `src/pages/readme.astro`, `migrate.js`.
- Crear `public/`: `favicon.png`, `robots.txt`, `site.webmanifest`, iconos PWA 192/512 (derivados de `brow-mark.png`).
- Borrar componentes shadcn no usados (conservar: `accordion`, `button`, `card`, `dialog`, `tabs`, `aspect-ratio`, `tooltip`, `badge`).
- Quitar deps npm muertas: `@tanstack/react-query`, `recharts`, `react-day-picker`, `react-resizable-panels`, `vaul`, `cmdk`, `input-otp`, `date-fns`, Radix no consumidos.
- `components.json`: `baseColor: slate` → alineado con paleta mocha/ivory.
- Crear `.env.example` (para sustituir placeholders sin recompilar código).
- Tras la purga, verificar `npm run build` (`astro check`) sin errores.

## Fase 1 — Datos y reservas (~3 h)

- `src/lib/site-config.ts` con datos inventados marcados + lectura de `import.meta.env` (con fallback).
- Reactivar `waLink()`: todos los CTAs abren wa.me con mensaje pre-rellenado.
- Formulario de reserva (react-hook-form + zod, ya en deps): nombre, email, teléfono, fecha preferida, mensaje, check +18 y check contraindicaciones.
- Envío sin backend: Formspree (o Web3Forms / Netlify Forms) → email al negocio.
- Cloudflare Turnstile gratis + sin cookies.
- Toasts con `sonner` para feedback.

## Fase 2 — Microblading profundo (~4 h)

- Refactor de `Services` (hoy describe el proceso): ficha única de microblading pelo a pelo con imagen, duración sesión, duración efecto, ideal para, contraindicaciones, precio "desde XX€ / consultar".
- Sección "Proceso" separada (valoración → sesión → retoque 4-8 semanas) incorporando `Process` o eliminando duplicidad.
- Montar `TechniqueQuiz` (ya escrito): 4 preguntas → orienta sobre si el microblading encaja + CTA wa.me con `waMessagesQuiz()`.
- Montar `HealedResults` (fresh vs healed 30 días).
- Montar `Philosophy` (higiene/seguridad: agujas desechables, pigmentos veganos, etc.).

## Fase 3 — SEO técnico Astro (~5 h)

- `astro.config.mjs`: integraciones `@astrojs/sitemap`, `@astrojs/mdx`; `image.service: 'sharp'`; `prefetch`; `compressHTML`; `build.inlineStylesheets: 'auto'`.
- Colección `src/content/blog/` (Astro Content Collections) lista para blog futuro.
- `Layout.astro`: OG completo, Twitter card completo, canonical, theme-color, manifest, self-hosting de fuentes (`@fontsource-variable/poppins` + `@fontsource-variable/cormorant-garamond`).
- JSON-LD `set:html`: `BeautySalon` (postalAddress, geo, openingHours, priceRange, sameAs), `FAQPage` (desde `faqItems`), `BreadcrumbList`, `Service` por variante.
- `robots.txt` con sitemap URL. `404.astro` de marca. Eliminar `readme.astro`.

## Fase 4 — Rendimiento, a11y y diseño (~6 h)

- Componentes → `.astro` estáticos: `SiteFooter`, `Reviews`, `Aftercare`, `Services`, `MicrobladingInfo`, `Philosophy`, `Process`, `LocalSeo`, `FinalCta`, `About`, `HealedResults`. React solo para: `SiteHeader`, `BeforeAfter`, `ComparisonSlider`, `TechniqueQuiz`, `FaqSection`.
- Hidratación selectiva: `client:visible` para BeforeAfter/TechniqueQuiz, `client:load` solo SiteHeader.
- Imágenes de `?url` → `astro:assets` (`<Image/>`, `<Picture/>`): AVIF/WebP, width/height (cero CLS), lazy.
- `Reveal.astro` que conecta `hooks/use-reveal.ts`.
- A11y: skip-link, `scroll-margin-top: var(--header-h)`, contraste captions, `aria-hidden` en ComparisonSlider, `role="tab"` en CaseCard.
- Diseño: hero con `brow-hero.jpg` (parallax sutil), montar `LocalSeo`, alternar superficies `--surface-*`, activar tema oscuro (`.dark` ya está escrito) con toggle, galería `embla-carousel-autoplay` + lightbox `dialog`, View Transitions Astro, WhatsAppBar 3 botones en móvil, microinteracciones hairline + focus rings.

## Fase 5 — Legalidad (~2 h)

- Páginas legales sin placeholders: NIF real, encargados del tratamiento, política de cookies actualizada (Turnstile + analytics cookieless).
- Analytics cookieless: Plausible self-hosted o `@vercel/analytics`.

---

## Cronograma propuesto

1. Commits fase 0 + 1 + 3 (fundación; sitio publicable con placeholders).
2. Commits fase 2 + 4 (contenido y diseño/rendimiento).
3. Commits fase 5 (legal). Deploy.

## Métricas objetivo

| Métrica | Ahora | Meta |
|---|---|---|
| Lighthouse Perf | ~60 | 95+ |
| Lighthouse SEO | ~70 | 100 |
| Páginas indexables | 4 (1 con texto Lovable EN) | 6 + sitemap |
| Componentes React hidratados | 13 | 4-5 |
| CTAs funcionales | 0 | todos |
| Schema.org | 0 | 4 |
| Imágenes optimizadas | 0 | 100% (AVIF/WebP) |