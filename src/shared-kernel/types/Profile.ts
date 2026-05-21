// Domain type for Profile - derived from Zod schema
import type { z } from "zod";
import type { ProfileSchema } from "../schemas/profile.schema";

export type Profile = z.infer<typeof ProfileSchema>;
