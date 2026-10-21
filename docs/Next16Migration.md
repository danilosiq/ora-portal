# Next.js 16

Migração de Next.js 15.5.28 para 16.4.2, avaliada primeiro em uma cópia isolada.
A versão está fixada no package.json. Nenhum arquivo de src foi alterado;
pastas, rotas, componentes, estilos, assets e estado local foram preservados.

## Alterações necessárias

- package.json e yarn.lock: Next 16.4.2 e suas dependências transitivas.
  React, Tailwind, Radix, shadcn e demais dependências diretas não foram atualizados.
- tsconfig.json: JSX com react-jsx e inclusão dos tipos de desenvolvimento gerados
  pelo Next 16, incluindo o diretório customizado .next-dev/dev/types.
- next-env.d.ts: atualizado automaticamente pelo Next; não editar manualmente.
- next.config.ts: agentRules desativado para impedir que next dev acrescente
  instruções ao AGENTS.md do projeto.
- tests/RouteCompatibilityTest.tsx: regressão das rotas com params assíncronos,
  redirecionamento inicial e identificadores inválidos.

O Node 22.23.1 da .nvmrc já atende ao requisito do Next 16.
O bundler passa a ser Turbopack, padrão da versão 16. Não foi necessário
configurar Webpack nem modificar componentes. O projeto não utiliza middleware,
APIs de request síncronas ou cache de backend que exijam migração.

As verificações de arquitetura, formatação e TypeScript continuam explícitas no
yarn fullcheck. O projeto não dependia de next lint.

## Verificação

- Next 16: suíte com 110 testes, arquitetura, formatação, TypeScript e build.
- Comparação visual: 61 pares de estados em desktop de 1440 px e mobile de
  390 px, todos idênticos pixel a pixel e com geometria igual.
- Fluxos: CPF, canal, código, diálogo Google, cards/lista, pesquisa, perfil,
  contatos, abas, ajustes, confirmação sem ajustes, histórico e respostas 404.
- next dev: rotas e interação verificadas em http://localhost:3047 durante
  a avaliação; o AGENTS.md permaneceu inalterado.
- Volta para Next 15.5.28 testada na cópia isolada, com instalação imutável,
  build e os mesmos 110 testes.
- Resumo visual persistido em Next16VisualValidation.json. Capturas e logs da
  avaliação ficam temporariamente em /tmp/ora-next16-visual e /tmp/ora-next16-*.

A comparação comprova os estados exercitados no Chromium. Não equivale a testar
todos os dispositivos, navegadores ou condições possíveis.

## Reverter

Encerre o servidor local e execute na raiz:

```bash
git apply --check docs/Next16Rollback.patch
git apply docs/Next16Rollback.patch
yarn install --immutable
yarn build
yarn fullcheck
```

O patch restaura apenas package.json, yarn.lock, next.config.ts, tsconfig.json
e next-env.d.ts ao estado exato anterior à migração. Ele não utiliza git reset,
não depende do HEAD e preserva as alterações locais anteriores nesta sessão.
Os novos testes de rotas funcionam nas duas versões e podem permanecer.

O build antes do fullcheck regenera os tipos da versão restaurada. Se a checagem
do patch falhar após outras mudanças nesses arquivos, não force sua aplicação:
revise os trechos em conflito. O patch é específico desta migração.

## Referências

- [Guia oficial de atualização para Next 16](https://nextjs.org/docs/app/guides/upgrading/version-16).
- Documentação correspondente à versão instalada: node_modules/next/dist/docs/.
