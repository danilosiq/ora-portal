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
    <section className="profile-page" aria-labelledby="profile-title">
      <span className="eyebrow">MEU PERFIL</span>
      <ProfileSummary totalBusinesses={totalBusinesses} />
      <LinkedAccounts accounts={accounts} onLink={onLink} onUnlink={onUnlink} />
      <Button variant="ghost" className="profile-logout" onClick={onLogout}>
        <LogOut size={18} /> Sair do portal
      </Button>
    </section>
  );
}
