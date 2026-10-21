import type { ReviewResult } from '@/core/@types/Business';
import { Notice } from '@/core/components/Notice';
import { pendingBusinessNotices } from '@/core/mocks/BusinessData';
import { getBusinessAdjustment } from '@/core/utils/BusinessAdjustments';
import { getBusinessProgress } from '@/core/utils/BusinessProgress';
import { Wrench } from 'lucide-react';

type DealNotificationsProps = { businessId: number; review?: ReviewResult; onConfirm: () => void };

export function DealNotifications({ businessId, review, onConfirm }: DealNotificationsProps) {
  const stage = getBusinessProgress({ businessId });
  const adjustment = getBusinessAdjustment({ businessId, review });
  const pending = pendingBusinessNotices[businessId];
  const otherParticipantAdjustment = adjustment?.requestedBy === 'other';
  const waiting = pending && !stage.completed && !review && !adjustment;
  return (
    <section
      aria-label="Avisos do negócio"
      className="business-notifications mb-[30px] flex flex-col gap-3 max-[760px]:mb-6"
    >
      {!stage.completed && !review && !adjustment && !waiting && (
        <Notice
          variant="danger"
          title={
            <>
              O negócio está na etapa de confirmação de valores, onde{' '}
              <em className="font-semibold">precisamos de uma ação sua</em> para prosseguir com o
              negócio!{' '}
              <button
                type="button"
                onClick={onConfirm}
                className="text-primary underline underline-offset-[3px] hover:text-primary-hover"
              >
                Clique aqui
              </button>{' '}
              para realizar este fluxo.
            </>
          }
        />
      )}
      <Notice variant="success" title={`${stage.name}: ${stage.description}`} />
      {waiting && <Notice variant="pending" title={pending} />}
      {otherParticipantAdjustment && (
        <Notice
          variant="success"
          icon={Wrench}
          title="Um participante realizou uma solicitação de ajuste, mas ja estamos tratando isso! Você não precisa realizar nenhuma ação, aguarde e jaja terá atualizações"
        />
      )}
      {review?.status === 'confirmed' && (
        <Notice variant="success" title="Você concluiu a confirmação dos valores deste negócio." />
      )}
    </section>
  );
}
