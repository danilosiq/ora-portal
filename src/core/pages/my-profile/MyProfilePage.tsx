'use client';

import { LinkedAccounts } from './components/LinkedAccounts';
import { ProfileSummary } from './components/ProfileSummary';

import { Button } from '@/components/ui/Button';
import { LogOut } from 'lucide-react';

import type { LinkedAccount } from '@/core/@types/Auth';

export type MyProfileProps = {
  accounts: LinkedAccount[];
  totalBusinesses: number;
  onLink: () => void;
  onUnlink: (id: number) => void;
  onLogout: () => void;
};
export function MyProfile({
  accounts,
  totalBusinesses,
  onLink,
  onUnlink,
  onLogout,
}: MyProfileProps) {
  return (
    <section
      className="profile-page mx-auto w-[1040px] max-w-full pt-[6px] animate-[reveal_0.3s_ease] max-[760px]:pt-[10px] motion-reduce:animate-none"
      aria-labelledby="profile-title"
    >
      <span className="eyebrow text-[12px] font-semibold tracking-[1.6px] text-muted">
        MEU PERFIL
      </span>
      <ProfileSummary totalBusinesses={totalBusinesses} />
      <LinkedAccounts accounts={accounts} onLink={onLink} onUnlink={onUnlink} />
      <Button
        variant="ghost"
        className="profile-logout mt-[30px] flex text-[15px] text-[#e33c3c] max-[760px]:mt-6 print:hidden"
        onClick={onLogout}
      >
        <LogOut size={18} /> Sair do portal
      </Button>
    </section>
  );
}
