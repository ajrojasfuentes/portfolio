// Domain type for Award - derived from Zod schema
import type { z } from "zod";
import type { AwardSchema } from "../schemas/award.schema";

export type Award = z.infer<typeof AwardSchema>;
