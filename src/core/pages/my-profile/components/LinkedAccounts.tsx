'use client';

import { Button } from '@/components/ui/Button';
import { LinkAccountIcon } from '@/core/components/BrandAssets';
import { Ban, UserCircle } from 'lucide-react';

import type { MyProfileProps } from '../MyProfilePage';
type LinkedAccountsProps = Pick<MyProfileProps, 'accounts' | 'onLink' | 'onUnlink'>;
export function LinkedAccounts({ accounts, onLink, onUnlink }: LinkedAccountsProps) {
  return (
    <section
      className="linked-accounts mx-auto w-[1040px] max-w-full pt-[30px] max-[760px]:pt-[25px] [&>ul]:m-0 [&>ul]:flex [&>ul]:list-none [&>ul]:flex-col [&>ul]:gap-3 [&>ul]:p-0 [&_li]:flex [&_li]:min-h-[52px] [&_li]:items-center [&_li]:justify-between [&_li]:gap-[18px] [&_li]:rounded-[23px] [&_li]:border [&_li]:border-[#c8cbd0] [&_li]:px-[17px] [&_li]:py-[14px] max-[760px]:[&_li]:items-start max-[760px]:[&_li]:gap-[10px] max-[760px]:[&_li]:rounded-[19px] max-[760px]:[&_li]:px-[13px]"
      aria-labelledby="linked-accounts-title"
    >
      <div className="linked-accounts-heading mb-4 flex flex-wrap items-center gap-[18px] [&>h2]:text-[23px] [&>h2]:font-normal [&_strong]:font-semibold [&>button]:h-[51px] [&>button]:rounded-[22px] [&>button]:px-[18px] [&>button]:py-3 [&>button]:text-[15px] [&_.link-account-icon]:size-[23px] max-[760px]:mb-[19px] max-[760px]:gap-[15px] max-[760px]:[&>h2]:text-[22px] max-[760px]:[&>button]:h-[49px] max-[760px]:[&>button]:text-[16px]">
        <h2 id="linked-accounts-title">
          Contas vinculadas ao <strong>Google</strong>
        </h2>
        <Button variant="outline" onClick={onLink}>
          <LinkAccountIcon /> Vincular nova conta Google
        </Button>
      </div>
      <ul>
        {accounts.map((account) => (
          <li key={account.id}>
            <span className="account-email flex min-w-0 items-center gap-[10px] text-[16px] [overflow-wrap:anywhere] [&>svg]:shrink-0 [&>svg]:text-primary max-[760px]:items-start max-[760px]:gap-2 max-[760px]:leading-[1.5] max-[760px]:[&>svg]:mt-[2px]">
              <UserCircle size={23} />
              {account.email}
            </span>
            <button
              className="unlink-account flex shrink-0 items-center gap-[7px] p-1 text-[15px] text-[#ed3333] hover:text-red-700 max-[760px]:gap-[5px] max-[760px]:px-0 max-[760px]:py-[2px] max-[760px]:text-[13px] max-[760px]:leading-[1.6] max-[760px]:[&>svg]:mt-px max-[760px]:[&>svg]:w-4 print:hidden"
              onClick={() => onUnlink(account.id)}
              aria-label={`Desvincular ${account.email}`}
            >
              <Ban size={20} /> Desvincular
            </button>
          </li>
        ))}
      </ul>
      {accounts.length === 0 && (
        <div className="accounts-empty rounded-[15px] border border-dashed border-[#d4d7dd] p-[35px] text-center text-[#969aa4] [&>svg]:mx-auto [&>svg]:mb-3 [&>svg]:text-primary [&>p]:text-[19px] [&>span]:text-[15px]">
          <UserCircle size={30} />
          <p>Nenhuma conta Google vinculada.</p>
          <span>Vincule uma conta para simular o acesso com Google.</span>
        </div>
      )}
      <p
        className="profile-demo mt-[19px] text-[13px] text-[#959aa4] max-[760px]:leading-[1.7]"
        role="status"
      >
        Demonstração com dados fictícios. Os vínculos são simulados e ficam somente nesta sessão.
      </p>
    </section>
  );
}
