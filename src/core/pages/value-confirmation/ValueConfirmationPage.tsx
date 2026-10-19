'use client';

import { cn } from '@/core/utils/Cn';
import { overviewPanelClassName } from '@/core/utils/Presentation';
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
    <main className="confirmation-page min-h-svh bg-[linear-gradient(90deg,#fff_32%,rgba(255,255,255,0.92)_46%,rgba(255,255,255,0.22)_78%),url('/LoginBackground.png')] bg-cover bg-fixed bg-center px-7 pt-10 pb-[50px] max-[900px]:bg-[linear-gradient(90deg,#fffffff0,#ffffffda),url('/LoginBackground.png')] max-[900px]:px-5 max-[900px]:pt-[25px] max-[900px]:pb-10 max-[460px]:px-3 max-[460px]:pt-5 max-[460px]:pb-[35px] print:bg-none">
      <div className="confirmation-column ml-[max(0px,calc((100vw-1450px)/2))] w-[min(930px,calc(100vw-350px))] max-[1100px]:mx-auto max-[1100px]:w-full max-[1100px]:max-w-[930px] print:w-full print:max-w-none">
        <header className="confirmation-header relative mb-[18px] flex min-h-[70px] items-center justify-center [&>.ora-logo]:w-[160px] max-[1200px]:justify-start max-[1200px]:[&>.ora-logo]:mr-auto max-[1200px]:[&>.ora-logo]:-translate-x-[30px] max-[900px]:[&>.ora-logo]:w-[135px] max-[760px]:mb-5 max-[760px]:min-h-[55px] max-[760px]:justify-between max-[760px]:[&>.ora-logo]:mr-0 max-[760px]:[&>.ora-logo]:w-[125px] max-[760px]:[&>.ora-logo]:translate-x-0">
          <button
            className="review-exit absolute top-0 left-0 flex items-center gap-[5px] py-[7px] text-[15px] text-[#8b8f99] hover:text-primary max-[1200px]:static max-[1200px]:mr-auto max-[760px]:text-[14px] print:hidden"
            onClick={onExit}
          >
            <ArrowLeft size={17} /> Voltar ao negócio
          </button>
          <Logo />
        </header>
        <ConfirmationStepper state={state} />
        {step >= 0 && (
          <button
            ref={consultantTriggerRef}
            className="mobile-consultant-card confirmation-contact-trigger mx-auto mt-5 mb-6 hidden w-[calc(100%-70px)] rounded-lg border border-[#eceef1] bg-white px-[18px] py-[17px] text-left shadow-[0_3px_4px_#0002] animate-[business-layout-in_0.45s_cubic-bezier(0.16,1,0.3,1)_both] max-[1100px]:block max-[760px]:mt-[18px] max-[760px]:w-[calc(100%-16px)] motion-reduce:animate-none print:!hidden"
            onClick={() => setConsultantOpen(true)}
            aria-haspopup="dialog"
          >
            <span className="mobile-consultant-label mb-[14px] flex items-center justify-between gap-2 text-[16px] font-medium text-[#9294a2]">
              Consultor responsável Exban <ChevronRight size={22} />
            </span>
            <span className="mobile-consultant-person flex items-center gap-[11px] [&_.consultant-photo]:size-[38px] [&>strong]:text-[19px] [&>strong]:font-semibold max-[760px]:[&>strong]:text-[20px]">
              <ConsultantPhoto />
              <strong>Marcelo Costa</strong>
            </span>
          </button>
        )}
        {result ? (
          <section
            className="review-success px-[65px] pt-[70px] pb-[25px] text-center animate-[reveal_0.35s_ease] [&>h1]:mb-[15px] [&>h1]:text-[33px] [&>h1]:leading-[1.3] [&>p]:text-[19px] [&>p]:leading-[1.6] max-[1200px]:px-[35px] max-[1200px]:py-[55px] max-[760px]:px-[10px] max-[760px]:py-[45px] max-[760px]:[&>h1]:text-[30px] motion-reduce:animate-none"
            role="status"
          >
            <span className="success-icon mx-auto mb-[22px] grid size-[95px] place-items-center rounded-full bg-[#e9f6ec] text-[#388e3c]">
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
            <div
              className={cn(
                overviewPanelClassName,
                'panel my-7 text-left [&>strong]:text-[20px] [&>strong]:font-medium [&>ul]:mt-5 [&>ul]:list-none [&>ul]:p-0 [&_li]:border-t [&_li]:border-line [&_li]:py-[14px] [&_li_strong]:text-[17px] [&_li_strong]:text-primary [&_li_p]:whitespace-pre-wrap [&_li_p]:[overflow-wrap:anywhere]',
              )}
            >
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
            <p className="review-demo mt-[35px] text-center text-[13px] text-[#9298a0] [.review-success_&]:mt-0 [.review-success_&]:mb-[22px] [.review-success_&]:text-[14px]">
              Esta é uma simulação. Nenhuma informação foi enviada.
            </p>
            <Button onClick={onExit}>
              Voltar ao negócio <ArrowRight size={18} />
            </Button>
          </section>
        ) : (
          <>
            <ReviewBody state={state} businessId={businessId} />
          </>
        )}
      </div>
      {step >= 0 && (
        <aside
          className="business-sidebar confirmation-consultant fixed top-[116px] right-[max(28px,calc((100vw-1160px)/2))] z-10 flex max-h-[calc(100svh-144px)] w-[260px] min-w-0 flex-col gap-[26px] self-start overflow-y-auto overscroll-contain animate-[business-layout-in_0.45s_cubic-bezier(0.16,1,0.3,1)_both] max-[1100px]:hidden motion-reduce:animate-none print:static print:mx-auto print:mt-6 print:block print:max-h-none print:w-[280px] print:overflow-visible print:animate-none [&>.panel]:m-0"
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
