// src/components/steps/Step5_SetPassword.tsx

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  setPasswordSchema,
  SetPasswordFormData,
} from "../../validation/setPasswordSchema";
import Label from "../ui/Label";
import Input from "../ui/Input";
import Button from "../ui/Button";

type Step5Props = {
  onSubmit: (data: SetPasswordFormData) => void;
  onBack: () => void;
};

const Step5_SetPassword = ({ onSubmit, onBack }: Step5Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SetPasswordFormData>({
    resolver: zodResolver(setPasswordSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Password */}
      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          {...register("password")}
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
      </div>

      {/* Confirm Password */}
      <div>
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input
          id="confirmPassword"
          type="password"
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <Button type="button" onClick={onBack}>
          Back
        </Button>
        <Button type="submit">
          Submit
        </Button>
      </div>
    </form>
  );
};

export default Step5_SetPassword;
