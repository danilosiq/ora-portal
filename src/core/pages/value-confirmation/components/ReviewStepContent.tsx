'use client';

import { cn } from '@/core/utils/Cn';

import { overviewPanelClassName, reviewCheckboxClassName } from '@/core/utils/Presentation';
import { BusinessOverview } from '@/core/components/BusinessOverview';
import { DataTable } from '@/core/components/DataTable';
import { financingRows, notices, purchaseRows } from '@/core/mocks/BusinessData';
import { Pencil, Wrench } from 'lucide-react';

import type { ConfirmationState } from '../hooks/UseValueConfirmation';
import { steps } from '../utils/Constants';
type ReviewStepContentProps = { state: ConfirmationState; businessId: number };
export function ReviewStepContent({ state, businessId }: ReviewStepContentProps) {
  const { step, accepted, setAccepted, hasAdjustments, adjustments, goTo } = state;
  return (
    <div
      className={`review-content animate-[reveal_0.28s_ease] [&.review-values]:mx-auto [&.review-values]:max-w-[580px] motion-reduce:animate-none ${step === 1 || step === 2 ? 'review-values' : ''}`}
      key={step}
    >
      {step === 0 ? (
        <BusinessOverview businessId={businessId} showIntermediaries />
      ) : step === 1 ? (
        <DataTable rows={purchaseRows} />
      ) : step === 2 ? (
        <DataTable rows={financingRows} />
      ) : (
        <>
          {notices.map((notice, index) => (
            <article
              className={cn(
                overviewPanelClassName,
                'panel review-notice [&>h2]:mb-[6px]! [&>h2]:text-[19px]! [&>p]:whitespace-pre-line',
              )}
              key={notice.title}
            >
              <h2>{notice.title}</h2>
              <p>{notice.text}</p>
              <label className={reviewCheckboxClassName}>
                <input
                  type="checkbox"
                  checked={accepted[index]}
                  onChange={(e) =>
                    setAccepted(
                      accepted.map((value, i) => (i === index ? e.target.checked : value)),
                    )
                  }
                />
                <span>Afirmo que estou ciente da informação descrita acima.</span>
              </label>
            </article>
          ))}
          {hasAdjustments && (
            <article
              className={cn(
                overviewPanelClassName,
                'panel adjustment-summary border-success bg-white [&_h2]:text-success [&>div+div]:mt-[13px] [&>div+div]:border-t [&>div+div]:border-[#aeb2bb] [&>div+div]:pt-[13px] [&_p]:whitespace-pre-wrap [&_p]:[overflow-wrap:anywhere]',
              )}
            >
              <h2>
                <Wrench size={20} /> Solicitações de ajuste
              </h2>
              {adjustments.map(
                (text, i) =>
                  text && (
                    <div key={i}>
                      <div className="adjustment-summary-title flex items-center justify-between gap-[10px] text-[16px] [&>button]:flex [&>button]:items-center [&>button]:gap-[6px] [&>button]:text-[14px] [&>button]:text-success">
                        <strong>{steps[i]}</strong>
                        <button onClick={() => goTo(i)}>
                          <Pencil size={14} /> Revisar
                        </button>
                      </div>
                      <p>{text}</p>
                    </div>
                  ),
              )}
            </article>
          )}
        </>
      )}
    </div>
  );
}
