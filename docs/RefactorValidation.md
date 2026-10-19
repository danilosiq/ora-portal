# Validação da refatoração

Refatoração orientada pelo `AGENTS.md`, preservando o layout, os dados fictícios e as interações existentes. Os três tokens de marca são definidos em `src/core/styles/Theme.css`; o hover primário usa o novo valor solicitado, `#B25500`.

## Comparação visual

Cópia de referência isolada em `/tmp/ora-before-refactor`, antes da reorganização. Para tornar essa cópia renderizável após a movimentação feita pelo usuário, somente seus assets foram disponibilizados nos caminhos públicos que o código antigo esperava.

Foram comparados 27 estados de tela em desktop e mobile, com fontes carregadas e movimento reduzido: login, seleção de canal, código, convite Google, cards, lista, perfil, detalhes, tabelas, introdução e etapas da confirmação, além do bottom sheet mobile.

- 24 capturas: zero pixels diferentes.
- 3 capturas de detalhes no desktop: 37 pixels diferentes em cada uma, menos de 0,003% da imagem; dimensões e posições dos elementos medidos iguais.
- Nenhuma mudança de layout identificada nas capturas. A medição intermediária do login mobile variou menos de um pixel antes da captura; a comparação final dessa imagem foi idêntica.

Evidência local: `/tmp/ora-refactor-visual/report.json` e capturas em `/tmp/ora-refactor-visual/`. São artefatos temporários da sessão.

## Verificação de comportamento

Chromium visível via Playwright:

- `/tmp/playwright-test-ora-identification.js`: canais SMS/e-mail, máscara, validação, retorno, ordem de saída/entrada das animações, fundo estável e movimento reduzido.
- `/tmp/playwright-test-ora-layout-motion.js`: ordem dos itens, transição cards/lista, pesquisa preservada, botão sem fundo selecionado e responsividade.
- `/tmp/ora-refactor-flows.cjs`: tooltip Radix, busca vazia, perfil, vínculo/desvínculo simulado, abas, contatos, bottom sheets com retorno de foco, aceites obrigatórios e conclusão com e sem ajustes em negócios independentes.

Todos concluíram com sucesso. Nenhuma requisição externa ou erro de página no teste completo.

## Regras verificáveis

- `scripts/CheckArchitecture.mjs`: caminhos, props nomeadas, separação dos primitivos, hooks sem JSX, ausência de transporte em componentes e tokens obrigatórios.
- TypeScript: `strict`, `noUnusedLocals` e `noUnusedParameters` habilitados.
- Prettier: configuração versionada; checagem incorporada ao `fullcheck`.
- Build Next.js: execução de produção sem ignorar erros de tipos.

Sem services ou conexões de backend. Axios, TanStack Query e date-fns foram apenas instalados. A referência anterior permanece isolada e não foi publicada.
