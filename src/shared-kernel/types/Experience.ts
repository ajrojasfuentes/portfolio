// Domain type for Experience - derived from Zod schema
import type { z } from "zod";
import type { ExperienceSchema } from "../schemas/experience.schema";

export type Experience = z.infer<typeof ExperienceSchema>;
