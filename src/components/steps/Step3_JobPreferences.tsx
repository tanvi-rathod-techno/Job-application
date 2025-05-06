import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  jobPreferencesSchema,
  JobPreferencesFormData,
} from "../../validation/jobPreferencesSchema";
import Label from "../ui/Label";
import Input from "../ui/Input";
import Button from "../ui/Button";
import Select from "../ui/Select";
import RadioGroup from "../ui/RadioGroup";
import Checkbox from "../ui/Checkbox";

type Step3Props = {
  onNext: (data: JobPreferencesFormData) => void;
  onBack: () => void;
};

const Step3_JobPreferences = ({ onNext, onBack }: Step3Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<JobPreferencesFormData>({
    resolver: zodResolver(jobPreferencesSchema),
  });

  const onSubmit = (data: JobPreferencesFormData) => {
    onNext(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Desired Role */}
      <div>
        <Label htmlFor="desiredRole">Desired Role</Label>
        <Input id="desiredRole" type="text" {...register("desiredRole")} />
        {errors.desiredRole && (
          <p className="text-red-500 text-sm">{errors.desiredRole.message}</p>
        )}
      </div>

      {/* Job Type */}
      <div>
        <Label>Job Type</Label>
        <RadioGroup
          name="jobType"
          register={register}
          options={[
            { label: "Full-time", value: "Full-time" },
            { label: "Part-time", value: "Part-time" },
            { label: "Contract", value: "Contract" },
          ]}
          error={errors.jobType?.message}
        />
      </div>

      {/* Location */}
      <div>
        <Label htmlFor="location">Preferred Location</Label>
        <Select
          label="Preferred Location"
          options={[
            { label: "Remote", value: "Remote" },
            { label: "New York", value: "New York" },
            { label: "San Francisco", value: "San Francisco" },
            { label: "Austin", value: "Austin" },
          ]}
          {...register("location")}
          error={errors.location?.message}
        />
      </div>

      {/* Relocation Checkbox */}
      <Checkbox
        label="Yes, I’m open to relocation"
        register={register}
        name="willingToRelocate"
        error={errors.willingToRelocate?.message}
      />

      {/* Expected Salary */}
      <div>
        <Label htmlFor="expectedSalary">Expected Salary (in USD)</Label>
        <Input
          id="expectedSalary"
          type="number"
          {...register("expectedSalary")}
        />
        {errors.expectedSalary && (
          <p className="text-red-500 text-sm">{errors.expectedSalary.message}</p>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <Button type="button" onClick={onBack}>
          Back
        </Button>
        <Button type="submit">Next</Button>
      </div>
    </form>
  );
};

export default Step3_JobPreferences;
