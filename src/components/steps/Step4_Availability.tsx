import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { availabilitySchema, AvailabilityFormData } from "../../validation/availabilitySchema";
import Label from "../ui/Label";
import Input from "../ui/Input";
import Button from "../ui/Button";
import Textarea from "../ui/Textarea";

type Step4Props = {
  onNext: (data: AvailabilityFormData) => void;
  onBack: () => void;
};

const Step4_Availability = ({ onNext, onBack }: Step4Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AvailabilityFormData>({
    resolver: zodResolver(availabilitySchema),
    defaultValues: {
      preferredStartDate: "",
      availabilityNotes: "",
      agreeToTerms: true,
    },
  });

  // Load saved form data from localStorage when component mounts
  useEffect(() => {
    const stored = localStorage.getItem("jobApplication");
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed.availability) {
        reset(parsed.availability);
      }
    }
  }, [reset]);

  const onSubmit = (data: AvailabilityFormData) => {
    const stored = localStorage.getItem("jobApplication");
    const existing = stored ? JSON.parse(stored) : {};

    localStorage.setItem(
      "jobApplication",
      JSON.stringify({
        ...existing,
        availability: data,
      })
    );

    onNext(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Preferred Start Date */}
      <div>
        <Label htmlFor="preferredStartDate">Preferred Start Date</Label>
        <Input
          id="preferredStartDate"
          type="date"
          {...register("preferredStartDate")}
        />
        {errors.preferredStartDate && (
          <p className="text-red-500 text-sm">
            {errors.preferredStartDate.message}
          </p>
        )}
      </div>

      {/* Notes */}
      <div>
        <Label htmlFor="availabilityNotes">Additional Availability Notes</Label>
        <Textarea
          id="availabilityNotes"
          {...register("availabilityNotes")}
          error={errors.availabilityNotes?.message}
          rows={4}
        />
      </div>

      {/* Agreement Checkbox */}
      <div className="flex items-start space-x-2">
        <input
          type="checkbox"
          id="agreeToTerms"
          {...register("agreeToTerms")}
          className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded"
        />
        <Label htmlFor="agreeToTerms" className="font-medium">
          I agree to the terms and conditions.
        </Label>
      </div>
      {errors.agreeToTerms && (
        <p className="text-red-500 text-sm">{errors.agreeToTerms.message}</p>
      )}

      {/* Navigation */}
      <div className="flex justify-between">
        <Button type="button" onClick={onBack}>
          Back
        </Button>
        <Button type="submit">
          Next
        </Button>
      </div>
    </form>
  );
};

export default Step4_Availability;
