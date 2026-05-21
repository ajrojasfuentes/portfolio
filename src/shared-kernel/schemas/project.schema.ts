import { z } from "zod";

export const ProjectSchema = z.object({
  title: z.string().min(1),
  slug: z.string().regex(/^[a-z0-9-]+$/, "Slug must be URL-safe (lowercase, hyphens only)"),
  tagline: z.string().max(120),
  status: z.enum(["active", "completed", "archived", "wip"]),
  category: z.enum([
    "data-engineering",
    "ai-ml",
    "software",
    "research",
    "automation",
    "open-source",
    "other",
  ]),
  tags: z.array(z.string()),
  startDate: z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/),
  endDate: z
    .string()
    .regex(/^\d{4}-(0[1-9]|1[0-2])$/)
    .or(z.literal("present"))
    .optional(),
  githubUrl: z.url().optional(),
  demoUrl: z.url().optional(),
  previewImage: z.string().startsWith("/"),
  featured: z.boolean().default(false),
  featuredOrder: z.number().int().optional(),
  techStack: z.array(z.string()),
  highlights: z.array(z.string()).max(5),
  paperUrl: z.url().optional(),
  doi: z.string().optional(),
  architecture: z.string().optional(),
});

export type ProjectFrontmatter = z.infer<typeof ProjectSchema>;
