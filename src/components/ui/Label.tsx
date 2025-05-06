// /src/components/ui/Label.tsx
import { LabelHTMLAttributes } from "react";

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {}

const Label = ({ children, className, ...props }: LabelProps) => {
  return (
    <label className={`block text-sm font-medium ${className}`} {...props}>
      {children}
    </label>
  );
};

export default Label;
