# API de Alertas com Análise de Impactos Cruzados

## 📋 Visão Geral

Esta API fornece alertas mockados sobre anomalias detectadas nos dados municipais, com análise de validação cruzada mostrando quais outras métricas podem ser impactadas.

## 🎯 Endpoints Disponíveis

### 1. Listar Alertas com Impactos

**Endpoint:** `GET /api/anomalias/alertas-impactos`

**Descrição:** Retorna lista de alertas com análise completa de impactos em outras métricas.

**Query Parameters (opcionais):**
- `categoria` - Filtrar por categoria: `economia`, `saude`, `educacao`, `infraestrutura`, `social`, `financas`, `meio_ambiente`
- `severidade` - Filtrar por severidade: `critico`, `atencao`, `informativo`

**Exemplo de Requisição:**
```bash
# Todos os alertas
GET http://localhost:5000/api/anomalias/alertas-impactos

# Filtrar por categoria
GET http://localhost:5000/api/anomalias/alertas-impactos?categoria=economia

# Filtrar por severidade
GET http://localhost:5000/api/anomalias/alertas-impactos?severidade=critico

# Filtros combinados
GET http://localhost:5000/api/anomalias/alertas-impactos?categoria=economia&severidade=atencao
```

**Exemplo de Resposta:**
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
      "descricao": "Detectado crescimento de 45% no cadastro de novas empresas...",
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
      "acao_recomendada": "Monitorar setores de crescimento...",
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
  "gerado_em": "2025-10-04T12:30:00"
}
```

---

### 2. Detalhes de um Alerta Específico

**Endpoint:** `GET /api/anomalias/alertas-impactos/{id}`

**Descrição:** Retorna detalhes completos de um alerta específico.

**Exemplo de Requisição:**
```bash
GET http://localhost:5000/api/anomalias/alertas-impactos/1
```

**Exemplo de Resposta:**
```json
{
  "id": 1,
  "tipo": "anomalia_positiva",
  "categoria": "economia",
  "metrica_principal": "cadastro_empresas",
  "titulo": "Aumento atípico no cadastro de empresas",
  "descricao": "Detectado crescimento de 45%...",
  "severidade": "atencao",
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
  ]
}
```

---

### 3. Categorias e Severidades Disponíveis

**Endpoint:** `GET /api/anomalias/categorias`

**Descrição:** Retorna lista de categorias e severidades disponíveis para filtros.

**Exemplo de Requisição:**
```bash
GET http://localhost:5000/api/anomalias/categorias
```

**Exemplo de Resposta:**
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

---

## 📊 Alertas Mockados Disponíveis

### Alerta 1: Aumento no Cadastro de Empresas
- **Categoria:** Economia
- **Severidade:** Atenção
- **Impactos:** Geração de empregos ↑, Arrecadação ISS ↑, Demanda por infraestrutura ↑

### Alerta 2: Queda nas Admissões do Comércio
- **Categoria:** Economia
- **Severidade:** Crítico
- **Impactos:** Taxa de desemprego ↑, Arrecadação ICMS ↓, Consumo familiar ↓, Demanda por programas sociais ↑

### Alerta 3: Expansão da Cobertura Vacinal
- **Categoria:** Saúde
- **Severidade:** Informativo
- **Impactos:** Internações preveníveis ↓, Gastos com saúde ↓, Produtividade econômica ↑

### Alerta 4: Redução nas Matrículas do Ensino Fundamental
- **Categoria:** Educação
- **Severidade:** Atenção
- **Impactos:** Evasão escolar ↑, Trabalho infantil ↑, IDEB ↓, Repasses federais ↓

### Alerta 5: Crescimento no Consumo Energético Industrial
- **Categoria:** Infraestrutura
- **Severidade:** Atenção
- **Impactos:** Empregos industriais ↑, Necessidade de expansão elétrica, PIB municipal ↑, Emissões CO2 ↑

---

## 🔍 Estrutura dos Dados

### Campos do Alerta

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | integer | Identificador único do alerta |
| `tipo` | string | Tipo da anomalia: `anomalia_positiva` ou `anomalia_negativa` |
| `categoria` | string | Categoria do alerta |
| `metrica_principal` | string | Métrica que gerou o alerta |
| `titulo` | string | Título resumido do alerta |
| `descricao` | string | Descrição detalhada |
| `severidade` | string | Nível de severidade: `critico`, `atencao`, `informativo` |
| `valor_esperado` | number | Valor esperado da métrica |
| `valor_detectado` | number | Valor detectado (anômalo) |
| `variacao_percentual` | number | Variação percentual |
| `desvio_padrao` | number | Desvio em relação ao padrão (σ) |
| `periodo` | string | Período da detecção |
| `data_deteccao` | string | Data da detecção (ISO 8601) |
| `impactos_esperados` | array | Lista de impactos em outras métricas |
| `acao_recomendada` | string | Ação recomendada |
| `prioridade` | integer | Prioridade (1=alta, 3=baixa) |

### Campos do Impacto

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `metrica` | string | Métrica impactada |
| `categoria` | string | Categoria da métrica impactada |
| `descricao` | string | Descrição do impacto |
| `impacto_estimado` | string | Estimativa do impacto |
| `direcao` | string | Direção: `positivo`, `negativo`, `neutro` |
| `confianca` | string | Nível de confiança: `alta`, `media`, `baixa` |
| `prazo` | string | Prazo estimado para o impacto |

---

## 💡 Exemplos de Uso no Frontend

### React/TypeScript

```typescript
// services/alertas.ts
import api from './api';

