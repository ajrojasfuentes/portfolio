import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://ajrojasfuentes.dev",
  output: "static",
  integrations: [
    react(),
    mdx(),
    sitemap(),
  ],
  vite: {
    plugins: [tailwindcss()],
    ssr: {
      noExternal: [
        '@ajrojasfuentes/stellar-void', 
        '@ajrojasfuentes/core', 
        '@ajrojasfuentes/background', 
        '@ajrojasfuentes/constellations', 
        '@ajrojasfuentes/planets', 
        '@ajrojasfuentes/travelers'
      ]
    },
    optimizeDeps: {
      include: [
        '@ajrojasfuentes/stellar-void', 
        '@ajrojasfuentes/core', 
        '@ajrojasfuentes/background', 
        '@ajrojasfuentes/constellations', 
        '@ajrojasfuentes/planets', 
        '@ajrojasfuentes/travelers'
      ]
    }
  },
  markdown: {
    shikiConfig: {
      theme: "github-dark",
      wrap: true,
    },
  },
});
