// src/validation/availabilitySchema.ts
import { z } from "zod";

export const availabilitySchema = z.object({
  preferredStartDate: z.string().nonempty("Start date is required"),
  availability: z.enum(["Full-time", "Part-time", "Both"]),
  availabilityNotes: z.string().optional(),
  agreeToTerms: z.literal(true, {
    errorMap: () => ({ message: "You must agree to the terms" }),
  }),
});

export type AvailabilityFormData = z.infer<typeof availabilitySchema>;
