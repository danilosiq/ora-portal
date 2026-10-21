# Migração para Tailwind

Estilos dos componentes, páginas e variantes responsivas migrados para utilitários Tailwind. Removidos `Portal.css`, `Theme.css` e o atributo `style` da identificação.

`src/core/styles/Globals.css` contém a entrada do Tailwind, os tokens de marca, defaults globais com `@apply` e as definições das animações. Não contém seletores de componentes. Grupos compartilhados de utilitários ficam em `src/core/utils/Presentation.ts`; composições usam `cn()` para resolver classes conflitantes.

O fundo compartilhado foi movido para `public/LoginBackground.png`. O conteúdo binário foi conferido por SHA-256 antes da remoção da cópia duplicada.

## Verificação

- `yarn fullcheck`: arquitetura, Prettier, TypeScript e build de produção.
- Identificação: máscara/validação, SMS/e-mail, código, retorno, sequência das animações, fundo estável e preferência de movimento reduzido.
- Listagem: fade/slide, toggle, ordem dos campos, pesquisa preservada e ajuste ao mobile.
- Fluxos completos: tooltip, vínculos Google simulados, abas, contatos, sheets, retorno de foco, aceites, ajustes e conclusão por negócio.
- Impressão: todas as quatro seções presentes ao imprimir a partir de qualquer aba, com somente a aba ativa visível na tela.
- Comparação de 27 estados em desktop/mobile com a referência anterior, usada para ajustar dimensões, alinhamentos e espaçamentos. O login preserva a coluna à esquerda a partir de 761px.

Evidências temporárias da sessão: `/tmp/ora-tailwind-final-visual/report.json`, `/tmp/playwright-test-ora-identification.js`, `/tmp/playwright-test-ora-layout-motion.js`, `/tmp/playwright-test-ora-tailwind-flows.js` e `/tmp/playwright-test-ora-print.js`.

O guard de arquitetura rejeita novas folhas de estilos, seletores de componentes na entrada global e atributos JSX `style`. Nenhuma dependência nova ou conexão com backend foi adicionada.
