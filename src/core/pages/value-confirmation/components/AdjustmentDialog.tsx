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
      <DialogContent className="adjustment-dialog [&>form]:mt-6 [&_label]:mb-[7px] [&_label]:block [&_label]:text-[16px] [&_textarea]:max-h-[40svh] [&_textarea]:min-h-[130px] [&_textarea]:w-full [&_textarea]:resize-y [&_textarea]:rounded-[5px] [&_textarea]:border [&_textarea]:border-[#aaaeb9] [&_textarea]:p-3 [&_textarea]:text-[17px] [&_textarea:focus]:border-primary [&_textarea:focus]:outline [&_textarea:focus]:outline-1 [&_textarea:focus]:outline-primary">
        <DialogTitle className="dialog-title mt-3 mb-4 flex items-center gap-[9px] text-[26px] leading-[1.4] font-normal text-[#ef3a3a] max-[460px]:text-[23px]">
          <CircleHelp size={23} /> Solicitação de ajuste
        </DialogTitle>
        <DialogDescription className="dialog-description text-[17px] leading-[1.65] text-[#8a909a]">
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
          <span className="character-count block text-right text-[12px] text-[#9197a1]">
            {draft.length}/2000
          </span>
          {error && (
            <p id="adjustment-error" className="error mt-4 text-[15px] text-red-600" role="alert">
              {error}
            </p>
          )}
          <div className="dialog-actions mt-[25px] flex flex-wrap items-center justify-end gap-[10px] [&>button]:text-[16px] max-[460px]:flex-col-reverse max-[460px]:items-stretch max-[460px]:[&>button]:w-full max-[460px]:[&>button]:text-[15px]">
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
