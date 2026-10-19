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
        <nav
          aria-label="Etapas da confirmação"
          className="review-stepper [&>ol]:m-0 [&>ol]:flex [&>ol]:list-none [&>ol]:items-center [&>ol]:gap-[9px] [&>ol]:p-0 [&_li]:flex [&_li]:min-w-0 [&_li]:flex-1 [&_li]:items-center [&_li]:gap-[9px] [&_li]:text-[#91929f] [&_li:last-child]:flex-none [&_li:not(:last-child)]:after:h-px [&_li:not(:last-child)]:after:min-w-3 [&_li:not(:last-child)]:after:flex-1 [&_li:not(:last-child)]:after:bg-[#c4c5cc] [&_li:not(:last-child)]:after:content-[''] [&_li.reached]:text-primary [&_li.reached:not(:last-child)]:after:bg-[#ffad64] [&_button]:flex [&_button]:items-center [&_button]:gap-[9px] [&_button]:bg-transparent [&_button]:py-[5px] [&_button]:text-left [&_button:disabled]:opacity-100 [&_button>span]:grid [&_button>span]:size-[30px] [&_button>span]:shrink-0 [&_button>span]:place-items-center [&_button>span]:rounded-full [&_button>span]:bg-[#eeedf0] [&_button>span]:text-[15px] [&_.reached_button>span]:bg-primary-light [&_strong]:text-[15px] [&_strong]:leading-[1.25] [&_strong]:font-medium max-[1200px]:[&_strong]:text-[13px] max-[760px]:[&>ol]:items-start max-[760px]:[&>ol]:gap-[5px] max-[760px]:[&_li]:relative max-[760px]:[&_li]:flex-1! max-[760px]:[&_li]:justify-center max-[760px]:[&_li:not(:last-child)]:after:absolute max-[760px]:[&_li:not(:last-child)]:after:top-5 max-[760px]:[&_li:not(:last-child)]:after:left-[70%] max-[760px]:[&_li:not(:last-child)]:after:right-[-28%] max-[760px]:[&_li:not(:last-child)]:after:min-w-0 max-[760px]:[&_button]:flex-col max-[760px]:[&_button]:gap-2 max-[760px]:[&_button]:text-center max-[760px]:[&_strong]:min-h-[30px] max-[760px]:[&_strong]:max-w-[110px] max-[760px]:[&_strong]:text-[12px] max-[460px]:[&_strong]:max-w-[78px] max-[460px]:[&_strong]:text-[11px] max-[460px]:[&_button>span]:size-[29px]"
        >
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
