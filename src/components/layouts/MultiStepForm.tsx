import { useState } from "react";
import { PersonalInfoFormData } from "../../validation/personalInfoSchema";
import { ResumeCoverFormData } from "../../validation/resumeCoverSchema";
import { JobPreferencesFormData } from "../../validation/jobPreferencesSchema";
import { AvailabilityFormData } from "../../validation/availabilitySchema";
import { SetPasswordFormData } from "../../validation/setPasswordSchema";


import Step1PersonalInfo from "../steps/Step1_PersonalInfo";
import Step2ResumeCover from "../steps/Step2_ResumeCover";
import Step3JobPreferences from "../steps/Step3_JobPreferences";
import Step4_Availability from "../steps/Step4_Availability";
import Step5_SetPassword from "../steps/Step5_SetPassword";
import Step6_Summary from "../steps/Step6_Summary";


import Sidebar from "../layouts/Sidebar";

const MultiStepForm = () => {
  const [step, setStep] = useState(1);

  const [personalInfo, setPersonalInfo] = useState<PersonalInfoFormData | null>(null);
  const [resumeCover, setResumeCover] = useState<ResumeCoverFormData | null>(null);
  const [jobPreferences, setJobPreferences] = useState<JobPreferencesFormData | null>(null);
  const [availability, setAvailability] = useState<AvailabilityFormData | null>(null);
  const [setPasswordData, setSetPasswordData] = useState<SetPasswordFormData | null>(null);

  // Step Handlers
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
    setStep(4);
  };

  const handleStep4Next = (data: AvailabilityFormData) => {
    setAvailability(data);
    setStep(5);
  };

  const handleStep5Next = (data: SetPasswordFormData) => {
    setSetPasswordData(data);
    const applicationData = {
      personalInfo,
      resumeCover,
      jobPreferences,
      availability,
      setPassword: data,
    };
    localStorage.setItem("jobApplication", JSON.stringify(applicationData));  
    setStep(6); 
  };


  const stepTitles = [
    "Step 1: Personal Information",
    "Step 2: Resume & Cover Letter",
    "Step 3: Job Preferences",
    "Step 4: Availability",
    "Step 5: Set Your Password",
    "🎉 Application Summary",
  ];

  return (
    <div className="flex">
      <Sidebar selectedStep={step - 1} onSelectStep={(s) => setStep(s + 1)} />

      <div className="bg-white rounded-lg shadow p-6 w-full max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">{stepTitles[step - 1]}</h2>



        {step === 1 && (
          <Step1PersonalInfo
            onNext={handleStep1Next}
            onBack={() => setStep(0)}
            currentStep={step}
          />
        )}

        {step === 2 && (
          <Step2ResumeCover
            onNext={handleStep2Next}
            onBack={() => setStep(1)}
          />
        )}

        {step === 3 && (
          <Step3JobPreferences
            onNext={handleStep3Next}
            onBack={() => setStep(2)}
          />
        )}

        {step === 4 && (
          <Step4_Availability
            onNext={handleStep4Next}
            onBack={() => setStep(3)}
          />
        )}

        {step === 5 && (
          <Step5_SetPassword
            onSubmit={handleStep5Next}
            onBack={() => setStep(4)}
          />
        )}

        {step === 6 && (
          <Step6_Summary />
        )}
      </div>
    </div>
  );
};

export default MultiStepForm;
