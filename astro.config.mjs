import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import yaml from '@rollup/plugin-yaml';

import react from "@astrojs/react";

const isDev = process.env.NODE_ENV === 'development';

const getBaseUrl = () => {
  if (isDev) {
    return {
      site: 'http://localhost',
      base: '',
    };
  }

  return {
    site: 'https://tokiory.github.io',
    base: 'waitread',
  };
}

// https://astro.build/config
export default defineConfig({
  ...getBaseUrl(),
  integrations: [tailwind(), react()],
  vite: {
    plugins: [
      yaml(),
    ],
  }
});