'use client';
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
        <button className="back" onClick={onBack}>
          <ArrowLeft size={16} /> Meus negócios
        </button>
        <div className="details-layout">
          <div className="detail-main">
            <span className="eyebrow">ACOMPANHE SEU NEGÓCIO</span>
            <div className="detail-heading">
              <h1 className={`detail-title ${titleExpanded ? 'is-expanded' : ''}`}>
                {properties[selected]}
              </h1>
              <div className="detail-heading-actions">
                <button
                  className="mobile-export"
                  aria-label="Exportar negócio para PDF"
                  onClick={() => window.print()}
                >
                  <Download size={23} />
                </button>
                <button
                  className="expand-business-title"
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
            <p className="detail-address">{addresses[selected % 5]}</p>
            {selected !== 1 &&
              selected !== 7 &&
              (reviews[selected] ? (
                <div
                  className={`confirmation-banner ${reviews[selected].status === 'confirmed' ? 'is-confirmed' : 'is-adjustment'}`}
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
                <div className="confirmation-banner">
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
              className="mobile-consultant-card"
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
            <button
              ref={intermediariesTriggerRef}
              className="mobile-intermediaries-card"
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
          <aside className="business-sidebar">
            <Button className="export-button" onClick={() => window.print()}>
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
          className="consultant-sheet intermediaries-sheet"
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            intermediariesTriggerRef.current?.focus();
          }}
        >
          <DialogTitle className="consultant-sheet-title">Intermediadores (corretores)</DialogTitle>
          <DialogDescription className="sr-only">
            Contatos fictícios dos corretores responsáveis pela intermediação do negócio.
          </DialogDescription>
          <IntermediariesPanel inSheet />
        </DialogContent>
      </Dialog>
    </>
  );
}
