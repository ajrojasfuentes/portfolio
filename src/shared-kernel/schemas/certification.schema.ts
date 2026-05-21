import { z } from "zod";

export const CertificationSchema = z.object({
  title: z.string().min(1),
  issuer: z.string(),
  type: z.enum(["certification", "badge", "course", "specialization", "degree"]),
  issueDate: z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/),
  expiryDate: z
    .string()
    .regex(/^\d{4}-(0[1-9]|1[0-2])$/)
    .optional(),
  verifyUrl: z.url().optional(),
  badgeImage: z.string().startsWith("/").optional(),
  verified: z.boolean().default(false),
});

export type CertificationFrontmatter = z.infer<typeof CertificationSchema>;
