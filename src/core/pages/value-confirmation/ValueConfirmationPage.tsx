'use client';
import { ConsultantSheet } from '@/core/components/ConsultantSheet';

import { Button } from '@/components/ui/Button';
import { ConsultantPhoto, Logo } from '@/core/components/BrandAssets';
import { ConsultantCard } from '@/core/components/ConsultantDetails';
import { properties } from '@/core/mocks/BusinessData';
import { ArrowLeft, ArrowRight, ChevronRight, CircleCheck } from 'lucide-react';

import type { ReviewResult } from '@/core/@types/Business';
import { AdjustmentDialog } from './components/AdjustmentDialog';
import { ConfirmationStepper } from './components/ConfirmationStepper';
import { ReviewBody } from './components/ReviewBody';
import { useValueConfirmation } from './hooks/UseValueConfirmation';
import { steps } from './utils/Constants';
export type ValueConfirmationProps = {
  businessId: number;
  onExit: () => void;
  onComplete: (result: ReviewResult) => void;
};
export function ValueConfirmation({ businessId, onExit, onComplete }: ValueConfirmationProps) {
  const state = useValueConfirmation({ onComplete });
  const { consultantOpen, setConsultantOpen, consultantTriggerRef, step, result } = state;
  return (
    <main className="confirmation-page">
      <div className="confirmation-column">
        <header className="confirmation-header">
          <button className="review-exit" onClick={onExit}>
            <ArrowLeft size={17} /> Voltar ao negócio
          </button>
          <Logo />
        </header>
        <ConfirmationStepper state={state} />
        {step >= 0 && (
          <button
            ref={consultantTriggerRef}
            className="mobile-consultant-card confirmation-contact-trigger"
            onClick={() => setConsultantOpen(true)}
            aria-haspopup="dialog"
          >
            <span className="mobile-consultant-label">
              Consultor responsável Exban <ChevronRight size={22} />
            </span>
            <span className="mobile-consultant-person">
              <ConsultantPhoto />
              <strong>Marcelo Costa</strong>
            </span>
          </button>
        )}
        {result ? (
          <section className="review-success" role="status">
            <span className="success-icon">
              <CircleCheck size={48} />
            </span>
            <h1>
              {result.status === 'confirmed'
                ? 'Valores confirmados!'
                : 'Solicitações de ajuste registradas!'}
            </h1>
            <p>
              {result.status === 'confirmed'
                ? 'Você concluiu a revisão das informações do seu negócio.'
                : 'Suas solicitações foram reunidas para revisão do consultor.'}
            </p>
            <div className="panel">
              <strong>{properties[businessId]}</strong>
              {result.status === 'adjustments' && (
                <ul>
                  {result.adjustments.map(
                    (text, i) =>
                      text && (
                        <li key={i}>
                          <strong>{steps[i]}</strong>
                          <p>{text}</p>
                        </li>
                      ),
                  )}
                </ul>
              )}
            </div>
            <p className="review-demo">Esta é uma simulação. Nenhuma informação foi enviada.</p>
            <Button onClick={onExit}>
              Voltar ao negócio <ArrowRight size={18} />
            </Button>
          </section>
        ) : (
          <>
            <ReviewBody state={state} businessId={businessId} />
          </>
        )}
        <p className="review-demo">Portal demonstrativo · Dados fictícios</p>
      </div>
      {step >= 0 && (
        <aside
          className="business-sidebar confirmation-consultant"
          aria-label="Consultor responsável pela confirmação"
        >
          <ConsultantCard />
        </aside>
      )}
      <ConsultantSheet
        open={consultantOpen}
        onOpenChange={setConsultantOpen}
        triggerRef={consultantTriggerRef}
        description="Dados fictícios de contato do consultor responsável pelo negócio."
      />
      <AdjustmentDialog state={state} />
    </main>
  );
}