export interface ImpactoEsperado {
  metrica: string;
  categoria: string;
  descricao: string;
  impacto_estimado: string;
  direcao: 'positivo' | 'negativo' | 'neutro';
  confianca: 'alta' | 'media' | 'baixa';
  prazo: string;
}

export interface Alerta {
  id: number;
  tipo: 'anomalia_positiva' | 'anomalia_negativa';
  categoria: string;
  metrica_principal: string;
  titulo: string;
  descricao: string;
  severidade: 'critico' | 'atencao' | 'informativo';
  valor_esperado: number;
  valor_detectado: number;
  variacao_percentual: number;
  desvio_padrao: number;
  periodo: string;
  data_deteccao: string;
  impactos_esperados: ImpactoEsperado[];
  acao_recomendada: string;
  prioridade: number;
}

export const getAlertasComImpactos = async (
  categoria?: string,
  severidade?: string
) => {
  const params = new URLSearchParams();
  if (categoria) params.append('categoria', categoria);
  if (severidade) params.append('severidade', severidade);
  
  const response = await api.get(`/anomalias/alertas-impactos?${params}`);
  return response.data;
};

export const getAlertaDetalhes = async (id: number) => {
  const response = await api.get(`/anomalias/alertas-impactos/${id}`);
  return response.data;
};

export const getCategorias = async () => {
  const response = await api.get('/anomalias/categorias');
  return response.data;
};
```

### Componente de Exemplo

```typescript
// components/AlertasImpactos.tsx
import React, { useEffect, useState } from 'react';
import { getAlertasComImpactos, Alerta } from '../services/alertas';

const AlertasImpactos: React.FC = () => {
  const [alertas, setAlertas] = useState<Alerta[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlertas = async () => {
      try {
        const data = await getAlertasComImpactos();
        setAlertas(data.alertas);
      } catch (error) {
        console.error('Erro ao buscar alertas:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAlertas();
  }, []);

  if (loading) return <div>Carregando alertas...</div>;

  return (
    <div>
      <h2>Alertas com Análise de Impactos</h2>
      {alertas.map(alerta => (
        <div key={alerta.id} className="alerta-card">
          <h3>{alerta.titulo}</h3>
          <p>{alerta.descricao}</p>
          
          <div className="impactos">
            <h4>Impactos Esperados:</h4>
            {alerta.impactos_esperados.map((impacto, idx) => (
              <div key={idx} className={`impacto ${impacto.direcao}`}>
                <strong>{impacto.metrica}:</strong> {impacto.descricao}
                <span>Estimativa: {impacto.impacto_estimado}</span>
                <span>Prazo: {impacto.prazo}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AlertasImpactos;
```

---

## 🚀 Como Testar

1. **Certifique-se que o backend está rodando:**
```bash
cd backend
python app.py
```

2. **Teste os endpoints:**

```bash
# Listar todos os alertas
curl http://localhost:5000/api/anomalias/alertas-impactos

# Filtrar alertas críticos
curl http://localhost:5000/api/anomalias/alertas-impactos?severidade=critico

# Alertas de economia
curl http://localhost:5000/api/anomalias/alertas-impactos?categoria=economia

# Detalhes do alerta 1
curl http://localhost:5000/api/anomalias/alertas-impactos/1

# Listar categorias disponíveis
curl http://localhost:5000/api/anomalias/categorias
```

---

## 📝 Notas

- Todos os dados são **mockados** para fins de MVP/demonstração
- A lógica de detecção de anomalias não é real (não há cálculo real de desvio padrão)
- Os impactos são estimativas fictícias para demonstração da funcionalidade
- Em produção, estes dados seriam gerados por modelos de ML reais e análise estatística

