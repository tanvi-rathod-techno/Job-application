// src/components/ui/Checkbox.tsx
type CheckboxProps = {
    label: string;
    register: any;
    name: string;
    error?: string;
  };
  
  const Checkbox = ({ label, register, name, error }: CheckboxProps) => (
    <div>
      <label className="flex items-center gap-2">
        <input type="checkbox" {...register(name)} />
        {label}
      </label>
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
  
  export default Checkbox;
  