# Portal ORA

Protótipo local em Next.js (App Router), React, TypeScript, Tailwind CSS e componentes shadcn/ui (Button e Dialog com Radix).

## Executar

Requer Node.js 20.9 ou superior e npm.

```bash
source ~/.nvm/nvm.sh
nvm use
npm install
npm run dev
```

Abra http://localhost:3000.

## Verificar

```bash
npm run fullcheck
```

## Fluxos

- Informe 11 dígitos no CPF. Não há consulta nem validação cadastral; use dados fictícios.
- O envio para `exemplo@exmplo.com` é simulado. Qualquer código de quatro dígitos permite acessar.
- Pesquise entre 10 negócios e clique em um cartão para abrir os detalhes.
- O menu tem expansão animada e abre informações, ajuda e vínculo fictício com Google.
- Os detalhes possuem quatro abas. A exportação abre a impressão do navegador: escolha “Salvar como PDF” para exportar a aba visível.
- Na confirmação de valores, revise as quatro etapas, solicite ajustes e marque os aceites para concluir. Nenhuma informação é enviada.
- No mobile, o cartão do consultor abre um bottom sheet; a barra inferior permite acessar negócios, informações, ajuda e perfil.
- Meu perfil exibe o total de negócios e permite vincular/desvincular contas Google fictícias.
- Layout responsivo, navegação por teclado e suporte a movimento reduzido.

Sem backend, envio de e-mail, autenticação ou integração Google. Os dados são fictícios e mantidos somente em memória; recarregar a página reinicia a demonstração. Somente a preferência “Não mostrar isso novamente” do convite Google é salva no navegador. O cache de desenvolvimento usa `.next-dev/`, separado do build de produção em `.next/`. A imagem de fundo fornecida está em `public/login-background.png`.
