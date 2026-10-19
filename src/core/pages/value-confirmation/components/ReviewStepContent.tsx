'use client';

import { BusinessOverview } from '@/core/components/BusinessOverview';
import { DataTable } from '@/core/components/DataTable';
import { financingRows, notices, purchaseRows } from '@/core/mocks/BusinessData';
import { MessageSquareWarning, Pencil } from 'lucide-react';

import type { ConfirmationState } from '../hooks/UseValueConfirmation';
import { steps } from '../utils/Constants';
type ReviewStepContentProps = { state: ConfirmationState; businessId: number };
export function ReviewStepContent({ state, businessId }: ReviewStepContentProps) {
  const { step, accepted, setAccepted, hasAdjustments, adjustments, goTo } = state;
  return (
    <div className={`review-content ${step === 1 || step === 2 ? 'review-values' : ''}`} key={step}>
      {step === 0 ? (
        <BusinessOverview businessId={businessId} showIntermediaries />
      ) : step === 1 ? (
        <DataTable rows={purchaseRows} />
      ) : step === 2 ? (
        <DataTable rows={financingRows} />
      ) : (
        <>
          {notices.map((notice, index) => (
            <article className="panel review-notice" key={notice.title}>
              <h2>{notice.title}</h2>
              <p>{notice.text}</p>
              <label className="review-checkbox">
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
            <article className="panel adjustment-summary">
              <h2>
                <MessageSquareWarning size={20} /> Solicitações de ajuste
              </h2>
              {adjustments.map(
                (text, i) =>
                  text && (
                    <div key={i}>
                      <div className="adjustment-summary-title">
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
