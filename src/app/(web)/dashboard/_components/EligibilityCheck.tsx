"use client";

import React, { useState } from 'react';
import './EligibilityCheck.css';
import { Repeat } from 'lucide-react';

export default function EligibilityCheck() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [steps, setSteps] = useState<{ message: string; result: string; details: string; source: string }[]>([]);
  const [result, setResult] = useState<string | null>(null);
  const [outcomeMetric, setOutcomeMetric] = useState<string | null>(null);

  const checkEligibility = async () => {
    setIsModalOpen(true);
    setIsLoading(true);
    setSteps([]);
    setResult(null);
    setOutcomeMetric(null);

    const processSteps = [
      {
        title: 'Checking credit score...',
        description: 'Reviewing the applicant’s credit score to assess their creditworthiness. A higher credit score generally indicates a lower risk of default.',
        source: 'Credit Bureau TransUnion'
      },
      {
        title: 'Verifying income...',
        description: 'Confirming the applicant’s income to ensure they have sufficient financial resources to repay the loan.',
        source: 'Employer Current Employer (New Dawn I.T) and South African Revenue Service (SARS)'
      },
      {
        title: 'Checking employment status...',
        description: 'Confirming the applicant’s current employment status and job stability.',
        source: 'Employment Verification (New Dawn I.T)'
      },
      {
        title: 'Validating identity...',
        description: 'Ensuring the applicant’s identity to prevent fraud and identity theft.',
        source: 'Home Affairs Department Database'
      },
      {
        title: 'Reviewing application history...',
        description: 'Assessing the applicant’s loan application history to identify any past issues or patterns.',
        source: 'Internal Loan Application System'
      }
    ];

    let passedCount = 0;
    let finalEligibility = true;

    for (let i = 0; i < processSteps.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const stepResult = Math.random() > 0.2 ? 'Passed' : 'Failed';
      setSteps((prevSteps) => [
        ...prevSteps,
        {
          message: processSteps[i].title,
          result: stepResult,
          details: processSteps[i].description,
          source: processSteps[i].source
        }
      ]);

      if (stepResult === 'Passed') {
        passedCount += 1;
      } else {
        finalEligibility = false;
      }
    }

    // Calculate outcome metric
    const performancePercentage = (passedCount / processSteps.length) * 100;
    setOutcomeMetric(`Performance: ${performancePercentage.toFixed(1)}% Passed`);

    setResult(finalEligibility ? 'Eligible' : 'Not Eligible');
    setIsLoading(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="check-eligibility my-8">
      <button
        onClick={checkEligibility}
        className="bg-blue-500 text-white rounded-xl flex items-center py-2 px-4 gap-x-2 hover:bg-blue-600"
      >
        <Repeat /> Check Eligibility
      </button>

      {isModalOpen && (
        <div className="modal fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="modal-content bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
            <button
              className="close-button absolute text-gray-600"
              onClick={closeModal}
              aria-label="Close"
            >
              &times;
            </button>
            {isLoading ? (
              <div className="loading flex flex-col items-center">
                <div className="spinner border-t-4 border-blue-500 border-solid rounded-full w-12 h-12 mb-2"></div>
                <span>Checking eligibility...</span>
              </div>
            ) : (
              <div className="result">
                <h3 className="underline text-center text-lg font-semibold my-4">Eligibility Results</h3>
                <ul className="space-y-4">
                  {steps.map((step, index) => (
                    <li key={index} className={`text-black ${step.result === 'Passed' ? 'passed text-green-700' : 'failed text-red-700'} relative`}>
                      <div className="flex items-center">
                        <span className="font-bold">{step.message} </span>
                        <span className={`ml-2 ${step.result === 'Passed' ? 'text-green-500' : 'text-red-500'}`}>{step.result}</span>
                      </div>
                      <p className="text-sm text-gray-600">{step.details}</p>
                      <p className="text-xs text-gray-400">Source: {step.source}</p>
                    </li>
                  ))}
                </ul>
                <div className="summary mt-4 text-center">
                  <p><strong>Overall Result: {result}</strong></p>
                  {outcomeMetric && <p className="mt-2 text-gray-700">{outcomeMetric}</p>}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {!isModalOpen && steps.length > 0 && (
        <div className="result mt-8">
          <h3 className="underline text-center text-lg font-semibold my-4">Eligibility Results</h3>
          <ul className="space-y-4">
            {steps.map((step, index) => (
              <li key={index} className={`text-black ${step.result === 'Passed' ? 'passed text-green-700' : 'failed text-red-700'} relative`}>
                <div className="flex items-center">
                  <span className="font-bold">{step.message} </span>
                  <span className={`ml-2 ${step.result === 'Passed' ? 'text-green-500' : 'text-red-500'}`}>{step.result}</span>
                </div>
                <p className="text-sm text-gray-600">{step.details}</p>
                <p className="text-xs text-gray-400">Source: {step.source}</p>
              </li>
            ))}
          </ul>
          <div className="summary mt-4 text-center">
            <p><strong>Overall Result: {result}</strong></p>
            {outcomeMetric && <p className="mt-2 text-gray-700">{outcomeMetric}</p>}
          </div>
        </div>
      )}
    </div>
  );
}

