// src/components/steps/Step5_SetPassword.tsx

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  setPasswordSchema,
  SetPasswordFormData,
} from "../../validation/setPasswordSchema";
import Label from "../ui/Label";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { Eye, EyeOff } from "lucide-react";

type Step5Props = {
  onSubmit: (data: SetPasswordFormData) => void;
  onBack: () => void;
  defaultValues: SetPasswordFormData;
};

const Step5_SetPassword = ({ onSubmit, onBack, defaultValues }: Step5Props) => {
  // Retrieve the password visibility state from localStorage
  const initialShowPassword = localStorage.getItem("showPassword") === "true";
  const initialShowConfirmPassword = localStorage.getItem("showConfirmPassword") === "true";

  const [showPassword, setShowPassword] = useState(initialShowPassword);
  const [showConfirmPassword, setShowConfirmPassword] = useState(initialShowConfirmPassword);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SetPasswordFormData>({
    resolver: zodResolver(setPasswordSchema),
    defaultValues,
  });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  // Store the visibility state in localStorage whenever it changes
  const handlePasswordVisibilityToggle = () => {
    setShowPassword((prev) => {
      const newState = !prev;
      localStorage.setItem("showPassword", newState.toString()); // Storing visibility state only
      return newState;
    });
  };

  const handleConfirmPasswordVisibilityToggle = () => {
    setShowConfirmPassword((prev) => {
      const newState = !prev;
      localStorage.setItem("showConfirmPassword", newState.toString()); // Storing visibility state only
      return newState;
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Password */}
      <div>
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            {...register("password")}
          />
          <button
            type="button"
            onClick={handlePasswordVisibilityToggle}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
      </div>

      {/* Confirm Password */}
      <div>
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <div className="relative">
          <Input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            {...register("confirmPassword")}
          />
          <button
            type="button"
            onClick={handleConfirmPasswordVisibilityToggle}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
          >
            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <Button type="button" onClick={onBack}>
          Back
        </Button>
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
};

export default Step5_SetPassword;
