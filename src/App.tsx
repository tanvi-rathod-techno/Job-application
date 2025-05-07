// src/App.tsx
import { useState } from 'react';
import Header from './components/layouts/Header';
import Sidebar from './components/layouts/Sidebar';  // Ensure Sidebar is imported
import MultiStepForm from './components/layouts/MultiStepForm';

const App = () => {
  const [selectedStep, setSelectedStep] = useState(0); // Track the selected step

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1 min-h-[calc(100vh-64px-40px)]">
        {/* Pass the selectedStep and onSelectStep props to Sidebar */}
        {/* <Sidebar selectedStep={selectedStep} onSelectStep={setSelectedStep} /> */}
        
        <main className="flex-1 p-6 bg-gray-50">
          <MultiStepForm />
        </main>
      </div>
    </div>
  );
};

export default App;
