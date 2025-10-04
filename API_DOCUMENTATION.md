# 📚 API Documentation - Cascavel em Números

**Versão:** 2.0.0  
**Base URL:** `http://localhost:5000/api`  
**Formato:** JSON  
**Autenticação:** Não requerida (MVP)

---

## 📋 Índice

- [Health Check](#health-check)
- [Bairros](#bairros)
- [Indicadores](#indicadores)
- [Economia](#economia)
- [Mapas](#mapas)
- [Anomalias](#anomalias)
- [Predições](#predicoes)
- [Exportação](#exportacao)

---

## 🏥 Health Check

### GET /api/health

Verifica o status da API e conexão com banco de dados.

**Resposta de Sucesso (200)**
```json
{
  "status": "healthy",
  "database": "connected",
  "message": "Sistema Cascavel em Números - API v2 focada em bairros"
}
```

---

## 🏘️ Bairros

### GET /api/bairros

Lista todos os bairros de Cascavel.

**Resposta de Sucesso (200)**
```json
{
  "sucesso": true,
  "dados": [
    {
      "id": 1,
      "nome": "Centro",
      "regiao": "Centro",
      "area_km2": 3.5,
      "populacao_estimada": 18500,
      "densidade_demografica": 5285.71,
      "renda_media_domiciliar": 4500.0,
      "cor_mapa": "#2E7D32",
      "centro": "{\"type\":\"Point\",\"coordinates\":[-53.455,-24.955]}",
      "poligono": "{...}"
    }
  ]
}
```

### GET /api/bairros/:id

Retorna detalhes de um bairro específico com indicadores mais recentes.

**Parâmetros de URL**
- `id` (integer, required) - ID do bairro

**Resposta de Sucesso (200)**
```json
{
  "sucesso": true,
  "dados": {
    "id": 1,
    "nome": "Centro",
    "regiao": "Centro",
    "area_km2": 3.5,
    "populacao_estimada": 18500,
    "indicadores_recentes": {
      "ano": 2023,
      "populacao": 18500,
      "densidade": 5285.71,
      "renda_media": 3200.0,
      "empresas_ativas": 450,
      "empregos_formais": 6475,
      "cobertura_agua": 94.0,
      "cobertura_esgoto": 85.0,
      "idh_geral": 0.782
    }
  }
}
```

### GET /api/bairros/regiao/:regiao

Lista bairros de uma região específica.

**Parâmetros de URL**
- `regiao` (string, required) - Norte, Sul, Leste, Oeste, Centro

**Resposta de Sucesso (200)**
```json
{
  "sucesso": true,
  "regiao": "Norte",
  "total": 5,
  "dados": [...]
}
```

### GET /api/bairros/mapa/geojson

Retorna dados GeoJSON para renderização de mapas.

**Resposta de Sucesso (200)**
```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [[...]]
      },
      "properties": {
        "id": 1,
        "nome": "Centro",
        "regiao": "Centro",
        "populacao": 18500,
        "cor": "#2E7D32"
      }
    }
  ]
}
```

---

## 📊 Indicadores

### GET /api/indicadores

Retorna indicadores socioeconômicos com filtros.

**Query Parameters**
- `bairro_id` (integer, optional) - Filtrar por ID do bairro
- `regiao` (string, optional) - Filtrar por região
- `ano_inicio` (integer, optional, default: 2020) - Ano inicial
- `ano_fim` (integer, optional, default: 2023) - Ano final
- `cnae_id` (integer, optional) - Filtrar por CNAE

**Resposta de Sucesso (200)**
```json
{
  "sucesso": true,
  "total": 120,
  "dados": [
    {
      "bairro_id": 1,
      "bairro_nome": "Centro",
      "regiao": "Centro",
      "ano": 2023,
      "mes": null,
      "populacao": 18500,
      "taxa_crescimento": 1.8,
      "densidade": 5285.71,
      "matriculas_total": 2775,
      "unidades_saude": 6,
      "empresas_ativas": 333,
      "empregos_formais": 6475,
      "renda_media": 3200.0,
      "cobertura_agua": 94.0,
      "cobertura_esgoto": 85.0
    }
  ]
}
```

### GET /api/indicadores/kpis

Retorna KPIs agregados da cidade.

**Query Parameters**
- `ano` (integer, optional, default: 2023) - Ano de referência

**Resposta de Sucesso (200)**
```json
{
  "sucesso": true,
  "dados": {
    "ano_referencia": 2023,
    "populacao_total": 158500,
    "densidade_media": 4523.45,
    "taxa_alfabetizacao_media": 96.5,
    "matriculas_total": 23775,
    "unidades_saude_total": 30,
    "leitos_total": 200,
    "cobertura_agua_media": 94.0,
    "cobertura_esgoto_media": 85.0,
    "empresas_ativas_total": 2853,
    "empregos_formais_total": 55475,
    "renda_media": 3200.0,
    "idh_medio": 0.768
  }
}
```

### GET /api/indicadores/serie-temporal/:indicador

Retorna série temporal de um indicador específico.

**Parâmetros de URL**
- `indicador` (string, required) - Nome do indicador (populacao, densidade, renda_media, empresas_ativas, etc.)

**Query Parameters**
- `bairro_id` (integer, optional) - Filtrar por bairro
- `ano_inicio` (integer, optional, default: 2020)
- `ano_fim` (integer, optional, default: 2023)

**Resposta de Sucesso (200)**
```json
{
  "sucesso": true,
  "indicador": "populacao",
  "dados": [
    {
      "ano": 2020,
      "bairro_id": 1,
      "valor": 17800
    },
    {
      "ano": 2021,
      "bairro_id": 1,
      "valor": 18100
    }
  ]
}
```

### GET /api/indicadores/comparacao-regioes

Compara indicadores entre regiões.

**Query Parameters**
- `ano` (integer, optional, default: 2023)
- `indicador` (string, optional, default: "populacao")

**Resposta de Sucesso (200)**
```json
{
  "sucesso": true,
  "indicador": "populacao",
  "ano": 2023,
  "dados": [
    {
      "regiao": "Norte",
      "valor_medio": 25000,
      "total_bairros": 5
    }
  ]
}
```

### GET /api/indicadores/baseline/:indicador

Retorna valores normais (baseline) de um indicador para detecção de anomalias.

**Parâmetros de URL**
- `indicador` (string, required) - Nome do indicador

**Query Parameters**
- `bairro_id` (integer, optional) - Filtrar por bairro

**Resposta de Sucesso (200)**
```json
{
  "sucesso": true,
  "indicador": "populacao",
  "dados": [
    {
      "bairro_id": 1,
      "bairro_nome": "Centro",
      "valor_medio": 18200.5,
      "desvio_padrao": 245.3,
      "minimo": 17800,
      "maximo": 18600,
      "ano_referencia": 2022
    }
  ]
}
```

---

## 💼 Economia

### GET /api/economia/kpis

Retorna KPIs econômicos (empresas, empregos, massa salarial).

**Query Parameters**
- `ano` (integer, optional, default: 2023)
- `bairro_id` (integer, optional)
- `regiao` (string, optional)
- `cnae_id` (integer, optional)

**Resposta de Sucesso (200)**
```json
{
  "sucesso": true,
  "dados": {
    "ano": 2023,
    "empresas_ativas_total": 2853,
    "empresas_abertas_total": 456,
    "empresas_fechadas_total": 234,
    "saldo_empresas": 222,
    "empregos_gerados_total": 3680,
    "massa_salarial_total": 10304000.0,
    "ticket_medio_salarial": 2800.0
  }
}
```

### GET /api/economia/serie

Retorna série temporal de indicadores econômicos.

**Query Parameters**
- `indicador` (string, optional, default: "empresas_abertas") - empresas_abertas, empresas_fechadas, empresas_ativas, empregos_gerados, massa_salarial
- `ano_inicio` (integer, optional, default: 2020)
- `ano_fim` (integer, optional, default: 2023)
- `bairro_id` (integer, optional)
- `regiao` (string, optional)
- `cnae_id` (integer, optional)

**Resposta de Sucesso (200)**
```json
{
  "sucesso": true,
  "indicador": "empresas_abertas",
  "dados": [
    {
      "ano": 2020,
      "valor": 380.0
    },
    {
      "ano": 2021,
      "valor": 405.0
    }
  ]
}
```

### GET /api/economia/cnae/top

Retorna top CNAEs por métrica escolhida.

**Query Parameters**
- `ano` (integer, optional, default: 2023)
- `metric` (string, optional, default: "empresas_ativas") - empresas_ativas, empregos_gerados, empresas_abertas
- `limit` (integer, optional, default: 10)
- `bairro_id` (integer, optional)
- `regiao` (string, optional)

**Resposta de Sucesso (200)**
```json
{
  "sucesso": true,
  "ano": 2023,
  "metric": "empresas_ativas",
  "dados": [
    {
      "cnae_id": 1,
      "codigo": "4711-3/01",
      "descricao": "Comércio varejista de mercadorias em geral",
      "setor": "Comércio",
      "valor": 450.0
    }
  ]
}
```

### GET /api/economia/pib

Retorna dados do PIB Municipal (IBGE).

**Query Parameters**
- `ano` (integer, optional, default: 2021) - Anos disponíveis: 2018-2023

**Resposta de Sucesso (200)**
```json
{
  "sucesso": true,
  "dados": {
    "ano": 2023,
    "municipio": "Cascavel",
    "pib_total_mil": 18902345.2,
    "impostos_liquidos_mil": 2646328.3,
    "pib_per_capita": 55182.7,
    "vab_total_mil": 16256016.9,
    "agropecuaria_mil": 1525148.5,
    "industria_mil": 3182874.8,
    "servicos_privados_mil": 9691952.9,
    "administracao_publica_mil": 1856040.7
  }
}
```

### GET /api/economia/empresas/cadastro

Lista empresas do cadastro individual (CNPJ completo).

**Query Parameters**
- `bairro_id` (integer, optional)
- `cnae_id` (integer, optional)
- `situacao` (string, optional) - ATIVA, BAIXADA, SUSPENSA, INAPTA
- `limit` (integer, optional, default: 50, max: 500)
- `offset` (integer, optional, default: 0)

**Resposta de Sucesso (200)**
```json
{
  "sucesso": true,
  "total": 1000,
  "limit": 50,
  "offset": 0,
  "dados": [
    {
      "id": 1,
      "cnpj": "12.345.678/0001-90",
      "razao_social": "Comercial Silva Ltda",
      "nome_fantasia": "Comercial Silva",
      "cnae_codigo": "4711-3/01",
      "cnae_descricao": "Comércio varejista...",
      "bairro": "Centro",
      "regiao": "Centro",
      "endereco": {
        "logradouro": "Rua das Flores",
        "numero": "123",
        "complemento": "Sala 1",
        "cep": "85801-010"
      },
      "data_abertura": "2020-05-15",
      "situacao_cadastral": "ATIVA",
      "porte": "ME",
      "capital_social": 50000.0
    }
  ]
}
```

### GET /api/economia/export/csv

Exporta dados econômicos em formato CSV.

**Query Parameters**
- `ano` (integer, optional, default: 2023)
- `bairro_id` (integer, optional)
- `regiao` (string, optional)
- `cnae_id` (integer, optional)

**Resposta de Sucesso (200)**
```
Content-Type: text/csv
Content-Disposition: attachment; filename="economia_2023.csv"

ano;bairro_id;bairro;regiao;cnae_id;cnae_codigo;cnae_descricao;setor;...
2023;1;Centro;Centro;1;4711-3/01;Comércio varejista...;Comércio;...
```

### POST /api/economia/ingest/caged

Executa ingestão mock de dados CAGED (admissões, desligamentos).

**Request Body**
```json
{
  "ano_inicio": 2019,
  "ano_fim": 2023
}
```

**Resposta de Sucesso (200)**
```json
{
  "ok": true,
  "msg": "Ingestão mock CAGED concluída 2019-2023",
  "cnaes": 20,
  "bairros": 25
}
```

### POST /api/economia/ingest/empresas

Gera cadastro mock de empresas com CNPJ e agrega para empresas_bairro.

**Request Body**
```json
{
  "total_empresas": 1000,
  "ano_inicio_empresas": 2015,
  "ano_fim_empresas": 2023,
  "ano_inicio_agregacao": 2019,
  "ano_fim_agregacao": 2023
}
```

**Resposta de Sucesso (200)**
```json
{
  "ok": true,
  "msg": "Pipeline completo executado com sucesso",
  "empresas": {
    "total_empresas": 1000,
    "bairros": 25,
    "cnaes": 20
  },
  "agregacao": {
    "total_registros": 5000,
    "bairros": 25,
    "cnaes": 20,
    "total_aberturas": 3500,
    "total_fechamentos": 1500
  }
}
```

### POST /api/economia/seed-demo

Popula banco com dados de demonstração mínimos (bairros, CNAE, indicadores, empresas, PIB).

**Request Body**
```json
{
  "ano_indicadores": 2023,
  "ano_empresas": 2023
}
```

**Resposta de Sucesso (200)**
```json
{
  "ok": true,
  "dados": {
    "bairros_inseridos": 5,
    "cnae_inseridos": 4,
    "indicadores_inseridos": 5,
    "empresas_bairro_inseridos": 20,
    "pib_inseridos": 6
  }
}
```

---

## 🗺️ Mapas

### GET /api/mapas/bairros

Lista bairros com dados para visualização em mapa.

**Resposta de Sucesso (200)**
```json
{
  "sucesso": true,
  "dados": [...]
}
```

### GET /api/mapas/geojson

Retorna GeoJSON completo para renderização de mapas interativos.

**Resposta de Sucesso (200)**
```json
{
  "type": "FeatureCollection",
  "features": [...]
}
```

### GET /api/mapas/cnae

Lista todas as CNAEs cadastradas.

**Resposta de Sucesso (200)**
```json
{
  "sucesso": true,
  "total": 20,
  "dados": [
    {
      "id": 1,
      "codigo": "4711-3/01",
      "descricao": "Comércio varejista de mercadorias em geral",
      "setor": "Comércio"
    }
  ]
}
```

---

## ⚠️ Anomalias

### GET /api/anomalias/detectar

Detecta anomalias nos indicadores (mock).

**Query Parameters**
- `area` (string, optional, default: "todas") - todas, demografia, educacao, saude, economia
- `severidade` (string, optional, default: "todas") - todas, alta, media, baixa

**Resposta de Sucesso (200)**
```json
{
  "sucesso": true,
  "total": 3,
  "dados": [
    {
      "id": 1,
      "tipo": "outlier",
      "area": "demografia",
      "indicador": "populacao",
      "bairro": "Centro",
      "valor_atual": 21000,
      "valor_esperado": 18500,
      "desvio_percentual": 13.5,
      "severidade": "alta",
      "data_deteccao": "2024-01-15T10:30:00",
      "descricao": "Crescimento populacional acima do esperado"
    }
  ]
}
```

### GET /api/anomalias/alertas

Retorna alertas ativos de anomalias.

**Resposta de Sucesso (200)**
```json
{
  "sucesso": true,
  "total_alertas": 2,
  "alertas_criticos": 0,
  "alertas_altos": 2,
  "alertas_medios": 0,
  "dados": [...]
}
```

---

## 🔮 Predições

### GET /api/predicoes/populacao

Prevê população futura (mock).

**Query Parameters**
- `anos` (integer, optional, default: 5) - Quantidade de anos a prever

**Resposta de Sucesso (200)**
```json
{
  "sucesso": true,
  "anos_previstos": 5,
  "dados": [
    {
      "ano": 2024,
      "populacao_prevista": 340000,
      "intervalo_confianca": [335000, 345000]
    }
  ]
}
```

### GET /api/predicoes/idh

Prevê evolução do IDH (mock).

**Query Parameters**
- `anos` (integer, optional, default: 5)

**Resposta de Sucesso (200)**
```json
{
  "sucesso": true,
  "anos_previstos": 5,
  "dados": [
    {
      "ano": 2024,
      "idh_previsto": 0.785,
      "intervalo_confianca": [0.775, 0.795]
    }
  ]
}
```

---

## 📤 Exportação

### POST /api/exportacao/csv

Exporta relatório em formato CSV.

**Request Body**
```json
{
  "tipo": "demografia",
  "filtros": {
    "ano": 2023,
    "regiao": "Norte"
  }
}
```

**Resposta de Sucesso (200)**
```
Content-Type: text/csv
Content-Disposition: attachment; filename="relatorio_demografia_2023.csv"
```

### POST /api/exportacao/pdf

Exporta relatório em formato PDF.

**Request Body**
```json
{
  "tipo": "completo",
  "filtros": {
    "ano": 2023
  }
}
```

**Resposta de Sucesso (200)**
```
Content-Type: application/pdf
Content-Disposition: attachment; filename="relatorio_cascavel_2023.pdf"
```

---

## 📝 Códigos de Status HTTP

| Código | Descrição |
|--------|-----------|
| 200 | Sucesso |
| 400 | Requisição inválida (parâmetros incorretos) |
| 404 | Recurso não encontrado |
| 500 | Erro interno do servidor |

---

## 🔍 Filtros Comuns

A maioria dos endpoints aceita os seguintes filtros via query parameters:

- `bairro_id` (integer) - ID do bairro
- `regiao` (string) - Norte, Sul, Leste, Oeste, Centro
- `ano_inicio` (integer) - Ano inicial para séries temporais
- `ano_fim` (integer) - Ano final para séries temporais
- `cnae_id` (integer) - ID da CNAE (classificação econômica)
- `ano` (integer) - Ano específico

---

## 📊 Formato de Resposta Padrão

### Sucesso
```json
{
  "sucesso": true,
  "dados": {...} ou [...]
}
```

### Erro
```json
{
  "sucesso": false,
  "erro": "Mensagem de erro descritiva"
}
```

---

## 🚀 Exemplos de Uso

### cURL

```bash
# Health check
curl http://localhost:5000/api/health

# Listar bairros
curl http://localhost:5000/api/bairros

# KPIs de 2023
curl "http://localhost:5000/api/indicadores/kpis?ano=2023"

# PIB de 2023
curl "http://localhost:5000/api/economia/pib?ano=2023"

# Série temporal de população
curl "http://localhost:5000/api/indicadores/serie-temporal/populacao?ano_inicio=2020&ano_fim=2023"
```

### JavaScript (Axios)

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api'
});

// Buscar KPIs
const kpis = await api.get('/indicadores/kpis', { params: { ano: 2023 } });

// Buscar PIB
const pib = await api.get('/economia/pib', { params: { ano: 2023 } });

// Buscar bairros
const bairros = await api.get('/bairros');
```

### Python (Requests)

```python
import requests

BASE_URL = 'http://localhost:5000/api'

# Buscar KPIs
response = requests.get(f'{BASE_URL}/indicadores/kpis', params={'ano': 2023})
kpis = response.json()

# Buscar PIB
response = requests.get(f'{BASE_URL}/economia/pib', params={'ano': 2023})
pib = response.json()
```

---

## 📌 Notas

1. **MVP**: Esta é uma versão MVP sem autenticação. Em produção, adicionar JWT/OAuth2.
2. **CORS**: Habilitado para `*` em desenvolvimento. Restringir em produção.
3. **Rate Limiting**: Não implementado no MVP. Recomendado para produção.
4. **Paginação**: Alguns endpoints possuem paginação via `limit` e `offset`.
5. **Cache**: Não implementado no MVP. Considerar Redis em produção.

---

**Documentação gerada automaticamente**  
**Data:** 04/10/2025  
**Versão da API:** 2.0.0

