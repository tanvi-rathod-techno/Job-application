import { useEffect, useRef, useState } from "react";
// @ts-ignore
const html2pdf = require("html2pdf.js");

const Step6_Summary = () => {
  const [formData, setFormData] = useState<any>(null);
  const pdfRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedData = localStorage.getItem("jobApplication");
    if (storedData) {
      setFormData(JSON.parse(storedData));
    }
  }, []);

  const handleDownloadPDF = () => {
    if (!pdfRef.current) return;

    const opt = {
      margin: 0.5,
      filename: "job_application_resume.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    html2pdf().set(opt).from(pdfRef.current).save();
  };

  if (!formData) return <p>Loading summary...</p>;

  const {
    personalInfo,
    resumeCover,
    jobPreferences,
    availability,
    setPasswordData,
  } = formData;

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-green-700 text-center">
        🎉 Thank you for applying!
      </h3>

      <div className="flex justify-center">
        <button
          onClick={handleDownloadPDF}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Download Resume as PDF
        </button>
      </div>

      {/* Resume */}
      <div className="flex justify-center py-10 bg-gray-100">
        <div
          ref={pdfRef}
          className="bg-white w-full max-w-4xl flex shadow-2xl rounded-xl overflow-hidden"
        >
          {/* Sidebar */}
          <div className="w-1/3 bg-gray-900 text-white p-6 space-y-6">
            {/* Profile Photo */}
            <div className="flex justify-center">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white">
                <img
                  src="https://via.placeholder.com/150"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* About Me */}
            <div>
              <h3 className="text-lg font-semibold border-b border-gray-600 pb-1 mb-2">
                About Me
              </h3>
              <p className="text-sm leading-relaxed">
                Passionate applicant ready to bring creativity and dedication to new opportunities.
              </p>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-lg font-semibold border-b border-gray-600 pb-1 mb-2">Contact</h3>
              <ul className="text-sm space-y-1">
                <li>📞 {personalInfo?.phoneNumber}</li>
                <li>✉️ {personalInfo?.email}</li>
                <li>📍 123 Anywhere Street, Any City</li>
              </ul>
            </div>

            {/* Skills */}
            <div>
              <h3 className="text-lg font-semibold border-b border-gray-600 pb-1 mb-2">Skills</h3>
              <ul className="text-sm list-disc list-inside space-y-1">
                <li>Communication</li>
                <li>Problem Solving</li>
                <li>{jobPreferences?.desiredRole}</li>
              </ul>
            </div>

            {/* Language */}
            <div>
              <h3 className="text-lg font-semibold border-b border-gray-600 pb-1 mb-2">Language</h3>
              <p className="text-sm">English</p>
            </div>
          </div>

          {/* Main Content */}
          <div className="w-2/3 p-8 space-y-6 text-gray-800">
            {/* Header */}
            <div>
              <h1 className="text-3xl font-bold">
                {personalInfo?.firstName} {personalInfo?.lastName}
              </h1>
              <p className="text-gray-500 text-lg">{jobPreferences?.desiredRole}</p>
            </div>

            {/* Education */}
            <div>
              <h2 className="text-xl font-semibold text-gray-700 mb-2">🎓 Education</h2>
              <div className="space-y-2 text-sm">
                <div>
                  <p className="font-medium">Sample University (2015–2019)</p>
                  <p>Bachelor’s Degree — Design</p>
                </div>
              </div>
            </div>

            {/* Experience */}
            <div>
              <h2 className="text-xl font-semibold text-gray-700 mb-2">💼 Experience</h2>
              <div className="space-y-2 text-sm">
                <div>
                  <p className="font-medium">Senior Designer (2020–2023)</p>
                  <ul className="list-disc list-inside">
                    <li>Created 100+ designs</li>
                    <li>Led branding projects</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Availability */}
            <div>
              <h2 className="text-xl font-semibold text-gray-700 mb-2">📅 Availability</h2>
              <p><strong>Start:</strong> {availability?.preferredStartDate}</p>
              <p><strong>Available:</strong> {availability?.availability}</p>
              <p><strong>Agreed to Terms:</strong> {availability?.agreeToTerms ? "Yes" : "No"}</p>
            </div>

            {/* Attachments */}
            <div>
              <h2 className="text-xl font-semibold text-gray-700 mb-2">📎 Attachments</h2>
              {resumeCover?.resume && (
                <p>
                  <strong>Resume:</strong>{" "}
                  <span className="italic text-gray-700">{resumeCover.resume.name}</span>
                </p>
              )}
              {resumeCover?.coverLetter && (
                <p>
                  <strong>Cover Letter:</strong>{" "}
                  <span className="italic text-gray-700">{resumeCover.coverLetter.name}</span>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step6_Summary;
