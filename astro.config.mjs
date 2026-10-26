// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://huni-concept.pages.dev',
  vite: { plugins: [tailwindcss()] },
});
