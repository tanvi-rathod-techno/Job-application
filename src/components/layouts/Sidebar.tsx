const steps = [
    'Personal Info',
    'Resume & Cover Letter',
    'Job Preferences',
    'Availability',
    'Set Password',
  ];
  
  const Sidebar = () => (
    <aside className="w-full sm:w-64 bg-green-600 text-white p-6 h-full sm:h-auto">
      <ul className="space-y-6">
        {steps.map((label, idx) => (
          <li key={idx} className="font-semibold">
            Step {idx + 1}: {label}
          </li>
        ))}
      </ul>
    </aside>
  );
  
  export default Sidebar;
  