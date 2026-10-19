'use client';

import { Handshake, Mail, Phone, User } from 'lucide-react';

type ProfileSummaryProps = { totalBusinesses: number };
export function ProfileSummary({ totalBusinesses }: ProfileSummaryProps) {
  return (
    <div className="profile-summary flex items-center justify-start gap-[23px] border-b border-[#dddfe4] px-[10px] pt-5 pb-[35px] max-[760px]:flex-wrap max-[760px]:gap-[14px] max-[760px]:px-0 max-[760px]:pt-[18px] max-[760px]:pb-[26px]">
      <span className="profile-avatar grid w-[45px] shrink-0 place-items-center text-[#111] max-[760px]:w-[37px] max-[760px]:[&>svg]:w-[37px]">
        <User size={43} fill="currentColor" strokeWidth={1.5} />
      </span>
      <div className="profile-information min-w-0 max-[760px]:flex-1 [&>h1]:mb-[14px] [&>h1]:text-[34px] [&>h1]:leading-[1.35] [&>h1]:font-medium [&>p]:flex [&>p]:items-center [&>p]:gap-[9px] [&>p]:text-[16px] [&>p]:leading-[1.7] [&>p]:[overflow-wrap:anywhere] [&_svg]:shrink-0 [&_svg]:text-primary max-[760px]:[&>h1]:mb-[11px] max-[760px]:[&>h1]:text-[28px] max-[760px]:[&>p]:gap-[6px] max-[760px]:[flex-basis:calc(100%-60px)]">
        <h1 id="profile-title">Alex Oliveira</h1>
        <p>
          <span className="profile-cpf-label shrink-0 text-primary">CPF:</span> xxx.xxx.000-00
        </p>
        <p>
          <Phone size={18} /> (41) 0000-0000
        </p>
        <p>
          <Mail size={18} /> exemplo@exmplo.com
        </p>
      </div>
      <div className="profile-count ml-auto min-w-[180px] self-center rounded-[22px] border border-[#cacbd1] px-[18px] py-4 [&>span]:flex [&>span]:items-center [&>span]:gap-3 [&>span]:text-[15px] [&_svg]:text-primary [&>strong]:mt-[5px] [&>strong]:block [&>strong]:text-[23px] [&>strong]:font-normal max-[760px]:mt-[10px] max-[760px]:mr-0 max-[760px]:mb-0 max-[760px]:ml-[51px] max-[760px]:min-w-[190px] max-[760px]:flex-none max-[760px]:px-[17px] max-[760px]:py-[13px] max-[760px]:[&>span]:text-[16px] max-[760px]:[&>strong]:text-[25px] print:ml-auto">
        <span>
          <Handshake size={23} /> Total de negócios
        </span>
        <strong>{totalBusinesses}</strong>
      </div>
    </div>
  );
}
