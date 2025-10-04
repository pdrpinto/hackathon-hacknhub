-- =====================================================
-- MIGRAÇÃO: TABELA ESPECÍFICA PARA MOCK CAGED
-- Não mistura com empresas_bairro "oficial"
-- =====================================================

DROP TABLE IF EXISTS empresas_bairro_mock CASCADE;
CREATE TABLE empresas_bairro_mock (
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

CREATE INDEX idx_empresas_bairro_mock ON empresas_bairro_mock(bairro_id, cnae_id, ano);


