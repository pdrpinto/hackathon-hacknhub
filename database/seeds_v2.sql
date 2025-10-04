-- =====================================================
-- SEEDS REALISTAS - CASCAVEL EM NÚMEROS
-- Dados mockados baseados em características reais de Cascavel/PR
-- =====================================================

-- =====================================================
-- 1. BAIRROS DE CASCAVEL (25 principais)
-- =====================================================
INSERT INTO bairros (nome, regiao, area_km2, populacao_estimada, densidade_demografica, renda_media_domiciliar, coordenadas_centro, cor_mapa) VALUES
-- Centro e região central
('Centro', 'Centro', 3.50, 18500, 5285.71, 4500.00, POINT(-53.455, -24.955), '#2E7D32'),
('Brasmadeira', 'Centro', 2.80, 15200, 5428.57, 3200.00, POINT(-53.465, -24.945), '#388E3C'),
('Universitário', 'Centro', 4.20, 22000, 5238.10, 5200.00, POINT(-53.460, -24.960), '#43A047'),

-- Região Norte
('Coqueiral', 'Norte', 5.50, 25000, 4545.45, 2800.00, POINT(-53.450, -24.935), '#1976D2'),
('Cancelli', 'Norte', 3.80, 16500, 4342.11, 2600.00, POINT(-53.455, -24.940), '#1E88E5'),
('Floresta', 'Norte', 4.50, 19000, 4222.22, 3100.00, POINT(-53.445, -24.930), '#2196F3'),
('Interlagos', 'Norte', 6.20, 28000, 4516.13, 3400.00, POINT(-53.440, -24.925), '#42A5F5'),
('Santos Dumont', 'Norte', 3.20, 14000, 4375.00, 2900.00, POINT(-53.462, -24.932), '#64B5F6'),

-- Região Sul
('Esmeralda', 'Sul', 7.80, 32000, 4102.56, 2400.00, POINT(-53.450, -24.985), '#C62828'),
('Palmeiras', 'Sul', 5.40, 21000, 3888.89, 2700.00, POINT(-53.455, -24.980), '#D32F2F'),
('Pacaembu', 'Sul', 4.90, 18500, 3775.51, 3000.00, POINT(-53.460, -24.975), '#E53935'),
('Santa Cruz', 'Sul', 6.50, 26000, 4000.00, 2500.00, POINT(-53.445, -24.990), '#F44336'),
('XIV de Novembro', 'Sul', 5.20, 20500, 3942.31, 2800.00, POINT(-53.465, -24.988), '#EF5350'),

-- Região Leste
('Cascavel Velho', 'Leste', 8.50, 35000, 4117.65, 2200.00, POINT(-53.425, -24.955), '#F57C00'),
('Periolo', 'Leste', 6.80, 27000, 3970.59, 2600.00, POINT(-53.430, -24.960), '#FB8C00'),
('Neva', 'Leste', 7.20, 29000, 4027.78, 2300.00, POINT(-53.420, -24.965), '#FF9800'),
('Santa Felicidade', 'Leste', 5.60, 22000, 3928.57, 2900.00, POINT(-53.432, -24.950), '#FFA726'),

-- Região Oeste
('Cataratas', 'Oeste', 9.20, 38000, 4130.43, 2100.00, POINT(-53.485, -24.955), '#7B1FA2'),
('Brasília', 'Oeste', 7.40, 30000, 4054.05, 2500.00, POINT(-53.480, -24.960), '#8E24AA'),
('Pioneiros', 'Oeste', 6.90, 28000, 4057.97, 2400.00, POINT(-53.475, -24.950), '#9C27B0'),
('Parque Verde', 'Oeste', 8.80, 34000, 3863.64, 2200.00, POINT(-53.490, -24.965), '#AB47BC'),

-- Bairros Periféricos
('Morumbi', 'Sul', 10.50, 42000, 4000.00, 1900.00, POINT(-53.455, -25.000), '#EF5350'),
('Guarujá', 'Norte', 11.20, 45000, 4017.86, 1800.00, POINT(-53.438, -24.915), '#64B5F6'),
('Santa Bárbara', 'Oeste', 9.80, 39000, 3979.59, 2000.00, POINT(-53.495, -24.970), '#AB47BC'),
('Lago Azul', 'Leste', 12.50, 48000, 3840.00, 1700.00, POINT(-53.415, -24.970), '#FFA726');

