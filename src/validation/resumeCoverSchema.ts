import { z } from "zod";

const pdfFileValidation = z
  .any()
  .refine((files) => files?.length === 1, {
    message: "This file is required",
  })
  .refine((files) => files?.[0]?.type === "application/pdf", {
    message: "Only PDF files are allowed",
  });

export const resumeCoverSchema = z.object({
  resume: pdfFileValidation,
  coverLetter: pdfFileValidation,
});

export type ResumeCoverFormData = z.infer<typeof resumeCoverSchema>;
