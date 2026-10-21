import type { AdjustmentRequest } from '@/core/@types/Business';
import { cn } from '@/core/utils/Cn';
import { Wrench } from 'lucide-react';
import { overviewPanelClassName } from '@/core/utils/Presentation';

type AdjustmentNoticeProps = { request: AdjustmentRequest; className?: string };

export function AdjustmentNotice({ request, className }: AdjustmentNoticeProps) {
  const ownRequest = request.requestedBy === 'you';
  return (
    <article
      className={cn(
        overviewPanelClassName,
        'panel adjustment-notice border-line  [&_h2]:text-success',
        className,
      )}
    >
      <h2>
        <Wrench size={21} className="shrink-0" aria-hidden="true" />
        {ownRequest
          ? 'Você solicitou um ajuste! Já estamos tratando sobre...'
          : 'Um ajuste foi solicitado! Já estamos tratando sobre...'}
      </h2>
      <div className="border-t border-line pt-4">
        <p className="mb-2 font-semibold">
          {ownRequest
            ? 'Você solicitou um ajuste, com a seguinte mensagem'
            : 'Outro participante solicitou um ajuste, com a seguinte mensagem'}
        </p>
        <div className="space-y-4">
          {request.messages.map(({ label, text }, index) => (
            <div key={index}>
              {label && <p className="mb-1 font-medium">{label}</p>}
              <p className="whitespace-pre-wrap text-[#68727e]">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}
