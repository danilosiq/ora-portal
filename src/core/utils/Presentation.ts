export const panelClassName =
  'rounded-[10px] border border-line bg-white p-6 shadow-[0_3px_7px_#19223306] max-[760px]:p-5 print:break-inside-avoid print:shadow-none';

export const consultantSheetClassName =
  'consultant-sheet max-[760px]:inset-x-0 max-[760px]:top-auto max-[760px]:bottom-0 max-[760px]:w-full max-[760px]:max-w-none max-[760px]:max-h-[88svh] max-[760px]:translate-x-0 max-[760px]:translate-y-0 max-[760px]:rounded-t-[24px] max-[760px]:rounded-b-none max-[760px]:px-[22px] max-[760px]:pt-6 max-[760px]:pb-[calc(35px+env(safe-area-inset-bottom))] max-[760px]:shadow-[0_-5px_25px_#00000020] max-[760px]:data-[state=open]:animate-[sheet-in_0.38s_cubic-bezier(0.16,1,0.3,1)_both] max-[760px]:data-[state=closed]:animate-[sheet-out_0.24s_cubic-bezier(0.4,0,1,1)_both]';

export const mobileConsultantClassName =
  'mobile-consultant-card mb-[22px] hidden w-full rounded-[7px] border border-[#eceef1] bg-white p-[18px] text-left shadow-[0_3px_4px_#0002] max-[900px]:block max-[760px]:mb-[25px] max-[760px]:border-[#f4f4f4] max-[760px]:px-[15px] max-[760px]:shadow-[0_4px_5px_#00000024] print:!hidden';

export const overviewPanelClassName = `${panelClassName} mb-5 [&_h2]:mb-[22px] [&_h2]:flex [&_h2]:items-center [&_h2]:gap-2 [&_h2]:text-[21px] [&_h2]:font-medium [&_h2]:text-primary [&_h3]:text-[19px] [&_h3]:font-semibold [&_p]:text-[16px] [&_p]:leading-[1.75] [.review-content_&]:mb-6 [.review-content_&]:rounded-[5px] [.review-content_&]:p-[18px] [.review-content_&]:shadow-[0_3px_4px_#0002] [.review-content_&]:[&_h2]:mb-[17px] [.review-content_&]:[&_h3]:text-[20px] [.review-content_&]:max-[460px]:p-4 [.review-content_&]:max-[460px]:[&_h3]:text-[19px] [.has-business-detail_&]:max-[760px]:mb-6 [.has-business-detail_&]:max-[760px]:rounded-[5px] [.has-business-detail_&]:max-[760px]:border-0 [.has-business-detail_&]:max-[760px]:px-[15px] [.has-business-detail_&]:max-[760px]:py-[19px] [.has-business-detail_&]:max-[760px]:shadow-[0_4px_5px_#00000025] [.has-business-detail_&]:max-[760px]:[&_h2]:mb-[23px] [.has-business-detail_&]:max-[760px]:[&_h2]:text-[22px] [.has-business-detail_&]:max-[760px]:[&_h2>svg]:size-6`;

export const reviewCheckboxClassName =
  'review-checkbox flex cursor-pointer items-start gap-[11px] text-[16px] leading-[1.55] font-semibold [&>input]:mt-[3px] [&>input]:size-[19px] [&>input]:shrink-0 [&>input]:cursor-pointer [&>input]:accent-primary [.review-intro_&]:justify-center [.review-notice_&]:mt-[14px] [.review-notice_&]:text-[15px]';
