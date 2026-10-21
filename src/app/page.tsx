import { portalRoutes } from '@/core/utils/PortalRoutes';
import { redirect } from 'next/navigation';

export default function HomePage() {
  redirect(portalRoutes.login);
}
