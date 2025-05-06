// src/components/layouts/MultiStepForm.tsx
import { useState } from "react";
import { PersonalInfoFormData } from "../../validation/personalInfoSchema";
import Step1PersonalInfo from "../steps/Step1_PersonalInfo";
import Step2ResumeCover from "../steps/Step2_ResumeCover";
import Step3JobPreferences from "../steps/Step3_JobPreferences";
import Step4_Availability from "../steps/Step4_Availability";


import { ResumeCoverFormData } from "../../validation/resumeCoverSchema";
import { JobPreferencesFormData } from "../../validation/jobPreferencesSchema";
import { AvailabilityFormData } from "../../validation/availabilitySchema";


const MultiStepForm = () => {
  const [step, setStep] = useState(1);

  const [personalInfo, setPersonalInfo] = useState<PersonalInfoFormData | null>(null);
  const [resumeCover, setResumeCover] = useState<ResumeCoverFormData | null>(null);
  const [jobPreferences, setJobPreferences] = useState<JobPreferencesFormData | null>(null);
  const [availability, setAvailability] = useState<AvailabilityFormData | null>(null);
 

  const handleStep1Next = (data: PersonalInfoFormData) => {
    setPersonalInfo(data);
    setStep(2);
  };

  const handleStep2Next = (data: ResumeCoverFormData) => {
    setResumeCover(data);
    setStep(3);
  };

  const handleStep3Next = (data: JobPreferencesFormData) => {
    setJobPreferences(data);
    setStep(4); // Move to Step 4 when it's added
  };

  const handleStep4Next = (data: AvailabilityFormData) => {
    setAvailability(data);
    setStep(5); // Move to Step 5 (Set Password)
  };

  

  return (
    <div className="bg-white rounded-lg shadow p-6 w-full max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Job Application Form</h2>

      {step === 1 && (
        <Step1PersonalInfo onNext={handleStep1Next} onBack={() => setStep(0)} currentStep={step} />
      )}

      {step === 2 && (
        <Step2ResumeCover onNext={handleStep2Next} onBack={() => setStep(1)} />
      )}

      {step === 3 && (
        <Step3JobPreferences onNext={handleStep3Next} onBack={() => setStep(2)} />
      )}

      {step === 4 && (
        <Step4_Availability onNext={handleStep4Next} onBack={() => setStep(3)} />
      )}

      {/* {step === 5 && (
        <Step5_SetPassword onNext={handleStep5Next} onBack={() => setStep(4)} />
      )} */}

      {step === 5 && (
        <div className="text-center">
          <h3 className="text-lg font-semibold text-green-700">🎉 All steps completed!</h3>
          {/* Display a success message or handle form submission */}
        </div>
      )}
    </div>
  );
};

export default MultiStepForm;
