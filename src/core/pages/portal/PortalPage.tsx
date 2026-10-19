'use client';

import { properties } from '@/core/mocks/BusinessData';
import { DealDetailsPage } from '@/core/pages/deal-details/DealDetailsPage';
import { Identification } from '@/core/pages/identification/IdentificationPage';
import { useDealsList } from '@/core/pages/my-deals/hooks/UseDealsList';
import { MyDealsPage } from '@/core/pages/my-deals/MyDealsPage';
import { MyProfile } from '@/core/pages/my-profile/MyProfilePage';
import { ValueConfirmation } from '@/core/pages/value-confirmation/ValueConfirmationPage';
import { MobileNavigation } from './components/MobileNavigation';
import { PortalDialog } from './components/PortalDialog';
import { PortalFooter } from './components/PortalFooter';
import { PortalNavbar } from './components/PortalNavbar';
import { usePortal } from './hooks/UsePortal';
export function PortalPage() {
  const state = usePortal();
  const listing = useDealsList();
  const {
    selected,
    view,
    screen,
    confirming,
    reviews,
    accounts,
    navigate,
    completeIdentification,
    openBusiness,
    openGoogleLink,
    unlinkAccount,
    logout,
    startConfirmation,
    exitConfirmation,
    completeReview,
  } = state;
  if (confirming && selected !== null)
    return (
      <ValueConfirmation
        key={selected}
        businessId={selected}
        onExit={exitConfirmation}
        onComplete={(result) => completeReview(selected, result)}
      />
    );
  if (screen !== 'portal') return <Identification onComplete={completeIdentification} />;
  return (
    <div
      className={`portal ${selected !== null ? 'has-business-detail' : ''} ${view === 'profile' ? 'has-profile' : ''}`}
    >
      <PortalNavbar state={state} />
      <main className="main-content">
        {view === 'profile' ? (
          <MyProfile
            accounts={accounts}
            totalBusinesses={properties.length}
            onLink={openGoogleLink}
            onUnlink={unlinkAccount}
            onLogout={logout}
          />
        ) : selected === null ? (
          <MyDealsPage state={listing} reviews={reviews} onOpenBusiness={openBusiness} />
        ) : (
          <DealDetailsPage
            key={selected}
            businessId={selected}
            review={reviews[selected]}
            onBack={() => navigate('businesses')}
            onConfirm={startConfirmation}
          />
        )}
      </main>
      <MobileNavigation state={state} />
      <PortalFooter />
      <PortalDialog state={state} />
    </div>
  );
}
