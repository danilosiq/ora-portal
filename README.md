# Portal ORA

Frontend demonstrativo em Next.js App Router, React, TypeScript, Tailwind CSS e shadcn/ui com Radix. O layout, os fluxos e as animações são preservados pela organização modular.

## Executar

Use a versão de Node.js definida em `.nvmrc`:

```bash
source ~/.nvm/nvm.sh
nvm use
npm ci
npm run dev
```

Abra http://localhost:3000. O cache de desenvolvimento fica em `.next-dev/` e o build de produção em `.next/`.

## Verificar

```bash
npm run fullcheck
```

A checagem executa as regras de arquitetura, formatação, TypeScript e build. O TypeScript também bloqueia variáveis, parâmetros e imports sem uso.

```bash
npm run check:architecture
npm run format
npm run format:check
npm run typecheck
```

## Organização

| Local                 | Responsabilidade                                        |
| --------------------- | ------------------------------------------------------- |
| `src/app`             | Entrada e layout do Next.js                             |
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

## Fluxos simulados

- CPF com 11 dígitos → seleção de SMS/e-mail → qualquer código de quatro dígitos. Use somente dados fictícios.
- Entrada demonstrativa com Google, sem autenticação real.
- Dez negócios, pesquisa e alternância animada entre cards e lista compacta.
- Detalhes com abas, contatos e exportação de todas as abas por impressão do navegador.
- Confirmação com quatro etapas, solicitações de ajuste e aceites obrigatórios.
- Perfil com vínculos e desvínculos fictícios de contas Google.
- Navegação inferior e bottom sheets de contatos no mobile.

O estado fica em memória. Somente a preferência de ocultar o convite Google usa armazenamento local. Recarregar reinicia a demonstração.

Axios, TanStack Query e date-fns estão instalados conforme o `AGENTS.md`. Não há services, endpoints, providers de dados ou conexões de backend. Essas bibliotecas serão integradas quando houver contratos reais.

A validação da refatoração está em `docs/RefactorValidation.md`.
