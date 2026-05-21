import { z } from "zod";

export const ProfileSchema = z.object({
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

export type ProfileFrontmatter = z.infer<typeof ProfileSchema>;
