'use client';

import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/Dialog';
import type { RefObject } from 'react';
import { ConsultantDetails } from './ConsultantDetails';
type ConsultantSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  triggerRef: RefObject<HTMLButtonElement | null>;
  description: string;
};
export function ConsultantSheet({
  open,
  onOpenChange,
  triggerRef,
  description,
}: ConsultantSheetProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="consultant-sheet"
        onCloseAutoFocus={(event) => {
          event.preventDefault();
          triggerRef.current?.focus();
        }}
      >
        <DialogTitle className="consultant-sheet-title">Consultor responsável Exban</DialogTitle>
        <DialogDescription className="sr-only">{description}</DialogDescription>
        <ConsultantDetails />
      </DialogContent>
    </Dialog>
  );
}