-- =====================================================
-- 2. CNAEs (Classificação Nacional de Atividades Econômicas)
-- =====================================================
INSERT INTO cnae (codigo, descricao, setor) VALUES
('4711-3/01', 'Comércio varejista de mercadorias em geral', 'Comércio'),
('4712-1/00', 'Comércio varejista de mercadorias em lojas de conveniência', 'Comércio'),
('4721-1/02', 'Padaria e confeitaria com predominância de revenda', 'Comércio'),
('4723-7/00', 'Comércio varejista de bebidas', 'Comércio'),
('4744-0/05', 'Comércio varejista de medicamentos e artigos de perfumaria', 'Comércio'),
('5611-2/01', 'Restaurantes e similares', 'Serviços'),
('5620-1/01', 'Fornecimento de alimentos preparados', 'Serviços'),
('8511-2/00', 'Educação infantil - creche', 'Serviços'),
('8512-1/00', 'Educação infantil - pré-escola', 'Serviços'),
('8513-9/00', 'Ensino fundamental', 'Serviços'),
('8520-1/00', 'Ensino médio', 'Serviços'),
('8610-1/01', 'Atividades de atendimento hospitalar', 'Saúde'),
('8630-5/01', 'Atividade médica ambulatorial restrita a consultas', 'Saúde'),
('8640-2/01', 'Laboratórios de anatomia patológica e citológica', 'Saúde'),
('10.91-1/01', 'Fabricação de produtos de panificação industrial', 'Indústria'),
('10.92-9/01', 'Fabricação de biscoitos e bolachas', 'Indústria'),
('25.11-0/00', 'Fabricação de estruturas metálicas', 'Indústria'),
('28.13-9/00', 'Fabricação de válvulas, registros e dispositivos', 'Indústria'),
('29.42-2/00', 'Fabricação de caminhões e ônibus', 'Indústria'),
('47.11-3/02', 'Minimercados, mercearias e armazéns', 'Comércio');

-- =====================================================
-- 3. INDICADORES POR BAIRRO (2020-2023)
-- =====================================================

-- Função auxiliar para gerar variação realista
DO $$
DECLARE
    bairro_rec RECORD;
    ano_atual INTEGER;
    base_pop INTEGER;
    base_empresas INTEGER;
    base_empregos INTEGER;
BEGIN
    FOR bairro_rec IN SELECT id, nome, populacao_estimada FROM bairros LOOP
        FOR ano_atual IN 2020..2023 LOOP
            base_pop := bairro_rec.populacao_estimada + ((ano_atual - 2023) * FLOOR(RANDOM() * 200 - 100));
            base_empresas := FLOOR(base_pop * 0.015 * (1 + RANDOM() * 0.1));
            base_empregos := FLOOR(base_pop * 0.35 * (1 + RANDOM() * 0.15));
            
            INSERT INTO indicadores_bairro (
                bairro_id, ano,
                populacao, taxa_crescimento, densidade,
                matriculas_total, matriculas_fundamental, matriculas_medio,
                escolas_municipais, escolas_estaduais, taxa_alfabetizacao,
                unidades_saude, leitos_disponiveis, atendimentos_mes, taxa_mortalidade_infantil,
                domicilios_total, cobertura_agua, cobertura_esgoto, coleta_lixo, iluminacao_publica,
                consumo_energia_kwh, consumidores_energia,
                empresas_ativas, empregos_formais, renda_media
            ) VALUES (
                bairro_rec.id, ano_atual,
                base_pop,
                1.2 + RANDOM() * 0.8, -- Taxa crescimento 1.2-2.0%
                base_pop / (SELECT area_km2 FROM bairros WHERE id = bairro_rec.id),
                FLOOR(base_pop * 0.15 * (1 + RANDOM() * 0.1)), -- 15% da pop são estudantes
                FLOOR(base_pop * 0.10), -- Fundamental
                FLOOR(base_pop * 0.04), -- Médio
                FLOOR(RANDOM() * 5 + 2), -- 2-7 escolas municipais
                FLOOR(RANDOM() * 3 + 1), -- 1-4 escolas estaduais
                94.5 + RANDOM() * 3.5, -- Taxa alfabetização 94.5-98%
                FLOOR(RANDOM() * 8 + 2), -- 2-10 unidades de saúde
                FLOOR(RANDOM() * 50 + 10), -- 10-60 leitos
                FLOOR(base_pop * 0.8 + RANDOM() * base_pop * 0.4), -- Atendimentos
                8.5 + RANDOM() * 4.5, -- Mortalidade infantil 8.5-13 por mil
                FLOOR(base_pop / 3.2), -- Domicílios (média 3.2 pessoas/domicílio)
                88.0 + RANDOM() * 10.0, -- Cobertura água 88-98%
                75.0 + RANDOM() * 20.0, -- Cobertura esgoto 75-95%
                92.0 + RANDOM() * 7.0, -- Coleta lixo 92-99%
                95.0 + RANDOM() * 4.5, -- Iluminação 95-99.5%
                FLOOR(base_pop * 180 + RANDOM() * base_pop * 50), -- Consumo energia
                FLOOR(base_pop / 3.5), -- Consumidores energia
                base_empresas,
                base_empregos,
                1800.0 + RANDOM() * 3200.0 -- Renda média R$ 1800-5000
            );
        END LOOP;
    END LOOP;
