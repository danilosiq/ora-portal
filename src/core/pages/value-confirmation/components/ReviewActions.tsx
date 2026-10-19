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
          <p className="review-question mt-7 mb-6 text-[20px] font-medium">{questions[step]}</p>
          {adjustments[step] && (
            <div
              className="saved-adjustment mt-5 flex items-start gap-[10px] rounded-[10px] bg-primary-light p-4 text-[15px] [overflow-wrap:anywhere] [&>svg]:mt-[3px] [&>svg]:shrink-0 [&>svg]:text-primary [&>div]:min-w-0 [&>div]:flex-1 [&_p]:mt-[5px] [&_p]:whitespace-pre-wrap [&>button]:text-[14px] [&>button]:text-primary-hover [&>button]:underline max-[760px]:flex-wrap"
              role="status"
            >
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
          <div className="review-actions mt-7 flex items-center justify-center gap-6 [&>button]:h-auto [&>button]:min-h-[51px] [&>button]:max-w-[300px] [&>button]:flex-1 [&>button]:px-[18px] [&>button]:py-[13px] [&>button]:text-[18px] [&>button]:whitespace-normal max-[760px]:gap-3 max-[760px]:[&>button]:min-h-[52px] max-[760px]:[&>button]:p-3 max-[760px]:[&>button]:text-[16px] max-[460px]:flex-col max-[460px]:[&>button]:w-full max-[460px]:[&>button]:max-w-none max-[460px]:[&>button]:flex-auto print:hidden">
            <Button
              variant="outline"
              className="request-correction border-[#ece9e7] text-[#ee3a3a] shadow-[0_3px_3px_#0002] [&>svg]:shrink-0"
              onClick={openAdjustment}
            >
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
        <div className="review-finish mt-7 flex flex-col items-center gap-[18px] [&>button]:h-auto [&>button]:min-h-[55px] [&>button]:w-[min(100%,390px)] [&>button]:px-[25px] [&>button]:py-[15px] [&>button]:text-[17px] [&>button]:whitespace-normal [&>button]:uppercase [&>button]:shadow-[0_3px_4px_#0002] max-[460px]:[&>button]:px-[18px] max-[460px]:[&>button]:text-[15px] print:hidden">
          <p className="finish-hint text-center text-[15px] text-[#838b95]">
            {!allAccepted
              ? 'Marque os quatro aceites acima para concluir.'
              : hasAdjustments
                ? 'Há correções solicitadas. Finalize com as solicitações para revisão.'
                : 'Tudo conferido? Você já pode confirmar os valores.'}
          </p>
          <Button
            className="confirm-values bg-[#388e3c] hover:bg-[#2e7d32]"
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
