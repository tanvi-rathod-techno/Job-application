// src/components/ui/Select.tsx

import React from "react";

type Option = {
  label: string;
  value: string;
};

type SelectProps = {
  name: string;
  label: string;
  options: Option[];
  error?: string;
  [key: string]: any;  // This allows additional props like register from react-hook-form
};

const Select = ({ name, label, options, error, ...rest }: SelectProps) => {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-semibold text-gray-700">
        {label}
      </label>
      <select
        id={name}
        name={name}
        className="mt-1 w-full border rounded px-3 py-2"
        {...rest}
      >
        <option value="">Select an option</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export default Select;
