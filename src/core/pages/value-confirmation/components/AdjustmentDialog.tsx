'use client';

import { Button } from '@/components/ui/Button';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/Dialog';
import { ArrowRight, CircleHelp } from 'lucide-react';

import type { ConfirmationState } from '../hooks/UseValueConfirmation';
import { steps } from '../utils/Constants';
type AdjustmentDialogProps = { state: ConfirmationState };
export function AdjustmentDialog({ state }: AdjustmentDialogProps) {
  const { submitAdjustment, updateDraft, step, adjustmentOpen, setAdjustmentOpen, draft, error } =
    state;
  return (
    <Dialog open={adjustmentOpen} onOpenChange={setAdjustmentOpen}>
      <DialogContent className="adjustment-dialog">
        <DialogTitle className="dialog-title">
          <CircleHelp size={23} /> Solicitação de ajuste
        </DialogTitle>
        <DialogDescription className="dialog-description">
          Etapa: {steps[step]}. Descreva o que deve ser corrigido e qual é a informação correta.
        </DialogDescription>
        <form onSubmit={submitAdjustment}>
          <label htmlFor="adjustment-text">O que precisa ser corrigido?</label>
          <textarea
            id="adjustment-text"
            placeholder="Escreva aqui sua solicitação…"
            rows={5}
            maxLength={2000}
            value={draft}
            aria-invalid={!!error}
            aria-describedby={error ? 'adjustment-error' : undefined}
            onChange={(event) => updateDraft(event.target.value)}
          />
          <span className="character-count">{draft.length}/2000</span>
          {error && (
            <p id="adjustment-error" className="error" role="alert">
              {error}
            </p>
          )}
          <div className="dialog-actions">
            <Button type="button" variant="ghost" onClick={() => setAdjustmentOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit">
              Confirmar e prosseguir <ArrowRight size={17} />
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
