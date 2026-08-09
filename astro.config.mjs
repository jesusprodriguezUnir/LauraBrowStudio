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
          const rootLogo = path.resolve('logo.png');
          if (!fs.existsSync(rootLogo)) return;

          const publicDir = path.resolve('public');
          const assetsDir = path.resolve('src/assets');
          if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });
          if (!fs.existsSync(assetsDir)) fs.mkdirSync(assetsDir, { recursive: true });

          fs.copyFileSync(rootLogo, path.join(assetsDir, 'brow-mark.png'));

          await sharp(rootLogo)
            .resize(512, 512, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
            .png()
            .toFile(path.join(publicDir, 'icon-512.png'));
          await sharp(rootLogo)
            .resize(192, 192, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
            .png()
            .toFile(path.join(publicDir, 'icon-192.png'));
          await sharp(rootLogo)
            .resize(180, 180, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
            .png()
            .toFile(path.join(publicDir, 'apple-touch-icon.png'));
          await sharp(rootLogo)
            .resize(64, 64, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
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