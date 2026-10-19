'use client';

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
    <section className={`review-body ${step === -1 ? 'review-intro' : ''}`}>
      <h1 ref={headingRef} tabIndex={-1}>
        {step === -1 ? 'Confirmação de valores' : headings[step]}
      </h1>
      {step === -1 ? (
        <>
          <div className="important-copy">
            <h2>IMPORTANTE</h2>
            <p>
              Se identificar alguma <em>informação incorreta</em> ou precisar alterar qualquer
              condição da negociação, <em>solicite a correção nas etapas</em>. Não será possível
              fazer alterações após a emissão do contrato.
            </p>
          </div>
          <label className="review-checkbox">
            <input
              type="checkbox"
              checked={initialAccepted}
              onChange={(e) => setInitialAccepted(e.target.checked)}
            />
            <span>Afirmo que estou ciente da informação descrita acima.</span>
          </label>
          <Button className="begin-review" disabled={!initialAccepted} onClick={() => goTo(0)}>
            Começar <ArrowRight size={19} />
          </Button>
        </>
      ) : (
        <>
          <p className="review-business-name">{properties[businessId]}</p>
          {step > 0 && (
            <p className="review-instruction">
              {step === 1 ? (
                <>
                  <em>Confira se</em> o valor do imóvel e a composição do pagamento{' '}
                  <em>estão corretos.</em>
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
          <button className="review-previous" onClick={() => goTo(step - 1)}>
            <ArrowLeft size={16} /> Etapa anterior
          </button>
        </>
      )}
    </section>
  );
}
