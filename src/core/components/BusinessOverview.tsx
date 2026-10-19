import { cn } from '@/core/utils/Cn';
import { overviewPanelClassName } from '@/core/utils/Presentation';
import { addresses, intermediaries, properties } from '@/core/mocks/BusinessData';
import { BriefcaseBusiness, Handshake, House, ShoppingCart, User } from 'lucide-react';
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
      <article className={cn(overviewPanelClassName, 'panel buyers-panel')}>
        <h2>
          <ShoppingCart size={21} /> Compradores
        </h2>
        <div className="business-party-list [&>p]:my-3 max-[760px]:[&>p]:my-[14px] [&>p]:flex [&>p]:items-center [&>p]:gap-2 max-[760px]:[&>p]:gap-[9px] [&>p]:text-[16px] max-[760px]:[&>p]:text-[18px] [&>p]:leading-[1.75] max-[760px]:[&>p]:leading-[1.7] [&_svg]:size-[19px] [&_svg]:shrink-0 [&_svg]:fill-current">
          <p>
            <User size={17} /> Alex Oliveira
          </p>
          <p>
            <User size={17} /> Camila Oliveira
          </p>
        </div>
      </article>
      <article className={cn(overviewPanelClassName, 'panel sellers-panel')}>
        <h2>
          <Handshake size={21} /> Vendedores
        </h2>
        <div className="business-party-list [&>p]:my-3 max-[760px]:[&>p]:my-[14px] [&>p]:flex [&>p]:items-center [&>p]:gap-2 max-[760px]:[&>p]:gap-[9px] [&>p]:text-[16px] max-[760px]:[&>p]:text-[18px] [&>p]:leading-[1.75] max-[760px]:[&>p]:leading-[1.7] [&_svg]:size-[19px] [&_svg]:shrink-0 [&_svg]:fill-current">
          <p>
            <User size={17} /> Roberto Almeida
          </p>
          <p>
            <User size={17} /> Imobiliária Exemplo LTDA
          </p>
        </div>
      </article>
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
