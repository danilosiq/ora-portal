import { cn } from '@/core/utils/Cn';
import { panelClassName } from '@/core/utils/Presentation';
import { ConsultantPhoto } from '@/core/components/BrandAssets';
import { ConsultantContactLinks } from '@/core/components/ConsultantContactLinks';

export function ConsultantDetails() {
  return (
    <div className="consultant-details [.consultant-sheet_&]:text-center [&_.consultant-photo]:mt-[22px] [&_.consultant-photo]:mb-[18px] [.consultant-sheet_&]:[&_.consultant-photo]:mx-auto [.consultant-sheet_&]:[&_.consultant-photo]:mt-[25px] [.consultant-sheet_&]:[&_.consultant-photo]:mb-5 [.consultant-sheet_&]:[&_.consultant-photo]:size-[110px] [.consultant-sheet_&]:max-[760px]:[&_.consultant-photo]:mt-6 [.consultant-sheet_&]:max-[760px]:[&_.consultant-photo]:mb-[18px]">
      <ConsultantPhoto large />
      <h3 className="text-[21px] font-semibold [.consultant-sheet_&]:text-[25px] [.consultant-sheet_&]:max-[760px]:text-[24px]">
        Marcelo Costa
      </h3>
      <p className="consultant-role hidden">Consultor de financiamento</p>
      <hr className="my-4 border-0 border-t border-[#d7d9de] [.consultant-sheet_&]:my-[17px]" />
      <ConsultantContactLinks />
      <span className="demo-note hidden text-[13px] leading-[1.6] text-muted [.consultant-sheet_&]:mt-5 [.consultant-sheet_&]:block">
        Contato fictício para demonstração.
      </span>
    </div>
  );
}

export function ConsultantCard() {
  return (
    <div
      className={cn(
        panelClassName,
        'panel consultant-panel block rounded-[7px] px-[15px] py-[18px] shadow-[0_3px_4px_#0002] print:mt-[22px] print:max-w-[300px] print:break-inside-avoid',
      )}
    >
      <span className="consultant-panel-label block text-[15px] font-medium text-[#9294a2]">
        Consultor responsável Exban
      </span>
      <ConsultantDetails />
    </div>
  );
}
