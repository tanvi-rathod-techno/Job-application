import React from 'react';

const steps = [
  'Personal Info',
  'Resume & Cover Letter',
  'Job Preferences',
  'Availability',
  'Set Password',
  'Summary',
];

const Sidebar = ({ selectedStep, onSelectStep }: { selectedStep: number, onSelectStep: (step: number) => void }) => {
  return (
    <aside className="w-full sm:w-64 bg-green-600 text-white p-6 min-h-100">
      <ul className="space-y-6">
        {steps.map((label, idx) => (
          <li
            key={idx}
            className={`font-semibold cursor-pointer ${
              selectedStep === idx
                ? 'bg-green-800 text-yellow-300'
                : 'hover:bg-green-700 hover:text-yellow-200'
            } p-2 rounded`}
            onClick={() => onSelectStep(idx)} // Update step on click
          >
            Step {idx + 1}: {label}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
