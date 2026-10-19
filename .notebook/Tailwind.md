# Estilização Tailwind

- `src/core/styles/Globals.css`: entrada Tailwind, tokens, defaults globais via `@apply` e keyframes. Não adicionar seletores de componentes.
- `src/core/utils/Presentation.ts`: grupos de utilitários compartilhados para painéis, contatos e aceites; composições usam `cn()` para resolver utilitários conflitantes.
- Variantes como `[.is-list_&]` e `[.review-content_&]` preservam os contextos de estado e a especificidade. Os marcadores semânticos são usados por variantes e testes; não dependem de CSS próprio.
- `IdentificationPage` mantém a coluna à esquerda a partir de 761px. `UseIdentification.ts` anima a altura medida com a Web Animations API, sem atributo `style`.
- `DealTabs.tsx`: quatro painéis montados, só o selecionado visível na tela; todos aparecem na impressão com títulos. Não voltar a renderizar somente a aba ativa.
- Fundo compartilhado em `public/LoginBackground.png`; fotos e marcas continuam em `core/assets`.
- `scripts/CheckArchitecture.mjs` rejeita estilos inline e folhas CSS adicionais.

Updated: 2026-10-19
