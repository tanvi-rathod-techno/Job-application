import { z } from "zod";

export const resumeCoverSchema = z.object({
  resume: z
    .any()
    .transform((val) => val instanceof FileList ? val[0] : val)
    .refine(file => file instanceof File && file.size > 0, {
      message: "Resume is required.",
    }),
  coverLetter: z
    .any()
    .transform((val) => val instanceof FileList ? val[0] : val)
    .refine(file => file instanceof File && file.size > 0, {
      message: "Cover Letter is required.",
    }),
});

export type ResumeCoverFormData = z.infer<typeof resumeCoverSchema>;
