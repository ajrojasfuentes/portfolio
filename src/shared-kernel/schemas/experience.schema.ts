import { z } from "zod";

export const ExperienceSchema = z.object({
  role: z.string().min(1),
  company: z.string(),
  companyUrl: z.url().optional(),
  type: z.enum(["full-time", "part-time", "contract", "freelance", "internship", "research"]),
  location: z.string(),
  startDate: z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/),
  endDate: z
    .string()
    .regex(/^\d{4}-(0[1-9]|1[0-2])$/)
    .or(z.literal("present"))
    .optional(),
  techStack: z.array(z.string()),
  highlights: z.array(z.string()).max(5),
});

export type ExperienceFrontmatter = z.infer<typeof ExperienceSchema>;
