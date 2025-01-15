// @ts-check
import { defineConfig } from 'astro/config';

import netlify from '@astrojs/netlify';

import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: 'https://mattiabombelli.com',
  output: 'server',
  adapter: netlify(),
  integrations: [mdx()]
});