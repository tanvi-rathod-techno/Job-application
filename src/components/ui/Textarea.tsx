// src/components/ui/Textarea.tsx
import { forwardRef, TextareaHTMLAttributes } from "react";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  error?: string;
};

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ error, className, ...props }, ref) => (
    <div>
      <textarea
        ref={ref}
        className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 ${error ? 'border-red-500' : ''} ${className}`}
        {...props}
      />
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  )
);

Textarea.displayName = "Textarea";

export default Textarea;
