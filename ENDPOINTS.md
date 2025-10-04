# 📡 API Endpoints - Cascavel em Números

> Documentação completa de todos os endpoints da API do sistema Cascavel em Números v2.0

**Base URL:** `http://localhost:5000/api`

---

## 📋 Índice

- [Sistema](#-sistema)
- [Bairros](#-bairros)
- [Indicadores](#-indicadores)
- [Economia](#-economia)
- [Anomalias e Alertas](#-anomalias-e-alertas)
- [Códigos de Status](#-códigos-de-status)
- [Exemplos de Uso](#-exemplos-de-uso)

---

## 🔧 Sistema

### Health Check

**Verifica o status da API e conexão com banco de dados**

```http
GET /api/health
```

**Resposta (200):**
```json
{
  "status": "healthy",
  "database": "connected",
  "message": "Sistema Cascavel em Números - API v2 focada em bairros"
}
```

**Resposta (500) - Erro:**
```json
{
  "status": "unhealthy",
  "database": "disconnected",
  "error": "Mensagem de erro"
}
```

---

### Informações da API

**Retorna informações sobre a API e lista de endpoints**

```http
GET /api/info
```

**Resposta (200):**
```json
{
  "nome": "Cascavel em Números - API v2",
  "versao": "2.0.0",
  "descricao": "Sistema de análise e gestão pública focado em bairros",
  "endpoints": {
    "bairros": {...},
    "indicadores": {...},
    "anomalias": {...}
  },
  "filtros_disponiveis": {...}
}
```

---

## 🏘️ Bairros

### Listar Todos os Bairros

**Lista todos os bairros de Cascavel com dados básicos**

```http
GET /api/bairros
```

**Resposta (200):**
```json
{
  "sucesso": true,
  "dados": [
    {
      "id": 1,
      "nome": "Centro",
      "regiao": "Centro",
      "area_km2": 5.2,
      "populacao_estimada": 25000,
      "densidade_demografica": 4807.69,
      "renda_media_domiciliar": 3500.50,
      "cor_mapa": "#FF5733",
      "centro": "{\"type\":\"Point\",\"coordinates\":[-53.4552,-24.9555]}",
      "poligono": "{...GeoJSON...}",
      "loteamentos": null
    }
  ]
}
```

**Casos de Uso:**
- Listar bairros em dropdown/select
- Exibir mapa de bairros
- Dashboard geral da cidade

---

### Detalhes de um Bairro

**Retorna informações completas de um bairro específico incluindo indicadores recentes**

```http
GET /api/bairros/{id}
```

**Parâmetros:**
- `id` (path, integer, obrigatório): ID do bairro

**Resposta (200):**
```json
{
  "sucesso": true,
  "dados": {
    "id": 1,
    "nome": "Centro",
    "regiao": "Centro",
    "area_km2": 5.2,
    "populacao_estimada": 25000,
    "densidade_demografica": 4807.69,
    "renda_media_domiciliar": 3500.50,
    "cor_mapa": "#FF5733",
    "centro": "{...GeoJSON Point...}",
    "poligono": "{...GeoJSON Polygon...}",
    "indicadores_recentes": {
      "ano": 2023,
      "populacao": 25500,
      "densidade": 4903.85,
      "renda_media": 3650.00,
      "empresas_ativas": 450,
      "empregos_formais": 3200,
      "cobertura_agua": 98.5,
      "cobertura_esgoto": 95.2,
      "idh_geral": 0.782
    }
  }
}
```

**Resposta (404):**
```json
{
  "sucesso": false,
  "erro": "Bairro não encontrado"
}
```

**Casos de Uso:**
- Página de detalhes de bairro
- Dashboard específico de bairro
- Comparações entre bairros

---

### Listar Bairros por Região

**Lista todos os bairros de uma região específica**

```http
GET /api/bairros/regiao/{regiao}
```

**Parâmetros:**
- `regiao` (path, string, obrigatório): Nome da região
  - Valores: `Norte`, `Sul`, `Leste`, `Oeste`, `Centro`

**Resposta (200):**
```json
{
  "sucesso": true,
  "regiao": "Centro",
  "dados": [
    {
      "id": 1,
      "nome": "Centro",
      "regiao": "Centro",
      "area_km2": 5.2,
      "populacao_estimada": 25000,
      "densidade_demografica": 4807.69
    }
  ]
}
```

**Casos de Uso:**
- Filtrar bairros por região
- Análises regionais
- Comparativos regionais

---

### GeoJSON para Mapas

**Retorna todos os bairros em formato GeoJSON para renderização em mapas**

```http
GET /api/bairros/mapa/geojson
```

**Resposta (200):**
```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "id": 1,
        "nome": "Centro",
        "regiao": "Centro",
        "cor": "#FF5733",
        "populacao": 25500,
        "empresas_ativas": 450,
        "renda_media": 3650.00
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[-53.45, -24.95], [-53.46, -24.95], ...]]
      }
    }
  ]
}
```

**Casos de Uso:**
- Renderizar mapa interativo (Leaflet, Mapbox, etc)
- Visualizações geoespaciais
- Heat maps

---

## 📊 Indicadores

### Listar Indicadores

**Lista indicadores com filtros (ENDPOINT NÃO IMPLEMENTADO - verificar indicadores_v2.py)**

```http
GET /api/indicadores
```

**Query Parameters:**
- `bairro_id` (integer, opcional): Filtrar por bairro
- `ano_inicio` (integer, opcional): Ano inicial (padrão: 2020)
- `ano_fim` (integer, opcional): Ano final (padrão: 2023)

---

### KPIs Agregados

**Retorna KPIs agregados (ENDPOINT NÃO IMPLEMENTADO - verificar indicadores_v2.py)**

```http
GET /api/indicadores/kpis
```

---

### Série Temporal

**Retorna série temporal de um indicador (ENDPOINT NÃO IMPLEMENTADO - verificar indicadores_v2.py)**

```http
GET /api/indicadores/serie-temporal/{indicador}
```

---

### Comparação entre Regiões

**Compara indicadores entre regiões (ENDPOINT NÃO IMPLEMENTADO - verificar indicadores_v2.py)**

```http
GET /api/indicadores/comparacao-regioes
```

---

### Baseline de Indicador

**Retorna valores normais (baseline) de um indicador (ENDPOINT NÃO IMPLEMENTADO - verificar indicadores_v2.py)**

```http
GET /api/indicadores/baseline/{indicador}
```

---

## 💼 Economia

### PIB Municipal

**Retorna dados do PIB municipal de Cascavel**

```http
GET /api/economia/pib
```

**Query Parameters:**
- `ano` (integer, opcional): Ano de referência (padrão: 2021)

**Resposta (200):**
```json
{
  "sucesso": true,
  "dados": {
    "ano": 2021,
    "municipio": "Cascavel",
    "pib_total_mil": 15234567.89,
    "impostos_liquidos_mil": 1234567.89,
    "pib_per_capita": 45678.90,
    "vab_total_mil": 14000000.00,
    "agropecuaria_mil": 2500000.00,
    "industria_mil": 4500000.00,
    "servicos_privados_mil": 6000000.00,
    "administracao_publica_mil": 1000000.00
  }
}
```

**Casos de Uso:**
- Dashboard econômico
- Análise de evolução do PIB
- Comparações setoriais

---

### KPIs de Economia

**Retorna KPIs econômicos agregados (empresas, empregos, massa salarial)**

```http
GET /api/economia/kpis
```

**Query Parameters:**
- `ano` (integer, opcional): Ano de referência (padrão: 2023)
- `bairro_id` (integer, opcional): Filtrar por bairro específico
- `regiao` (string, opcional): Filtrar por região
- `cnae_id` (integer, opcional): Filtrar por CNAE

**Resposta (200):**
```json
{
  "sucesso": true,
  "dados": {
    "ano": 2023,
    "empresas_ativas_total": 15420,
    "empresas_abertas_total": 1250,
    "empresas_fechadas_total": 380,
    "saldo_empresas": 870,
    "empregos_gerados_total": 85000,
    "massa_salarial_total": 255000000.00,
    "ticket_medio_salarial": 3000.00
  }
}
```

**Casos de Uso:**
- Cards de KPIs no dashboard
- Indicadores econômicos principais
- Comparação ano a ano

---

### Série Temporal de Economia

**Retorna série temporal de um indicador econômico**

```http
GET /api/economia/serie
```

**Query Parameters:**
- `indicador` (string, obrigatório): Nome do indicador
  - Valores: `empresas_abertas`, `empresas_fechadas`, `empresas_ativas`, `empregos_gerados`, `massa_salarial`
- `ano_inicio` (integer, opcional): Ano inicial (padrão: 2020)
- `ano_fim` (integer, opcional): Ano final (padrão: 2023)
- `bairro_id` (integer, opcional): Filtrar por bairro
- `regiao` (string, opcional): Filtrar por região
- `cnae_id` (integer, opcional): Filtrar por CNAE

**Resposta (200):**
```json
{
  "sucesso": true,
  "indicador": "empresas_abertas",
  "dados": [
    {"ano": 2020, "valor": 980.0},
    {"ano": 2021, "valor": 1120.0},
    {"ano": 2022, "valor": 1050.0},
    {"ano": 2023, "valor": 1250.0}
  ]
}
```

**Resposta (400) - Indicador Inválido:**
```json
{
  "sucesso": false,
  "erro": "Indicador inválido"
}
```

**Casos de Uso:**
- Gráficos de linha temporal
- Análise de tendências
- Comparação de períodos

---

### Top CNAEs

**Retorna ranking de CNAEs (setores econômicos) por métrica**

```http
GET /api/economia/cnae/top
```

**Query Parameters:**
- `ano` (integer, opcional): Ano de referência (padrão: 2023)
- `metric` (string, opcional): Métrica para ranking (padrão: `empresas_ativas`)
  - Valores: `empresas_ativas`, `empregos_gerados`, `empresas_abertas`
- `limit` (integer, opcional): Quantidade de registros (padrão: 10)
- `bairro_id` (integer, opcional): Filtrar por bairro
- `regiao` (string, opcional): Filtrar por região

**Resposta (200):**
```json
{
  "sucesso": true,
  "ano": 2023,
  "metric": "empresas_ativas",
  "dados": [
    {
      "cnae_id": 5,
      "codigo": "47",
      "descricao": "Comércio varejista",
      "setor": "Comércio",
      "valor": 3450.0
    },
    {
      "cnae_id": 12,
      "codigo": "56",
      "descricao": "Alimentação",
      "setor": "Serviços",
      "valor": 2100.0
    }
  ]
}
```

**Resposta (400) - Métrica Inválida:**
```json
{
  "sucesso": false,
  "erro": "Métrica inválida"
}
```

**Casos de Uso:**
- Gráfico de barras de setores
- Análise setorial
- Identificação de principais setores

---

### Cadastro de Empresas

**Lista empresas do cadastro individual com informações detalhadas**

```http
GET /api/economia/empresas/cadastro
```

**Query Parameters:**
- `bairro_id` (integer, opcional): Filtrar por bairro
- `cnae_id` (integer, opcional): Filtrar por CNAE
- `situacao` (string, opcional): Filtrar por situação cadastral (ex: `ATIVA`)
- `limit` (integer, opcional): Quantidade de registros (padrão: 50, máximo: 500)
- `offset` (integer, opcional): Paginação (padrão: 0)

**Resposta (200):**
```json
{
  "sucesso": true,
  "total": 15420,
  "limit": 50,
  "offset": 0,
  "dados": [
    {
      "id": 1,
      "cnpj": "12.345.678/0001-90",
      "razao_social": "Empresa Exemplo LTDA",
      "nome_fantasia": "Empresa Exemplo",
      "cnae_codigo": "47.11-3-01",
      "cnae_descricao": "Comércio varejista de mercadorias em geral",
      "bairro": "Centro",
      "regiao": "Centro",
      "endereco": {
        "logradouro": "Rua das Flores",
        "numero": "123",
        "complemento": "Sala 5",
        "cep": "85801-010"
      },
      "data_abertura": "2018-05-15",
      "situacao_cadastral": "ATIVA",
      "porte": "ME",
      "capital_social": 50000.00
    }
  ]
}
```

**Casos de Uso:**
- Listagem de empresas
- Busca de empresas por bairro/setor
- Exportação de dados empresariais

---

### Exportar CSV de Economia

**Exporta dados econômicos agregados em formato CSV**

```http
GET /api/economia/export/csv
```

**Query Parameters:**
- `ano` (integer, opcional): Ano de referência (padrão: 2023)
- `bairro_id` (integer, opcional): Filtrar por bairro
- `regiao` (string, opcional): Filtrar por região
- `cnae_id` (integer, opcional): Filtrar por CNAE

**Resposta (200):**
```csv
ano;bairro_id;bairro;regiao;cnae_id;cnae_codigo;cnae_descricao;setor;empresas_ativas;empresas_abertas;empresas_fechadas;empregos_gerados;massa_salarial
2023;1;Centro;Centro;5;47;Comércio varejista;Comércio;450;35;12;3200;9600000.00
```

**Content-Type:** `text/csv`  
**Content-Disposition:** `attachment; filename="economia_2023.csv"`

**Casos de Uso:**
- Exportação para Excel
- Análise em ferramentas externas
- Backup de dados

---

### Ingerir Dados CAGED (Mock)

**Ingere dados mockados do CAGED (Cadastro Geral de Empregados e Desempregados)**

```http
POST /api/economia/ingest/caged
```

**Body (JSON):**
```json
{
  "ano_inicio": 2019,
  "ano_fim": 2023
}
```

**Resposta (200):**
```json
{
  "ok": true,
  "mensagem": "Dados CAGED mockados inseridos com sucesso",
  "anos_processados": [2019, 2020, 2021, 2022, 2023]
}
```

**Casos de Uso:**
- Popular banco de dados de teste
- Gerar dados demo

---

### Ingerir Cadastro de Empresas (Mock)

**Gera e ingere cadastro mockado de empresas**

```http
POST /api/economia/ingest/empresas
```

**Body (JSON - Opcional):**
```json
{
  "total_empresas": 1000,
  "ano_inicio_empresas": 2015,
  "ano_fim_empresas": 2023,
  "ano_inicio_agregacao": 2019,
  "ano_fim_agregacao": 2023
}
```

**Resposta (200):**
```json
{
  "ok": true,
  "empresas_geradas": 1000,
  "anos_agregados": [2019, 2020, 2021, 2022, 2023]
}
```

**Casos de Uso:**
- Popular banco de dados de teste
- Gerar dados demo

---

### Seed de Dados Demo

**Popula banco com dados de demonstração completos**

```http
POST /api/economia/seed-demo
```

**Body (JSON - Opcional):**
```json
{
  "ano_indicadores": 2023,
  "ano_empresas": 2023
}
```

**Resposta (200):**
```json
{
  "ok": true,
  "dados": {
    "bairros_inseridos": 10,
    "cnaes_inseridos": 20,
    "indicadores_inseridos": 50,
    "empresas_inseridas": 1000,
    "pib_inserido": true
  }
}
```

**Casos de Uso:**
- Setup inicial do banco
- Ambiente de desenvolvimento
- Demos e apresentações

---

## 🚨 Anomalias e Alertas

### Detectar Anomalias

**Detecta anomalias nos dados (mockado para MVP)**

```http
GET /api/anomalias/detectar
```

**Query Parameters:**
- `area` (string, opcional): Filtrar por área (padrão: `todas`)
  - Valores: `saude`, `educacao`, `demografia`, `economia`, `infraestrutura`, `todas`
- `severidade` (string, opcional): Filtrar por severidade (padrão: `todas`)
  - Valores: `alta`, `media`, `baixa`, `todas`

**Resposta (200):**
```json
{
  "total": 5,
  "filtros": {
    "area": "todas",
    "severidade": "todas"
  },
  "anomalias": [
    {
      "id": 1,
      "area": "saude",
      "indicador": "Taxa de Mortalidade Infantil",
      "tipo": "aumento_brusco",
      "severidade": "alta",
      "valor_esperado": 9.79,
      "valor_detectado": 12.5,
      "desvio_percentual": 27.7,
      "data_deteccao": "2025-10-02T12:00:00",
      "descricao": "Aumento anormal na taxa de mortalidade infantil detectado no último trimestre"
    }
  ]
}
```

**Casos de Uso:**
- Dashboard de anomalias
- Alertas automáticos
- Monitoramento de indicadores

---

### Alertas Ativos

**Lista alertas ativos mockados**

```http
GET /api/anomalias/alertas
```

**Resposta (200):**
```json
{
  "total_ativos": 3,
  "alertas": [
    {
      "id": 1,
      "titulo": "Aumento na Mortalidade Infantil",
      "area": "saude",
      "severidade": "alta",
      "status": "ativo",
      "criado_em": "2025-10-02T12:00:00",
      "acao_recomendada": "Investigar causas e implementar medidas preventivas imediatas"
    }
  ]
}
```

**Casos de Uso:**
- Painel de alertas urgentes
- Notificações
- Dashboard executivo

---

### Histórico de Anomalias

**Retorna histórico de anomalias detectadas**

```http
GET /api/anomalias/historico
```

**Query Parameters:**
- `limite` (integer, opcional): Quantidade de registros (padrão: 50)

**Resposta (200):**
```json
{
  "total": 20,
  "historico": [
    {
      "id": 10,
      "area": "educacao",
      "indicador": "Indicador Mock 1",
      "severidade": "media",
      "data_deteccao": "2025-08-15T10:30:00",
      "status": "resolvido",
      "tempo_resolucao_dias": 15
    }
  ]
}
```

**Casos de Uso:**
- Análise histórica
- Relatórios de gestão
- Auditoria de anomalias

---

### Dashboard de Anomalias

**Retorna dashboard resumido com estatísticas de anomalias**

```http
GET /api/anomalias/dashboard
```

**Resposta (200):**
```json
{
  "resumo": {
    "total_anomalias_mes": 12,
    "alertas_ativos": 3,
    "anomalias_resolvidas": 20,
    "taxa_resolucao": 0.85
  },
  "por_severidade": {
    "alta": 3,
    "media": 5,
    "baixa": 4
  },
  "por_area": {
    "saude": 2,
    "educacao": 3,
    "infraestrutura": 1,
    "economia": 4,
    "demografia": 2
  },
  "tendencia_mensal": [
    {"mes": "Jan", "anomalias": 8},
    {"mes": "Fev", "anomalias": 12},
    {"mes": "Mar", "anomalias": 10}
  ],
  "atualizado_em": "2025-10-04T12:00:00"
}
```

**Casos de Uso:**
- Dashboard executivo
- Gráficos de tendência
- Relatórios gerenciais

---

### Alertas com Impactos Cruzados ⭐ NOVO

**Lista alertas com análise de impactos em outras métricas (validação cruzada)**

```http
GET /api/anomalias/alertas-impactos
```

**Query Parameters:**
- `categoria` (string, opcional): Filtrar por categoria
  - Valores: `economia`, `saude`, `educacao`, `infraestrutura`, `social`, `financas`, `meio_ambiente`
- `severidade` (string, opcional): Filtrar por severidade
  - Valores: `critico`, `atencao`, `informativo`

**Resposta (200):**
```json
{
  "total": 5,
  "filtros_aplicados": {
    "categoria": "todas",
    "severidade": "todas"
  },
  "alertas": [
    {
      "id": 1,
      "tipo": "anomalia_positiva",
      "categoria": "economia",
      "metrica_principal": "cadastro_empresas",
      "titulo": "Aumento atípico no cadastro de empresas",
      "descricao": "Detectado crescimento de 45% no cadastro de novas empresas no último trimestre...",
      "severidade": "atencao",
      "valor_esperado": 180,
      "valor_detectado": 261,
      "variacao_percentual": 45.0,
      "desvio_padrao": 2.3,
      "periodo": "Q3 2025",
      "data_deteccao": "2025-10-02",
      "impactos_esperados": [
        {
          "metrica": "geracao_empregos",
          "categoria": "economia",
          "descricao": "Aumento esperado na geração de empregos formais",
          "impacto_estimado": "+15% a +25%",
          "direcao": "positivo",
          "confianca": "alta",
          "prazo": "3-6 meses"
        },
        {
          "metrica": "arrecadacao_iss",
          "categoria": "financas",
          "descricao": "Incremento na arrecadação de ISS",
          "impacto_estimado": "+12% a +18%",
          "direcao": "positivo",
          "confianca": "alta",
          "prazo": "6-12 meses"
        }
      ],
      "acao_recomendada": "Monitorar setores de crescimento e preparar infraestrutura de apoio",
      "prioridade": 2
    }
  ],
  "resumo": {
    "criticos": 1,
    "atencao": 3,
    "informativos": 1,
    "anomalias_positivas": 3,
    "anomalias_negativas": 2
  },
  "gerado_em": "2025-10-04T12:00:00"
}
```

**Casos de Uso:**
- Dashboard de impactos cruzados
- Análise preditiva
- Planejamento estratégico
- Alertas inteligentes

---

### Detalhes de Alerta com Impactos ⭐ NOVO

**Retorna detalhes completos de um alerta específico com análise de impactos**

```http
GET /api/anomalias/alertas-impactos/{id}
```

**Parâmetros:**
- `id` (path, integer, obrigatório): ID do alerta

**Resposta (200):**
```json
{
  "id": 1,
  "tipo": "anomalia_positiva",
  "categoria": "economia",
  "metrica_principal": "cadastro_empresas",
  "titulo": "Aumento atípico no cadastro de empresas",
  "descricao": "Detectado crescimento de 45%...",
  "severidade": "atencao",
  "valor_esperado": 180,
  "valor_detectado": 261,
  "variacao_percentual": 45.0,
  "desvio_padrao": 2.3,
  "periodo": "Q3 2025",
  "data_deteccao": "2025-10-02",
  "impactos_esperados": [
    {
      "metrica": "geracao_empregos",
      "categoria": "economia",
      "descricao": "Aumento esperado na geração de empregos formais",
      "impacto_estimado": "+15% a +25%",
      "direcao": "positivo",
      "confianca": "alta",
      "prazo": "3-6 meses"
    }
  ],
  "acao_recomendada": "Monitorar setores de crescimento...",
  "prioridade": 2
}
```

**Resposta (404):**
```json
{
  "error": "Alerta não encontrado"
}
```

**Casos de Uso:**
- Modal de detalhes de alerta
- Página de análise de impacto
- Relatório de alerta específico

---

### Categorias e Severidades ⭐ NOVO

**Lista categorias e severidades disponíveis para filtros**

```http
GET /api/anomalias/categorias
```

**Resposta (200):**
```json
{
  "categorias": [
    {"id": "economia", "nome": "Economia"},
    {"id": "saude", "nome": "Saúde"},
    {"id": "educacao", "nome": "Educação"},
    {"id": "infraestrutura", "nome": "Infraestrutura"},
    {"id": "social", "nome": "Social"},
    {"id": "financas", "nome": "Finanças"},
    {"id": "meio_ambiente", "nome": "Meio Ambiente"}
  ],
  "severidades": [
    {"id": "critico", "nome": "Crítico", "cor": "#DC2626"},
    {"id": "atencao", "nome": "Atenção", "cor": "#F59E0B"},
    {"id": "informativo", "nome": "Informativo", "cor": "#3B82F6"}
  ]
}
```

**Casos de Uso:**
- Popular dropdowns de filtro
- Legendas de dashboard
- Configuração de UI

---

## 📋 Códigos de Status

| Código | Descrição |
|--------|-----------|
| **200** | Sucesso - Requisição processada com sucesso |
| **400** | Bad Request - Parâmetros inválidos |
| **404** | Not Found - Recurso não encontrado |
| **500** | Internal Server Error - Erro no servidor |

---

## 💡 Exemplos de Uso

### cURL

```bash
# Health Check
curl http://localhost:5000/api/health

# Listar bairros
curl http://localhost:5000/api/bairros

# Detalhes de bairro
curl http://localhost:5000/api/bairros/1

# KPIs de economia
curl http://localhost:5000/api/economia/kpis?ano=2023

# Alertas com impactos (economia)
curl http://localhost:5000/api/anomalias/alertas-impactos?categoria=economia

# PIB Municipal
curl http://localhost:5000/api/economia/pib?ano=2021
```

---

### JavaScript/Axios

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api'
});

// Listar bairros
const bairros = await api.get('/bairros');

// KPIs de economia
const kpis = await api.get('/economia/kpis', {
  params: { ano: 2023, regiao: 'Centro' }
});

// Alertas com impactos
const alertas = await api.get('/anomalias/alertas-impactos', {
  params: { categoria: 'economia', severidade: 'critico' }
});

// Exportar CSV
const csv = await api.get('/economia/export/csv', {
  params: { ano: 2023 },
  responseType: 'blob'
});
```

---

### Python/Requests

```python
import requests

BASE_URL = 'http://localhost:5000/api'

# Listar bairros
response = requests.get(f'{BASE_URL}/bairros')
bairros = response.json()

# KPIs de economia com filtros
response = requests.get(f'{BASE_URL}/economia/kpis', params={
    'ano': 2023,
    'regiao': 'Centro'
})
kpis = response.json()

# Alertas críticos de economia
response = requests.get(f'{BASE_URL}/anomalias/alertas-impactos', params={
    'categoria': 'economia',
    'severidade': 'critico'
})
alertas = response.json()

# Seed de dados demo
response = requests.post(f'{BASE_URL}/economia/seed-demo', json={
    'ano_indicadores': 2023,
    'ano_empresas': 2023
})
result = response.json()
```

---

## 🔧 Filtros Comuns

Muitos endpoints suportam filtros padrão:

| Filtro | Tipo | Descrição | Endpoints |
|--------|------|-----------|-----------|
| `bairro_id` | integer | Filtrar por bairro específico | Economia |
| `regiao` | string | Filtrar por região | Bairros, Economia |
| `ano` | integer | Ano de referência | Economia, Indicadores |
| `ano_inicio` | integer | Ano inicial para séries | Economia, Indicadores |
| `ano_fim` | integer | Ano final para séries | Economia, Indicadores |
| `cnae_id` | integer | Filtrar por CNAE (setor) | Economia |
| `categoria` | string | Categoria do alerta | Anomalias |
| `severidade` | string | Severidade do alerta | Anomalias |
| `limit` | integer | Quantidade de registros | Economia, Anomalias |
| `offset` | integer | Paginação | Economia |

---

## 📝 Notas Importantes

1. **Dados Mockados**: Os endpoints de anomalias e alertas retornam dados mockados para fins de MVP/demonstração.

2. **CORS**: A API está configurada com CORS habilitado para permitir requisições do frontend.

3. **Paginação**: Endpoints que retornam listas grandes suportam paginação via `limit` e `offset`.

4. **GeoJSON**: Coordenadas geográficas são retornadas em formato GeoJSON padrão.

5. **Formato de Data**: Datas são retornadas no formato ISO 8601 (`YYYY-MM-DD` ou `YYYY-MM-DDTHH:MM:SS`).

6. **Valores Numéricos**: Valores monetários e decimais são retornados como float/number.
