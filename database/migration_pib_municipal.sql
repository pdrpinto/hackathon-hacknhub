-- =====================================================
-- MIGRAÇÃO: ADICIONAR TABELA DE PIB MUNICIPAL
-- =====================================================

-- Tabela de PIB Municipal (dados anuais do IBGE)
DROP TABLE IF EXISTS pib_municipal CASCADE;
CREATE TABLE pib_municipal (
    id SERIAL PRIMARY KEY,
    ano INTEGER NOT NULL,
    municipio VARCHAR(120) DEFAULT 'Cascavel',
    pib_total_mil DECIMAL(18,3), -- R$ x1000
    vab_total_mil DECIMAL(18,3), -- Valor Adicionado Bruto R$ x1000
    impostos_liquidos_mil DECIMAL(18,3), -- R$ x1000
    agropecuaria_mil DECIMAL(18,3), -- R$ x1000
    industria_mil DECIMAL(18,3), -- R$ x1000
    servicos_privados_mil DECIMAL(18,3), -- R$ x1000 (exclui administração pública)
    administracao_publica_mil DECIMAL(18,3), -- R$ x1000
    pib_per_capita DECIMAL(18,2), -- R$
    fonte VARCHAR(50) DEFAULT 'IBGE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(ano, municipio)
);

-- Índices para performance
CREATE INDEX idx_pib_municipal_ano ON pib_municipal(ano);
CREATE INDEX idx_pib_municipal_municipio ON pib_municipal(municipio);

-- Comentários
COMMENT ON TABLE pib_municipal IS 'Produto Interno Bruto Municipal - Dados anuais do IBGE';
COMMENT ON COLUMN pib_municipal.pib_total_mil IS 'PIB total a preços correntes em R$ mil';
COMMENT ON COLUMN pib_municipal.vab_total_mil IS 'Valor Adicionado Bruto a preços básicos em R$ mil';
COMMENT ON COLUMN pib_municipal.agropecuaria_mil IS 'VAB da Agropecuária em R$ mil';
COMMENT ON COLUMN pib_municipal.industria_mil IS 'VAB da Indústria em R$ mil';
COMMENT ON COLUMN pib_municipal.servicos_privados_mil IS 'VAB de Serviços (exceto administração pública) em R$ mil';
COMMENT ON COLUMN pib_municipal.administracao_publica_mil IS 'VAB da Administração, defesa, educação e saúde públicas em R$ mil';

-- =====================================================
-- SEED: DADOS DO PIB DE CASCAVEL - ANO 2021
-- Fonte: IBGE - Produto Interno Bruto dos Municípios
-- =====================================================

INSERT INTO pib_municipal (
    ano, municipio,
    pib_total_mil,
    impostos_liquidos_mil,
    pib_per_capita,
    vab_total_mil,
    agropecuaria_mil,
    industria_mil,
    servicos_privados_mil,
    administracao_publica_mil,
    fonte
) VALUES (
    2021, 'Cascavel',
    15787528.279,  -- PIB total R$ 15,78 bilhões
    2214717.231,   -- Impostos líquidos R$ 2,21 bilhões
    46976.49,      -- PIB per capita R$ 46.976,49
    13572811.048,  -- VAB total R$ 13,57 bilhões
    1206734.268,   -- Agropecuária R$ 1,21 bilhões (8,9%)
    2651368.272,   -- Indústria R$ 2,65 bilhões (19,5%)
    8089960.287,   -- Serviços privados R$ 8,09 bilhões (59,6%)
    1624748.221,   -- Administração pública R$ 1,62 bilhões (12,0%)
    'IBGE'
) ON CONFLICT (ano, municipio) DO UPDATE SET
    pib_total_mil = EXCLUDED.pib_total_mil,
    impostos_liquidos_mil = EXCLUDED.impostos_liquidos_mil,
    pib_per_capita = EXCLUDED.pib_per_capita,
    vab_total_mil = EXCLUDED.vab_total_mil,
    agropecuaria_mil = EXCLUDED.agropecuaria_mil,
    industria_mil = EXCLUDED.industria_mil,
    servicos_privados_mil = EXCLUDED.servicos_privados_mil,
    administracao_publica_mil = EXCLUDED.administracao_publica_mil;

-- Verificação
SELECT 
    'PIB Municipal cadastrado:' as tipo,
    ano,
    municipio,
    CONCAT('R$ ', TO_CHAR(pib_total_mil / 1000, 'FM999G999G999D99'), ' bilhões') as pib_total,
    CONCAT('R$ ', TO_CHAR(pib_per_capita, 'FM999G999D99')) as pib_per_capita
FROM pib_municipal
WHERE ano = 2021;

