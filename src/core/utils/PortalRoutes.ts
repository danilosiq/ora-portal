import { properties } from '@/core/mocks/BusinessData';

export const portalRoutes = {
  login: '/login',
  businesses: '/myDeals',
  profile: '/user',
  about: '/about',
  business: (id: number) => `/myDeals/${id}`,
  confirmation: (id: number) => `/myDeals/${id}/confirmValues`,
} as const;

export type BusinessRouteProps = { id: string };

export function getBusinessId({ id }: BusinessRouteProps) {
  if (!/^(0|[1-9]\d*)$/.test(id)) return null;
  const businessId = Number(id);
  return Number.isSafeInteger(businessId) && businessId < properties.length ? businessId : null;
}