END $$;

-- =====================================================
-- 4. EMPRESAS POR BAIRRO E CNAE
-- =====================================================

DO $$
DECLARE
    bairro_rec RECORD;
    cnae_rec RECORD;
    ano_atual INTEGER;
    empresas_total INTEGER;
BEGIN
    FOR bairro_rec IN SELECT id, populacao_estimada FROM bairros LIMIT 15 LOOP -- Top 15 bairros
        FOR cnae_rec IN SELECT id FROM cnae WHERE setor IN ('Comércio', 'Serviços') LOOP
            FOR ano_atual IN 2021..2023 LOOP
                empresas_total := FLOOR(bairro_rec.populacao_estimada * 0.001 * (1 + RANDOM()));
                
                INSERT INTO empresas_bairro (
                    bairro_id, cnae_id, ano,
                    empresas_ativas, empresas_abertas, empresas_fechadas,
                    empregos_gerados, massa_salarial
                ) VALUES (
                    bairro_rec.id, cnae_rec.id, ano_atual,
                    empresas_total,
                    FLOOR(empresas_total * (0.08 + RANDOM() * 0.12)), -- 8-20% abertura
                    FLOOR(empresas_total * (0.05 + RANDOM() * 0.08)), -- 5-13% fechamento
                    FLOOR(empresas_total * (2 + RANDOM() * 4)), -- 2-6 empregos por empresa
                    (empresas_total * (2 + RANDOM() * 4) * (1500 + RANDOM() * 2000))::DECIMAL(15,2)
                );
            END LOOP;
        END LOOP;
    END LOOP;
END $$;

-- =====================================================
-- 5. BASELINE (VALORES NORMAIS) POR BAIRRO
-- =====================================================

INSERT INTO baseline_indicadores (bairro_id, indicador, valor_medio, desvio_padrao, minimo, maximo, ano_referencia)
SELECT 
    bairro_id,
    'populacao' as indicador,
    AVG(populacao) as valor_medio,
    STDDEV(populacao) as desvio_padrao,
    MIN(populacao) as minimo,
    MAX(populacao) as maximo,
    2022 as ano_referencia
FROM indicadores_bairro
WHERE ano BETWEEN 2020 AND 2022
GROUP BY bairro_id;

INSERT INTO baseline_indicadores (bairro_id, indicador, valor_medio, desvio_padrao, minimo, maximo, ano_referencia)
SELECT 
    bairro_id,
    'empresas_ativas' as indicador,
    AVG(empresas_ativas) as valor_medio,
    STDDEV(empresas_ativas) as desvio_padrao,
    MIN(empresas_ativas) as minimo,
    MAX(empresas_ativas) as maximo,
    2022 as ano_referencia
FROM indicadores_bairro
WHERE ano BETWEEN 2020 AND 2022
GROUP BY bairro_id;

INSERT INTO baseline_indicadores (bairro_id, indicador, valor_medio, desvio_padrao, minimo, maximo, ano_referencia)
SELECT 
    bairro_id,
    'renda_media' as indicador,
    AVG(renda_media) as valor_medio,
    STDDEV(renda_media) as desvio_padrao,
    MIN(renda_media) as minimo,
    MAX(renda_media) as maximo,
    2022 as ano_referencia
