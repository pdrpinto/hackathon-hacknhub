-- Dados iniciais para Cascavel em Números
-- Baseado nos documentos fornecidos

-- ============================================
-- DADOS: TERRITÓRIO E AUTORIDADE
-- ============================================
INSERT INTO territorio_autoridade (
    regiao_geografica_imediata,
    data_instalacao,
    data_comemoracao,
    altitude_sede_m,
    distancia_capital_km,
    autoridade_eleita
) VALUES (
    'Cascavel - Foz do Iguaçu',
    '1952-12-14',
    '14 de novembro',
    770,
    491.00,
    'Leonaldo Paranhos da Silva'
);

-- ============================================
-- DADOS: ELEITORES
-- ============================================
INSERT INTO eleitores (
    numero_eleitores_municipio,
    numero_eleitores_regiao,
    numero_eleitores_estado,
    quantidade_zonas_eleitorais_municipio,
    quantidade_zonas_eleitorais_regiao,
    quantidade_zonas_eleitorais_estado,
    ano_referencia
) VALUES (
    223090,
    382932,
    8152710,
    2,
    7,
    186,
    2022
);

-- ============================================
-- DADOS: ÁREA DEMOGRÁFICA (Série Histórica)
-- ============================================
INSERT INTO area_demografica (
    area_territorial_km2,
    densidade_demografica,
    grau_urbanizacao,
    populacao_estimada,
    populacao_censitaria,
    populacao_urbana,
    populacao_rural,
    taxa_crescimento_populacional,
    indice_idosos,
    razao_dependencia,
    razao_sexo,
    taxa_envelhecimento,
    ano_referencia
) VALUES 
    (2086.990, 137.19, 94.36, 286205, 286205, 270049, 16156, 1.20, 5.50, 38.50, 95.20, 24.80, 2010),
    (2086.990, 145.32, 94.36, 303165, 286205, 270049, 16156, 1.45, 5.65, 39.20, 95.30, 25.10, 2015),
    (2086.990, 151.89, 94.36, 316950, 286205, 270049, 16156, 1.50, 5.70, 39.50, 95.35, 25.35, 2018),
    (2086.990, 156.24, 94.36, 326000, 286205, 270049, 16156, 1.52, 5.75, 39.80, 95.40, 25.50, 2020),
    (2086.990, 159.24, 94.36, 332333, 286205, 270049, 16156, 1.55, 5.83, 39.98, 95.45, 25.66, 2022);

-- ============================================
-- DADOS: IDH E RENDA (Série Histórica)
-- ============================================
INSERT INTO idh_renda (
    idh_municipio,
    idh_regiao,
    idh_estado,
    indice_gini,
    ano_referencia
) VALUES 
    (0.782, 0.749, 0.749, 0.5206, 2010),
    (0.785, 0.751, 0.751, 0.5180, 2015),
    (0.788, 0.753, 0.753, 0.5150, 2018),
    (0.790, 0.755, 0.755, 0.5120, 2020),
    (0.792, 0.757, 0.757, 0.5100, 2022);

-- ============================================
-- DADOS: EDUCAÇÃO (Série Histórica)
-- ============================================
INSERT INTO educacao (
    matriculas_educacao_basica,
    matriculas_creche,
    matriculas_pre_escola,
    matriculas_ensino_fundamental,
    matriculas_ensino_medio,
    matriculas_educacao_profissional,
    matriculas_educacao_especial,
    matriculas_eja,
    matriculas_educacao_superior_presencial,
    matriculas_educacao_superior_distancia,
    taxa_analfabetismo,
    ano_referencia
) VALUES 
    (72000, 5500, 7200, 40000, 12500, 4500, 400, 3800, 15000, 8000, 5.20, 2010),
    (73500, 5800, 7400, 40500, 12800, 4800, 420, 3700, 15500, 8500, 4.90, 2015),
    (74200, 6000, 7500, 41000, 13000, 5000, 430, 3600, 16000, 9000, 4.70, 2018),
    (74800, 6100, 7600, 41400, 13050, 5100, 440, 3550, 16400, 9300, 4.58, 2020),
    (75443, 6209, 7718, 41826, 13151, 5226, 444, 3536, 16740, 9592, 4.46, 2022);

