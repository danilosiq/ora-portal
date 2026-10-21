import type { ParticipantAttorney } from '@/core/@types/Business';
import { cn } from '@/core/utils/Cn';
import { overviewPanelClassName } from '@/core/utils/Presentation';
import { FileSearch, Handshake, ShoppingCart, User } from 'lucide-react';

const partyListClassName =
  'business-party-list [&>p]:my-3 max-[760px]:[&>p]:my-[14px] [&>p]:flex [&>p]:items-center [&>p]:gap-2 max-[760px]:[&>p]:gap-[9px] [&>p]:text-[16px] max-[760px]:[&>p]:text-[18px] [&>p]:leading-[1.75] max-[760px]:[&>p]:leading-[1.7] [&_svg]:size-[19px] [&_svg]:shrink-0 [&_svg]:fill-current';

type BusinessParticipantsCardProps = {
  role: 'buyers' | 'sellers';
  participants: string[];
  attorneys?: ParticipantAttorney[];
};

export function BusinessParticipantsCard({
  role,
  participants,
  attorneys,
}: BusinessParticipantsCardProps) {
  const Icon = role === 'buyers' ? ShoppingCart : Handshake;
  return (
    <article
      className={cn(
        overviewPanelClassName,
        'panel [&_.attorneys-title]:font-medium',
        role === 'buyers' ? 'buyers-panel' : 'sellers-panel',
      )}
    >
      <h2>
        <Icon size={21} /> {role === 'buyers' ? 'Compradores' : 'Vendedores'}
      </h2>
      <div className={partyListClassName}>
        {participants.map((name, index) => (
          <p key={index}>
            <User size={17} aria-hidden="true" />
            <span className="min-w-0 [overflow-wrap:anywhere]">{name}</span>
          </p>
        ))}
      </div>
      {!!attorneys?.length && (
        <section className="attorneys-section mt-6" aria-label="Procuradores">
          <h3 className="attorneys-title mb-4 flex items-center gap-2 text-primary">
            <FileSearch size={21} className="shrink-0" aria-hidden="true" /> Procuradores
          </h3>
          <div className={partyListClassName}>
            {attorneys.map(({ name, representedName }, index) => (
              <p key={index}>
                <User size={17} aria-hidden="true" />
                <span className="min-w-0 [overflow-wrap:anywhere]">
                  {name}
                  <span className="ml-2 text-muted">(Representando: {representedName})</span>
                </span>
              </p>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
