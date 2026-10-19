'use client';
import { Ban, Handshake, LogOut, Mail, Phone, User, UserCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LinkAccountIcon } from '@/components/business-content';

export type LinkedAccount = { id: number; email: string };

export function MyProfile({ accounts, totalBusinesses, onLink, onUnlink, onLogout }: {
  accounts: LinkedAccount[];
  totalBusinesses: number;
  onLink: () => void;
  onUnlink: (id: number) => void;
  onLogout: () => void;
}) {
  return <section className="profile-page" aria-labelledby="profile-title">
    <span className="eyebrow">MEU PERFIL</span>
    <div className="profile-summary">
      <span className="profile-avatar"><User size={43} fill="currentColor" strokeWidth={1.5} /></span>
      <div className="profile-information"><h1 id="profile-title">Alex Oliveira</h1>
        <p><span className="profile-cpf-label">CPF:</span> xxx.xxx.000-00</p>
        <p><Phone size={18} /> (41) 0000-0000</p>
        <p><Mail size={18} /> exemplo@exmplo.com</p>
      </div>
      <div className="profile-count"><span><Handshake size={23} /> Total de negócios</span><strong>{totalBusinesses}</strong></div>
    </div>
    <section className="linked-accounts" aria-labelledby="linked-accounts-title">
      <div className="linked-accounts-heading"><h2 id="linked-accounts-title">Contas vinculadas ao <strong>Google</strong></h2><Button variant="outline" onClick={onLink}><LinkAccountIcon /> Vincular nova conta Google</Button></div>
      <ul>{accounts.map(account => <li key={account.id}><span className="account-email"><UserCircle size={23} />{account.email}</span><button className="unlink-account" onClick={() => onUnlink(account.id)} aria-label={`Desvincular ${account.email}`}><Ban size={20} /> Desvincular</button></li>)}</ul>
      {accounts.length === 0 && <div className="accounts-empty"><UserCircle size={30} /><p>Nenhuma conta Google vinculada.</p><span>Vincule uma conta para simular o acesso com Google.</span></div>}
      <p className="profile-demo" role="status">Demonstração com dados fictícios. Os vínculos são simulados e ficam somente nesta sessão.</p>
    </section>
    <Button variant="ghost" className="profile-logout" onClick={onLogout}><LogOut size={18} /> Sair do portal</Button>
  </section>;
}
