# AGENTS.md

Este arquivo registra os combinados do projeto para reutilização nos próximos chats.

---

## Objetivo

Este repositório é o frontend do do portal ORA, responsável pela interface de acesso aos negócios, fluxo de confirmação de valores e acesso aos microsserviços.

---

## Princípios arquiteturais

- Utilizar organização modular por pages
- Separar lógica de UI, estado, serviços e tipos
- Não misturar regras de interface com comunicação de API
- Não chamar Axios diretamente dentro de componentes
- Centralizar chamadas HTTP em `services`
- Hooks devem concentrar lógica reutilizável
- Componentes próprios, globais e reutilizáveis devem ficar em `src/core/components`
- Componentes específicos devem ficar dentro da própria page
- `src/components/ui` é reservado exclusivamente aos componentes nativos instalados pelo shadCn
- Wrappers, adaptações e derivações de componentes shadCn devem ficar em `src/core/components`
- Reutilizar componentes existentes antes de criar novos

---

## Regras e restrições gerais

- Não alterar estrutura de pastas, contratos ou arquivos existentes sem solicitação
- Não criar código fora do escopo solicitado
- Não implementar funcionalidades não pedidas explicitamente
- Em caso de dúvida, perguntar antes de implementar
- Não introduzir novas dependências externas sem necessidade explícita
- Não duplicar lógica existente
- Não criar código morto ou incompleto
- Não deixar `console.log` em código final
- Não deixar estados, imports ou componentes sem uso
- Não quebrar compatibilidade com APIs existentes
- Toda entrada de usuário deve possuir validação
- Toda chamada assíncrona deve tratar loading e erro
- Toda feature deve considerar estados vazios, erro e carregamento
- Toda implementação visual deve seguir as cores, fontes e padrões definidos no setup
- Todo o uso de datas e formatações, deverá ser usado `date-fns`


---

## Stack

- NextJs
- TypeScript
- TailwindCSS
- Axios
- Tanstack Query
- Lucide Icons
- shadCn
- date-fns

---

## Estrutura

```text
/page
  /api
  /rotas...
  index.tsx
  layout.tsx

/src
  /core
    /components      # componentes próprios globais e reutilizáveis
        /ui              # somente componentes nativos do shadCn
    /pages
        /components     #caso precise fragmentar um componente que só aquela pagina utilizará
        /utils      #caso precise fragmentar uma função utils que só aquela pagina utilizará
    /hooks
    /services
    /@types
    /utils
    /styles
```

## Componentes base do shadcn/ui

Os componentes instalados pelo shadcn/ui devem permanecer em:

```text
src/components/ui/
```

Esses componentes constituem a base do Design System da aplicação e podem ser modificados diretamente quando a alteração representar uma capacidade genérica, reutilizável e independente das regras de negócio.

Exemplos:
- Adicionar `loading` ao Button.
- Adicionar variantes ou tamanhos.
- Ajustar estilos e comportamentos globais.
- Estender propriedades genéricas de componentes existentes.

**Não criar wrappers apenas para adicionar propriedades ou comportamentos genéricos que podem ser incorporados ao componente base.**

### Componentes próprios e derivados

Componentes que representam composições, abstrações ou comportamentos específicos da aplicação devem ser criados em:

```text
src/core/components/
```

Esses componentes devem reutilizar os primitivos existentes em `@/components/ui/`, evitando duplicação de implementação.

Exemplos:
- `ConfirmDialog` — composição de Dialog e Button.
- `SearchInput` — Input com comportamento de pesquisa.
- `UserSelect` — seleção de usuários com regras específicas.

### Critério de decisão

Antes de criar ou modificar um componente:

1. Verificar se a funcionalidade é genérica e aplicável ao componente base. Nesse caso, estender o componente em `/ui`.
2. Verificar se representa uma composição reutilizável ou comportamento próprio da aplicação. Nesse caso, criar em `/core/components`.
3. Evitar wrappers sem benefício arquitetural claro.
4. Preservar compatibilidade com a API existente e evitar alterações que introduzam regras de negócio nos componentes base.

# Componentes específicos de feature

Componentes usados somente por uma feature devem permanecer dentro da própria
feature, mesmo quando utilizarem ou derivarem componentes shadCn.

```text
src/core/pages/home/components
```

Não promover um componente específico para `src/core/components` antes que ele
seja realmente compartilhado.

## Padronização de código

nesta sessão, trabalharemos com a tomada de decisão e padronização de código

### Props

1. Toda pagina,componente ou função, deve seguir com uma padronagem de nomenclatura terminada com Props, como
- ButtonProps
- FooterProps

2. As props deve ser tipadas, segue exemplo
```tsx
type DealCardProps = {
  title: string;
};

export function DealCard({ title }: DealCardProps) {
  return (
    <Column className="gap-3 rounded-xl border border-gray-200 p-4">
      <Title>{title}</Title>
      <Button>Abrir</Button>
    </Column>
  );
}
```
### Componentes

Um componente deve fazer apenas uma coisa.

Se o componente estiver grande demais, separar em componentes menores.,

Exemplo:

```text
Footer
HeaderButton
LanguageSelect
SubmitButton
```

---

#### Componentes e hooks

Componentes podem consumir hooks.

Exemplo:

```tsx
export function SubmitConfirmValuesStep() {
  const { mutateConfirm, isPending } = useConfirmDeal();

  return (
    <Column className="gap-4">
      ...
      <Button disabled={isPending}>Confirmar</Button>
    </Column>
  );
}
```

Componentes não devem consumir services diretamente.

Evitar:

```tsx
await feedback.create(...)
```

---

#### Estados obrigatórios

Quando aplicável, componentes devem tratar:

- loading
- erro
- estado vazio
- sucesso
- disabled

