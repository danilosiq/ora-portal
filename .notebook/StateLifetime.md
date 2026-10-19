# Estado e navegação

Entry: `src/app/page.tsx` → `src/core/pages/portal/PortalPage.tsx:PortalPage()`.

- `usePortal()` em `src/core/pages/portal/hooks/UsePortal.ts`: sessão demonstrativa, navegação, contas Google e resultados por negócio.
- `useDealsList()` é chamado por `PortalPage()`, acima da troca de páginas. Pesquisa e disposição sobrevivem à ida para detalhes/perfil. Mover o hook para o componente da lista reiniciaria esse estado.
- `DealDetailsPage` usa a chave do negócio; abas, título expandido e sheets pertencem ao hook da própria página.
- `ValueConfirmation` mantém o rascunho em `useValueConfirmation()`; ao concluir, o resultado é salvo no hook do portal para atualizar somente aquele negócio.
- A navegação continua no estado local da entrada `/`; não há autenticação real nem transporte HTTP.
- A preferência opcional do convite Google é o único estado persistido no navegador.

Updated: 2026-10-19
