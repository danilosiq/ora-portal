'use client';
import { consultantSheetClassName, mobileConsultantClassName } from '@/core/utils/Presentation';
import { ConsultantSheet } from '@/core/components/ConsultantSheet';

import { DealTabs } from './components/DealTabs';
import { DealTimeline } from './components/DealTimeline';

import { Button } from '@/components/ui/Button';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/Dialog';
import type { ReviewResult } from '@/core/@types/Business';
import { ConsultantPhoto } from '@/core/components/BrandAssets';
import { ConsultantCard } from '@/core/components/ConsultantDetails';
import { IntermediariesPanel } from '@/core/components/IntermediariesPanel';
import { addresses, properties } from '@/core/mocks/BusinessData';
import {
  ArrowLeft,
  BadgeCheck,
  ChevronDown,
  ChevronRight,
  Download,
  FileCheck2,
  Handshake,
} from 'lucide-react';
import { useDealDetails } from './hooks/UseDealDetails';
type DealDetailsPageProps = {
  businessId: number;
  review?: ReviewResult;
  onBack: () => void;
  onConfirm: () => void;
};
export function DealDetailsPage({ businessId, review, onBack, onConfirm }: DealDetailsPageProps) {
  const state = useDealDetails();
  const selected = businessId;
  const reviews: Record<number, ReviewResult | undefined> = { [businessId]: review };
  const {
    titleExpanded,
    setTitleExpanded,
    consultantOpen,
    setConsultantOpen,
    intermediariesOpen,
    setIntermediariesOpen,
    consultantTriggerRef,
    intermediariesTriggerRef,
  } = state;
  return (
    <>
      <>
        <button
          className="back mb-[25px] flex items-center gap-[6px] text-[16px] text-[#9399a2] hover:text-primary max-[760px]:mb-[14px] max-[760px]:text-[13px] print:!hidden"
          onClick={onBack}
        >
          <ArrowLeft size={16} /> Meus negócios
        </button>
        <div className="details-layout grid grid-cols-[minmax(0,1fr)_290px] gap-7 max-[1200px]:grid-cols-[minmax(0,1fr)_265px] max-[1200px]:gap-5 max-[900px]:flex max-[900px]:flex-col print:block">
          <div className="detail-main min-w-0">
            <span className="eyebrow text-[12px] font-semibold tracking-[1.6px] text-muted max-[760px]:hidden">
              ACOMPANHE SEU NEGÓCIO
            </span>
            <div className="detail-heading flex items-start justify-between gap-3">
              <h1
                className={`detail-title mt-[10px] min-w-0 text-[32px] leading-[1.4] font-normal tracking-[-0.6px] max-[1100px]:text-[23px] max-[900px]:text-[28px] max-[760px]:m-0 max-[760px]:flex-1 max-[760px]:line-clamp-2 max-[760px]:text-[24px] max-[760px]:leading-[1.6] max-[760px]:font-medium max-[760px]:tracking-normal [&.is-expanded]:block [&.is-expanded]:overflow-visible print:block print:overflow-visible print:text-[22px] ${titleExpanded ? 'is-expanded' : ''}`}
              >
                {properties[selected]}
              </h1>
              <div className="detail-heading-actions hidden shrink-0 flex-col items-center gap-[6px] pt-1 max-[760px]:flex print:!hidden [&>button]:grid [&>button]:h-8 [&>button]:w-[34px] [&>button]:place-items-center">
                <button
                  className="mobile-export text-primary"
                  aria-label="Exportar negócio para PDF"
                  onClick={() => window.print()}
                >
                  <Download size={23} />
                </button>
                <button
                  className="expand-business-title [&>svg]:transition-transform [&>svg]:duration-[250ms] aria-expanded:[&>svg]:rotate-180"
                  aria-label={
                    titleExpanded ? 'Recolher nome do negócio' : 'Expandir nome do negócio'
                  }
                  aria-expanded={titleExpanded}
                  onClick={() => setTitleExpanded(!titleExpanded)}
                >
                  <ChevronDown size={21} />
                </button>
              </div>
            </div>
            <p className="detail-address mt-[9px] max-[760px]:mt-[7px] text-[16px] text-[#9b9faa] max-[760px]:text-[14px]">
              {addresses[selected % 5]}
            </p>
            {selected !== 1 &&
              selected !== 7 &&
              (reviews[selected] ? (
                <div
                  className={`confirmation-banner mt-5 mb-[30px] flex items-center gap-[13px] rounded-[18px] px-[22px] py-[17px] text-[18px] leading-[1.65] [&>svg]:shrink-0 [&.is-confirmed]:bg-[#eaf6ec] [&.is-confirmed>svg]:text-[#388e3c] [&.is-adjustment]:bg-primary-light [&.is-adjustment>svg]:text-primary [&_p>span]:block [&_p>span]:text-[14px] [&_p>span]:text-[#7b8591] max-[760px]:mb-5 max-[760px]:items-start max-[760px]:gap-[10px] max-[760px]:rounded-[14px] max-[760px]:[&>svg]:mt-[3px] max-[760px]:p-[13px] max-[760px]:text-[15px] print:hidden ${reviews[selected].status === 'confirmed' ? 'is-confirmed' : 'is-adjustment'}`}
                  role="status"
                >
                  <BadgeCheck size={24} />
                  <p>
                    {reviews[selected].status === 'confirmed'
                      ? 'Você concluiu a confirmação dos valores deste negócio.'
                      : 'Solicitações de ajuste registradas para revisão do consultor.'}
                    <span> Demonstração concluída; nenhuma informação foi enviada.</span>
                  </p>
                </div>
              ) : (
                <div className="confirmation-banner mt-5 mb-[30px] flex items-center gap-[13px] rounded-[18px] bg-[#e9f2ff] px-[22px] py-[17px] text-[18px] leading-[1.65] [&>svg]:shrink-0 [&>svg]:text-[#1597d3] [&_em]:font-semibold [&_button]:font-semibold [&_button]:text-primary [&_button]:underline [&_button]:underline-offset-[3px] [&_button:hover]:text-primary-hover max-[760px]:mb-5 max-[760px]:items-start max-[760px]:gap-[10px] max-[760px]:rounded-[14px] max-[760px]:[&>svg]:mt-[3px] max-[760px]:p-[13px] max-[760px]:text-[15px] print:hidden">
                  <FileCheck2 size={26} />
                  <p>
                    O negócio está na etapa de confirmação de valores, onde{' '}
                    <em>precisamos de uma ação sua</em> para prosseguir com o negócio!{' '}
                    <button onClick={onConfirm}>Clique aqui</button> para realizar este fluxo.
                  </p>
                </div>
              ))}
            <DealTimeline businessId={businessId} />
            <button
              ref={consultantTriggerRef}
              className={mobileConsultantClassName}
              onClick={() => setConsultantOpen(true)}
              aria-haspopup="dialog"
            >
              <span className="mobile-consultant-label mb-4 max-[760px]:mb-[18px] max-[760px]:text-[#9497a5] flex items-center justify-between gap-[10px] text-[17px] font-medium text-[#9294a2]">
                Consultor responsável Exban <ChevronRight size={22} />
              </span>
              <span className="mobile-consultant-person flex items-center gap-3 max-[760px]:gap-[13px] [&_.consultant-photo]:size-10 [&>strong]:text-[20px] [&>strong]:font-semibold">
                <ConsultantPhoto />
                <strong>Marcelo Costa</strong>
              </span>
            </button>
            <button
              ref={intermediariesTriggerRef}
              className="mobile-intermediaries-card mb-6 hidden w-full items-center gap-[11px] rounded-[7px] border border-[#f0f0f3] bg-white p-4 text-left shadow-[0_3px_4px_#0002] max-[900px]:flex max-[760px]:-mt-[7px] [&>svg:first-child]:shrink-0 [&>svg:first-child]:text-primary [&>svg:last-child]:ml-auto [&>svg:last-child]:shrink-0 [&>svg:last-child]:text-[#9295a2] [&_strong]:block [&_strong]:text-[17px] [&_strong]:font-medium [&_small]:mt-1 [&_small]:block [&_small]:text-[13px] [&_small]:text-[#9499a3] print:!hidden"
              onClick={() => setIntermediariesOpen(true)}
              aria-haspopup="dialog"
            >
              <Handshake size={22} />
              <span>
                <strong>Intermediadores (corretores)</strong>
                <small>Ver contatos dos corretores</small>
              </span>
              <ChevronRight size={22} />
            </button>
            <DealTabs businessId={businessId} review={review} state={state} />
          </div>
          <aside className="business-sidebar flex min-w-0 flex-col gap-[26px] self-start max-[900px]:hidden print:!block print:mt-6">
            <Button
              className="export-button mb-[5px] h-[37px] min-h-[37px] w-full gap-[7px] px-[10px] py-[7px] text-[15px] max-[1100px]:text-[13px] print:!hidden"
              onClick={() => window.print()}
            >
              <Download size={17} /> Exportar negócio para PDF
            </Button>
            <ConsultantCard />
            <IntermediariesPanel />
          </aside>
        </div>
      </>
      <ConsultantSheet
        open={consultantOpen}
        onOpenChange={setConsultantOpen}
        triggerRef={consultantTriggerRef}
        description="Dados de contato do consultor responsável pelo negócio. Contatos fictícios para demonstração."
      />
      <Dialog open={intermediariesOpen} onOpenChange={setIntermediariesOpen}>
        <DialogContent
          className={`${consultantSheetClassName} intermediaries-sheet`}
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            intermediariesTriggerRef.current?.focus();
          }}
        >
          <DialogTitle className="consultant-sheet-title pr-8 text-[22px] font-semibold max-[760px]:mb-5 max-[760px]:leading-[1.4]">
            Intermediadores (corretores)
          </DialogTitle>
          <DialogDescription className="sr-only">
            Contatos fictícios dos corretores responsáveis pela intermediação do negócio.
          </DialogDescription>
          <IntermediariesPanel inSheet />
        </DialogContent>
      </Dialog>
    </>
  );
}
