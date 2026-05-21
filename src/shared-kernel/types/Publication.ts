// Domain type for Publication - derived from Zod schema
import type { z } from "zod";
import type { PublicationSchema } from "../schemas/publication.schema";

export type Publication = z.infer<typeof PublicationSchema>;
