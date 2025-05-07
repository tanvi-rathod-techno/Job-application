import React from "react";

const steps = [
  "Personal Info",
  "Resume & Cover Letter",
  "Job Preferences",
  "Availability",
  "Set Password",
  "Summary",
];

const Sidebar = ({
  selectedStep,
  onSelectStep,
}: {
  selectedStep: number;
  onSelectStep: (step: number) => void;
}) => {
  return (
    <aside className=" md:w-1/2 lg:w-1/3 bg-green-600 text-white p-8 flex flex-col text-center">
    
      {/* Title */}
      <h1 className="text-3xl font-bold mb-4">Job Application</h1>
    

      {/* Optional: Step preview list (hidden on small screens) */}
      <ul className="hidden sm:block overflow-y-auto max-h-[80vh] w-full">

        {steps.map((label, idx) => (
         <li
         key={idx}
         onClick={() => onSelectStep(idx)}
         className={`cursor-pointer text-sm my-2 py-2 px-4 rounded transition-all duration-300 ease-in-out border-l-4 ${
           selectedStep === idx
             ? "bg-green-800 text-yellow-300 border-yellow-300"
             : "hover:bg-green-700 hover:text-yellow-200 border-transparent"
         }`}
       >
        
            Step {idx + 1}: {label}
          </li>
        ))}
      </ul>

      <footer className="mt-10 text-xs opacity-70"></footer>
    </aside>
  );
};

export default Sidebar;
