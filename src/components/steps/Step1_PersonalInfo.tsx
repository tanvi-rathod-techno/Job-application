// /src/components/Step1PersonalInfo.tsx

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  personalInfoSchema,
  PersonalInfoFormData,
} from "../../validation/personalInfoSchema";
import Input from "../ui/Input";
import Label from "../ui/Label";
import Button from "../ui/Button";

const Step1PersonalInfo = ({
  onNext,
  onBack,
  currentStep,
}: {
  onNext: (data: PersonalInfoFormData) => void;
  onBack: () => void;
  currentStep: number;
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PersonalInfoFormData>({
    resolver: zodResolver(personalInfoSchema),
  });

  // Load saved data from localStorage on component mount
  useEffect(() => {
    const stored = localStorage.getItem("jobApplication");
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed.personalInfo) {
        reset(parsed.personalInfo); 
      }
    }
  }, [reset]);

  const onSubmit = (data: PersonalInfoFormData) => {
    const stored = localStorage.getItem("jobApplication");
    const existingData = stored ? JSON.parse(stored) : {};
    const updated = {
      ...existingData,
      personalInfo: data,
    };
    localStorage.setItem("jobApplication", JSON.stringify(updated));
    onNext(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="firstName">First Name</Label>
        <Input id="firstName" type="text" {...register("firstName")} />
        {errors.firstName && (
          <span className="text-red-500 text-xs">{errors.firstName.message}</span>
        )}
      </div>

      <div>
        <Label htmlFor="lastName">Last Name</Label>
        <Input id="lastName" type="text" {...register("lastName")} />
        {errors.lastName && (
          <span className="text-red-500 text-xs">{errors.lastName.message}</span>
        )}
      </div>

      <div>
        <Label htmlFor="email">Email Address</Label>
        <Input id="email" type="email" {...register("email")} />
        {errors.email && (
          <span className="text-red-500 text-xs">{errors.email.message}</span>
        )}
      </div>

      <div>
        <Label htmlFor="phoneNumber">Phone Number</Label>
        <Input id="phoneNumber" type="tel"  inputMode="numeric" {...register("phoneNumber")} onInput={(e) => {
        const input = e.target as HTMLInputElement;
        input.value = input.value.replace(/\D/g, ""); // remove non-digits
        }}  />
        {errors.phoneNumber && (
          <span className="text-red-500 text-xs">{errors.phoneNumber.message}</span>
        )}
      </div>

      <div className="flex justify-between">
        {currentStep > 1 ? (
          <Button type="button" onClick={onBack}>
            Back
          </Button>
        ) : (
          <div /> // Keeps spacing when Back is hidden
        )}

        <Button type="submit">Next</Button>
      </div>
    </form>
  );
};

export default Step1PersonalInfo;
