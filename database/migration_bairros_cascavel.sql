-- =====================================================
-- MIGRAÇÃO: Adicionar loteamentos e popular bairros reais de Cascavel
-- =====================================================

-- Adicionar coluna loteamentos na tabela bairros
ALTER TABLE bairros ADD COLUMN IF NOT EXISTS loteamentos TEXT;

-- Limpar dados antigos de bairros (se houver mock)
TRUNCATE TABLE bairros CASCADE;

-- Popular com os 29 bairros reais de Cascavel e seus loteamentos
INSERT INTO bairros (nome, regiao, area_km2, loteamentos, populacao_estimada, renda_media_domiciliar, cor_mapa) VALUES
('Centro', 'Centro', 6.23, 'Centro', 12500, 4500.00, '#FF6B6B'),
('Cancelli', 'Norte', 3.22, 'Cancelli', 8200, 3200.00, '#4ECDC4'),
('Country', 'Oeste', 2.16, 'Country', 5800, 5200.00, '#95E1D3'),
('São Cristóvão', 'Leste', 3.66, 'Santo Anastácio, Margarida, São Cristóvão, Piquiri, Paraíso, Loteamento Pinheiros, Primavera, Fazendinha, Jardim Aparecida, Loteamento Paraná, Loteamento Santo Antônio, Vieira, Bazé, Nossa Srª Aparecida, Araguaia, Vila Aparecida, Loteamento São Carlos e Jardim França', 15200, 2800.00, '#F38181'),
('Pacaembu', 'Norte', 1.45, 'Pacaembu e Nacional', 4500, 3500.00, '#AA96DA'),
('Região do Lago', 'Oeste', 4.90, 'Caravelle, Itaipu, Itamarati, Champagnat, Lago Dourado, Nova York e Das Nações', 18500, 6200.00, '#FCBAD3'),
('Maria Luiza', 'Sul', 2.01, 'Maria Luiza', 6800, 3100.00, '#FFFFD2'),
('Parque São Paulo', 'Norte', 3.10, 'São Paulo', 9200, 3400.00, '#A8D8EA'),
('Neva', 'Leste', 2.59, 'Neva, Vila Tolentino', 7500, 2900.00, '#AA96DA'),
('Pioneiros Catarinenses', 'Sul', 2.57, 'Pioneiros Catarinenses, Ninho-da-Cobra, Santa Mônica, Vila Dione', 8900, 3200.00, '#FFCCCC'),
('Santo Onofre', 'Norte', 1.14, 'Santo Onofre e Bom Jesus', 3800, 3300.00, '#C7CEEA'),
('Alto Alegre', 'Oeste', 2.17, 'Alto Alegre', 6200, 3100.00, '#FFDAC1'),
('Coqueiral', 'Sul', 1.77, 'Coqueiral, Aclimação', 5500, 3000.00, '#FF9AA2'),
('Parque Verde', 'Leste', 1.31, 'Portal do Vale, Parque Verde, Vale do Sol, Conjunto Habitacional Vale do Sol, Jardim Cidade Verde, Conjunto Residencial São Carlos, Conjunto Residencial Palmeiras e Terra Nova Cascavel II, Terra Nova Cascavel III', 4800, 2700.00, '#B5EAD7'),
('Recanto Tropical', 'Oeste', 2.25, 'Cristal e Recanto Tropical', 6500, 3400.00, '#C7CEEA'),
('Canadá', 'Norte', 2.85, 'Canadá', 8100, 3600.00, '#FFB6B9'),
('Brazmadeira', 'Sul', 2.08, 'Brazmadeira, Melissa, Tocantins I, Tocantins II, Rio Branco, Jardim Paraná, Lumar, Dona Delfina, Garbim e Jardim Caiobá', 7200, 2900.00, '#FEC8D8'),
('Interlagos', 'Leste', 1.81, 'Tarumã, Abelha e Interlagos', 5900, 3200.00, '#FFDFD3'),
('Floresta', 'Oeste', 2.84, 'Floresta, Clarito, Florais do Paraná, Riviera', 8500, 3800.00, '#A8E6CF'),
('Brasília', 'Norte', 2.51, 'Alvorada, Esteves, Consolata, São José, Los Angeles, Verdes Campos, Brasília I, Brasília II, Santa Marta, De Napoli, Panorama, Conjunto Residencial Bela Vista I, Santa Mariana I, Santa Mariana II e Santa Mariana III', 9800, 3100.00, '#DCEDC1'),
('Periolo', 'Sul', 2.10, 'Caroline, Jardim Belo Horizonte, Indianara, Kennedy, Soares, Colaço, Davi, Santana, Los Álamos, Periolo, Conjunto Habitacional São Francisco e Ipanema', 7600, 2800.00, '#FFD3B6'),
('Morumbi', 'Oeste', 1.48, 'Chácaras Mantovani, Morumbi e Chácara Recreio Lago Azul', 4200, 4800.00, '#FFAAA5'),
('Cataratas', 'Leste', 2.19, 'Cataratas, Loteamento São Francisco, Recanto Azul, Loteamento Isabel, Wanda, Estrela do Mar, Colméia, Morada do Sol e Núcleo Produtores Industrial II Cataratas', 6900, 3000.00, '#FF8B94'),
('Cascavel Velho', 'Sul', 3.54, 'Novo Mundo, Encantado, Roberta, Jaraguá, Europa, Nova Itália, Presidente, Jardim veneza e Parque Residencial Colina Verde', 11200, 2900.00, '#A8E6CF'),
('Santa Felicidade', 'Norte', 3.81, 'Santa Felicidade, Petrópolis, Itapuã e Jardim Horizonte', 12500, 3400.00, '#DCEDC1'),
('Universitário', 'Centro', 3.29, 'Universitário, Urussanga, Marília, Dona Josephina, Nélida, São Luiz, Parque Cascavel, Turisparque, Maristela, Santa Catarina, Jaçanã, Imperial, Capanema, Panorâmico, Maria de Lourdes, Universitário, Nova Cidade e Jardim União', 13800, 3500.00, '#FFD3B6'),
('XIV De Novembro', 'Centro', 2.55, 'XIV de Novembro, Marisa, Esplanada, Jardim Montreal e Quebec', 8700, 3300.00, '#FFAAA5'),
('Santos Dumont', 'Centro', 0.99, 'Santos Dumont', 3500, 3800.00, '#FEC8D8'),
('Santa Cruz', 'Leste', 4.40, 'Jardim Santo Onofre, Jardim Santo Antônio, Jardim FAG, Terra Nova Cascavel, Beldevere Cascavel, Jardim Santa Cruz, Tio Zaca, Paulo Godoy, Florença e Bom Jesus', 14200, 3100.00, '#C7CEEA'),
('Esmeralda', 'Oeste', 2.49, 'Esmeralda e Siena', 7100, 3400.00, '#B5EAD7');

