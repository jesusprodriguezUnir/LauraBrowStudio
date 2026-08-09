# LauraBrowStudio

Web de LauraBrowStudio, estudio de microblading y micropigmentación de cejas en Palencia (España).

## Stack

- [Astro 5](https://docs.astro.build) (estático)
- React 19 (solo para componentes interactivos)
- Tailwind CSS 4
- TypeScript
- `astro:content` para el blog (`src/content/blog/`)

## Desarrollo

```bash
npm i
npm run dev
```

## Build y verificación

```bash
npm run check   # astro check (tipado)
npm run build   # check + build estático en dist/
npm run preview
```

## Configuración

Todos los datos de negocio se centralizan en `src/lib/site-config.ts` y se sobreescriben
con variables de entorno vía `.env` (ver `.env.example`):

- `PUBLIC_SITE_URL`, `PUBLIC_PHONE_DISPLAY`, `PUBLIC_WHATSAPP_NUMBER`, `PUBLIC_EMAIL`, `PUBLIC_ADDRESS`
- `PUBLIC_INSTAGRAM`, `PUBLIC_NIF`, `PUBLIC_LEGAL_NAME`
- `PUBLIC_LAT`, `PUBLIC_LNG`, `PUBLIC_BUSINESS_HOURS`
- `PUBLIC_FORM_ENDPOINT`, `PUBLIC_TURNSTILE_SITE_KEY`, `PUBLIC_PLAUSIBLE_DOMAIN`

## Reservas

Sin agenda pública: WhatsApp + formulario. Si `PUBLIC_FORM_ENDPOINT` está vacío,
el formulario hace fallback abriendo WhatsApp con un mensaje preescrito.

## Estructura

- `src/components/site/` — componentes `.astro`/React de la web
- `src/layouts/` — `Layout.astro` (SEO + JSON-LD) y `BlogPost.astro`
- `src/lib/` — `site-config.ts`, `faq.ts`, utilidades
- `src/pages/blog/` — blog (Content Collections)
- `src/pages/` — página principal, legales y 404