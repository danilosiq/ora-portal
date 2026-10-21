# Portal ORA

Frontend demonstrativo em Next.js App Router, React, TypeScript, Tailwind CSS e shadcn/ui com Radix. O layout, os fluxos e as animações são preservados pela organização modular.

## Executar

Use a versão de Node.js definida em `.nvmrc` e o Yarn definido no `packageManager`:

```bash
source ~/.nvm/nvm.sh
nvm use
corepack enable
yarn install --immutable
yarn dev
```

Abra http://localhost:3000. O cache de desenvolvimento fica em `.next-dev/` e o build de produção em `.next/`.

## Verificar

```bash
yarn fullcheck
```

A checagem valida o gerenciador de pacotes, arquitetura, formatação, TypeScript, toda a suíte Jest com cobertura e build. O TypeScript também bloqueia variáveis, parâmetros e imports sem uso.

```bash
yarn check:architecture
yarn format
yarn format:check
yarn typecheck
yarn test
yarn test:watch
yarn test:coverage
```

## Organização

| Local                 | Responsabilidade                                        |
| --------------------- | ------------------------------------------------------- |
| `src/app`             | Rotas e layout do Next.js                             |
| `src/components/ui`   | Primitivos nativos shadcn/ui: Button, Dialog e Tooltip  |
| `src/core/components` | Composições compartilhadas, marcas, tabelas e contatos  |
| `src/core/pages`      | Páginas com componentes, hooks e utilidades específicos |
| `src/core/@types`     | Tipos de domínio e estado compartilhados                |
| `src/core/mocks`      | Dados fictícios da demonstração                         |
| `src/core/utils`      | Utilidades compartilhadas                               |
| `src/core/styles`     | Entrada Tailwind, tokens e animações                             |
| `src/core/assets`     | Imagens e ícones importados pelo código                 |

O alias `@/` aponta para `src/`. A configuração do shadcn está em `components.json`. Novos componentes específicos ficam dentro da própria página; composições só são promovidas para `core/components` quando compartilhadas.

## Cores

A fonte de verdade está em `src/core/styles/Globals.css`:

| Token           | Cor       |
| --------------- | --------- |
| `primary`       | `#FF7A00` |
| `primary-hover` | `#B25500` |
| `primary-light` | `#FFEAD6` |

Use os tokens nos utilitários Tailwind (`bg-primary`, `hover:bg-primary-hover`, `bg-primary-light`). `primary-ligh` é um alias de compatibilidade para `primary-light`. As cores semânticas existentes de erro, sucesso e status foram preservadas.

A fonte Baloo 2 é distribuída localmente. Marcas e fotos usam imports de `src/core/assets`; o fundo compartilhado fica em `public/LoginBackground.png`. Estilos de componentes usam classes Tailwind. `Globals.css` contém somente a entrada do Tailwind, tokens, defaults globais com `@apply` e keyframes. Não há folhas CSS de componentes nem estilos inline.

## Rotas

Os arquivos `page.tsx` de `src/app` encaminham para componentes com sufixo `Page` em `src/core/pages`.

| URL | Página |
| --- | --- |
| `/` | Redireciona para `/login` |
| `/login` | Identificação simulada |
| `/myDeals` | Meus negócios |
| `/myDeals/[id]` | Detalhes do negócio |
| `/myDeals/[id]/confirmValues` | Confirmação de valores |
| `/user` | Meu perfil |
| `/about` | Sobre o ORA |

Os IDs fictícios vão de 0 a 9. IDs inválidos retornam 404. O SAC não faz parte desta versão.

A navegação usa o App Router e funciona com acesso direto, recarregamento e voltar/avançar. `PortalProvider`, no layout raiz, mantém os estados compartilhados durante a navegação; não há autenticação real nem bloqueio de acesso às páginas.

## Fluxos simulados

- CPF com 11 dígitos → seleção de SMS/e-mail → qualquer código de quatro dígitos. Use somente dados fictícios.
- Entrada demonstrativa com Google, sem autenticação real.
- Dez negócios, pesquisa e alternância animada entre cards e lista compacta.
- Detalhes com abas, contatos e avisos abaixo das etapas: Pending, Danger e Success.
- Solicitações de ajuste com card verde e mensagem completa em Dados gerais.
- Botão de exportação removido; a impressão nativa do navegador continua incluindo todas as abas.
- Confirmação com quatro etapas, solicitações de ajuste e aceites obrigatórios.
- Perfil com vínculos e desvínculos fictícios de contas Google.
- Navegação inferior e bottom sheets de contatos no mobile.

O estado fica em memória. Somente a preferência de ocultar o convite Google usa armazenamento local. Recarregar reinicia a demonstração.

Axios, TanStack Query e date-fns estão instalados conforme o `AGENTS.md`. Não há services, endpoints, providers de dados ou conexões de backend. Essas bibliotecas serão integradas quando houver contratos reais.

A validação da refatoração está em `docs/RefactorValidation.md`.

## Testes automatizados

A suíte usa Jest, React Testing Library e jsdom, com a integração `next/jest`.
Os arquivos ficam em `tests/`, com nomes PascalCase terminados em `Test.ts` ou
`Test.tsx`. As regras para novas implementações estão na seção Testes do
`AGENTS.md`.

Os testes cobrem identificação simulada (CPF, canal, código e Google),
pesquisa e alternância de visualização, navegação, perfil e contas vinculadas,
contatos, abas, tooltip, avisos e confirmação de valores com ajustes.
Nenhum cenário depende de backend. Navegação e APIs ausentes no jsdom são
simuladas; componentes e hooks do fluxo são executados juntos nos testes de
integração.

`yarn test:coverage` gera o relatório em `coverage/lcov-report/index.html`
e o resumo em `coverage/coverage-summary.json`. O relatório considera todo o
código de `src/core`, exceto tipos e mocks. Layout, dimensões e responsividade
precisam de validação complementar no navegador.

Os avisos abaixo das etapas são limitados a dois: informação da etapa e um
aviso contextual. Ajustes próprios ficam somente no card de Dados gerais.
Solicitações de outro participante aparecem uma única vez no topo e substituem
o pedido de ação. A espera pelo banco também substitui o pedido de ação.

## Gerenciador de pacotes

Yarn é obrigatório. A versão exata está declarada em `packageManager` no
`package.json`; o Corepack seleciona essa versão ao executar `yarn` na raiz.
A configuração `.yarnrc.yml` mantém a instalação em `node_modules`.

Use `yarn install --immutable` após clonar e em verificações automatizadas.
Para adicionar ou remover dependências, use `yarn add`, `yarn add -D` e
`yarn remove`, versionando o `yarn.lock` atualizado. Para scripts, use
`yarn dev`, `yarn test` e `yarn fullcheck`.

O script `check:package-manager` valida o gerenciador e a versão usados.
Ele integra o `fullcheck` e o `preinstall` dos gerenciadores que executam esse
lifecycle. Os testes em `tests/PackageManagerTest.ts` verificam a política,
os casos de rejeição e a ausência de lockfiles concorrentes.

## Next.js 16

O projeto usa Next.js 16.4.2 com Turbopack. A avaliação de compatibilidade,
os resultados e o procedimento de reversão para Next 15 estão em
[Next16Migration.md](docs/Next16Migration.md).
