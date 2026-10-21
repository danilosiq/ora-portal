import { DealDetailsPage } from '@/core/pages/deal-details/DealDetailsPage';
import { getBusinessId, type BusinessRouteProps } from '@/core/utils/PortalRoutes';
import { notFound } from 'next/navigation';

type DealDetailsRoutePageProps = { params: Promise<BusinessRouteProps> };

export default async function DealDetailsRoutePage({ params }: DealDetailsRoutePageProps) {
  const businessId = getBusinessId(await params);
  if (businessId === null) notFound();
  return <DealDetailsPage key={businessId} businessId={businessId} />;
}
