# Confirmação de valores

## Problem Statement
O cliente precisa revisar os dados do negócio e solicitar correções antes de concluir a confirmação no protótipo.

## Out of Scope
Backend, autenticação real, envio de mensagens e persistência remota.

## Assumptions & Open Questions
| Assumption | Chosen default | Rationale |
| --- | --- | --- |
| Persistência | Memória da sessão da página, por negócio | Protótipo sem backend |
| Negócios concluídos | Sem aviso de ação pendente | Não pedir nova confirmação após conclusão |
| Ajustes | Texto obrigatório por etapa; enviar solicitações requer ao menos um ajuste | Evitar solicitações vazias |
| Google | Exibir convite uma vez após entrada; ocultação opcional no navegador | Reproduzir referência sem integração real |
Open questions: none

## User Stories
O cliente revisa participantes, valores e condições; aprova ou solicita ajuste e conclui a revisão.

Acceptance Criteria:
1. WHEN um negócio pendente é aberto, the portal SHALL mostrar aviso com ação Clique aqui e abrir a introdução do fluxo.
2. WHILE o aceite inicial estiver desmarcado, the portal SHALL impedir começar; após aceite SHALL exibir as quatro etapas em ordem.
3. WHEN solicitar correção nas três primeiras etapas, the portal SHALL exigir texto não vazio, preservar os ajustes por etapa e avançar após confirmar.
4. WHEN voltar a uma etapa anterior, the portal SHALL preservar ajustes e dados do negócio selecionado.
5. WHILE os quatro aceites finais não estiverem marcados, the portal SHALL impedir conclusão; com ajustes SHALL permitir finalizar com solicitações e impedir confirmar valores sem correção.
6. WHEN concluir, the portal SHALL mostrar sucesso simulado, atualizar o aviso daquele negócio e manter os demais negócios independentes.
7. The portal SHALL usar Baloo 2 local, textos maiores, cor secundária #FFEAD6 e PNGs fornecidos para consultor e marcas.
8. WHEN abrir convite Google, the portal SHALL mostrar Vincular, Fechar e Não mostrar isso novamente, mantendo vínculo simulado.

9. WHEN acessar detalhes em tela mobile, the portal SHALL mostrar o cartão compacto do consultor antes das abas e abrir um bottom sheet com foto, nome, telefone, e-mail e empresa.
10. WHEN fechar o bottom sheet por Escape ou botão fechar, the portal SHALL devolver o foco ao cartão do consultor.
11. WHEN acessar Meu perfil pela navbar ou Eu no mobile, the portal SHALL mostrar dados fictícios, total de 10 negócios e lista de contas Google com ações de vínculo e desvínculo simulado.
12. WHEN mudar de tela durante a sessão, the portal SHALL manter as contas vinculadas/desvinculadas e adaptar o conteúdo sem overflow horizontal em 360, 390, 768 e 1440 pixels.

## Requirement Traceability
| ID | Requirement | Status |
| --- | --- | --- |
| ORA-01 | Aviso e fluxo | verified |
| ORA-02 | Aceites, correções e conclusão | verified |
| ORA-03 | Fonte, cores, imagens e diálogo | verified |
| ORA-04 | Detalhes mobile e bottom sheet | verified |
| ORA-05 | Meu perfil e vínculos Google simulados | verified |

## Execution Plan
1. Compartilhar dados/componentes entre detalhes e confirmação; adicionar fluxo e aviso. Verificar: typecheck e cenários de navegação.
2. Aplicar fonte, imagens, tamanhos e diálogo Google. Verificar: fullcheck e navegador desktop/mobile.
3. Adicionar perfil e detalhes mobile com bottom sheet. Verificar: vínculo/desvínculo, retorno de foco, navegação e responsividade.

## Verification
Express: protótipo local sem alteração de dados reais. Gate: npm run fullcheck. Navegador: testar caminhos com e sem ajustes, bloqueios e independência entre negócios.
Sem commits: esta pasta não é um repositório Git.
