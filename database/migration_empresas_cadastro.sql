-- =====================================================
-- MIGRAÇÃO: ADICIONAR TABELA DE CADASTRO DE EMPRESAS
-- Demonstra rastreabilidade CNPJ → Endereço → Bairro
-- =====================================================

-- Tabela de empresas cadastradas (base para agregados)
DROP TABLE IF EXISTS empresas_cadastro CASCADE;
CREATE TABLE empresas_cadastro (
    id SERIAL PRIMARY KEY,
    cnpj VARCHAR(18) UNIQUE NOT NULL, -- 00.000.000/0000-00
    razao_social VARCHAR(200) NOT NULL,
    nome_fantasia VARCHAR(200),
    
    -- CNAE
    cnae_id INTEGER REFERENCES cnae(id) ON DELETE SET NULL,
    cnae_codigo VARCHAR(10),
    cnae_descricao VARCHAR(200),
    
    -- Localização
    bairro_id INTEGER REFERENCES bairros(id) ON DELETE SET NULL,
    logradouro VARCHAR(200),
    numero VARCHAR(20),
    complemento VARCHAR(100),
    cep VARCHAR(10),
    
    -- Datas
    data_abertura DATE,
    data_situacao_cadastral DATE,
    situacao_cadastral VARCHAR(50), -- ATIVA, BAIXADA, SUSPENSA, etc.
    
    -- Métricas
    porte VARCHAR(20), -- ME, EPP, DEMAIS
    natureza_juridica VARCHAR(100),
    capital_social DECIMAL(15,2),
    
    -- Auditoria
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices para performance
CREATE INDEX idx_empresas_cnpj ON empresas_cadastro(cnpj);
CREATE INDEX idx_empresas_bairro ON empresas_cadastro(bairro_id);
CREATE INDEX idx_empresas_cnae ON empresas_cadastro(cnae_id);
CREATE INDEX idx_empresas_situacao ON empresas_cadastro(situacao_cadastral);
CREATE INDEX idx_empresas_data_abertura ON empresas_cadastro(data_abertura);

-- View de empresas ativas por bairro e CNAE
CREATE OR REPLACE VIEW vw_empresas_ativas_bairro AS
SELECT 
    b.id as bairro_id,
    b.nome as bairro,
    b.regiao,
    c.id as cnae_id,
    c.codigo as cnae_codigo,
    c.descricao as cnae_descricao,
    c.setor,
    COUNT(*) as total_empresas,
    COUNT(CASE WHEN ec.porte = 'ME' THEN 1 END) as total_me,
    COUNT(CASE WHEN ec.porte = 'EPP' THEN 1 END) as total_epp,
    SUM(ec.capital_social) as capital_social_total
FROM empresas_cadastro ec
JOIN bairros b ON b.id = ec.bairro_id
JOIN cnae c ON c.id = ec.cnae_id
WHERE ec.situacao_cadastral = 'ATIVA'
GROUP BY b.id, b.nome, b.regiao, c.id, c.codigo, c.descricao, c.setor;

-- View de movimentação mensal (abertura/fechamento)
CREATE OR REPLACE VIEW vw_movimentacao_empresas AS
SELECT 
    EXTRACT(YEAR FROM ec.data_abertura) as ano,
    EXTRACT(MONTH FROM ec.data_abertura) as mes,
    b.id as bairro_id,
    b.nome as bairro,
    c.id as cnae_id,
    c.codigo as cnae_codigo,
    COUNT(CASE WHEN ec.situacao_cadastral = 'ATIVA' THEN 1 END) as empresas_abertas,
    COUNT(CASE WHEN ec.situacao_cadastral = 'BAIXADA' THEN 1 END) as empresas_fechadas
FROM empresas_cadastro ec
JOIN bairros b ON b.id = ec.bairro_id
JOIN cnae c ON c.id = ec.cnae_id
WHERE ec.data_abertura IS NOT NULL
GROUP BY EXTRACT(YEAR FROM ec.data_abertura), EXTRACT(MONTH FROM ec.data_abertura), 
         b.id, b.nome, c.id, c.codigo;

-- Comentários para documentação
COMMENT ON TABLE empresas_cadastro IS 'Cadastro individual de empresas com CNPJ, endereço e bairro - fonte primária para agregados';
COMMENT ON COLUMN empresas_cadastro.cnpj IS 'CNPJ formatado: 00.000.000/0000-00';
COMMENT ON COLUMN empresas_cadastro.bairro_id IS 'Bairro onde a empresa está localizada (endereço fiscal)';
COMMENT ON COLUMN empresas_cadastro.situacao_cadastral IS 'ATIVA, BAIXADA, SUSPENSA, INAPTA, NULA';
COMMENT ON VIEW vw_empresas_ativas_bairro IS 'Empresas ativas agregadas por bairro e CNAE';
COMMENT ON VIEW vw_movimentacao_empresas IS 'Movimentação mensal de empresas (abertura/fechamento) por bairro e CNAE';

