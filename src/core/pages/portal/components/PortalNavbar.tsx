'use client';

import { Button } from '@/components/ui/Button';
import { GoogleLogo as Google, Logo } from '@/core/components/BrandAssets';
import { Check, Handshake, Headset, Info, LogOut, Menu, User, X } from 'lucide-react';
import type { PortalState } from '../hooks/UsePortal';
type PortalNavbarProps = { state: PortalState };
export function PortalNavbar({ state }: PortalNavbarProps) {
  const { menu, setMenu, navigate, setDialog, openGoogleLink, accounts, logout } = state;
  return (
    <header
      className={`navbar relative z-10 rounded-[40px] border border-[#ededf0] bg-white px-[17px] py-[10px] shadow-[0_3px_5px_#18243112] transition-[border-radius] duration-[350ms] [&.expanded]:rounded-[22px] max-[760px]:hidden motion-reduce:transition-none print:!hidden ${menu ? 'expanded' : ''}`}
    >
      <div className="nav-top flex min-h-[45px] items-center justify-between">
        <div className="nav-brand flex items-center gap-[10px] [&>button:last-child]:flex [&>button:last-child]:shrink-0 [&>button:last-child]:items-center [&>button:last-child]:justify-center [&>button:last-child]:py-[5px] [&>button:last-child]:leading-none [&_.ora-logo]:w-[92px]">
          <Button
            variant="ghost"
            size="icon"
            aria-label={menu ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={menu}
            aria-controls="navigation"
            onClick={() => setMenu(!menu)}
          >
            {menu ? <X size={22} /> : <Menu size={22} />}
          </Button>
          <button onClick={() => navigate('businesses')} aria-label="Ir para meus negócios">
            <Logo />
          </button>
        </div>
        <button
          className="user-button mr-[15px] flex items-center gap-[10px] text-[16px] [&_strong]:font-semibold"
          onClick={() => navigate('profile')}
        >
          <span className="user-avatar grid size-[30px] place-items-center rounded-full bg-primary-light text-primary">
            <User size={17} />
          </span>
          <span>
            Olá, <strong>Alex!</strong>
          </span>
        </button>
      </div>
      <div
        className="nav-expand grid grid-rows-[0fr] opacity-0 transition-[grid-template-rows,opacity] duration-[350ms] ease-in-out [.expanded_&]:grid-rows-[1fr] [.expanded_&]:opacity-100 [&>nav]:flex [&>nav]:min-h-0 [&>nav]:flex-wrap [&>nav]:items-center [&>nav]:gap-3 [&>nav]:overflow-hidden [.expanded_&]:[&>nav]:pt-5 [.expanded_&]:[&>nav]:pb-2 [&_button]:h-12 [&_button]:border-[#e0e1e5] [&_button]:text-[16px] [&_svg]:w-[19px] [&_svg]:text-primary motion-reduce:transition-none"
        id="navigation"
        inert={!menu}
      >
        <nav>
          <Button variant="outline" onClick={() => navigate('businesses')}>
            <Handshake /> Meus negócios
          </Button>
          <Button variant="outline" onClick={() => setDialog('about')}>
            <Info /> Sobre o ORA
          </Button>
          <Button variant="outline" onClick={() => setDialog('help')}>
            <Headset /> Ajuda e SAC
          </Button>
          <Button variant="outline" onClick={() => navigate('profile')}>
            <User /> Meu perfil
          </Button>
          <Button variant="outline" aria-label="Vincular conta Google" onClick={openGoogleLink}>
            <Google />
            {accounts.length > 0 && <Check size={16} />}
          </Button>
          <Button
            variant="outline"
            className="logout text-[#e64646] [&>svg]:text-[#e64646]!"
            onClick={logout}
          >
            <LogOut /> Sair
          </Button>
        </nav>
      </div>
    </header>
  );
}
