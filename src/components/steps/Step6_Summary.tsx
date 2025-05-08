import { useEffect, useRef, useState } from "react";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";

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

  const { personalInfo, resumeCover, jobPreferences, availability } = formData;
  const resume = resumeCover?.resume?.[0];
  const coverLetter = resumeCover?.coverLetter?.[0];

  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <h3 className="text-xl font-semibold text-green-700 text-center">
          Thank you for applying!
        </h3>
        <button
          onClick={handleDownloadPDF}
          className="bg-green-600 text-white px-3 py-2 ml-2 rounded hover:bg-green-700 transition flex items-center gap-2"
        >
          <span>Download PDF</span>
          <ArrowDownTrayIcon className="h-5 w-5" />
        </button>
      </div>

      <div className="flex justify-center py-10 bg-gray-100">
        <div
          ref={pdfRef}
          className="bg-white w-full max-w-4xl flex shadow-2xl rounded-xl overflow-hidden"
        >
          {/* Sidebar */}
          <div className="w-1/3 bg-gray-900 text-white p-6 space-y-6">
            <div>
              <h3 className="text-lg font-semibold border-b border-gray-600 pb-1 mb-2">
                Contact
              </h3>
              <ul className="text-sm space-y-1">
                <li>📞 {personalInfo?.phoneNumber}</li>
                <li>✉️ {personalInfo?.email}</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold border-b border-gray-600 pb-1 mb-2">
                Skills
              </h3>
              <ul className="text-sm list-disc list-inside space-y-1">
                <li>Communication</li>
                <li>Problem Solving</li>
                <li>{jobPreferences?.desiredRole}</li>
              </ul>
            </div>
          </div>

          {/* Main Content */}
          <div className="w-2/3 p-8 space-y-6 text-gray-800">
            <div>
              <h1 className="text-3xl font-bold">
                {personalInfo?.firstName} {personalInfo?.lastName}
              </h1>
              <p className="text-gray-500 text-lg">
                {jobPreferences?.desiredRole}
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-700 mb-2">
                📅 Availability
              </h2>
              <p>
                <strong>Start:</strong> {availability?.preferredStartDate}
              </p>
              <p>
                <strong>Availability Notes:</strong>{" "}
                {availability?.availabilityNotes}
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-700 mb-2">
                📎 Attachments
              </h2>
              {resume?.name && (
                <p>
                  <strong>Resume:</strong>{" "}
                  <a
                    href={resume.content}
                    download={resume.name}
                    className="text-blue-600 underline"
                  >
                    {resume.name}
                  </a>
                </p>
              )}
              {coverLetter?.name && (
                <p>
                  <strong>Cover Letter:</strong>{" "}
                  <a
                    href={coverLetter.content}
                    download={coverLetter.name}
                    className="text-blue-600 underline"
                  >
                    {coverLetter.name}
                  </a>
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
