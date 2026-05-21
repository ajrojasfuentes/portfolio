import { z } from "zod";

export const PublicationSchema = z.object({
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

export type PublicationFrontmatter = z.infer<typeof PublicationSchema>;
