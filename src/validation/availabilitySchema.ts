// src/validation/availabilitySchema.ts
import { z } from "zod";

export const availabilitySchema = z.object({
  preferredStartDate: z.string().min(1, "Start date is required"),
  availabilityNotes: z.string().optional(),
  agreeToTerms: z.literal(true).refine(val => val === true, {
    message: "You must agree to the terms and conditions",
  }),
});


export type AvailabilityFormData = z.infer<typeof availabilitySchema>;
