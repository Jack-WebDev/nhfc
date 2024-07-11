"use client";

import React, { useState } from 'react'
import './EligibilityCheck.css'
import { Repeat } from 'lucide-react';

export default function EligibilityCheck() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [steps, setSteps] = useState<{ message: string; result: string }[]>([]);
    const [result, setResult] = useState<string | null>(null);
  
    const checkEligibility = async () => {
      setIsModalOpen(true);
      setIsLoading(true);
      setSteps([]);
      setResult(null);
  
      const processSteps = [
        'Checking credit score...',
        'Verifying income...',
        'Checking employment status...',
        'Validating identity...',
        'Reviewing application history...'
      ];
  
      let finalEligibility = true;
  
      for (let i = 0; i < processSteps.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const stepResult = Math.random() > 0.2 ? 'Passed' : 'Failed';
        setSteps((prevSteps) => [...prevSteps, { message: processSteps[i], result: stepResult }]);
  
        if (stepResult === 'Failed') {
          finalEligibility = false;
        }
      }
  
      setResult(finalEligibility ? 'Eligible' : 'Not Eligible');
      setIsLoading(false);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
    };
  
    return (
      <div className="check-eligibility my-8">
        <button onClick={checkEligibility} className='bg-blue-500 text-white rounded-xl flex items-center py-2 px-4 gap-x-2'><Repeat />Check Eligibility</button>
  
        {isModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <button className="close-button" onClick={closeModal}>
                &times;
              </button>
              {isLoading ? (
                <div className="loading p-8">
                  <div className="spinner"></div>
                  <span>Checking eligibility...</span>
                </div>
              ) : (
                <div className="result">
                    <h3 className='underline text-center text-lg font-semibold my-4'>Eligibility Results</h3>
                  <ul className='grid gap-y-4 '>
                    {steps.map((step, index) => (
                      <li key={index} className={`text-black ${step.result === 'Passed' ? 'passed text-green-700' : 'failed text-red-700'}`}>
                        {step.message} <span className='font-bold'>{step.result}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="summary">
                    <p><strong>Overall Result: {result}</strong></p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
}
