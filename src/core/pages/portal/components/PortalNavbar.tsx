'use client';

import { Button } from '@/components/ui/Button';
import { GoogleLogo as Google, Logo } from '@/core/components/BrandAssets';
import { Check, Handshake, Headset, Info, LogOut, Menu, User, X } from 'lucide-react';
import type { PortalState } from '../hooks/UsePortal';
type PortalNavbarProps = { state: PortalState };
export function PortalNavbar({ state }: PortalNavbarProps) {
  const { menu, setMenu, navigate, setDialog, openGoogleLink, accounts, logout } = state;
  return (
    <header className={`navbar ${menu ? 'expanded' : ''}`}>
      <div className="nav-top">
        <div className="nav-brand">
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
        <button className="user-button" onClick={() => navigate('profile')}>
          <span className="user-avatar">
            <User size={17} />
          </span>
          <span>
            Olá, <strong>Alex!</strong>
          </span>
        </button>
      </div>
      <div className="nav-expand" id="navigation" inert={!menu}>
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
          <Button variant="outline" className="logout" onClick={logout}>
            <LogOut /> Sair
          </Button>
        </nav>
      </div>
    </header>
  );
}
