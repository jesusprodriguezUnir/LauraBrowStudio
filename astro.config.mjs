import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

function generateLogoAssets() {
  return {
    name: 'generate-logo-assets',
    hooks: {
      'astro:config:setup': async () => {
        try {
          const emblem = path.resolve('src/assets/logos/emblem-512.png');
          const rootLogo = path.resolve('logo.png');
          const source = fs.existsSync(emblem) ? emblem : rootLogo;
          if (!fs.existsSync(source)) return;

          const publicDir = path.resolve('public');
          if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });

          const ivory = { r: 245, g: 236, b: 230, alpha: 1 };
          const clear = { r: 0, g: 0, b: 0, alpha: 0 };

          // El emblema, no el lockup primary: a 64–192 px las taglines se pierden.
          await sharp(source)
            .resize(512, 512, { fit: 'contain', background: clear })
            .png()
            .toFile(path.join(publicDir, 'icon-512.png'));
          await sharp(source)
            .resize(192, 192, { fit: 'contain', background: clear })
            .png()
            .toFile(path.join(publicDir, 'icon-192.png'));
          await sharp(source)
            .resize(180, 180, { fit: 'contain', background: ivory })
            .png()
            .toFile(path.join(publicDir, 'apple-touch-icon.png'));
          await sharp(source)
            .resize(64, 64, { fit: 'contain', background: clear })
            .png()
            .toFile(path.join(publicDir, 'favicon.png'));
        } catch (err) {
          console.error('[logo-assets] Error generating icons:', err);
        }
      },
    },
  };
}

const siteUrl = import.meta.env.PUBLIC_SITE_URL || 'https://laurabrowstudio.es';

// https://astro.build/config
export default defineConfig({
  site: siteUrl,
  output: 'static',
  compressHTML: true,
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },
  markdown: {
    shikiConfig: { theme: 'min-light' },
  },
  build: {
    inlineStylesheets: 'auto',
  },
  image: {
    service: { entrypoint: 'astro/assets/services/sharp' },
  },
  integrations: [
    generateLogoAssets(),
    react(),
    sitemap({
      changefreq: 'weekly',
      lastmod: new Date(),
      i18n: {
        defaultLocale: 'es',
        locales: { es: 'es-ES' },
      },
    }),
    mdx(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});