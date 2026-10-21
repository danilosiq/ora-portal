# Estado e navegação

Entry: `src/app/page.tsx` redireciona para `/login`. Os arquivos `src/app/**/page.tsx` encaminham para os componentes `*Page` em `src/core/pages`.

- `PortalProvider` em `src/core/pages/portal/components/PortalProvider.tsx` é montado no layout raiz. `usePortalState()` mantém contas fictícias, resultados por negócio e o hook `useDealsList()` entre as rotas.
- `usePortal()` consome o contexto; `UsePortal.ts` utiliza `useRouter()` e `usePathname()` para navegação e estado ativo do menu. Não mantém uma página selecionada em estado local.
- `PortalShell.tsx` apresenta navbar, rodapé e navegação inferior. Login e confirmação recebem somente os próprios conteúdos.
- Caminhos e validação de IDs são centralizados em `src/core/utils/PortalRoutes.ts`. Os IDs válidos são os índices de 0 a 9 dos mocks; as duas rotas dinâmicas chamam `notFound()` para entradas inválidas.
- `DealDetailsPage` e `ValueConfirmationPage` são identificados pela chave do negócio. Abas, rascunhos e aceites pertencem à instância de cada página; o resultado concluído permanece no contexto ao navegar para outra rota.
- Pesquisa, modo lista/cards, contas e resultados sobrevivem à navegação cliente. Recarregar reinicia os dados simulados. A preferência de ocultar o convite Google é a única informação persistida no navegador.
- Sobre o ORA tem rota `/about`. SAC foi removido desta versão.

Updated: 2026-10-20
