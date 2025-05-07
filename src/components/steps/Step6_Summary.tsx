// src/components/steps/Step6_Summary.tsx

import { PersonalInfoFormData } from "../../validation/personalInfoSchema";
import { ResumeCoverFormData } from "../../validation/resumeCoverSchema";
import { JobPreferencesFormData } from "../../validation/jobPreferencesSchema";
import { AvailabilityFormData } from "../../validation/availabilitySchema";
import { SetPasswordFormData } from "../../validation/setPasswordSchema";

type Step6Props = {
  personalInfo: PersonalInfoFormData | null;
  resumeCover: ResumeCoverFormData | null;
  jobPreferences: JobPreferencesFormData | null;
  availability: AvailabilityFormData | null;
  setPasswordData: SetPasswordFormData | null;
};

const Step6_Summary = ({
  personalInfo,
  resumeCover,
  jobPreferences,
  availability,
  setPasswordData,
}: Step6Props) => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-green-700 text-center">
        🎉 Thank you for applying!
      </h3>
      <p className="text-sm text-center text-gray-600">
        Here's a summary of your application:
      </p>

      <div className="bg-gray-100 p-4 rounded text-sm space-y-2">
        <div><strong>First Name:</strong> {personalInfo?.firstName}</div>
        <div><strong>Last Name:</strong> {personalInfo?.lastName}</div>
        <div><strong>Email:</strong> {personalInfo?.email}</div>
        <div><strong>Phone:</strong> {personalInfo?.phoneNumber}</div>

        {/* <div><strong>Preferred Role:</strong> {jobPreferences?.preferredRole}</div>
        <div><strong>Location:</strong> {jobPreferences?.locationPreference}</div>
        <div><strong>Employment Type:</strong> {jobPreferences?.employmentType}</div> */}

        <div><strong>Start Date:</strong> {availability?.preferredStartDate}</div>
        <div><strong>Availability:</strong> {availability?.availability}</div>
        <div><strong>Agreed to Terms:</strong> {availability?.agreeToTerms ? "Yes" : "No"}</div>

        <div><strong>Password:</strong> {"•".repeat(setPasswordData?.password.length || 8)}</div>

        {resumeCover?.resume && (
          <div>
            <strong>Resume:</strong>{" "}
            <a
              href={URL.createObjectURL(resumeCover.resume)}
              download={resumeCover.resume.name}
              className="text-blue-600 underline"
            >
              {resumeCover.resume.name}
            </a>
          </div>
        )}

        {resumeCover?.coverLetter && (
          <div>
            <strong>Cover Letter:</strong>{" "}
            <a
              href={URL.createObjectURL(resumeCover.coverLetter)}
              download={resumeCover.coverLetter.name}
              className="text-blue-600 underline"
            >
              {resumeCover.coverLetter.name}
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Step6_Summary;
