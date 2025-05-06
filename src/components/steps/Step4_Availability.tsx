// src/components/steps/Step4_Availability.tsx

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { availabilitySchema, AvailabilityFormData } from "../../validation/availabilitySchema";
import Label from "../ui/Label";
import Input from "../ui/Input";
import Button from "../ui/Button";
import RadioGroup from "../ui/RadioGroup";
import Textarea from "../ui/Textarea";

type Step4Props = {
  onNext: (data: AvailabilityFormData) => void;
  onBack: () => void;
};

const Step4_Availability = ({ onNext, onBack }: Step4Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AvailabilityFormData>({
    resolver: zodResolver(availabilitySchema),
  });

  const onSubmit = (data: AvailabilityFormData) => {
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
          <p className="text-red-500 text-sm">{errors.preferredStartDate.message}</p>
        )}
      </div>

      {/* Availability (radio buttons using RadioGroup) */}
      <div>
        <Label>Available for</Label>
        <RadioGroup
          name="availability"
          options={[
            { label: "Full-time", value: "Full-time" },
            { label: "Part-time", value: "Part-time" },
            { label: "Both", value: "Both" },
          ]}
          register={register}
          error={errors.availability?.message}
        />
      </div>

      {/* Availability Notes (custom Textarea) */}
      <div>
        <Label htmlFor="availabilityNotes">Additional Availability Notes</Label>
        <Textarea
          id="availabilityNotes"
          {...register("availabilityNotes")}
          error={errors.availabilityNotes?.message}
          rows={4}
        />
      </div>

      {/* Navigation Buttons */}
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
