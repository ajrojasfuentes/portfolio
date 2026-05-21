import { z } from "zod";

export const AwardSchema = z.object({
  title: z.string().min(1),
  issuer: z.string(),
  date: z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/),
  category: z.enum(["academic", "professional", "competition", "research", "open-source"]),
  description: z.string().optional(),
  featured: z.boolean().default(false),
  mediaUrl: z.url().optional(),
});

export type AwardFrontmatter = z.infer<typeof AwardSchema>;
