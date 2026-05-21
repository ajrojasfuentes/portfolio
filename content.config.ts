import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "zod";

const projectSchema = z.object({
  title: z.string().min(1),
  slug: z.string().regex(/^[a-z0-9-]+$/),
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
  endDate: z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/).or(z.literal("present")).optional(),
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

const publicationSchema = z.object({
  title: z.string().min(1),
  authors: z.array(z.string()).min(1),
  type: z.enum([
    "journal",
    "conference",
    "book-chapter",
    "preprint",
    "technical-report",
    "thesis",
    "personal-post",
  ]),
  channel: z.string(),
  channelUrl: z.url().optional(),
  publishedDate: z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/),
  doi: z.string().optional(),
  arxivId: z.string().optional(),
  paperUrl: z.url().optional(),
  abstract: z.string().max(1200).optional(),
  tags: z.array(z.string()),
  citationCount: z.number().int().nonnegative().optional(),
  featured: z.boolean().default(false),
  isEditorial: z.boolean().default(false),
});

const certificationSchema = z.object({
  title: z.string().min(1),
  issuer: z.string(),
  type: z.enum(["certification", "badge", "course", "specialization", "degree"]),
  issueDate: z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/),
  expiryDate: z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/).optional(),
  verifyUrl: z.url().optional(),
  badgeImage: z.string().startsWith("/").optional(),
  verified: z.boolean().default(false),
});

const awardSchema = z.object({
  title: z.string().min(1),
  issuer: z.string(),
  date: z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/),
  category: z.enum(["academic", "professional", "competition", "research", "open-source"]),
  description: z.string().optional(),
  featured: z.boolean().default(false),
  mediaUrl: z.url().optional(),
});

const experienceSchema = z.object({
  role: z.string().min(1),
  company: z.string(),
  companyUrl: z.url().optional(),
  type: z.enum(["full-time", "part-time", "contract", "freelance", "internship", "research"]),
  location: z.string(),
  startDate: z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/),
  endDate: z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/).or(z.literal("present")).optional(),
  techStack: z.array(z.string()),
  highlights: z.array(z.string()).max(5),
});

const educationSchema = z.object({
  institution: z.string().min(1),
  degree: z.string(),
  field: z.string(),
  startDate: z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/),
  endDate: z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/).or(z.literal("present")).optional(),
  gpa: z.string().optional(),
  thesis: z.string().optional(),
  honors: z.array(z.string()).optional(),
});

const profileSchema = z.object({
  name: z.string().min(1),
  titles: z.array(z.string()),
  bio: z.string().max(500),
  location: z.string(),
  email: z.email(),
  socialLinks: z.object({
    github: z.url().optional(),
    linkedin: z.url().optional(),
    googleScholar: z.url().optional(),
    orcid: z.url().optional(),
    researchGate: z.url().optional(),
    twitter: z.url().optional(),
  }),
  avatar: z.string().startsWith("/").optional(),
  lastUpdated: z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/),
});

export const collections = {
  projects: defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
    schema: projectSchema,
  }),
  publications: defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/publications" }),
    schema: publicationSchema,
  }),
  certifications: defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/certifications" }),
    schema: certificationSchema,
  }),
  awards: defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/awards" }),
    schema: awardSchema,
  }),
  experience: defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/about/experience" }),
    schema: experienceSchema,
  }),
  education: defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/about/education" }),
    schema: educationSchema,
  }),
  profile: defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/about" }),
    schema: profileSchema,
  }),
};
