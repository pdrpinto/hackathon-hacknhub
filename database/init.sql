-- Database initialization script for Cascavel em Números
-- Sistema de Análise e Gestão Pública

-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- 1. TABELA: TERRITÓRIO E AUTORIDADE ELEITA
-- ============================================
CREATE TABLE IF NOT EXISTS territorio_autoridade (
    id SERIAL PRIMARY KEY,
    regiao_geografica_imediata VARCHAR(255) NOT NULL,
    data_instalacao DATE,
    data_comemoracao VARCHAR(255),
    altitude_sede_m INTEGER,
    distancia_capital_km DECIMAL(5,2),
    autoridade_eleita VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- 2. TABELA: ELEITORES E ZONAS ELEITORAIS
-- ============================================
CREATE TABLE IF NOT EXISTS eleitores (
    id SERIAL PRIMARY KEY,
    numero_eleitores_municipio INTEGER,
    numero_eleitores_regiao INTEGER,
    numero_eleitores_estado INTEGER,
    quantidade_zonas_eleitorais_municipio INTEGER,
    quantidade_zonas_eleitorais_regiao INTEGER,
    quantidade_zonas_eleitorais_estado INTEGER,
    ano_referencia INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- 3. TABELA: ÁREA TERRITORIAL E DEMOGRÁFICA
-- ============================================
CREATE TABLE IF NOT EXISTS area_demografica (
    id SERIAL PRIMARY KEY,
    area_territorial_km2 DECIMAL(10,3),
    densidade_demografica DECIMAL(5,2),
    grau_urbanizacao DECIMAL(5,2),
    populacao_estimada INTEGER,
    populacao_censitaria INTEGER,
    populacao_urbana INTEGER,
    populacao_rural INTEGER,
    taxa_crescimento_populacional DECIMAL(5,2),
    indice_idosos DECIMAL(5,2),
    razao_dependencia DECIMAL(5,2),
    razao_sexo DECIMAL(5,2),
    taxa_envelhecimento DECIMAL(5,2),
    ano_referencia INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- 4. TABELA: IDH E RENDA
-- ============================================
CREATE TABLE IF NOT EXISTS idh_renda (
    id SERIAL PRIMARY KEY,
    idh_municipio DECIMAL(5,3),
    idh_regiao DECIMAL(5,3),
    idh_estado DECIMAL(5,3),
    indice_gini DECIMAL(5,4),
    ano_referencia INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- 5. TABELA: EDUCAÇÃO
-- ============================================
CREATE TABLE IF NOT EXISTS educacao (
    id SERIAL PRIMARY KEY,
    matriculas_educacao_basica INTEGER,
    matriculas_creche INTEGER,
    matriculas_pre_escola INTEGER,
    matriculas_ensino_fundamental INTEGER,
    matriculas_ensino_medio INTEGER,
    matriculas_educacao_profissional INTEGER,
    matriculas_educacao_especial INTEGER,
    matriculas_eja INTEGER,
    matriculas_educacao_superior_presencial INTEGER,
    matriculas_educacao_superior_distancia INTEGER,
    taxa_analfabetismo DECIMAL(5,2),
    ano_referencia INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- 6. TABELA: SAÚDE
-- ============================================
CREATE TABLE IF NOT EXISTS saude (
    id SERIAL PRIMARY KEY,
    estabelecimentos_saude INTEGER,
    leitos_hospitalares INTEGER,
    taxa_fecundidade DECIMAL(5,2),
    taxa_natalidade DECIMAL(5,2),
    taxa_mortalidade_geral DECIMAL(5,2),
    taxa_mortalidade_infantil DECIMAL(5,2),
    taxa_mortalidade_menores_5 DECIMAL(5,2),
    taxa_mortalidade_materna DECIMAL(5,2),
    ano_referencia INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- 7. TABELA: DOMICÍLIOS E SANEAMENTO
-- ============================================
CREATE TABLE IF NOT EXISTS domicilios_saneamento (
    id SERIAL PRIMARY KEY,
    domicilios_recenseados INTEGER,
    domicilios_permanentes INTEGER,
    agua_canalizada INTEGER,
    banheiro_sanitario INTEGER,
    lixo_coletado INTEGER,
    energia_eletrica INTEGER,
    unidades_agua_atendidas INTEGER,
    volume_agua_faturado INTEGER,
    volume_agua_medido INTEGER,
    unidades_esgoto_atendidas INTEGER,
    ano_referencia INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- 8. TABELA: ENERGIA ELÉTRICA
-- ============================================
CREATE TABLE IF NOT EXISTS energia_eletrica (
    id SERIAL PRIMARY KEY,
    consumo_energia INTEGER,
    consumidores_energia INTEGER,
    ano_referencia INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- TABELA AUXILIAR: BAIRROS (para mapas)
-- ============================================
CREATE TABLE IF NOT EXISTS bairros (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    latitude DECIMAL(10,7),
    longitude DECIMAL(10,7),
    populacao_estimada INTEGER,
    area_km2 DECIMAL(10,3),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- TABELA AUXILIAR: CNAE (Classificação Nacional de Atividades Econômicas)
-- ============================================
CREATE TABLE IF NOT EXISTS cnae (
    id SERIAL PRIMARY KEY,
    codigo VARCHAR(20) NOT NULL UNIQUE,
    descricao VARCHAR(500) NOT NULL,
    setor VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- ÍNDICES PARA PERFORMANCE
-- ============================================
CREATE INDEX idx_area_demografica_ano ON area_demografica(ano_referencia);
CREATE INDEX idx_educacao_ano ON educacao(ano_referencia);
CREATE INDEX idx_saude_ano ON saude(ano_referencia);
CREATE INDEX idx_domicilios_ano ON domicilios_saneamento(ano_referencia);
CREATE INDEX idx_energia_ano ON energia_eletrica(ano_referencia);
CREATE INDEX idx_bairros_nome ON bairros(nome);
CREATE INDEX idx_cnae_codigo ON cnae(codigo);

-- ============================================
-- COMENTÁRIOS NAS TABELAS
-- ============================================
COMMENT ON TABLE territorio_autoridade IS 'Dados territoriais e informações sobre autoridades eleitas';
COMMENT ON TABLE eleitores IS 'Informações sobre o eleitorado e zonas eleitorais';
COMMENT ON TABLE area_demografica IS 'Dados demográficos e população do município';
COMMENT ON TABLE idh_renda IS 'Índices de desenvolvimento humano e distribuição de renda';
COMMENT ON TABLE educacao IS 'Indicadores educacionais e matrículas';
COMMENT ON TABLE saude IS 'Indicadores de saúde pública';
COMMENT ON TABLE domicilios_saneamento IS 'Dados sobre domicílios e infraestrutura de saneamento';
COMMENT ON TABLE energia_eletrica IS 'Dados de consumo e distribuição de energia elétrica';
COMMENT ON TABLE bairros IS 'Informações geográficas dos bairros de Cascavel';
COMMENT ON TABLE cnae IS 'Classificação Nacional de Atividades Econômicas';


