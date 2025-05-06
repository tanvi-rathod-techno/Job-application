import { z } from "zod";

export const availabilitySchema = z.object({
  preferredStartDate: z.string().nonempty("Start date is required"),
  availability: z.enum(["Full-time", "Part-time", "Both"]),
  availabilityNotes: z.string().optional(),
});

export type AvailabilityFormData = z.infer<typeof availabilitySchema>;
