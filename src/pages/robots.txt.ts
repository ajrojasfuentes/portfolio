import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
  return new Response(
    `User-agent: *
Allow: /
Sitemap: https://ajrojasfuentes.dev/sitemap.xml
`,
    {
      headers: {
        "Content-Type": "text/plain",
      },
    }
  );
};
