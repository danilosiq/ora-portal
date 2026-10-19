'use client';
import { useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Check, CircleCheck, CircleHelp, MessageSquareWarning, Pencil, Wrench } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { BusinessOverview, DataTable, Logo } from '@/components/business-content';
import { financingRows, notices, properties, purchaseRows, type ReviewResult } from '@/lib/business-data';

const steps = ['Participantes', 'Valores da compra e venda', 'Financiamento e despesas', 'Avisos finais'];
const headings = ['Visão geral do negócio', 'Valores de compra e venda e forma de pagamento', 'Financiamento e despesas', 'Avisos finais'];
const questions = ['Os participantes e os dados do imóvel estão corretos?', 'Os valores acima estão corretos?', 'Os valores e informações acima estão corretos?'];

export function ValueConfirmation({ businessId, onExit, onComplete }: { businessId: number; onExit: () => void; onComplete: (result: ReviewResult) => void }) {
  const [step, setStep] = useState(-1);
  const [initialAccepted, setInitialAccepted] = useState(false);
  const [accepted, setAccepted] = useState(notices.map(() => false));
  const [adjustments, setAdjustments] = useState(['', '', '']);
  const [adjustmentOpen, setAdjustmentOpen] = useState(false);
  const [draft, setDraft] = useState('');
  const [error, setError] = useState('');
  const [result, setResult] = useState<ReviewResult | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const hasAdjustments = adjustments.some(text => text.trim());
  const allAccepted = accepted.every(Boolean);

  function goTo(next: number) {
    setStep(next);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    requestAnimationFrame(() => headingRef.current?.focus({ preventScroll: true }));
  }
  function openAdjustment() {
    setDraft(adjustments[step]);
    setError('');
    setAdjustmentOpen(true);
  }
  function finish(status: ReviewResult['status']) {
    if (!allAccepted || (status === 'confirmed' && hasAdjustments) || (status === 'adjustments' && !hasAdjustments)) return;
    const completed = { status, adjustments: [...adjustments] };
    onComplete(completed);
    setResult(completed);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return <main className="confirmation-page">
    <div className="confirmation-column">
      <header className="confirmation-header"><button className="review-exit" onClick={onExit}><ArrowLeft size={17} /> Voltar ao negócio</button><Logo /></header>
      {result ? <section className="review-success" role="status"><span className="success-icon"><CircleCheck size={48} /></span><h1>{result.status === 'confirmed' ? 'Valores confirmados!' : 'Solicitações de ajuste registradas!'}</h1><p>{result.status === 'confirmed' ? 'Você concluiu a revisão das informações do seu negócio.' : 'Suas solicitações foram reunidas para revisão do consultor.'}</p><div className="panel"><strong>{properties[businessId]}</strong>{result.status === 'adjustments' && <ul>{result.adjustments.map((text, i) => text && <li key={i}><strong>{steps[i]}</strong><p>{text}</p></li>)}</ul>}</div><p className="review-demo">Esta é uma simulação. Nenhuma informação foi enviada.</p><Button onClick={onExit}>Voltar ao negócio <ArrowRight size={18} /></Button></section> : <>
        {step >= 0 && <nav aria-label="Etapas da confirmação" className="review-stepper"><ol>{steps.map((label, index) => <li key={label} className={index <= step ? 'reached' : ''} aria-current={step === index ? 'step' : undefined}><button disabled={index > step} onClick={() => goTo(index)}><span>{index < step ? <Check size={15} /> : index + 1}</span><strong>{label}</strong></button></li>)}</ol></nav>}
        <section className={`review-body ${step === -1 ? 'review-intro' : ''}`}>
          <h1 ref={headingRef} tabIndex={-1}>{step === -1 ? 'Confirmação de valores' : headings[step]}</h1>
          {step === -1 ? <><div className="important-copy"><h2>IMPORTANTE</h2><p>Se identificar alguma <em>informação incorreta</em> ou precisar alterar qualquer condição da negociação, <em>solicite a correção nas etapas</em>. Não será possível fazer alterações após a emissão do contrato.</p></div><label className="review-checkbox"><input type="checkbox" checked={initialAccepted} onChange={e => setInitialAccepted(e.target.checked)} /><span>Afirmo que estou ciente da informação descrita acima.</span></label><Button className="begin-review" disabled={!initialAccepted} onClick={() => goTo(0)}>Começar <ArrowRight size={19} /></Button></> : <>
            <p className="review-business-name">{properties[businessId]}</p>
            {step > 0 && <p className="review-instruction">{step === 1 ? <><em>Confira se</em> o valor do imóvel e a composição do pagamento <em>estão corretos.</em></> : step === 2 ? <><em>Confira</em> as condições aprovadas para o <em>seu financiamento.</em></> : <><em>Leia atentamente</em> as informações abaixo antes de concluir sua confirmação.</>}</p>}
            <div className={`review-content ${step === 1 || step === 2 ? 'review-values' : ''}`} key={step}>
              {step === 0 ? <BusinessOverview businessId={businessId} showContact /> : step === 1 ? <DataTable rows={purchaseRows} /> : step === 2 ? <DataTable rows={financingRows} /> : <>
                {notices.map((notice, index) => <article className="panel review-notice" key={notice.title}><h2>{notice.title}</h2><p>{notice.text}</p><label className="review-checkbox"><input type="checkbox" checked={accepted[index]} onChange={e => setAccepted(accepted.map((value, i) => i === index ? e.target.checked : value))} /><span>Afirmo que estou ciente da informação descrita acima.</span></label></article>)}
                {hasAdjustments && <article className="panel adjustment-summary"><h2><MessageSquareWarning size={20} /> Solicitações de ajuste</h2>{adjustments.map((text, i) => text && <div key={i}><div className="adjustment-summary-title"><strong>{steps[i]}</strong><button onClick={() => goTo(i)}><Pencil size={14} /> Revisar</button></div><p>{text}</p></div>)}</article>}
              </>}
            </div>
            {step < 3 ? <><p className="review-question">{questions[step]}</p>{adjustments[step] && <div className="saved-adjustment" role="status"><MessageSquareWarning size={18} /><div><strong>Correção solicitada nesta etapa</strong><p>{adjustments[step]}</p></div><button onClick={() => setAdjustments(adjustments.map((text, i) => i === step ? '' : text))}>Remover</button></div>}<div className="review-actions"><Button variant="outline" className="request-correction" onClick={openAdjustment}>{adjustments[step] ? 'Editar correção' : 'Não, solicitar correção'} <MessageSquareWarning size={19} /></Button><Button onClick={() => goTo(step + 1)}>{adjustments[step] ? 'Continuar com a solicitação' : 'Sim, próximo'} <ArrowRight size={19} /></Button></div></> : <div className="review-finish"><p className="finish-hint">{!allAccepted ? 'Marque os quatro aceites acima para concluir.' : hasAdjustments ? 'Há correções solicitadas. Finalize com as solicitações para revisão.' : 'Tudo conferido? Você já pode confirmar os valores.'}</p><Button className="confirm-values" disabled={!allAccepted || hasAdjustments} onClick={() => finish('confirmed')}>Finalizar e confirmar valores <CircleCheck size={20} /></Button><Button disabled={!allAccepted || !hasAdjustments} onClick={() => finish('adjustments')}>Finalizar e enviar solicitações <Wrench size={19} /></Button></div>}
            <button className="review-previous" onClick={() => goTo(step - 1)}><ArrowLeft size={16} /> Etapa anterior</button>
          </>}
        </section>
      </>}
      <p className="review-demo">Portal demonstrativo · Dados fictícios</p>
    </div>
    <Dialog open={adjustmentOpen} onOpenChange={setAdjustmentOpen}><DialogContent className="adjustment-dialog"><DialogTitle className="dialog-title"><CircleHelp size={23} /> Solicitação de ajuste</DialogTitle><DialogDescription className="dialog-description">Etapa: {steps[step]}. Descreva o que deve ser corrigido e qual é a informação correta.</DialogDescription><form onSubmit={event => {event.preventDefault(); if (!draft.trim()) {setError('Descreva o ajuste antes de prosseguir.'); return;} setAdjustments(adjustments.map((text, i) => i === step ? draft.trim() : text));setAdjustmentOpen(false);goTo(step + 1);}}><label htmlFor="adjustment-text">O que precisa ser corrigido?</label><textarea id="adjustment-text" placeholder="Escreva aqui sua solicitação…" rows={5} maxLength={2000} value={draft} aria-invalid={!!error} aria-describedby={error ? 'adjustment-error' : undefined} onChange={event => {setDraft(event.target.value);setError('');}} /><span className="character-count">{draft.length}/2000</span>{error && <p id="adjustment-error" className="error" role="alert">{error}</p>}<div className="dialog-actions"><Button type="button" variant="ghost" onClick={() => setAdjustmentOpen(false)}>Cancelar</Button><Button type="submit">Confirmar e prosseguir <ArrowRight size={17} /></Button></div></form></DialogContent></Dialog>
  </main>;
}
