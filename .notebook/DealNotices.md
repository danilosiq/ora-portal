# Avisos e ajustes do negócio

Entry: `DealDetailsPage.tsx` renderiza `DealTimeline` e, imediatamente abaixo, `DealNotifications`.

- `src/core/components/Notice.tsx`: variantes `pending`, `danger` e `success`; tokens de cor no setup Tailwind em `Globals.css`. Sem CSS de componentes.
- `DealNotifications.tsx`: no máximo dois avisos: descrição da etapa e um contexto (pedido de ação, espera, ajuste de outro participante ou confirmação). Ajuste próprio aparece só em Dados gerais. Ajuste em tratamento ou espera substitui o pedido de ação.
- `BusinessProgress.ts`: timeline e texto informativo usam a mesma etapa. IDs 1 e 7 representam processos concluídos nos mocks.
- `BusinessAdjustments.ts`: o resultado da confirmação prevalece sobre os exemplos. Confirmação sem ajustes elimina a solicitação fictícia; resultado com ajustes preserva mensagens e etapas.
- `AdjustmentNotice.tsx`: card verde detalhado em Dados gerais com a mesma base visual de BusinessOverview; ícone sem compressão. Diferencia pedido do cliente ou de outro participante e preserva quebras de linha.
- Exemplos em `BusinessData.ts`: ID 0 tem pedido do cliente, ID 3 tem pedido de outro participante e ID 4 tem aviso de espera.
- O fluxo utiliza apenas a nomenclatura ajuste. Botões de exportação foram removidos; o suporte à impressão nativa das quatro abas permanece.

Updated: 2026-10-20

Testes: regras dos avisos em tests/DealNotificationsTest.tsx; padrão visual em tests/AdjustmentNoticeTest.tsx; suíte completa integrada ao fullcheck via JestConfig.mjs.
