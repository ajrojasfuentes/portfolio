import { z } from "zod";

export const EducationSchema = z.object({
  institution: z.string().min(1),
  degree: z.string(),
  field: z.string(),
  startDate: z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/),
  endDate: z
    .string()
    .regex(/^\d{4}-(0[1-9]|1[0-2])$/)
    .or(z.literal("present"))
    .optional(),
  gpa: z.string().optional(),
  thesis: z.string().optional(),
  honors: z.array(z.string()).optional(),
});

export type EducationFrontmatter = z.infer<typeof EducationSchema>;
