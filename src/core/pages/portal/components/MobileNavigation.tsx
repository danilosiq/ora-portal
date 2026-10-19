'use client';

import { Handshake, Headset, Info, User } from 'lucide-react';
import type { PortalState } from '../hooks/UsePortal';
type MobileNavigationProps = { state: PortalState };
export function MobileNavigation({ state }: MobileNavigationProps) {
  const { view, dialog, navigate, setDialog } = state;
  return (
    <nav
      className="mobile-bottom-nav fixed inset-x-0 bottom-0 z-40 hidden items-center justify-around gap-[2px] rounded-t-[24px] border-t border-[#f4f4f4] bg-white px-2 pt-[11px] pb-[calc(10px+env(safe-area-inset-bottom))] shadow-[0_-5px_22px_#00000016] max-[760px]:flex print:!hidden [&>button]:flex [&>button]:min-h-12 [&>button]:min-w-0 [&>button]:flex-1 [&>button]:flex-col [&>button]:items-center [&>button]:justify-center [&>button]:gap-[7px] [&>button]:py-[3px] [&>button]:text-[13px] [&>button]:leading-[1.2] [&>button]:text-[#989ba7] [&>button.active]:text-primary [&_svg]:size-[22px] [&_span]:whitespace-nowrap max-[380px]:[&>button]:text-[12px]"
      aria-label="Navegação principal"
    >
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
