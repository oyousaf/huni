// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://huni.legxcysol.dev',
  vite: { plugins: [tailwindcss()] },
});
