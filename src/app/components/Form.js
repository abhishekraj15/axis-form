"use client";
import { ArrowRight, ArrowLeft, Upload } from "lucide-react";
import React, { useState } from "react";
import Section from "./Section";
import RadioField from "./RadioField";
import InputField from "./InputField";
import OptionField from "./OptionField";

const Form = () => {
  const [activeStage, setActiveStage] = useState(1);

  const handleNext = () => {
    if (activeStage < 4) setActiveStage(activeStage + 1);
  };

  const handlePrevious = () => {
    if (activeStage > 1) setActiveStage(activeStage - 1);
  };

  return (
    <div className="w-full rounded-lg border bg-white shadow-sm">
      {/* Step Indicator */}
      <div className="hidden lg:grid lg:grid-cols-4 border-b">
        {[
          { id: 1, label: "Personal Information" },
          { id: 2, label: "Employer Details" },
          { id: 3, label: "Academic Information" },
          { id: 4, label: "Document & Screening" },
        ].map((section) => (
          <div key={section.id} className="px-6 py-4 border-r">
            <div className="flex items-center">
              <input
                id={`step-${section.id}`}
                type="radio"
                name="form-step"
                checked={activeStage === section.id}
                readOnly
                className="peer w-4 h-4 text-[#97144D] bg-gray-100 border-gray-300 focus:ring-[#97144D] focus:ring-2"
              />
              <label
                htmlFor={`step-${section.id}`}
                className="ml-2 text-sm font-medium text-gray-900 peer-checked:text-[#97144D]"
              >
                {section.label}
              </label>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile-specific Stepper UI */}
      <div className="lg:hidden px-6 py-4 border rounded-lg mr-2 ml-2 mt-2">
        <div className="text-lg font-semibold text-gray-900">
          {[
            { id: 1, label: "Personal Information" },
            { id: 2, label: "Employer Details" },
            { id: 3, label: "Academic Information" },
            { id: 4, label: "Document & Screening" },
          ]
            .filter((section) => section.id === activeStage)
            .map((section) => (
              <div key={section.id}>{section.label}</div>
            ))}
        </div>

        <div className="mt-2 text-sm text-gray-600">
          Step {activeStage} of 4 completed
        </div>

        <div className="mt-4 h-2 bg-gray-200 rounded-full">
          <div
            className="h-full bg-[#97144D] rounded-full"
            style={{ width: `${(activeStage / 4) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Form Content */}
      <div className="p-4">
        {activeStage === 1 && <Step1 />}
        {activeStage === 2 && <Step2 />}
        {activeStage === 3 && <Step3 />}
        {activeStage === 4 && <Step4 />}
      </div>

      {/* Navigation Buttons */}
      <div className="flex flex-row items-center justify-center md:justify-end gap-4 p-4">
        <button
          onClick={handlePrevious}
          disabled={activeStage === 1}
          className="px-6 py-3 bg-gray-200 text-black rounded-md disabled:opacity-50 w-full md:w-auto"
        >
          {activeStage === 1 ? (
            <span className="text-black">Cancel</span>
          ) : (
            <span>Back</span>
          )}
        </button>

        {activeStage < 4 ? (
          <button
            onClick={handleNext}
            className="px-6 py-3 bg-[#97144D] text-white rounded-md flex items-center justify-center w-full md:w-auto"
          >
            Continue
            <ArrowRight className="md:inline-block ml-2 hidden " />
          </button>
        ) : (
          <button className="px-6 py-3 bg-green-600 text-white rounded-md w-full md:w-auto">
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

// Step Components
const Step1 = () => (
  <form className="flex flex-col gap-4">
    <Section title="Personal Details">
      <div className="grid lg:grid-cols-3 gap-6 mt-4">
        {[
          { placeHolder: "Mohit Rawat", type: "text" },
          { placeHolder: "Mohitrawat@gmail.com", type: "email" },
          { placeHolder: "8923120121", type: "number" },
          { placeHolder: "13/01/2001", type: "date" },
        ].map((item, index) => (
          <InputField
            key={index}
            id={`personal-detail-${index}`}
            placeholder={item.placeHolder}
            type={item.type}
          />
        ))}
      </div>
    </Section>

    {/* Gender */}
    <Section title="Gender">
      <div className="flex items-center gap-6 mt-4">
        {["Male", "Female", "Other"].map((gender) => (
          <RadioField key={gender} id={gender.toLowerCase()} label={gender} />
        ))}
      </div>
    </Section>

    {/* Guardian Details */}
    <Section title="Guardian Details">
      <div className="grid lg:grid-cols-3 gap-6 mt-4">
        {[
          { placeHolder: "Parent/guardian name", type: "text" },
          { placeHolder: "Parent/guardian mobile number", type: "number" },
          { placeHolder: "Guardian relationship", type: "text" },
          { placeHolder: "Guardian family income in Rs", type: "text" },
          { placeHolder: "Guardian occupation", type: "text" },
        ].map((item, index) => (
          <InputField
            key={index}
            id={`guardian-detail-${index}`}
            placeholder={item.placeHolder}
            type={item.type}
          />
        ))}
      </div>
    </Section>

    {/* Relocation and Relatives */}
    <div className="flex items-center justify-start gap-8">
      {[
        {
          question: "Do you have any relatives working in the Bank?",
          options: ["Yes", "No"],
        },
        {
          question: "Willingness to relocate anywhere in India?",
          options: ["Yes", "No"],
        },
      ].map((item, index) => (
        <div key={index} className="flex flex-col gap-3">
          <p>{item.question}</p>
          <div className="flex items-center gap-6">
            {item.options.map((option) => (
              <RadioField
                key={option}
                id={`${item.question}-${option}`}
                label={option}
              />
            ))}
          </div>
        </div>
      ))}
    </div>

    {/* Address */}
    <Section title="Address">
      <h2 className="mt-4">Correspondence address</h2>
      <InputField id="correspondence-address" placeholder="Enter address" />
      <div className="grid lg:grid-cols-3 gap-6 mt-4">
        {[
          { placeHolder: "Correspondence address", type: "text" },
          { placeHolder: "City", type: "text" },
          { placeHolder: "State", type: "text" },
          { placeHolder: "Pin code", type: "number" },
        ].map((item, index) => (
          <InputField
            key={index}
            id={`correspondence-detail-${index}`}
            placeholder={item.placeHolder}
            type={item.type}
          />
        ))}
      </div>
      <h2 className="mt-4">Permanent address</h2>
      <InputField
        id="permanent-address"
        placeholder="Permanent address"
        className="mt-4"
        type="text"
      />
      <div className="flex items-center mt-4">
        <input
          id="same-as-correspondence"
          type="checkbox"
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
        />
        <label
          htmlFor="same-as-correspondence"
          className="ml-2 text-sm font-medium text-gray-900 "
        >
          Same as correspondence address
        </label>
      </div>
      <div className="grid lg:grid-cols-3 gap-6 mt-4">
        {[
          { placeHolder: "City", type: "text" },
          { placeHolder: "State", type: "text" },
          { placeHolder: "Pin code", type: "number" },
        ].map((item, index) => (
          <InputField
            key={index}
            id={`permanent-detail-${index}`}
            placeholder={item.placeHolder}
            type={item.type}
          />
        ))}
      </div>
    </Section>
  </form>
);

const Step2 = () => (
  <form className="flex flex-col gap-4">
    <Section title="Employer Details">
      <div className="flex items-center justify-start gap-8">
        {[
          {
            question: "Do you have work Experience?",
            options: ["Yes", "No"],
          },
        ].map((item, index) => (
          <div key={index} className="flex flex-col gap-3">
            <p>{item.question}</p>
            <div className="flex items-center gap-6">
              {item.options.map((option) => (
                <RadioField
                  key={option}
                  id={`${item.question}-${option}`}
                  label={option}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>

    <div className="grid lg:grid-cols-3 gap-6 mt-4">
      {[
        { placeHolder: "Previous employer", type: "text" },
        { placeHolder: "Position", type: "text" },
        { placeHolder: "Date of emplyment", type: "date" },
      ].map((item, index) => (
        <InputField
          key={index}
          id={`guardian-detail-${index}`}
          placeholder={item.placeHolder}
          type={item.type}
        />
      ))}
    </div>
    <div className="grid lg:grid-cols-3 gap-6 mt-4">
      {[
        {
          placeholder: "Years of experience",
          options: [
            { value: "0", label: "No of experience" },
            { value: "1", label: "1 Year" },
            { value: "2", label: "2 Years" },
            { value: "3", label: "3 Years" },
          ],
        },
        {
          placeholder: "No of months of experience",
          options: [
            { value: "0", label: "No of experience in months" },
            { value: "1", label: "1 Month" },
            { value: "2", label: "2 Months" },
            { value: "3", label: "3 Months" },
            { value: "4", label: "4 Months" },
          ],
        },
      ].map((item, index) => (
        <OptionField
          key={index}
          id={`experience-detail-${index}`}
          placeholder={item.placeHolder}
          options={item.options}
        />
      ))}
    </div>
  </form>
);

const Step3 = () => (
  <form className="flex flex-col gap-4">
    <Section title="Graduation"></Section>
    <div className="flex items-center justify-start gap-8">
      {[
        {
          question: "Education Mode",
          options: ["Regular", "Distance"],
        },
      ].map((item, index) => (
        <div key={index} className="flex flex-col gap-3">
          <p>{item.question}</p>
          <div className="flex items-center gap-6">
            {item.options.map((option) => (
              <RadioField
                key={option}
                id={`${item.question}-${option}`}
                label={option}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
    <div className="grid lg:grid-cols-3 gap-6 mt-4">
      {[
        { placeHolder: "University", type: "text" },
        { placeHolder: "Collage name", type: "text" },
        { placeHolder: "Stream", type: "text" },
        { placeHolder: "Percentage", type: "number" },
        { placeHolder: "Year of passing", type: "number" },
      ].map((item, index) => (
        <InputField
          key={index}
          id={`personal-detail-${index}`}
          placeholder={item.placeHolder}
          type={item.type}
        />
      ))}
    </div>
    <Section title="12th Class Information"></Section>
    <div className="flex items-center justify-start gap-8">
      {[
        {
          question: "Education Mode",
          options: ["Regular", "Distance"],
        },
      ].map((item, index) => (
        <div key={index} className="flex flex-col gap-3">
          <p>{item.question}</p>
          <div className="flex items-center gap-6">
            {item.options.map((option) => (
              <RadioField
                key={option}
                id={`${item.question}-${option}`}
                label={option}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
    <div className="grid lg:grid-cols-3 gap-6 mt-4">
      {[
        { placeHolder: "Board", type: "text" },
        { placeHolder: "Collage/School name", type: "text" },
        { placeHolder: "Stream", type: "text" },
        { placeHolder: "Percentage", type: "number" },
        { placeHolder: "Year of passing", type: "number" },
      ].map((item, index) => (
        <InputField
          key={index}
          id={`personal-detail-${index}`}
          placeholder={item.placeHolder}
          type={item.type}
        />
      ))}
    </div>
    <Section title="10th Class Information"></Section>
    <div className="flex items-center justify-start gap-8">
      {[
        {
          question: "Education Mode",
          options: ["Regular", "Distance"],
        },
      ].map((item, index) => (
        <div key={index} className="flex flex-col gap-3">
          <p>{item.question}</p>
          <div className="flex items-center gap-6">
            {item.options.map((option) => (
              <RadioField
                key={option}
                id={`${item.question}-${option}`}
                label={option}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
    <div className="grid lg:grid-cols-2 gap-6 mt-4">
      {[
        { placeHolder: "Board", type: "text" },
        { placeHolder: "School name", type: "text" },
      ].map((item, index) => (
        <InputField
          key={index}
          id={`personal-detail-${index}`}
          placeholder={item.placeHolder}
          type={item.type}
        />
      ))}
    </div>
    <div className="grid lg:grid-cols-3 gap-6 mt-4">
      {[{ placeHolder: "Percentage" }, { placeHolder: "Year of passing" }].map(
        (item, index) => (
          <InputField
            key={index}
            id={`personal-detail-${index}`}
            placeholder={item.placeHolder}
          />
        )
      )}
    </div>
  </form>
);

const Step4 = () => (
  <form className="flex flex-col gap-4">
    <Section title="Upload Your Documents">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 p-6">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-500">
          <div className="text-gray-500 mb-2 flex items-center justify-center gap-2">
            <Upload />
            <p>Upload your graduation marksheet</p>
          </div>
          <label htmlFor="graduation" className="cursor-pointer">
            <div className="flex flex-col items-center">
              <div className="text-sm text-blue-500 mt-2">
                Drop your mark sheet here or{" "}
                <span className="underline">browse</span>
              </div>
            </div>
            <input id="graduation" type="file" className="hidden" />
          </label>
          <div className="text-xs text-gray-400 mt-2">Max file size: 5 mb</div>
        </div>

        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-500">
          <div className="text-gray-500 mb-2 flex items-center justify-center gap-2">
            <Upload />
            <p>Upload your 12th marksheet</p>
          </div>
          <label htmlFor="marksheet12" className="cursor-pointer">
            <div className="flex flex-col items-center">
              <div className="text-sm text-blue-500 mt-2">
                Drop your mark sheet here or{" "}
                <span className="underline">browse</span>
              </div>
            </div>
            <input id="marksheet12" type="file" className="hidden" />
          </label>
          <div className="text-xs text-gray-400 mt-2">Max file size: 5 mb</div>
        </div>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-500">
          <div className="text-gray-500 mb-2 flex items-center justify-center gap-2">
            <Upload />
            <p>Upload your 10th marksheet</p>
          </div>
          <label htmlFor="marksheet12" className="cursor-pointer">
            <div className="flex flex-col items-center">
              <div className="text-sm text-blue-500 mt-2">
                Drop your mark sheet here or{" "}
                <span className="underline">browse</span>
              </div>
            </div>
            <input id="marksheet12" type="file" className="hidden" />
          </label>
          <div className="text-xs text-gray-400 mt-2">Max file size: 5 mb</div>
        </div>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-500">
          <div className="text-gray-500 mb-2 flex items-center justify-center gap-2">
            <Upload />
            <p>Upload your aadhar card</p>
          </div>
          <label htmlFor="marksheet12" className="cursor-pointer">
            <div className="flex flex-col items-center">
              <div className="text-sm text-blue-500 mt-2">
                Drop your aadhar card here or{" "}
                <span className="underline">browse</span>
              </div>
            </div>
            <input id="marksheet12" type="file" className="hidden" />
          </label>
          <div className="text-xs text-gray-400 mt-2">Max file size: 5 mb</div>
        </div>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-500">
          <div className="text-gray-500 mb-2 flex items-center justify-center gap-2">
            <Upload />
            <p>Upload your pan card</p>
          </div>
          <label htmlFor="marksheet12" className="cursor-pointer">
            <div className="flex flex-col items-center">
              <div className="text-sm text-blue-500 mt-2">
                Drop your card here or <span className="underline">browse</span>
              </div>
            </div>
            <input id="marksheet12" type="file" className="hidden" />
          </label>
          <div className="text-xs text-gray-400 mt-2">Max file size: 5 mb</div>
        </div>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-500">
          <div className="text-gray-500 mb-2 flex items-center justify-center gap-2">
            <Upload />
            <p>Upload your Passport Size Photo</p>
          </div>
          <label htmlFor="marksheet12" className="cursor-pointer">
            <div className="flex flex-col items-center">
              <div className="text-sm text-blue-500 mt-2">
                Drop your Passport Photo here or{" "}
                <span className="underline">browse</span>
              </div>
            </div>
            <input id="marksheet12" type="file" className="hidden" />
          </label>
          <div className="text-xs text-gray-400 mt-2">Max file size: 5 mb</div>
        </div>
      </div>

      <div className="p-6">
        <div className="text-lg font-semibold mb-4">Screening Process</div>
        <hr />
        <ol className="list-decimal pl-6 text-gray-700 space-y-2 mt-2">
          <li>
            Employability Test - An online proctored assessment to check your
            aptitude for the role.
          </li>
          <li>
            Career247 Panel Interview - A video interview conducted after
            clearing the online test.
          </li>
          <li>
            Axis Bank Panel Interview - A final video interview after clearing
            the Career247 Panel Interview.
          </li>
        </ol>

        <div className="mt-4 space-y-4">
          <div className="flex items-start">
            <input
              id="affirm1"
              type="checkbox"
              className="mt-1 border-gray-300 rounded-sm focus:ring-blue-500 focus:border-blue-500"
            />
            <label for="affirm1" className="ml-2 text-sm text-gray-700">
              I affirm that all the information supplied in this application
              form, together with its accompanying attachments, are accurate and
              true to the best of my knowledge. I understand that if any
              discrepancy is found in the information/documents provided by me
              then it may lead to automatic cancellation of my application for
              this program offered by Career 247, and I shall not be entitled
              for any refunds.
            </label>
          </div>
          <div className="flex items-start">
            <input
              id="affirm1"
              type="checkbox"
              className="mt-1 border-gray-300 rounded-sm focus:ring-blue-500 focus:border-blue-500"
            />
            <label for="affirm1" className="ml-2 text-sm text-gray-700">
              I confirm that I am aware of paying only program fee as per the
              specified on the PBRM program page and shall not make any
              additional payments to any individual or entity for application,
              screening or admission processes related to this program.
            </label>
          </div>
          <div className="flex items-start">
            <input
              id="affirm1"
              type="checkbox"
              className="mt-1 border-gray-300 rounded-sm focus:ring-blue-500 focus:border-blue-500"
            />
            <label for="affirm1" className="ml-2 text-sm text-gray-700">
              I affirm that I can read, write and speak in English language
              which is one of the requirements for admission to this program. I
              acknowledge that I have clearly understood that it is a customer
              facing role (sales) and I can be posted anywhere in India, for
              which I may be selected after successful completion of the
              program.
            </label>
          </div>
          <div className="flex items-start">
            <input
              id="affirm1"
              type="checkbox"
              className="mt-1 border-gray-300 rounded-sm focus:ring-blue-500 focus:border-blue-500"
            />
            <label for="affirm1" className="ml-2 text-sm text-gray-700">
              I affirm that I can read, write and speak in English language
              which is one of the requirements for admission to this program. I
              acknowledge that I have clearly understood that it is a customer
              facing role (Sales) and responsibility associated with the job,
              for which I may be selected after the successful completion of the
              program.
            </label>
          </div>

          <div className="flex items-start">
            <input
              id="terms"
              type="checkbox"
              className="mt-1 border-gray-300 rounded-sm focus:ring-blue-500 focus:border-blue-500"
            />
            <label for="terms" className="ml-2 text-sm text-gray-700">
              I agree to Axis Bank terms & conditions.
            </label>
          </div>
        </div>
      </div>
    </Section>
  </form>
);

export default Form;
