import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  resumeCoverSchema,
  ResumeCoverFormData,
} from "../../validation/resumeCoverSchema";
import Label from "../../components/ui/Label";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { useEffect, useState } from "react";

type Step2Props = {
  onNext: (data: ResumeCoverFormData) => void;
  onBack: () => void;
};

type FileBase64 = {
  name: string;
  type: string;
  size: number;
  content: string;
};

const Step2_ResumeCover = ({ onNext, onBack }: Step2Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ResumeCoverFormData>({
    resolver: zodResolver(resumeCoverSchema),
  });

  const [uploadedResume, setUploadedResume] = useState<FileBase64 | null>(null);
  const [uploadedCoverLetter, setUploadedCoverLetter] = useState<FileBase64 | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("jobApplication");
    const existingData = stored ? JSON.parse(stored) : {};
    const resume = existingData?.resumeCover?.resume || null;
    const coverLetter = existingData?.resumeCover?.coverLetter || null;

    if (resume) {
      setUploadedResume(resume);
      setValue("resume", [resume]);
    }
    if (coverLetter) {
      setUploadedCoverLetter(coverLetter);
      setValue("coverLetter", [coverLetter]);
    }
  }, [setValue]);

  const watchedResume = watch("resume");
  const watchedCoverLetter = watch("coverLetter");

  const convertFileToBase64 = (file: File): Promise<FileBase64> => {
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

  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "resume" | "coverLetter"
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const base64 = await convertFileToBase64(file);

    const stored = localStorage.getItem("jobApplication");
    const existingData = stored ? JSON.parse(stored) : {};
    const updated = {
      ...existingData,
      resumeCover: {
        ...existingData.resumeCover,
        [field]: base64,
      },
    };
    localStorage.setItem("jobApplication", JSON.stringify(updated));

    setValue(field, [base64]);
    if (field === "resume") {
      setUploadedResume(base64);
    } else {
      setUploadedCoverLetter(base64);
    }
  };

  const handleRemoveFile = (field: "resume" | "coverLetter") => {
    const stored = localStorage.getItem("jobApplication");
    const existingData = stored ? JSON.parse(stored) : {};
    const updated = {
      ...existingData,
      resumeCover: {
        ...existingData.resumeCover,
        [field]: null,
      },
    };
    localStorage.setItem("jobApplication", JSON.stringify(updated));
    setValue(field, undefined);
    if (field === "resume") {
      setUploadedResume(null);
    } else {
      setUploadedCoverLetter(null);
    }
  };

  const onSubmit = (data: ResumeCoverFormData) => {
    onNext(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Resume Upload */}
      <div className="space-y-1 sm:space-y-0 sm:flex sm:items-center sm:justify-between border p-4 rounded-lg shadow-sm">
        <div className="sm:w-1/3">
          <Label className="text-gray-700">Upload Resume</Label>
        </div>
        <div className="sm:w-2/3">
          {uploadedResume ? (
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span className="truncate">{uploadedResume.name}</span>
              <button
                type="button"
                className="text-blue-600 underline ml-2 text-xs"
                onClick={() => handleRemoveFile("resume")}
              >
                Change
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <label htmlFor="resume" className="cursor-pointer">
                <div className="border border-gray-300 rounded-md px-4 py-2 text-gray-700">
                  <span>Choose Resume</span>
                </div>
              </label>
              <input
                id="resume"
                type="file"
                accept=".pdf,.doc,.docx"
                className="hidden"
                onChange={(e) => handleFileUpload(e, "resume")}
              />
            </div>
          )}
          {typeof errors.resume?.message === "string" && (
            <p className="text-sm text-red-500 mt-1">{errors.resume.message}</p>
          )}
        </div>
      </div>

      {/* Cover Letter Upload */}
      <div className="space-y-1 sm:space-y-0 sm:flex sm:items-center sm:justify-between border p-4 rounded-lg shadow-sm">
        <div className="sm:w-1/3">
          <Label className="text-gray-700">Upload Cover Letter</Label>
        </div>
        <div className="sm:w-2/3">
          {uploadedCoverLetter ? (
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span className="truncate">{uploadedCoverLetter.name}</span>
              <button
                type="button"
                className="text-blue-600 underline ml-2 text-xs"
                onClick={() => handleRemoveFile("coverLetter")}
              >
                Change
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <label htmlFor="coverLetter" className="cursor-pointer">
                <div className="border border-gray-300 rounded-md px-4 py-2 text-gray-700">
                  <span>Choose Cover Letter</span>
                </div>
              </label>
              <input
                id="coverLetter"
                type="file"
                accept=".pdf,.doc,.docx"
                className="hidden"
                onChange={(e) => handleFileUpload(e, "coverLetter")}
              />
            </div>
          )}
          {typeof errors.coverLetter?.message === "string" && (
            <p className="text-sm text-red-500 mt-1">{errors.coverLetter.message}</p>
          )}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-4">
        <Button type="button" onClick={onBack}>
          Back
        </Button>
        <Button type="submit">Next</Button>
      </div>
    </form>
  );
};

export default Step2_ResumeCover;
