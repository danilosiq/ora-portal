import { panelClassName } from '@/core/utils/Presentation';
import { ConsultantContactLinks } from '@/core/components/ConsultantContactLinks';
import { intermediaries } from '@/core/mocks/BusinessData';
import { User } from 'lucide-react';

type IntermediariesPanelProps = { inSheet?: boolean };
export function IntermediariesPanel({ inSheet = false }: IntermediariesPanelProps) {
  return (
    <section
      className={
        inSheet
          ? 'intermediaries-contacts pt-2'
          : `${panelClassName} panel intermediaries-panel rounded-[7px] px-[15px] py-[18px] shadow-[0_3px_4px_#0002] print:mt-[22px] print:break-inside-avoid`
      }
      aria-label="Contatos dos intermediadores"
    >
      {!inSheet && (
        <h2 className="mb-[19px] text-[15px] leading-[1.5] font-medium text-[#9294a2]">
          Intermediadores (corretores)
        </h2>
      )}
      {intermediaries.map((person) => (
        <article
          className="intermediary-contact [&+&]:mt-[18px] [&+&]:border-t [&+&]:border-[#d2d4da] [&+&]:pt-[18px] [.intermediaries-sheet_&]:[&+&]:mt-6 [.intermediaries-sheet_&]:[&+&]:pt-6"
          key={person.email}
        >
          <div className="intermediary-person mb-[14px] flex items-center gap-2 [&>svg]:shrink-0 [&>svg]:text-[#111] [&_h3]:text-[16px] [&_h3]:leading-[1.4] [&_h3]:font-medium [&_p]:mt-[3px] [&_p]:text-[13px] [&_p]:leading-[1.5] [&_p]:text-[#9194a1] [.intermediaries-contacts_&]:[&_h3]:text-[20px] [.intermediaries-contacts_&]:[&_p]:text-[15px]">
            <User size={21} fill="currentColor" />
            <div>
              <h3>{person.name}</h3>
              <p>{person.company}</p>
            </div>
          </div>
          <ConsultantContactLinks
            phone={person.phone}
            phoneLabel={person.phoneLabel}
            email={person.email}
            contactLabel={person.name}
          />
        </article>
      ))}
    </section>
  );
}
