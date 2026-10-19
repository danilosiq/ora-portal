'use client';
import type { LinkedAccount, PortalDialog, PortalView } from '@/core/@types/Auth';
import type { ReviewResult } from '@/core/@types/Business';
import { useRef, useState } from 'react';
export function usePortal() {
  const [screen, setScreen] = useState<'login' | 'portal'>('login');
  const [view, setView] = useState<PortalView>('businesses');
  const [menu, setMenu] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const [dialog, setDialog] = useState<PortalDialog>(null);
  const [linked, setLinked] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [reviews, setReviews] = useState<Record<number, ReviewResult>>({});
  const [accounts, setAccounts] = useState<LinkedAccount[]>([
    { id: 1, email: 'alex.oliveira@example.com' },
    { id: 2, email: 'alex.pessoal@example.com' },
  ]);
  const nextAccountId = useRef(3);
  const navigate = (next: PortalView) => {
    setView(next);
    setSelected(null);
    setMenu(false);
    setDialog(null);
    window.scrollTo({ top: 0 });
  };
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
    setScreen('login');
    setMenu(false);
    setSelected(null);
    setLinked(false);
    setReviews({});
    setAccounts([]);
    setView('businesses');
    setDialog(null);
    setConfirming(false);
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
    setView('businesses');
    setSelected(null);
    setLinked(google);
    setScreen('portal');
    if (!google) {
      try {
        if (localStorage.getItem('ora-hide-google-invite') !== 'true') setDialog('google');
      } catch {
        setDialog('google');
      }
    }
  };
  const openBusiness = (id: number) => {
    setView('businesses');
    setSelected(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const startConfirmation = () => {
    setConfirming(true);
    window.scrollTo({ top: 0 });
  };
  const exitConfirmation = () => {
    setConfirming(false);
    window.scrollTo({ top: 0 });
  };
  const completeReview = (businessId: number, result: ReviewResult) =>
    setReviews((previous) => ({ ...previous, [businessId]: result }));
  return {
    screen,
    view,
    menu,
    setMenu,
    selected,
    dialog,
    setDialog,
    linked,
    accounts,
    reviews,
    confirming,
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
export type PortalState = ReturnType<typeof usePortal>;
