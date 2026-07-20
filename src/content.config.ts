import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    category: z.string(),
    status: z.string(),
    tech: z.array(z.string()),
    github: z.string().optional(),
    demo: z.string().optional(),
    icon: z.string().default('Code2'),
    order: z.number().default(0),
  })
});

const publications = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/publications" }),
  schema: z.object({
    title: z.string(),
    type: z.string(),
    venue: z.string(),
    authors: z.string(),
    link: z.string().optional(),
    order: z.number().default(0),
  })
});

const experience = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/experience" }),
  schema: z.object({
    role: z.string(),
    company: z.string(),
    period: z.string(),
    category: z.enum(['job', 'volunteering', 'project', 'milestone']).default('job'),
    shortDesc: z.string().optional(),
    order: z.number().default(0),
  })
});

const certifications = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/certifications" }),
  schema: z.object({
    name: z.string(),
    issuer: z.string(),
    date: z.string().optional(),
    credentialId: z.string().optional(),
    order: z.number().default(0),
  })
});

const accomplishments = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/accomplishments" }),
  schema: z.object({
    title: z.string(),
    date: z.string().optional(),
    icon: z.string().default('Star'),
    order: z.number().default(0),
  })
});

const about = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/about" }),
  schema: z.object({
    name: z.string(),
    titles: z.array(z.string()),
    location: z.string(),
    statusText: z.string().optional(),
  })
});

export const collections = {
  projects,
  publications,
  experience,
  certifications,
  accomplishments,
  about
};
