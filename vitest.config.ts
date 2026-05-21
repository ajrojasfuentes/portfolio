import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    include: ["tests/unit/**/*.{test,spec}.{ts,tsx}", "src/**/*.{test,spec}.{ts,tsx}"],
    exclude: ["node_modules", "dist", ".astro"],
  },
  resolve: {
    alias: {
      "@/": new URL("./src/", import.meta.url).pathname,
      "@content/": new URL("./src/content/", import.meta.url).pathname,
      "@sk/": new URL("./src/shared-kernel/", import.meta.url).pathname,
    },
  },
});