-- ============================================
-- DADOS: SAÚDE (Série Histórica)
-- ============================================
INSERT INTO saude (
    estabelecimentos_saude,
    leitos_hospitalares,
    taxa_fecundidade,
    taxa_natalidade,
    taxa_mortalidade_geral,
    taxa_mortalidade_infantil,
    taxa_mortalidade_menores_5,
    taxa_mortalidade_materna,
    ano_referencia
) VALUES 
    (680, 900, 2.10, 17.50, 5.80, 12.50, 14.20, 25.00, 2010),
    (700, 920, 2.00, 17.00, 5.65, 11.80, 13.50, 23.50, 2015),
    (720, 935, 1.90, 16.50, 5.50, 10.80, 12.50, 21.80, 2018),
    (732, 942, 1.86, 16.20, 5.44, 10.30, 11.90, 20.50, 2020),
    (744, 949, 1.83, 15.86, 5.38, 9.79, 11.33, 19.20, 2022);

-- ============================================
-- DADOS: DOMICÍLIOS E SANEAMENTO (Série Histórica)
-- ============================================
INSERT INTO domicilios_saneamento (
    domicilios_recenseados,
    domicilios_permanentes,
    agua_canalizada,
    banheiro_sanitario,
    lixo_coletado,
    energia_eletrica,
    unidades_agua_atendidas,
    volume_agua_faturado,
    volume_agua_medido,
    unidades_esgoto_atendidas,
    ano_referencia
) VALUES 
    (95000, 86000, 85500, 85800, 82000, 85700, 115000, 14500000, 14000000, 118000, 2010),
    (97500, 88000, 87500, 88000, 84500, 87800, 120000, 15200000, 14700000, 123000, 2015),
    (99200, 89500, 89000, 89500, 86000, 89300, 123000, 15700000, 15100000, 127000, 2018),
    (100000, 90200, 89800, 90200, 86800, 90000, 124500, 15850000, 15300000, 128500, 2020),
    (100931, 91031, 90664, 90935, 87512, 90769, 126139, 16007361, 15444813, 130045, 2022);

-- ============================================
-- DADOS: ENERGIA ELÉTRICA (Série Histórica)
-- ============================================
INSERT INTO energia_eletrica (
    consumo_energia,
    consumidores_energia,
    ano_referencia
) VALUES 
    (780000, 135000, 2010),
    (800000, 139000, 2015),
    (820000, 143000, 2018),
    (831000, 145000, 2020),
    (842454, 146774, 2022);

-- ============================================
-- DADOS: BAIRROS DE CASCAVEL (Para mapas)
-- ============================================
INSERT INTO bairros (nome, latitude, longitude, populacao_estimada, area_km2) VALUES 
    ('Centro', -24.9555, -53.4552, 15000, 3.5),
    ('Coqueiral', -24.9789, -53.4123, 22000, 5.2),
    ('Santa Cruz', -24.9234, -53.4789, 18000, 4.8),
    ('Cascavel Velho', -24.9876, -53.5012, 12000, 6.1),
    ('Universitário', -24.9512, -53.4678, 8000, 2.9),
    ('Brasmadeira', -24.9654, -53.4234, 14000, 4.2),
    ('Neva', -24.9123, -53.4567, 16000, 5.5),
    ('Lago Azul', -24.9345, -53.4890, 13000, 3.8),
    ('Pacaembu', -24.9687, -53.5123, 11000, 4.5),
    ('FAG', -24.9478, -53.4701, 9000, 3.1);

-- ============================================
-- DADOS: CNAE (Principais setores econômicos)
-- ============================================
INSERT INTO cnae (codigo, descricao, setor) VALUES 
    ('01', 'Agricultura, pecuária e serviços relacionados', 'Primário'),
    ('10-33', 'Indústrias de transformação', 'Secundário'),
    ('35', 'Eletricidade e gás', 'Secundário'),
    ('41-43', 'Construção', 'Secundário'),
    ('45-47', 'Comércio; reparação de veículos automotores', 'Terciário'),
    ('49-53', 'Transporte, armazenagem e correio', 'Terciário'),
    ('55-56', 'Alojamento e alimentação', 'Terciário'),
    ('58-63', 'Informação e comunicação', 'Terciário'),
    ('64-66', 'Atividades financeiras, de seguros e serviços relacionados', 'Terciário'),
    ('68', 'Atividades imobiliárias', 'Terciário'),
    ('69-75', 'Atividades profissionais, científicas e técnicas', 'Terciário'),
    ('77-82', 'Atividades administrativas e serviços complementares', 'Terciário'),
    ('84', 'Administração pública, defesa e seguridade social', 'Público'),
    ('85', 'Educação', 'Público'),
    ('86-88', 'Saúde humana e serviços sociais', 'Público'),
    ('90-93', 'Artes, cultura, esporte e recreação', 'Terciário'),
    ('94-96', 'Outras atividades de serviços', 'Terciário');


