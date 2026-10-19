'use client';

import { Button } from '@/components/ui/Button';
import { LinkAccountIcon } from '@/core/components/BrandAssets';
import { Ban, UserCircle } from 'lucide-react';

import type { MyProfileProps } from '../MyProfilePage';
type LinkedAccountsProps = Pick<MyProfileProps, 'accounts' | 'onLink' | 'onUnlink'>;
export function LinkedAccounts({ accounts, onLink, onUnlink }: LinkedAccountsProps) {
  return (
    <section className="linked-accounts" aria-labelledby="linked-accounts-title">
      <div className="linked-accounts-heading">
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
            <span className="account-email">
              <UserCircle size={23} />
              {account.email}
            </span>
            <button
              className="unlink-account"
              onClick={() => onUnlink(account.id)}
              aria-label={`Desvincular ${account.email}`}
            >
              <Ban size={20} /> Desvincular
            </button>
          </li>
        ))}
      </ul>
      {accounts.length === 0 && (
        <div className="accounts-empty">
          <UserCircle size={30} />
          <p>Nenhuma conta Google vinculada.</p>
          <span>Vincule uma conta para simular o acesso com Google.</span>
        </div>
      )}
      <p className="profile-demo" role="status">
        Demonstração com dados fictícios. Os vínculos são simulados e ficam somente nesta sessão.
      </p>
    </section>
  );
}
