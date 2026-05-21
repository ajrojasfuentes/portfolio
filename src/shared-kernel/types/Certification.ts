// Domain type for Certification - derived from Zod schema
import type { z } from "zod";
import type { CertificationSchema } from "../schemas/certification.schema";

export type Certification = z.infer<typeof CertificationSchema>;
