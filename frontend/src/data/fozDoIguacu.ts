/**
 * Dados mockados realistas de Foz do Iguaçu - PR
 * População: ~258 mil habitantes (2023)
 * Economia: Turismo (Cataratas), Itaipu, comércio fronteiriço
 * Tríplice fronteira: Brasil, Argentina, Paraguai
 */

export const FOZ_CENTER: [number, number] = [-25.5163, -54.5854];

export const BAIRROS_FOZ = [
  // Região Central
  { id: 1, nome: 'Centro', regiao: 'Centro', populacao: 12500, empresas_ativas: 2800, renda_media: 3200, lat: -25.5163, lng: -54.5854, turismo_score: 95 },
  { id: 2, nome: 'Vila Portes', regiao: 'Centro', populacao: 8200, empresas_ativas: 450, renda_media: 2100, lat: -25.5050, lng: -54.5900, turismo_score: 40 },
  { id: 3, nome: 'Vila A', regiao: 'Centro', populacao: 9100, empresas_ativas: 520, renda_media: 2300, lat: -25.5100, lng: -54.5750, turismo_score: 35 },
  
  // Região Norte (Cataratas)
  { id: 4, nome: 'Jardim Jupira', regiao: 'Norte', populacao: 6800, empresas_ativas: 180, renda_media: 1900, lat: -25.4850, lng: -54.5700, turismo_score: 25 },
  { id: 5, nome: 'Porto Meira', regiao: 'Norte', populacao: 15300, empresas_ativas: 620, renda_media: 2500, lat: -25.4650, lng: -54.5500, turismo_score: 85 },
  { id: 6, nome: 'Três Lagoas', regiao: 'Norte', populacao: 11200, empresas_ativas: 480, renda_media: 2200, lat: -25.4500, lng: -54.5600, turismo_score: 70 },
  
  // Região Sul (Itaipu)
  { id: 7, nome: 'Jardim São Paulo', regiao: 'Sul', populacao: 18500, empresas_ativas: 720, renda_media: 2800, lat: -25.5450, lng: -54.5700, turismo_score: 50 },
  { id: 8, nome: 'Morumbi', regiao: 'Sul', populacao: 22100, empresas_ativas: 890, renda_media: 3100, lat: -25.5550, lng: -54.5500, turismo_score: 60 },
  { id: 9, nome: 'Cidade Nova', regiao: 'Sul', populacao: 16800, empresas_ativas: 650, renda_media: 2400, lat: -25.5650, lng: -54.5800, turismo_score: 45 },
  
  // Região Leste (Fronteira)
  { id: 10, nome: 'Jardim Jupira', regiao: 'Leste', populacao: 13200, empresas_ativas: 1200, renda_media: 2700, lat: -25.5200, lng: -54.5400, turismo_score: 80 },
  { id: 11, nome: 'Vila Yolanda', regiao: 'Leste', populacao: 10500, empresas_ativas: 980, renda_media: 2500, lat: -25.5300, lng: -54.5300, turismo_score: 75 },
  { id: 12, nome: 'Jardim Ipê', regiao: 'Leste', populacao: 8900, empresas_ativas: 420, renda_media: 2100, lat: -25.5100, lng: -54.5200, turismo_score: 40 },
  
  // Região Oeste
  { id: 13, nome: 'Parque Presidente', regiao: 'Oeste', populacao: 19200, empresas_ativas: 740, renda_media: 2600, lat: -25.5200, lng: -54.6100, turismo_score: 55 },
  { id: 14, nome: 'Vila Shalon', regiao: 'Oeste', populacao: 14100, empresas_ativas: 580, renda_media: 2300, lat: -25.5350, lng: -54.6200, turismo_score: 50 },
  { id: 15, nome: 'Jardim América', regiao: 'Oeste', populacao: 17600, empresas_ativas: 690, renda_media: 2900, lat: -25.5100, lng: -54.6300, turismo_score: 60 },
];

export const REGIOES_FOZ = [
  { nome: 'Centro', cor: '#2E7D32', descricao: 'Núcleo comercial e administrativo' },
  { nome: 'Norte', cor: '#1976D2', descricao: 'Região das Cataratas e hotéis' },
  { nome: 'Sul', cor: '#C62828', descricao: 'Área residencial e Itaipu' },
  { nome: 'Leste', cor: '#F57C00', descricao: 'Fronteira com Paraguai e comércio' },
  { nome: 'Oeste', cor: '#7B1FA2', descricao: 'Bairros residenciais e serviços' },
];

