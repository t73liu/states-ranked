import { defineConfig } from 'astro/config';
import svelte from "@astrojs/svelte";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: "https://t73liu.github.io/states-ranked",
  integrations: [tailwind(), svelte()]
});
