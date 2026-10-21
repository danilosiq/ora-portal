'use client';
import type { LinkedAccount, PortalDialog, PortalView } from '@/core/@types/Auth';
import type { ReviewResult } from '@/core/@types/Business';
import { useDealsList } from '@/core/pages/my-deals/hooks/UseDealsList';
import { portalRoutes } from '@/core/utils/PortalRoutes';
import { usePathname, useRouter } from 'next/navigation';
import { createContext, useContext, useEffect, useRef, useState } from 'react';

export function usePortalState() {
  const router = useRouter();
  const pathname = usePathname();
  const listing = useDealsList();
  const view: PortalView =
    pathname === portalRoutes.profile
      ? 'profile'
      : pathname === portalRoutes.about
        ? 'about'
        : 'businesses';
  const [menu, setMenu] = useState(false);
  const [dialog, setDialog] = useState<PortalDialog>(null);
  const [linked, setLinked] = useState(false);
  const [reviews, setReviews] = useState<Record<number, ReviewResult>>({});
  const [accounts, setAccounts] = useState<LinkedAccount[]>([
    { id: 1, email: 'alex.oliveira@example.com' },
    { id: 2, email: 'alex.pessoal@example.com' },
  ]);
  const nextAccountId = useRef(3);
  const pendingGoogleInvite = useRef(false);

  useEffect(() => {
    setMenu(false);
    if (pathname === portalRoutes.businesses && pendingGoogleInvite.current) {
      pendingGoogleInvite.current = false;
      setDialog('google');
    } else setDialog(null);
  }, [pathname]);

  const navigateTo = (path: string) => {
    setMenu(false);
    setDialog(null);
    router.push(path);
  };
  const navigate = (next: PortalView) => navigateTo(portalRoutes[next]);
  const openGoogleLink = () => {
    setLinked(false);
    setDialog('google');
  };
  const linkAccount = () => {
    const id = nextAccountId.current++;
    setAccounts((previous) => [...previous, { id, email: `alex.conta${id}@example.com` }]);
    setLinked(true);
  };
  const unlinkAccount = (id: number) =>
    setAccounts((previous) => previous.filter((account) => account.id !== id));
  const logout = () => {
    pendingGoogleInvite.current = false;
    setLinked(false);
    setReviews({});
    setAccounts([]);
    listing.setSearch('');
    navigateTo(portalRoutes.login);
  };
  const hideGoogleInvite = () => {
    try {
      localStorage.setItem('ora-hide-google-invite', 'true');
    } catch {
      /* The preference is optional when browser storage is unavailable. */
    }
    setDialog(null);
  };
  const completeIdentification = (google: boolean) => {
    setLinked(google);
    pendingGoogleInvite.current = false;
    if (!google) {
      try {
        pendingGoogleInvite.current = localStorage.getItem('ora-hide-google-invite') !== 'true';
      } catch {
        pendingGoogleInvite.current = true;
      }
    }
    navigateTo(portalRoutes.businesses);
  };
  const openBusiness = (id: number) => navigateTo(portalRoutes.business(id));
  const startConfirmation = (id: number) => navigateTo(portalRoutes.confirmation(id));
  const exitConfirmation = (id: number) => navigateTo(portalRoutes.business(id));
  const completeReview = (businessId: number, result: ReviewResult) =>
    setReviews((previous) => ({ ...previous, [businessId]: result }));
  return {
    view,
    menu,
    setMenu,
    dialog,
    setDialog,
    linked,
    accounts,
    reviews,
    listing,
    navigate,
    openGoogleLink,
    linkAccount,
    unlinkAccount,
    logout,
    hideGoogleInvite,
    completeIdentification,
    openBusiness,
    startConfirmation,
    exitConfirmation,
    completeReview,
  };
}

export type PortalState = ReturnType<typeof usePortalState>;
export const PortalContext = createContext<PortalState | null>(null);

export function usePortal() {
  const state = useContext(PortalContext);
  if (!state) throw new Error('usePortal must be used within PortalProvider');
  return state;
}
