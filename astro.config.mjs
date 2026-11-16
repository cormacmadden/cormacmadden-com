// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  vite: {
    server: {
      allowedHosts: ['cormacmadden.com', 'www.cormacmadden.com']
    }
  },
  site: 'https://cormacmadden.com',
  trailingSlash: 'never',
  build: { format: 'directory' },
  integrations: [mdx(), sitemap()],
});
