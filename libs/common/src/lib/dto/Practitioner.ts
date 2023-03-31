import { z } from "zod";

export const Practitioner = z.object({
  phoneNumber: z.string(),
  website: z.string(),
  languages: z.string(),
  modality: z.string(),
  businessLocation: z.string(),
  businessName: z.string(),
  minAgeServed: z.number(),
  email: z.string().email(),
  fullName: z.string(),
  languagesList: z.array(z.string()),
})

export type Practitioner = z.infer<typeof Practitioner>
