-- =====================================================
-- BANCO DE DADOS CASCAVEL - ESTRUTURA FOCADA EM BAIRROS
-- =====================================================

-- Extensão para dados geoespaciais
CREATE EXTENSION IF NOT EXISTS postgis;

-- =====================================================
-- TABELA CENTRAL: BAIRROS
-- =====================================================
DROP TABLE IF EXISTS bairros CASCADE;
CREATE TABLE bairros (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) UNIQUE NOT NULL,
    regiao VARCHAR(50) NOT NULL, -- Norte, Sul, Leste, Oeste, Centro
    area_km2 DECIMAL(10,2),
    populacao_estimada INTEGER,
    densidade_demografica DECIMAL(10,2),
    renda_media_domiciliar DECIMAL(10,2),
    coordenadas_centro POINT, -- Latitude, Longitude do centro do bairro
    poligono GEOMETRY(POLYGON, 4326), -- Polígono do bairro para o mapa
    cor_mapa VARCHAR(7), -- Cor hexadecimal para o mapa
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- TABELA: INDICADORES POR BAIRRO E ANO
-- =====================================================
DROP TABLE IF EXISTS indicadores_bairro CASCADE;
CREATE TABLE indicadores_bairro (
    id SERIAL PRIMARY KEY,
    bairro_id INTEGER REFERENCES bairros(id) ON DELETE CASCADE,
    ano INTEGER NOT NULL,
    mes INTEGER DEFAULT NULL,
    
    -- Demografia
    populacao INTEGER,
    taxa_crescimento DECIMAL(5,2),
    densidade DECIMAL(10,2),
    
    -- Educação
    matriculas_total INTEGER,
    matriculas_fundamental INTEGER,
    matriculas_medio INTEGER,
    escolas_municipais INTEGER,
    escolas_estaduais INTEGER,
    taxa_alfabetizacao DECIMAL(5,2),
    
    -- Saúde
    unidades_saude INTEGER,
    leitos_disponiveis INTEGER,
    atendimentos_mes INTEGER,
    taxa_mortalidade_infantil DECIMAL(5,2),
    
    -- Infraestrutura
    domicilios_total INTEGER,
    cobertura_agua DECIMAL(5,2),
    cobertura_esgoto DECIMAL(5,2),
    coleta_lixo DECIMAL(5,2),
    iluminacao_publica DECIMAL(5,2),
    
    -- Energia
    consumo_energia_kwh INTEGER,
    consumidores_energia INTEGER,
    
    -- Economia
    empresas_ativas INTEGER,
    empregos_formais INTEGER,
    renda_media DECIMAL(10,2),
    
    UNIQUE(bairro_id, ano, mes),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices para performance
CREATE INDEX idx_indicadores_bairro ON indicadores_bairro(bairro_id, ano);
CREATE INDEX idx_indicadores_ano ON indicadores_bairro(ano);

-- =====================================================
-- TABELA: EMPRESAS POR BAIRRO E CNAE
-- =====================================================
DROP TABLE IF EXISTS cnae CASCADE;
CREATE TABLE cnae (
    id SERIAL PRIMARY KEY,
    codigo VARCHAR(10) UNIQUE NOT NULL,
    descricao VARCHAR(200) NOT NULL,
    setor VARCHAR(50) NOT NULL -- Comércio, Serviços, Indústria, etc.
);

DROP TABLE IF EXISTS empresas_bairro CASCADE;
CREATE TABLE empresas_bairro (
    id SERIAL PRIMARY KEY,
    bairro_id INTEGER REFERENCES bairros(id) ON DELETE CASCADE,
    cnae_id INTEGER REFERENCES cnae(id) ON DELETE CASCADE,
    ano INTEGER NOT NULL,
    mes INTEGER DEFAULT NULL,
    
    empresas_ativas INTEGER,
    empresas_abertas INTEGER,
    empresas_fechadas INTEGER,
    empregos_gerados INTEGER,
    massa_salarial DECIMAL(15,2),
    
    UNIQUE(bairro_id, cnae_id, ano, mes),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_empresas_bairro ON empresas_bairro(bairro_id, cnae_id, ano);

-- =====================================================
-- TABELA: BASELINE (VALORES NORMAIS) POR INDICADOR
-- =====================================================
DROP TABLE IF EXISTS baseline_indicadores CASCADE;
CREATE TABLE baseline_indicadores (
    id SERIAL PRIMARY KEY,
    bairro_id INTEGER REFERENCES bairros(id) ON DELETE CASCADE,
    indicador VARCHAR(50) NOT NULL, -- nome do indicador
    valor_medio DECIMAL(15,2),
    desvio_padrao DECIMAL(15,2),
    minimo DECIMAL(15,2),
    maximo DECIMAL(15,2),
    ano_referencia INTEGER,
    
    UNIQUE(bairro_id, indicador, ano_referencia),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- TABELA: HISTÓRICO IDH POR BAIRRO
-- =====================================================
DROP TABLE IF EXISTS idh_bairro CASCADE;
CREATE TABLE idh_bairro (
    id SERIAL PRIMARY KEY,
    bairro_id INTEGER REFERENCES bairros(id) ON DELETE CASCADE,
    ano INTEGER NOT NULL,
    idh_geral DECIMAL(5,3),
    idh_renda DECIMAL(5,3),
    idh_educacao DECIMAL(5,3),
    idh_longevidade DECIMAL(5,3),
    indice_gini DECIMAL(5,4),
    
    UNIQUE(bairro_id, ano),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- VIEWS ÚTEIS
-- =====================================================

-- View: Resumo por Bairro (ano mais recente)
CREATE OR REPLACE VIEW vw_resumo_bairros AS
SELECT 
    b.id,
    b.nome,
    b.regiao,
    b.area_km2,
    b.populacao_estimada,
    b.cor_mapa,
    i.ano,
    i.populacao,
    i.densidade,
    i.matriculas_total,
    i.unidades_saude,
    i.empresas_ativas,
    i.empregos_formais,
    i.renda_media,
    i.cobertura_agua,
    i.cobertura_esgoto,
    idh.idh_geral
FROM bairros b
LEFT JOIN LATERAL (
    SELECT * FROM indicadores_bairro 
    WHERE bairro_id = b.id 
    ORDER BY ano DESC, mes DESC NULLS LAST
    LIMIT 1
) i ON true
LEFT JOIN LATERAL (
    SELECT * FROM idh_bairro
    WHERE bairro_id = b.id
    ORDER BY ano DESC
    LIMIT 1
) idh ON true;

-- View: Médias por Região
CREATE OR REPLACE VIEW vw_medias_regiao AS
SELECT 
    b.regiao,
    i.ano,
    AVG(i.populacao) as populacao_media,
    AVG(i.densidade) as densidade_media,
    AVG(i.renda_media) as renda_media,
    AVG(i.cobertura_agua) as cobertura_agua_media,
    AVG(i.empresas_ativas) as empresas_media,
    COUNT(DISTINCT b.id) as total_bairros
FROM bairros b
JOIN indicadores_bairro i ON b.id = i.bairro_id
GROUP BY b.regiao, i.ano;

-- =====================================================
-- COMENTÁRIOS NAS TABELAS
-- =====================================================
COMMENT ON TABLE bairros IS 'Cadastro de bairros de Cascavel com dados geoespaciais';
COMMENT ON TABLE indicadores_bairro IS 'Indicadores socioeconômicos por bairro e período';
COMMENT ON TABLE empresas_bairro IS 'Dados de empresas e empregos por bairro e CNAE';
COMMENT ON TABLE baseline_indicadores IS 'Valores normais (baseline) para cada indicador por bairro';
COMMENT ON TABLE idh_bairro IS 'Índice de Desenvolvimento Humano por bairro';

