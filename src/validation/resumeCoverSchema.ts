import { z } from "zod";

export const resumeCoverSchema = z.object({
  resume: z
    .any()
    .refine((fileList) => fileList?.length === 1, {
      message: "Resume is required",
    }),
  coverLetter: z
    .any()
    .refine((fileList) => fileList?.length === 1, {
      message: "Cover letter is required",
    }),
});

export type ResumeCoverFormData = z.infer<typeof resumeCoverSchema>;