-- Atualizar densidade demográfica
UPDATE bairros SET densidade_demografica = ROUND(populacao_estimada / area_km2, 2);

-- Adicionar coordenadas fictícias para o centro de cada bairro (podem ser ajustadas depois)
UPDATE bairros SET coordenadas_centro = POINT(-53.4552 + (random() * 0.1 - 0.05), -24.9555 + (random() * 0.1 - 0.05));

-- Criar polígonos simples para cada bairro (podem ser refinados depois com dados reais)
UPDATE bairros 
SET poligono = ST_MakeEnvelope(
    -53.50 + (id * 0.01), 
    -25.00 + (id * 0.01), 
    -53.45 + (id * 0.01), 
    -24.95 + (id * 0.01), 
    4326
);

-- Criar tabela de loteamentos (opcional, para queries mais detalhadas)
DROP TABLE IF EXISTS loteamentos CASCADE;
CREATE TABLE loteamentos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(200) NOT NULL,
    bairro_id INTEGER REFERENCES bairros(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(nome, bairro_id)
);

-- Popular loteamentos a partir dos dados de bairros
-- (Executar manualmente depois se necessário)

COMMENT ON TABLE bairros IS 'Bairros reais de Cascavel com loteamentos';
COMMENT ON COLUMN bairros.loteamentos IS 'Lista de loteamentos do bairro separados por vírgula';
COMMENT ON TABLE loteamentos IS 'Tabela auxiliar de loteamentos para queries detalhadas';

