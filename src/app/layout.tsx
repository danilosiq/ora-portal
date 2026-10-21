import { PortalProvider } from '@/core/pages/portal/components/PortalProvider';
import { PortalShell } from '@/core/pages/portal/components/PortalShell';
import { TooltipProvider } from '@/components/ui/Tooltip';
import '@/core/styles/Globals.css';
import '@fontsource/baloo-2/400.css';
import '@fontsource/baloo-2/500.css';
import '@fontsource/baloo-2/600.css';
import '@fontsource/baloo-2/700.css';
import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'ORA | Portal do cliente',
  description: 'Acompanhe seus negócios e todas as etapas da sua conquista.',
};
type RootLayoutProps = Readonly<{ children: React.ReactNode }>;
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="pt-BR">
      <body>
        <TooltipProvider delayDuration={0}>
          <PortalProvider>
            <PortalShell>{children}</PortalShell>
          </PortalProvider>
        </TooltipProvider>
      </body>
    </html>
  );
}
