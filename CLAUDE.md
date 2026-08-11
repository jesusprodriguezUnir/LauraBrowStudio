# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Comandos

```bash
npm run dev      # servidor de desarrollo (astro dev)
npm run build    # astro check (tipado) + build estático en dist/
npm run preview  # sirve dist/ localmente
npx astro check  # solo verificación de tipos (el README menciona `npm run check`, pero ese script no existe)
```

No hay tests ni linter configurados. `astro check` (dentro de `build`) es la única verificación automática: TypeScript en modo `strict` de Astro más flags extra (`noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`, `noPropertyAccessFromIndexSignature`). Ese último flag obliga a leer `import.meta.env` con notación de corchetes: `env["PUBLIC_X"]`, no `env.PUBLIC_X`.

## Qué es este proyecto

Sitio estático (`output: 'static'`) de un estudio de microblading en Palencia. Solo español (`lang="es"`), sin backend y sin agenda pública: la conversión ocurre por WhatsApp y por un formulario que se envía a un endpoint externo.

## Arquitectura

**Astro 5 con islas React.** Los componentes `.astro` en `src/components/site/` son la mayoría y no envían JS. Los `.tsx` del mismo directorio son las islas interactivas y se montan explícitamente desde las páginas: `SiteHeader` con `client:load`, el resto (`TechniqueQuiz`, `BeforeAfter`, `BookingForm`, `ComparisonSlider`) con `client:visible`. No añadas React donde baste `.astro`.

**`src/lib/site-config.ts` es la única fuente de datos de negocio.** Teléfono, WhatsApp, email, dirección, NIF, coordenadas, horario, endpoint del formulario, sitekey de Turnstile y dominio de Plausible se leen de `import.meta.env` con valores por defecto provisionales. Nunca escribas un dato de contacto directamente en un componente: añádelo aquí y a `.env.example`. Los valores son *build-time* (Astro estático), así que cambiar `.env` exige rebuild.

Convenciones que dependen de ese archivo:
- `waLink(mensaje)` genera todos los enlaces a WhatsApp; devuelve `#contacto` si no hay número. Los mensajes preescritos viven en `waMessages`.
- Varios sitios comprueban `valor.startsWith("[")` para detectar placeholders sin sustituir y omitir el campo (p. ej. el JSON-LD de `Layout.astro` no emite `telephone` ni `address` si aún son placeholders). Mantén ese patrón al añadir campos.
- `BookingForm` tiene doble modo: si `PUBLIC_FORM_ENDPOINT` está definido hace `fetch` POST (con token de Turnstile si hay sitekey); si está vacío, cae a abrir WhatsApp con la solicitud preescrita. Ambas ramas deben seguir funcionando.

**`src/layouts/Layout.astro` concentra head, SEO y scripts globales.** Cada página lo usa pasando `title`, `description`, `path` (para el canonical) y opcionalmente `includeFaq`. Emite JSON-LD de `BeautySalon`, `BreadcrumbList` (solo si `path !== "/"`) y `FAQPage` (desde `src/lib/faq.ts`, la misma fuente que alimenta `FaqSection.astro`). También contiene el script inline anti-FOUC del tema oscuro (`localStorage` key `lbs-theme` → clase `dark` en `<html>`), el `IntersectionObserver` que activa las animaciones `.reveal`, el `ClientRouter` de view transitions y el `Toaster` de sonner. Si añades una página nueva, pasa siempre `path` o el canonical apuntará a `/`.

**Estilos: tokens CSS + Tailwind 4, sin `tailwind.config`.** `src/styles.css` importa Tailwind y los seis archivos de `src/tokens/`, y luego reexpone las variables semánticas como utilidades vía `@theme inline` (`bg-surface-card`, `text-muted-foreground`, `font-display`…). Las clases utilitarias propias (`display-xl`, `section-title`, `section-kicker`, `eyebrow`, `image-frame`, `hairline`, `placeholder-tag`, `reveal`, `prose-legal`) están definidas como CSS plano en `src/tokens/base.css`. Usa los tokens semánticos, no colores literales ni las variables base (`--mocha-500`, `--gold-500`) directamente.

**Blog con Content Collections.** `src/content.config.ts` define la colección `blog` con el loader `glob` sobre `src/content/blog/*.{md,mdx}` y un schema Zod (`title`, `description`, `pubDate`, `updatedDate?`, `draft`). Se renderiza en `src/pages/blog/[slug].astro` con `src/layouts/BlogPost.astro`.

**Generación de iconos en build.** El plugin `generateLogoAssets()` de `astro.config.mjs` corre en `astro:config:setup` y deriva de `logo.png` (raíz) los archivos `public/icon-512.png`, `icon-192.png`, `apple-touch-icon.png` y `favicon.png`, además de copiar `src/assets/brow-mark.png`. Esos archivos son generados: no los edites a mano, sustituye `logo.png`.

Alias de import: `@/*` → `./src/*`.

## Design system

`doc/` (ignorado por git) contiene el design system de la marca como Agent Skill (`doc/LauraBrowStudio Design System/`) y un prototipo antiguo del sitio. Su `readme.md` documenta la marca en detalle. Reglas que aplican al código de producción:

- **Color:** rampa cálida ivory → beige → mocha → charcoal. El acento es `--mocha-500` y ocupa ~3% de pantalla. El dorado (`--gold-500`) pertenece al logo y sus filetes; nunca a botones ni texto de cuerpo. Máximo dos fondos por página más la única banda charcoal.
- **Tipografía:** Poppins para todo el cuerpo, Cormorant Garamond para el display. Displays y títulos de sección en MAYÚSCULAS vía CSS — las cadenas fuente se escriben en frase normal. Escalera de tracking deliberada en las etiquetas (0.12em nav → 0.22em sub-línea de header).
- **Forma:** todos los bordes son 1px; esquinas casi cuadradas (4px en fotos, 6px en controles) salvo lo accionable, que es pill. Una sola sombra, solo bajo fotografía.
- **Movimiento:** solo el reveal en scroll (700ms) y hover de color. Sin bounce, sin scale-in, y todo se colapsa con `prefers-reduced-motion`.
- **Iconos:** Lucide (`lucide-react`), stroke 2px, `currentColor`. Sin emoji en ninguna parte del código ni del contenido.

## Contenido y copy

- Español de España. Trato de «tú» al cliente y «nosotros» para el estudio; Laura habla en primera persona solo dentro de guillemets `« »`.
- Tono honesto y anti-hype: se cubre a propósito («puede encajar si…», «molesto pero tolerable», «tratamiento de larga duración, no permanente»). Sin superlativos, sin urgencia, sin descuentos, sin signos de exclamación.
- **Nunca inventes precios, reseñas, credenciales ni datos de contacto.** Lo desconocido se escribe como placeholder visible (`[FORMACIÓN PENDIENTE]`) y se marca con `placeholder-tag`. Las cifras siempre van cualificadas («de 12 a 18 meses de media, según piel y cuidados»).
- Separador `·` en líneas de metadatos, rangos con guion corto («Días 5-10»), `…` para frases que quedan abiertas.
