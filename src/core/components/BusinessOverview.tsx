import { cn } from '@/core/utils/Cn';
import { overviewPanelClassName } from '@/core/utils/Presentation';
import {
  addresses,
  businessAttorneys,
  intermediaries,
  participants,
  properties,
} from '@/core/mocks/BusinessData';
import { BriefcaseBusiness, House, User } from 'lucide-react';
import { BusinessParticipantsCard } from './BusinessParticipantsCard';

type BusinessOverviewProps = {
  businessId: number;
  showIntermediaries?: boolean;
};
export function BusinessOverview({
  businessId,
  showIntermediaries = false,
}: BusinessOverviewProps) {
  return (
    <>
      <BusinessParticipantsCard
        role="buyers"
        participants={participants.buyers}
        attorneys={businessAttorneys[businessId]?.buyers}
      />
      <BusinessParticipantsCard
        role="sellers"
        participants={participants.sellers}
        attorneys={businessAttorneys[businessId]?.sellers}
      />
      <article className={cn(overviewPanelClassName, 'panel properties-panel')}>
        <h2>
          <House size={21} /> Imóveis
        </h2>
        <p className="property-row [&+&]:mt-[14px] [&+&]:border-t [&+&]:border-line [&+&]:pt-[14px] [.has-business-detail_&]:max-[760px]:text-[17px] [.has-business-detail_&]:max-[760px]:leading-[1.8] [.has-business-detail_&]:max-[760px]:[&+&]:mt-[17px] [.has-business-detail_&]:max-[760px]:[&+&]:pt-[17px]">
          {properties[businessId]} — {addresses[businessId % addresses.length]}
        </p>
        <p className="property-row [&+&]:mt-[14px] [&+&]:border-t [&+&]:border-line [&+&]:pt-[14px] [.has-business-detail_&]:max-[760px]:text-[17px] [.has-business-detail_&]:max-[760px]:leading-[1.8] [.has-business-detail_&]:max-[760px]:[&+&]:mt-[17px] [.has-business-detail_&]:max-[760px]:[&+&]:pt-[17px]">
          Garagem · Vaga 45 · Subsolo 1
        </p>
      </article>
      {showIntermediaries && (
        <article className={cn(overviewPanelClassName, 'panel')}>
          <h2>
            <BriefcaseBusiness size={20} /> Intermediação
          </h2>
          {intermediaries.map((person) => (
            <div
              className="person-row mt-[18px] flex items-center gap-[10px] text-[16px] [&_small]:mt-1 [&_small]:block [&_small]:text-[14px] [&_small]:text-[#999da8]"
              key={person.email}
            >
              <User size={17} />
              <div>
                {person.name}
                <small>{person.company}</small>
              </div>
            </div>
          ))}
        </article>
      )}
    </>
  );
}
