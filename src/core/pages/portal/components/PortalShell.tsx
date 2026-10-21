'use client';
import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { portalRoutes } from '@/core/utils/PortalRoutes';
import { MobileNavigation } from './MobileNavigation';
import { PortalDialog } from './PortalDialog';
import { PortalFooter } from './PortalFooter';
import { PortalNavbar } from './PortalNavbar';
import { usePortal } from '../hooks/UsePortal';
type PortalShellProps = { children: ReactNode };
export function PortalShell({ children }: PortalShellProps) {
  const state = usePortal();
  const pathname = usePathname();
  const { view } = state;
  if (pathname === portalRoutes.login || pathname === '/' || pathname.endsWith('/confirmValues'))
    return children;
  const isBusinessDetail = pathname.startsWith(`${portalRoutes.businesses}/`);
  return (
    <div
      className={`portal mx-auto max-w-[1680px] px-8 pt-6 max-[1100px]:px-6 max-[1100px]:pt-5 max-[760px]:px-[19px] max-[760px]:pb-[calc(100px+env(safe-area-inset-bottom))] print:p-0 ${isBusinessDetail ? 'has-business-detail' : ''} ${view === 'profile' ? 'has-profile' : ''}`}
    >
      <PortalNavbar state={state} />
      <main className="main-content min-h-[calc(100vh-180px)] pt-[38px] max-[760px]:min-h-[calc(100svh-145px)] max-[760px]:pt-0 print:p-0">
        {children}
      </main>
      <MobileNavigation state={state} />
      <PortalFooter />
      <PortalDialog state={state} />
    </div>
  );
}
