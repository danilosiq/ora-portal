'use client';

import { reviewCheckboxClassName } from '@/core/utils/Presentation';
import { ReviewActions } from './ReviewActions';
import { ReviewStepContent } from './ReviewStepContent';

import { Button } from '@/components/ui/Button';
import { properties } from '@/core/mocks/BusinessData';
import { ArrowLeft, ArrowRight } from 'lucide-react';

import type { ConfirmationState } from '../hooks/UseValueConfirmation';
import { headings } from '../utils/Constants';
type ReviewBodyProps = { state: ConfirmationState; businessId: number };
export function ReviewBody({ state, businessId }: ReviewBodyProps) {
  const { step, initialAccepted, setInitialAccepted, headingRef, goTo } = state;
  return (
    <section
      className={`review-body px-[65px] animate-[reveal_0.3s_ease] [&>h1]:mt-4 [&>h1]:mb-2 [&>h1]:text-center [&>h1]:text-[27px] [&>h1]:leading-[1.4] [&>h1]:font-medium [&>h1]:outline-none [&.review-intro]:pt-[100px] [&.review-intro]:text-center [&.review-intro>h1]:mb-[34px] max-[1200px]:px-[35px] max-[1200px]:[&.review-intro]:pt-20 max-[760px]:px-2 max-[760px]:[&.review-intro]:pt-[60px] max-[760px]:[&>h1]:mt-6 max-[760px]:[&>h1]:text-[26px] max-[760px]:[&.review-intro_.review-checkbox]:text-left motion-reduce:animate-none print:px-0 ${step === -1 ? 'review-intro' : ''}`}
    >
      <h1 ref={headingRef} tabIndex={-1}>
        {step === -1 ? 'Confirmação de valores' : headings[step]}
      </h1>
      {step === -1 ? (
        <>
          <div className="important-copy mb-7 [&>h2]:mb-[6px] [&>h2]:text-[21px] [&>h2]:font-medium [&>h2]:text-primary [&>p]:text-[17px] [&>p]:leading-[1.8] [&_em]:font-medium">
            <h2>IMPORTANTE</h2>
            <p>
              Se identificar alguma <em>informação que precise de ajuste</em> ou precisar alterar
              qualquer condição da negociação, <em>solicite um ajuste nas etapas</em>. Não será
              possível fazer alterações após a emissão do contrato.
            </p>
          </div>
          <label className={reviewCheckboxClassName}>
            <input
              type="checkbox"
              checked={initialAccepted}
              onChange={(e) => setInitialAccepted(e.target.checked)}
            />
            <span>Afirmo que estou ciente da informação descrita acima.</span>
          </label>
          <Button
            className="begin-review mx-auto mt-[30px] min-h-[54px] min-w-[275px] text-[20px]"
            disabled={!initialAccepted}
            onClick={() => goTo(0)}
          >
            Começar <ArrowRight size={19} />
          </Button>
        </>
      ) : (
        <>
          <p className="review-business-name mb-6 text-center text-[14px] leading-[1.4] text-[#777e8a]">
            {properties[businessId]}
          </p>
          {step > 0 && (
            <p className="review-instruction mb-[30px] text-center text-[17px] leading-[1.7] [&_em]:font-medium">
              {step === 1 ? (
                <>
                  <em>Confira se</em> o valor do imóvel e a composição do pagamento{' '}
                  <em>estão de acordo.</em>
                </>
              ) : step === 2 ? (
                <>
                  <em>Confira</em> as condições aprovadas para o <em>seu financiamento.</em>
                </>
              ) : (
                <>
                  <em>Leia atentamente</em> as informações abaixo antes de concluir sua confirmação.
                </>
              )}
            </p>
          )}
          <ReviewStepContent state={state} businessId={businessId} />
          <ReviewActions state={state} />
          <button
            className="review-previous mx-auto mt-[25px] flex items-center gap-[6px] text-[15px] text-[#8a8e99] hover:text-primary print:hidden"
            onClick={() => goTo(step - 1)}
          >
            <ArrowLeft size={16} /> Etapa anterior
          </button>
        </>
      )}
    </section>
  );
}
