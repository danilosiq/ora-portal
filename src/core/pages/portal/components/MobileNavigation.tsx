'use client';

import { Handshake, Headset, Info, User } from 'lucide-react';
import type { PortalState } from '../hooks/UsePortal';
type MobileNavigationProps = { state: PortalState };
export function MobileNavigation({ state }: MobileNavigationProps) {
  const { view, dialog, navigate, setDialog } = state;
  return (
    <nav className="mobile-bottom-nav" aria-label="Navegação principal">
      <button
        className={view === 'businesses' && !dialog ? 'active' : ''}
        aria-current={view === 'businesses' && !dialog ? 'page' : undefined}
        onClick={() => navigate('businesses')}
      >
        <Handshake size={22} />
        <span>Meus negócios</span>
      </button>
      <button className={dialog === 'about' ? 'active' : ''} onClick={() => setDialog('about')}>
        <Info size={22} />
        <span>Sobre o ORA</span>
      </button>
      <button className={dialog === 'help' ? 'active' : ''} onClick={() => setDialog('help')}>
        <Headset size={22} />
        <span>Ajuda e SAC</span>
      </button>
      <button
        className={view === 'profile' && !dialog ? 'active' : ''}
        aria-current={view === 'profile' && !dialog ? 'page' : undefined}
        onClick={() => navigate('profile')}
      >
        <User size={22} />
        <span>Eu</span>
      </button>
    </nav>
  );
}
