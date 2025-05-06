import { z } from "zod";

export const jobPreferencesSchema = z.object({
  desiredRole: z.string().min(1, "Role is required"),
  jobType: z.enum(["Full-time", "Part-time", "Contract"]),
  location: z.string().min(1, "Location is required"),
  expectedSalary: z
    .string()
    .or(z.number())
    .refine((val) => Number(val) > 0, { message: "Must be a positive number" }),
  willingToRelocate: z.boolean().optional(),
});

export type JobPreferencesFormData = z.infer<typeof jobPreferencesSchema>;
