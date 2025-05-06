// /src/components/ui/Input.tsx
import { InputHTMLAttributes, forwardRef } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={`w-full p-2 border border-gray-300 rounded ${className}`}
      {...props}
    />
  );
});

Input.displayName = "Input";
export default Input;
