import { ValueConfirmationPage } from '@/core/pages/value-confirmation/ValueConfirmationPage';
import { getBusinessId, type BusinessRouteProps } from '@/core/utils/PortalRoutes';
import { notFound } from 'next/navigation';

type ConfirmValuesRoutePageProps = { params: Promise<BusinessRouteProps> };

export default async function ConfirmValuesRoutePage({ params }: ConfirmValuesRoutePageProps) {
  const businessId = getBusinessId(await params);
  if (businessId === null) notFound();
  return <ValueConfirmationPage key={businessId} businessId={businessId} />;
}
