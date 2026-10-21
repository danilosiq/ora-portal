'use client';
import type { ReactNode } from 'react';
import { PortalContext, usePortalState } from '../hooks/UsePortal';

type PortalProviderProps = { children: ReactNode };
export function PortalProvider({ children }: PortalProviderProps) {
  const state = usePortalState();
  return <PortalContext.Provider value={state}>{children}</PortalContext.Provider>;
}
