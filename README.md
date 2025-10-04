# 🏙️ Cascavel em Números

Sistema de Análise e Gestão Pública para o município de Cascavel-PR

## 📋 Sobre o Projeto

O **Cascavel em Números** é uma plataforma moderna de análise e gestão pública que oferece:

- 📊 **Dashboard Interativo** com KPIs principais
- 🗺️ **Mapas Integrados** com visualização geoespacial
- 📈 **Predições** baseadas em dados históricos (MVP mockado)
- ⚠️ **Detecção de Anomalias** automatizada (MVP mockado)
- 📄 **Exportação** de relatórios em PDF e CSV
- 👥 **3 Perfis de Acesso**: Gestão, Técnico e Público Interno

## 🚀 Tecnologias Utilizadas

### Backend
- **Python 3.11** + **Flask**
- **PostgreSQL** (banco de dados)
- **SQLAlchemy** (ORM)
- **ReportLab** (geração de PDF)

### Frontend
- **React 18** + **TypeScript**
- **Material-UI** (componentes UI)
- **Leaflet** (mapas interativos)
- **Recharts** (gráficos)
- **Axios** (requisições HTTP)

### Infraestrutura
- **Docker** + **Docker Compose**
- **CORS** habilitado para desenvolvimento

## 📦 Como Executar

### Pré-requisitos
- Docker
- Docker Compose
- (Opcional) Node.js 18+ e Python 3.11+ para desenvolvimento local

### Iniciando com Docker

```bash
# 1. Clone o repositório
git clone <repository-url>
cd hackathon

# 2. Inicie os containers
docker-compose up -d

# 3. Acesse:
# - Frontend: http://localhost:3000
# - Backend API: http://localhost:5000
# - Database: localhost:5432
```

### Desenvolvimento Local (sem Docker)

#### Backend

```bash
cd backend

# Criar ambiente virtual
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Instalar dependências
pip install -r requirements.txt

# Configurar variáveis de ambiente
cp ../.env.example .env

# Executar
python app.py
```

#### Frontend

```bash
cd frontend

# Instalar dependências
npm install

# Executar
npm start
```

## 🏗️ Estrutura do Projeto

```
hackathon/
├── backend/                    # API Flask
│   ├── models/                # Modelos SQLAlchemy
│   ├── routes/                # Endpoints da API
│   ├── services/              # Lógica de negócio
│   └── app.py                 # Entry point
├── frontend/                  # App React
│   └── src/
│       ├── components/        # Componentes reutilizáveis
│       ├── pages/            # Páginas por perfil
│       └── services/         # API client
├── database/                  # Scripts SQL
│   ├── init.sql              # Schema
│   └── seeds/                # Dados iniciais
└── docker-compose.yml        # Orquestração
```

## 📊 Dados e Indicadores

O sistema monitora 8 áreas principais:

1. **Território e Autoridade**
2. **Demografia**
3. **IDH e Renda**
4. **Educação**
5. **Saúde**
6. **Infraestrutura e Saneamento**
7. **Energia Elétrica**
8. **Dados Eleitorais**

## 🔌 Endpoints da API

### Indicadores
- `GET /api/indicadores/kpis` - KPIs principais
- `GET /api/indicadores/demografia` - Dados demográficos
- `GET /api/indicadores/educacao` - Dados de educação
- `GET /api/indicadores/saude` - Dados de saúde

### Mapas
- `GET /api/mapas/bairros` - Lista de bairros
- `GET /api/mapas/geojson` - Dados GeoJSON
- `GET /api/mapas/heatmap` - Dados para heatmap

### Predições (Mockado)
- `GET /api/predicoes/populacao` - Previsão populacional
- `GET /api/predicoes/educacao` - Previsão educacional
- `POST /api/predicoes/cenario` - Simulação de cenário

### Anomalias (Mockado)
- `GET /api/anomalias/detectar` - Detectar anomalias
- `GET /api/anomalias/alertas` - Alertas ativos

### Exportação
- `POST /api/exportacao/csv` - Exportar CSV
- `POST /api/exportacao/pdf` - Exportar PDF

## 🎯 Perfis de Usuário

### 👔 Gestão (Executivo)
- Dashboard com KPIs principais
- Visão estratégica e comparativos
- Alertas de anomalias destacados

### 🔧 Técnico (Analista)
- Tabelas detalhadas
- Filtros avançados
- Exportação de dados

### 📋 Público Interno (Secretarias)
- Visão por área específica
- Indicadores setoriais
- Relatórios simplificados

## 🗺️ Mapas Interativos

- Mapa de Cascavel com bairros
- Heatmap de indicadores
- Popups informativos
- Layers customizáveis

## ⚙️ Configuração

Copie `.env.example` para `.env` e ajuste:

```env
# Database
DATABASE_URL=postgresql://cascavel_user:cascavel_pass@localhost:5432/cascavel_db

# Flask
FLASK_ENV=development
SECRET_KEY=your-secret-key

# Frontend
REACT_APP_API_URL=http://localhost:5000
```

## 📝 Licença

Este projeto foi desenvolvido para o Hackathon e é de uso educacional.

## 👥 Equipe

Desenvolvido por: [@Munhoz](https://github.com/munhoz) e [@pinto](https://github.com/pinto)

---

**🎓 Cascavel em Números** - Dados que transformam gestão pública



