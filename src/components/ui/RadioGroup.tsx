import React from "react";

export type RadioOption = {
  label: string;
  value: string;
};

type RadioGroupProps = {
  name: string;
  options: RadioOption[];
  register: ReturnType<any>; // You can also use `UseFormRegister<FieldValues>` for strict typing
  error?: string;
};

const RadioGroup: React.FC<RadioGroupProps> = ({ name, options, register, error }) => {
  return (
    <div className="space-y-2">
      {options.map((option) => (
        <label key={option.value} className="flex items-center gap-2">
          <input
            type="radio"
            value={option.value}
            {...register(name)}
            className="accent-green-600"
          />
          {option.label}
        </label>
      ))}

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default RadioGroup;
