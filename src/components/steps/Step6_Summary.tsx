import { useEffect, useState } from "react";

const Step6_Summary = () => {
  const [formData, setFormData] = useState<any>(null);

  useEffect(() => {
    const storedData = localStorage.getItem("jobApplication");
    if (storedData) {
      setFormData(JSON.parse(storedData));
    }
  }, []);

  if (!formData) return <p>Loading summary...</p>;

  const { personalInfo, resumeCover, jobPreferences, availability, setPasswordData } = formData;

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

        <div><strong>Preferred Role:</strong> {jobPreferences?.desiredRole}</div>
        <div><strong>Location:</strong> {jobPreferences?.location}</div>
        <div><strong>Employment Type:</strong> {jobPreferences?.jobType}</div>

        <div><strong>Start Date:</strong> {availability?.preferredStartDate}</div>
        <div><strong>Availability:</strong> {availability?.availability}</div>
        <div><strong>Agreed to Terms:</strong> {availability?.agreeToTerms ? "Yes" : "No"}</div>

        <div><strong>Password:</strong> {"•".repeat(setPasswordData?.password.length || 8)}</div>

        {resumeCover?.resume && (
          <div>
            <strong>Resume:</strong>{" "}
            <span className="text-gray-700 italic">{resumeCover.resume.name}</span>
          </div>
        )}

        {resumeCover?.coverLetter && (
          <div>
            <strong>Cover Letter:</strong>{" "}
            <span className="text-gray-700 italic">{resumeCover.coverLetter.name}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Step6_Summary;
