import { Mail, Phone } from 'lucide-react';

type ConsultantContactLinksProps = {
  phone?: string;
  phoneLabel?: string;
  email?: string;
  contactLabel?: string;
};
export function ConsultantContactLinks({
  phone = '554100000000',
  phoneLabel = '(41) 0000-0000',
  email = 'consultor@example.com',
  contactLabel = 'consultor',
}: ConsultantContactLinksProps) {
  return (
    <>
      <div className="consultant-phone-row my-4 flex flex-wrap items-center gap-[9px] [.business-sidebar_&]:flex-nowrap [.business-sidebar_&]:gap-2 [.intermediary-contact_&]:my-3 [.consultant-sheet_&]:justify-center [.consultant-sheet_&]:max-[760px]:my-[18px] [.consultant-sheet_&]:max-[760px]:gap-[10px]">
        <a
          className="flex items-center gap-[9px] text-[16px] [.consultant-panel_&]:leading-[1.4] [overflow-wrap:anywhere] [.consultant-panel_&]:text-[15px] [.business-sidebar_&]:max-[1100px]:text-[14px] [.consultant-sheet_&]:justify-center [.consultant-sheet_&]:text-[20px] [.consultant-sheet_&]:max-[760px]:gap-[10px] [&>svg]:shrink-0 [&>svg]:text-primary"
          href={`tel:+${phone}`}
        >
          <Phone size={20} /> {phoneLabel}
        </a>
        <a
          className="whatsapp-button inline-flex size-[30px] shrink-0 items-center justify-center rounded-full bg-[#388e3c] p-[5px] text-white transition-[background-color,transform] duration-200 hover:-translate-y-px hover:bg-[#287a2c] [.business-sidebar_&]:size-[25px] [.business-sidebar_&]:p-1 [.intermediaries-contacts_&]:size-[29px] [.consultant-sheet_&]:max-[760px]:size-8 print:!hidden [&>svg]:shrink-0 [&>svg]:text-white"
          href={`https://wa.me/${phone}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Abrir WhatsApp de ${contactLabel}`}
          title={`WhatsApp de ${contactLabel} (contato demonstrativo)`}
        >
          <svg viewBox="0 0 24 24" width="21" height="21" aria-hidden="true" fill="currentColor">
            <path d="M20.52 3.48A11.85 11.85 0 0 0 12.05 0C5.45 0 .08 5.37.08 11.97c0 2.11.55 4.17 1.6 5.99L0 24l6.2-1.63a11.94 11.94 0 0 0 5.84 1.49h.01C18.65 23.86 24 18.49 24 11.9c0-3.2-1.24-6.2-3.48-8.42ZM12.05 21.84h-.01a9.9 9.9 0 0 1-5.05-1.38l-.36-.21-3.68.97.98-3.59-.23-.37a9.91 9.91 0 0 1-1.52-5.29c0-5.48 4.46-9.94 9.95-9.94 2.65 0 5.14 1.03 7.01 2.91a9.86 9.86 0 0 1 2.91 7.02c0 5.48-4.47 9.88-10 9.88Zm5.45-7.4c-.3-.15-1.77-.87-2.04-.97-.28-.1-.48-.15-.68.15-.2.3-.77.97-.94 1.17-.18.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.67-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.68-1.62-.93-2.22-.24-.58-.49-.5-.67-.51h-.58c-.2 0-.52.08-.8.38-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.11 3.23 5.11 4.53.71.31 1.27.5 1.7.64.72.23 1.37.2 1.89.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.29.17-1.42-.07-.12-.27-.2-.57-.35Z" />
          </svg>
        </a>
      </div>
      <a
        className="my-4 flex items-center gap-[9px] text-[16px] [.consultant-panel_&]:leading-[1.4] [overflow-wrap:anywhere] [.business-sidebar_&]:max-[1100px]:text-[14px] [.consultant-sheet_&]:justify-center [.consultant-sheet_&]:text-[20px] [.consultant-sheet_&]:max-[760px]:my-[18px] [.consultant-sheet_&]:max-[760px]:gap-[10px] [.intermediary-contact_&]:my-3 [.intermediaries-contacts_&]:text-[18px] [&>svg]:shrink-0 [&>svg]:text-primary"
        href={`mailto:${email}`}
      >
        <Mail size={20} /> {email}
      </a>
    </>
  );
}
