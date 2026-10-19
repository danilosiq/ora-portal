'use client';

import { Check } from 'lucide-react';

import type { ConfirmationState } from '../hooks/UseValueConfirmation';
import { steps } from '../utils/Constants';
type ConfirmationStepperProps = { state: ConfirmationState };
export function ConfirmationStepper({ state }: ConfirmationStepperProps) {
  const { step, result, goTo } = state;
  return (
    <>
      {step >= 0 && !result && (
        <nav aria-label="Etapas da confirmação" className="review-stepper">
          <ol>
            {steps.map((label, index) => (
              <li
                key={label}
                className={index <= step ? 'reached' : ''}
                aria-current={step === index ? 'step' : undefined}
              >
                <button disabled={index > step} onClick={() => goTo(index)}>
                  <span>{index < step ? <Check size={15} /> : index + 1}</span>
                  <strong>{label}</strong>
                </button>
              </li>
            ))}
          </ol>
        </nav>
      )}
    </>
  );
}
