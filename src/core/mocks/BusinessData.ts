import type { AdjustmentRequest } from '@/core/@types/Business';

export const properties = [
  'Edifício Insight · Apartamento 806 + Garagem 146',
  'Apartamento 1904 · Residencial Alameda',
  'Apartamento 302 · Edifício Aurora',
  'Casa 12 · Condomínio Jardim das Flores',
  'Apartamento 704 · Residencial Horizonte',
  'Apartamento 1102 · Edifício Essencial',
  'Casa 08 · Condomínio Vista Verde',
  'Apartamento 501 · Residencial Solar',
  'Apartamento 903 · Edifício Porto',
  'Apartamento 201 · Residencial Bosque',
];
export const addresses = [
  'Rua das Palmeiras, 240',
  'Avenida Central, 575',
  'Rua do Sol, 180',
  'Alameda das Flores, 120',
  'Avenida dos Ipês, 850',
];
export const purchaseRows = [
  [
    'Modalidade de aquisição',
    'Financiamento isolado',
    'A modalidade de aquisição indica como a compra do imóvel será realizada. No financiamento isolado, o crédito é destinado à compra de um imóvel pronto, sem incluir sua construção.',
  ],
  ['Banco', 'Santander'],
  ['Valor do imóvel', 'R$ 305.000,00'],
  ['Entrada', 'R$ 60.900,00'],
  ['FGTS', 'R$ 100,00'],
  ['Subsídio', 'R$ 0,00'],
  ['Financiamento', 'R$ 244.000,00'],
];
export const financingRows = [
  ['Prazo', '420 meses'],
  ['Sistema de amortização', 'PRICE'],
  ['Taxa de juros efetiva', '10% a.a.'],
  ['Índice de reajuste', '1%'],
  ['Deseja financiar as despesas', 'Sim'],
  ['Valor das despesas financiadas', 'R$ 2.044,00'],
  ['Financiamento total', 'R$ 246.044,00'],
];
export const notices = [
  {
    title: 'Alteração das condições',
    text: 'Caso seja necessário alterar alguma condição do financiamento, solicite um ajuste agora. Após a emissão do contrato, alguns ajustes poderão não ser permitidos pelo banco.',
  },
  {
    title: 'Tarifa de avaliação',
    text: 'A tarifa de avaliação, no valor aproximado de R$ 850,00 (valor ilustrativo), será debitada da sua conta corrente após a emissão do contrato. Mantenha esse valor disponível na conta.',
  },
  {
    title: 'Primeira parcela',
    text: 'A primeira parcela do financiamento vencerá 30 dias após a emissão do contrato.\n\nSeguros habitacionais\nNa emissão do contrato, também serão cobrados os seguros habitacionais obrigatórios:\n• DFI — Danos Físicos ao Imóvel;\n• MIP — Morte e Invalidez Permanente.\n\nEsses seguros estão considerados no financiamento, mas a primeira cobrança ocorre na emissão do contrato para garantir as coberturas desde a assinatura.',
  },
  {
    title: 'Reembolso das despesas',
    text: 'Caso tenha optado pelo financiamento das despesas de documentação, o valor será liberado após o registro do contrato e da alienação do imóvel ao banco, na forma de reembolso.',
  },
];

export const intermediaries = [
  {
    name: 'Lucas Martins',
    company: 'Imobiliária Exemplo LTDA',
    phone: '554100000001',
    phoneLabel: '(41) 0000-0001',
    email: 'lucas@example.com',
  },
  {
    name: 'Beatriz Santos',
    company: 'Imobiliária Exemplo LTDA',
    phone: '554100000002',
    phoneLabel: '(41) 0000-0002',
    email: 'beatriz@example.com',
  },
];

export const adjustmentSections = [
  'Participantes',
  'Valores da compra e venda',
  'Financiamento e despesas',
];

export const businessStages = [
  {
    name: 'Análise de crédito',
    description:
      'O banco analisa os dados e documentos dos participantes para avaliar o financiamento.',
  },
  {
    name: 'Avaliação do imóvel',
    description: 'O banco avalia as características e o valor do imóvel que será financiado.',
  },
  {
    name: 'Análise jurídica',
    description:
      'A documentação dos participantes e do imóvel é analisada para preparar a contratação.',
  },
  {
    name: 'Assinatura do contrato',
    description: 'Os participantes conferem e assinam o contrato de financiamento.',
  },
  {
    name: 'Registro do contrato',
    description: 'O contrato é encaminhado para registro no cartório de imóveis.',
  },
  {
    name: 'Liberação de recursos',
    description: 'Após a conferência do registro, o banco providencia a liberação dos recursos.',
  },
  { name: 'Processo concluído', description: 'As etapas do negócio foram concluídas.' },
];

export const adjustmentRequests: Partial<Record<number, AdjustmentRequest>> = {
  0: {
    requestedBy: 'you',
    messages: [
      { text: 'O meu nome precisa de um ajuste.\n- Incluir o sobrenome que falta no cadastro.' },
    ],
  },
  3: {
    requestedBy: 'other',
    messages: [
      {
        text: 'Foi solicitado um ajuste nos dados do imóvel.\n- Conferir a identificação da vaga de garagem.',
      },
    ],
  },
};

export const pendingBusinessNotices: Partial<Record<number, string>> = {
  4: 'Aguardando o retorno do banco para avançar à próxima etapa.',
};
