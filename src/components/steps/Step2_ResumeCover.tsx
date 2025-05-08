import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  resumeCoverSchema,
  ResumeCoverFormData,
} from "../../validation/resumeCoverSchema";
import Label from "../../components/ui/Label";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

type Step2Props = {
  onNext: (data: ResumeCoverFormData) => void;
  onBack: () => void;
};

const Step2_ResumeCover = ({ onNext, onBack }: Step2Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResumeCoverFormData>({
    resolver: zodResolver(resumeCoverSchema),
  });

  const convertFileToBase64 = (file: File): Promise<any> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve({
          name: file.name,
          type: file.type,
          size: file.size,
          content: reader.result as string,
        });
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const onSubmit = async (data: ResumeCoverFormData) => {
    try {
      const resumeFile = data.resume?.[0] || null;
      const coverLetterFile = data.coverLetter?.[0] || null;
      const resumeData = resumeFile ? await convertFileToBase64(resumeFile) : null;
      const coverLetterData = coverLetterFile ? await convertFileToBase64(coverLetterFile) : null;
      const stored = localStorage.getItem("jobApplication");
      const existingData = stored ? JSON.parse(stored) : {};
      const updated = {
        ...existingData,
        resumeCover: {
          resume: resumeData,
          coverLetter: coverLetterData,
        },
      };
      localStorage.setItem("jobApplication", JSON.stringify(updated));
      onNext({
        resume: resumeData ? [resumeData] : undefined,
        coverLetter: coverLetterData ? [coverLetterData] : undefined,
      });
    } catch (error) {
      console.error(" Error storing files to localStorage:", error);
    }
  };
  

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <Label className="text-gray-700">Upload Resume</Label>
        <Input
          type="file"
          accept=".pdf,.doc,.docx"
          {...register("resume")}
          className="mt-1"
        />
        {typeof errors.resume?.message === "string" && (
          <p className="text-sm text-red-500 mt-1">{errors.resume.message}</p>
        )}
      </div>

      <div>
        <Label className="text-gray-700">Upload Cover Letter</Label>
        <Input
          type="file"
          accept=".pdf,.doc,.docx"
          {...register("coverLetter")}
          className="mt-1"
        />
        {typeof errors.coverLetter?.message === "string" && (
          <p className="text-sm text-red-500 mt-1">
            {errors.coverLetter.message}
          </p>
        )}
      </div>

      <div className="flex justify-between">
        <Button type="button" onClick={onBack}>
          Back
        </Button>
        <Button type="submit">Next</Button>
      </div>
    </form>
  );
};

export default Step2_ResumeCover;
