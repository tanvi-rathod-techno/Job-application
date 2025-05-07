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

  const onSubmit = (data: ResumeCoverFormData) => {
    onNext(data);
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
          <p className="text-sm text-red-500 mt-1">{errors.coverLetter.message}</p>
        )}
      </div>

      <div className="flex justify-between">
        <Button
          type="button"
          onClick={onBack}
          
        >
          Back
        </Button>

        <Button
          type="submit"
        
        >
          Next
        </Button>
      </div>
    </form>
  );
};

export default Step2_ResumeCover;
