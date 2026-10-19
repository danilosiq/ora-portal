# Validation

**Result**: PASS

Verificação expressa do protótipo local, sem backend nem operações reais.

- `npm run fullcheck`: TypeScript e build Next.js concluídos, exit 0.
- Navegador Chromium visível, script `/tmp/playwright-test-ora.js`: exit 0, nenhum erro de página.
- Perfil: total 10, duas contas fictícias iniciais, desvínculo reduz a lista, vínculo simulado adiciona conta e navegação preserva a lista. Evidência: components/my-profile.tsx:24, components/my-profile.tsx:28, app/page.tsx:19, app/page.tsx:26.
- Responsividade do perfil verificada em 360, 390, 768 e 1440 px, sem overflow horizontal e com largura legível para o nome. Capturas desktop/mobile inspecionadas.
- Bottom sheet: cartão antes das abas, abertura com foto e contatos, fechamento por Escape e retorno de foco ao cartão. Evidência: app/page.tsx:17, app/page.tsx:36, components/consultant-details.tsx:4.
- Abas no mobile: financiamento mostra R$ 246.044,00.
- Confirmação com ajuste: aceite inicial obrigatório, texto vazio bloqueado, ajuste preservado ao voltar, quatro aceites finais obrigatórios, confirmação sem correção desabilitada quando há ajuste e status atualizado após concluir.
- Confirmação sem ajustes: conclusão com sucesso em outro negócio; envio de solicitações sem ajustes desabilitado. Evidência: components/value-confirmation.tsx:23, components/value-confirmation.tsx:36, components/value-confirmation.tsx:47.
- Ícone de vínculo fornecido, logos e fonte local usados na interface. Animações de modal e sheet respeitam movimento reduzido; foco do CPF colore só a borda inferior. Evidência: components/business-content.tsx:5, components/business-content.tsx:11, app/globals.css:17.
- Cache de desenvolvimento separado da produção, evitando conflito com prévia ativa. Evidência: next.config.ts:4.

Limites: contatos, perfis, vínculos e confirmações são fictícios; sem integração Google ou envio de dados. Commit não se aplica: pasta sem repositório Git. Sem Verifier independente ou sensor de mutação no nível express.

## Identificação por canal

- Chromium visível, `/tmp/playwright-test-ora-identification.js`: exit 0, sem erros de página.
- CPF válido abre seleção SMS/e-mail antes do código. Cada opção exibe o destino fictício e mascarado correspondente; voltar preserva o CPF e permite trocar o canal. Evidência: components/identification.tsx:11.
- Registros de `animationstart` e `animationend` confirmam que a saída do CPF termina antes da entrada do canal. Entrada usa fade-in/slide-up; saída usa fade-out/slide-down. Evidência: components/identification.tsx:85.
- Cartão de canal com 524px e x=222px no viewport 1440x944; captura desktop inspecionada.
- Dimensões da foto iguais nas etapas CPF, canal e código, incluindo mobile 390x700. Redimensionamento do viewport sem transição de opacidade. Evidência: app/globals.css:99.
- Movimento reduzido permite completar e voltar entre etapas sem depender de evento de animação. Evidência: components/identification.tsx:52.
- Nenhuma requisição POST no fluxo: envio e autenticação permanecem simulados.
