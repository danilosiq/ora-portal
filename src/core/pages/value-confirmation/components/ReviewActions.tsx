'use client';

import { Button } from '@/components/ui/Button';
import { ArrowRight, CircleCheck, MessageSquareWarning, Wrench } from 'lucide-react';

import type { ConfirmationState } from '../hooks/UseValueConfirmation';
import { questions } from '../utils/Constants';
type ReviewActionsProps = { state: ConfirmationState };
export function ReviewActions({ state }: ReviewActionsProps) {
  const {
    step,
    adjustments,
    setAdjustments,
    openAdjustment,
    goTo,
    allAccepted,
    hasAdjustments,
    finish,
  } = state;
  return (
    <>
      {step < 3 ? (
        <>
          <p className="review-question">{questions[step]}</p>
          {adjustments[step] && (
            <div className="saved-adjustment" role="status">
              <MessageSquareWarning size={18} />
              <div>
                <strong>Correção solicitada nesta etapa</strong>
                <p>{adjustments[step]}</p>
              </div>
              <button
                onClick={() =>
                  setAdjustments(adjustments.map((text, i) => (i === step ? '' : text)))
                }
              >
                Remover
              </button>
            </div>
          )}
          <div className="review-actions">
            <Button variant="outline" className="request-correction" onClick={openAdjustment}>
              {adjustments[step] ? 'Editar correção' : 'Não, solicitar correção'}{' '}
              <MessageSquareWarning size={19} />
            </Button>
            <Button onClick={() => goTo(step + 1)}>
              {adjustments[step] ? 'Continuar com a solicitação' : 'Sim, próximo'}{' '}
              <ArrowRight size={19} />
            </Button>
          </div>
        </>
      ) : (
        <div className="review-finish">
          <p className="finish-hint">
            {!allAccepted
              ? 'Marque os quatro aceites acima para concluir.'
              : hasAdjustments
                ? 'Há correções solicitadas. Finalize com as solicitações para revisão.'
                : 'Tudo conferido? Você já pode confirmar os valores.'}
          </p>
          <Button
            className="confirm-values"
            disabled={!allAccepted || hasAdjustments}
            onClick={() => finish('confirmed')}
          >
            Finalizar e confirmar valores <CircleCheck size={20} />
          </Button>
          <Button disabled={!allAccepted || !hasAdjustments} onClick={() => finish('adjustments')}>
            Finalizar e enviar solicitações <Wrench size={19} />
          </Button>
        </div>
      )}
    </>
  );
}