export const ALERTAS_FOZ = [
  {
    id: 1,
    tipo: 'Economia',
    severidade: 'crítico',
    titulo: 'Queda abrupta no turismo - Cataratas',
    descricao: 'Visitação nas Cataratas caiu 28% no último trimestre vs. média histórica. Impacto estimado de R$ 15M na economia local.',
    recomendacao: 'Ações sugeridas: campanhas promocionais nacionais, parcerias com operadoras de turismo, eventos temáticos, facilitação de acesso (transporte).',
    bairros_afetados: ['Porto Meira', 'Três Lagoas', 'Centro'],
    data: '2025-10-05',
    metrica: 'visitantes_cataratas',
    valor_atual: 72000,
    valor_esperado: 100000,
  },
  {
    id: 2,
    tipo: 'Infraestrutura',
    severidade: 'atenção',
    titulo: 'Congestionamento Ponte da Amizade',
    descricao: 'Tempo médio de travessia aumentou 45% (de 20 para 29 min). Afeta comércio e logística fronteiriça.',
    recomendacao: 'Ações: coordenar com autoridades paraguaias para otimizar fiscalização, ampliar horários de pico, implementar faixas expressas para cargas.',
    bairros_afetados: ['Jardim Jupira', 'Vila Yolanda', 'Centro'],
    data: '2025-10-03',
    metrica: 'tempo_travessia_min',
    valor_atual: 29,
    valor_esperado: 20,
  },
  {
    id: 3,
    tipo: 'Saúde',
    severidade: 'atenção',
    titulo: 'Surto de Dengue em bairros do Sul',
    descricao: 'Aumento de 120% nos casos confirmados (890 casos) vs. mês anterior. Focos em Morumbi e Cidade Nova.',
    recomendacao: 'Intensificar campanhas de conscientização, mutirões de limpeza, aplicação de larvicida, vistorias residenciais.',
    bairros_afetados: ['Morumbi', 'Cidade Nova', 'Jardim São Paulo'],
    data: '2025-10-01',
    metrica: 'casos_dengue',
    valor_atual: 890,
    valor_esperado: 400,
  },
  {
    id: 4,
    tipo: 'Segurança',
    severidade: 'alerta',
    titulo: 'Aumento de furtos no Centro',
    descricao: 'Registros de furtos cresceram 18% no último mês. Horários críticos: 18h-22h.',
    recomendacao: 'Reforçar policiamento ostensivo, instalar câmeras em pontos estratégicos, parcerias com lojistas para monitoramento colaborativo.',
    bairros_afetados: ['Centro', 'Vila Portes'],
    data: '2025-09-28',
    metrica: 'furtos_mes',
    valor_atual: 47,
    valor_esperado: 40,
  },
];

export const PREDICOES_FOZ = {
  turismo: [
    { ano: 2023, valor: 1850000, label: 'Visitantes/ano' },
    { ano: 2024, valor: 1920000, label: 'Visitantes/ano' },
    { ano: 2025, valor: 2050000, label: 'Projeção otimista' },
    { ano: 2026, valor: 2180000, label: 'Projeção otimista' },
    { ano: 2027, valor: 2310000, label: 'Projeção otimista' },
  ],
  populacao: [
    { ano: 2023, valor: 258000 },
    { ano: 2024, valor: 261000 },
    { ano: 2025, valor: 264000 },
    { ano: 2026, valor: 267000 },
    { ano: 2027, valor: 270000 },
  ],
  economia_comercio: [
    { ano: 2023, valor: 3200 },
    { ano: 2024, valor: 3350 },
    { ano: 2025, valor: 3500 },
    { ano: 2026, valor: 3680 },
    { ano: 2027, valor: 3850 },
  ],
};

export const KPIS_FOZ = {
  populacao_total: 258420,
  empresas_ativas: 11780,
  turistas_ano: 1920000,
  empregos_turismo: 28500,
  pib_per_capita: 38200,
  idh: 0.751,
  leitos_hospitalares: 1240,
  escolas: 185,
  cobertura_saneamento: 92.5,
  energia_itaipu_mw: 14000,
};

export const TOP_SETORES_FOZ = [
  { setor: 'Turismo e Hotelaria', empresas: 2340, empregos: 18200, crescimento: 8.5 },
  { setor: 'Comércio Varejista', empresas: 3120, empregos: 12500, crescimento: 4.2 },
  { setor: 'Serviços', empresas: 2890, empregos: 9800, crescimento: 6.1 },
  { setor: 'Construção Civil', empresas: 980, empregos: 6400, crescimento: 3.8 },
  { setor: 'Alimentação', empresas: 1650, empregos: 8100, crescimento: 5.9 },
  { setor: 'Transporte e Logística', empresas: 520, empregos: 4200, crescimento: 7.3 },
];
