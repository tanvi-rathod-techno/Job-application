// /src/components/ui/Button.tsx
import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = ({ children, className, ...props }: ButtonProps) => {
  return (
    <button
      className={`px-4 py-2 bg-green-600 text-white rounded hover:bg-green-600 transition ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
