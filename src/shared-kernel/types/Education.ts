// Domain type for Education - derived from Zod schema
import type { z } from "zod";
import type { EducationSchema } from "../schemas/education.schema";

export type Education = z.infer<typeof EducationSchema>;