Exemplo:

```tsx
<Button disabled={isPending}>{isPending ? "Criando..." : "Criar função"}</Button>
```

---

#### Acessibilidade

Componentes devem possuir o mínimo necessário de acessibilidade.

- Inputs devem ter label.
- Botões devem ter texto claro e compatibilidade para tooltips.
- Estados disabled devem ser visíveis.
- Modais devem ter título.
- Ícones sozinhos devem possuir descrição acessível quando necessário com tooltip.

---

### hooks
O objetivo é manter os componentes limpos, centralizar lógica reutilizável e padronizar chamadas HTTP, mutations e queries.

#### Objetivo

Hooks devem concentrar lógica reutilizável da aplicação.

Eles podem ser usados para:

- buscar dados
- executar mutations
- encapsular regras de UI reutilizáveis
- consumir services
- integrar estado global com componentes

Hooks **não** devem conter JSX.

---

#### Regras gerais

- Todo hook deve começar com `use`.
- Cada hook deve possuir responsabilidade única.
- Hooks HTTP devem utilizar TanStack Query.
- Hooks HTTP devem consumir `services`.
- Hooks não devem chamar Axios diretamente.
- Hooks devem retornar dados e estados necessários para a UI.
- Não duplicar hooks existentes.
- Não criar hooks genéricos sem necessidade real.
- Não colocar regra visual complexa dentro de componentes quando puder ser extraída para hook.

#### Exemplo de código

- Hooks de Query
Usar `useQuery` para buscar dados.

Retorno esperado:

- data
- isLoading
- isFetching
- isError
- error
- refetch

Exemplo:

```ts
export function useDealById(dealId: string) {
  const query = useQuery({
    queryKey: dealQueryKeys.detail(dealId),
    queryFn: () => dealsService.findById(dealId),
    enabled: !!dealId,
  });

  return {
    deals: query.data,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}
```

---

-  Hooks de Mutation

Usar `useMutation` para criar, atualizar, remover ou executar ações.

Retorno esperado:

- função de ação com nome claro
- data
- isPending
- isSuccess
- isError
- error
- reset

Exemplo:

```ts
export function useSendConfirmationValue() {
  const mutation = useMutation({
    mutationFn: dealConfirmationValueService.create,
  });

  return {
    confirmationValue: mutation.mutate,
    deal: mutation.data,
    isPending: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
    reset: mutation.reset,
  };
}
```
---

- Query Keys

Query keys devem ser centralizadas por domínio.

Exemplo:

```ts
export const dealQueryKeys = {
  all: ["deals"] as const,
  detail: (dealId: string) => ["deals", dealId] as const,
};
```

Uso:

```ts
useQuery({
  queryKey: dealQueryKeys.detail(dealId),
  queryFn: () => dealService.findById(dealId),
});
```

Evitar:

```ts
useQuery({
  queryKey: ["deal", dealId],
  queryFn: () => dealService.findById(dealId),
});
```

---

### Services

O objetivo é centralizar toda comunicação externa da aplicação, mantendo componentes e hooks desacoplados da infraestrutura.

Os services são responsáveis por toda comunicação externa da aplicação.

Eles podem realizar:

- chamadas HTTP
- comunicação Socket.IO
- integração com APIs externas

Os services **não** devem conter lógica de interface ou regras de negócio.

#### Regras gerais

- Toda chamada HTTP deve passar por um service.
- Utilizar Axios para comunicação HTTP.
- Não realizar requests diretamente em componentes.
- Não realizar requests diretamente em hooks.
- Não utilizar `fetch`.
- Cada domínio deve possuir seu próprio service.
- Services devem retornar apenas `response.data`.
- Não tratar loading dentro do service.
- Não exibir toast dentro do service.
- Não acessar componentes React dentro do service.

---

#### Cliente Axios

Toda comunicação HTTP deve utilizar um client centralizado.

Exemplo:

```ts
import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});
```

Todos os services devem importar este client.

---

#### Estrutura dos services

Cada função representa uma ação da API.

Exemplo:

```ts
export async function getDeal(params: GetDealParams) {
  const response = await api.get(`/deals/${params.dealId}`);

  return response.data;
}
```

#### Passagem de parâmetros

Utilizar objetos como parâmetro da função.

Correto:

```ts
type GetDealParams = {
  dealId: string;
};

export async function getDeals(params: GetDealParams) {
  const response = await api.get(`/deals/${params.dealId}`);

  return response.data;
}
```

Evitar:

```ts
export async function getDeals(dealId: string);
```

Objetos facilitam evolução futura da API.

---

#### Tratamento de erro

Os services **não** devem capturar erros apenas para repassá-los.

Evitar:

```ts
try {
    ...
} catch (error) {
    throw error
}
```

Permitir que o erro seja tratado pelo TanStack Query.

---

#### Retorno

Sempre retornar:

```ts
return response.data;
```

Evitar:

```ts
return response;
```

---

### Nomenclatura de arquivo

todos os arquivos, devemos usar PascalCase

---

### Pages

Objetivo: Garantir que todas as paginas sigam o mesmo padrão visual, estrutural e arquitetural.

#### Regras gerais

- Evitar utilizar tags HTML diretamente em componentes de pages
- utilizar `Sreen` no final de cada pagina
- Utilizar apenas TailwindCSS para estilização
- Não criar arquivos `.css`, `.scss` ou estilos inline sem solicitação explícita
- Não utilizar styled-components, CSS Modules ou outras soluções de estilo
- Não adicionar bibliotecas visuais novas sem aprovação
- Reutilizar componentes globais existentes antes de criar componentes novos
- Componentes específicos da pagina devem ficar dentro da própria pagina
- Manter componentes pequenos e com responsabilidade única
