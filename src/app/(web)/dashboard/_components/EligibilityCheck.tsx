"use client";

import React, { useState } from 'react'
import './EligibilityCheck.css'

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
      <div className="check-eligibility">
        <button onClick={checkEligibility}>Check Eligibility</button>
  
        {isModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <button className="close-button" onClick={closeModal}>
                &times;
              </button>
              {isLoading ? (
                <div className="loading">
                  <div className="spinner"></div>
                  <span>Checking eligibility...</span>
                </div>
              ) : (
                <div className="result">
                    <h3>Eligibility Results</h3>
                  <ul>
                    {steps.map((step, index) => (
                      <li key={index} className={step.result === 'Passed' ? 'passed' : 'failed'}>
                        {step.message} {step.result}
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
