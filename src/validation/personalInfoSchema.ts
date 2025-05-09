import { z } from "zod";

export const personalInfoSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email"),
  phoneNumber: z
  .string()
  .min(10, "Phone number should be at least 10 digits")
  .max(15, "Phone number should not exceed 15 digits")
  .regex(/^\d+$/, "Phone number should only contain numeric characters"),

});

export type PersonalInfoFormData = z.infer<typeof personalInfoSchema>;