FROM indicadores_bairro
WHERE ano BETWEEN 2020 AND 2022
GROUP BY bairro_id;

INSERT INTO baseline_indicadores (bairro_id, indicador, valor_medio, desvio_padrao, minimo, maximo, ano_referencia)
SELECT 
    bairro_id,
    'cobertura_agua' as indicador,
    AVG(cobertura_agua) as valor_medio,
    STDDEV(cobertura_agua) as desvio_padrao,
    MIN(cobertura_agua) as minimo,
    MAX(cobertura_agua) as maximo,
    2022 as ano_referencia
FROM indicadores_bairro
WHERE ano BETWEEN 2020 AND 2022
GROUP BY bairro_id;

-- =====================================================
-- 6. IDH POR BAIRRO (2010, 2015, 2020)
-- =====================================================

DO $$
DECLARE
    bairro_rec RECORD;
    base_idh DECIMAL(5,3);
BEGIN
    FOR bairro_rec IN SELECT id, renda_media_domiciliar FROM bairros LOOP
        -- IDH 2010
        base_idh := 0.650 + (bairro_rec.renda_media_domiciliar / 10000.0);
        INSERT INTO idh_bairro (bairro_id, ano, idh_geral, idh_renda, idh_educacao, idh_longevidade, indice_gini)
        VALUES (bairro_rec.id, 2010, LEAST(base_idh + RANDOM() * 0.05, 0.850), LEAST(base_idh + RANDOM() * 0.04, 0.830),
                LEAST(0.680 + RANDOM() * 0.12, 0.850), LEAST(0.720 + RANDOM() * 0.10, 0.880), 0.450 + RANDOM() * 0.150);
        
        -- IDH 2015
        base_idh := 0.690 + (bairro_rec.renda_media_domiciliar / 10000.0);
        INSERT INTO idh_bairro (bairro_id, ano, idh_geral, idh_renda, idh_educacao, idh_longevidade, indice_gini)
        VALUES (bairro_rec.id, 2015, LEAST(base_idh + RANDOM() * 0.05, 0.850), LEAST(base_idh + RANDOM() * 0.04, 0.830),
                LEAST(0.690 + RANDOM() * 0.12, 0.850), LEAST(0.730 + RANDOM() * 0.10, 0.880), 0.450 + RANDOM() * 0.150);
        
        -- IDH 2020
        base_idh := 0.730 + (bairro_rec.renda_media_domiciliar / 10000.0);
        INSERT INTO idh_bairro (bairro_id, ano, idh_geral, idh_renda, idh_educacao, idh_longevidade, indice_gini)
        VALUES (bairro_rec.id, 2020, LEAST(base_idh + RANDOM() * 0.05, 0.850), LEAST(base_idh + RANDOM() * 0.04, 0.830),
                LEAST(0.700 + RANDOM() * 0.12, 0.850), LEAST(0.740 + RANDOM() * 0.10, 0.880), 0.450 + RANDOM() * 0.150);
    END LOOP;
END $$;

-- =====================================================
-- 7. ATUALIZAR POLÍGONOS DOS BAIRROS (simplificado)
-- =====================================================

-- Polígonos serão criados na aplicação ou manualmente
-- Por enquanto, apenas criar um polígono simples baseado em retângulo ao redor dos centros

UPDATE bairros SET poligono = ST_MakeEnvelope(
    coordenadas_centro[0] - 0.02,  -- longitude - offset
    coordenadas_centro[1] - 0.015, -- latitude - offset
    coordenadas_centro[0] + 0.02,  -- longitude + offset
    coordenadas_centro[1] + 0.015, -- latitude + offset
    4326
) WHERE coordenadas_centro IS NOT NULL;

-- =====================================================
-- VERIFICAÇÕES
-- =====================================================

-- Total de registros
SELECT 'Bairros cadastrados:' as tipo, COUNT(*) as total FROM bairros
UNION ALL
SELECT 'CNAEs cadastradas:', COUNT(*) FROM cnae
UNION ALL
SELECT 'Indicadores por bairro:', COUNT(*) FROM indicadores_bairro
UNION ALL
SELECT 'Empresas por bairro/CNAE:', COUNT(*) FROM empresas_bairro
UNION ALL
SELECT 'Baselines calculados:', COUNT(*) FROM baseline_indicadores
UNION ALL
SELECT 'IDH por bairro:', COUNT(*) FROM idh_bairro;

