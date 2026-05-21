// Domain type for Project - derived from Zod schema
import type { z } from "zod";
import type { ProjectSchema } from "../schemas/project.schema";

export type Project = z.infer<typeof ProjectSchema>;
