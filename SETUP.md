# 🚀 Guia de Setup - Cascavel em Números

## Passo a Passo para Executar o Projeto

### ✅ Pré-requisitos

- **Docker** e **Docker Compose** instalados
- **Git** (para clonar o repositório)
- Mínimo 4GB de RAM disponível
- Portas **3000**, **5000** e **5432** disponíveis

---

## 🐳 Método 1: Docker (Recomendado)

### 1. Iniciar os Serviços

```bash
# Na raiz do projeto
docker-compose up -d
```

Este comando irá:
- Criar o banco PostgreSQL
- Executar os scripts de criação de tabelas e seeds
- Iniciar o backend Flask
- Iniciar o frontend React

### 2. Verificar Status

```bash
# Verificar se os containers estão rodando
docker-compose ps

# Ver logs
docker-compose logs -f

# Ver logs específicos
docker-compose logs -f backend
docker-compose logs -f frontend
```

### 3. Acessar a Aplicação

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Database**: localhost:5432

### 4. Parar os Serviços

```bash
# Parar sem remover volumes
docker-compose stop

# Parar e remover containers
docker-compose down

# Parar e remover tudo (incluindo volumes)
docker-compose down -v
```

---

## 💻 Método 2: Desenvolvimento Local

### Backend

```bash
cd backend

# Criar ambiente virtual
python -m venv venv

# Ativar ambiente virtual
# Windows:
venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate

# Instalar dependências
pip install -r requirements.txt

# Configurar variáveis de ambiente
cp ../.env.example .env

# Executar
python app.py
```

O backend estará disponível em http://localhost:5000

### Frontend

```bash
cd frontend

# Instalar dependências
npm install

# Executar em modo desenvolvimento
npm start
```

O frontend estará disponível em http://localhost:3000

### Database

```bash
# Iniciar PostgreSQL via Docker
docker run -d \
  --name cascavel_db \
  -e POSTGRES_USER=cascavel_user \
  -e POSTGRES_PASSWORD=cascavel_pass \
  -e POSTGRES_DB=cascavel_db \
  -p 5432:5432 \
  postgres:15-alpine

# Executar scripts SQL
psql -h localhost -U cascavel_user -d cascavel_db -f database/init.sql
psql -h localhost -U cascavel_user -d cascavel_db -f database/seeds/01_dados_cascavel.sql
```

---

## 🔧 Troubleshooting

### Erro: Porta já em uso

```bash
# Verificar processos nas portas
# Windows:
netstat -ano | findstr :3000
netstat -ano | findstr :5000
netstat -ano | findstr :5432

# Linux/Mac:
lsof -i :3000
lsof -i :5000
lsof -i :5432

# Matar processo
# Windows:
taskkill /PID <PID> /F

# Linux/Mac:
kill -9 <PID>
```

### Erro: Frontend não conecta ao Backend

1. Verificar se o backend está rodando: http://localhost:5000/api/health
2. Verificar variável de ambiente `REACT_APP_API_URL` no frontend
3. Verificar CORS no backend

### Erro: Database não conecta

1. Verificar se o PostgreSQL está rodando
2. Verificar credenciais no `.env`
3. Verificar se as tabelas foram criadas:

```bash
docker exec -it cascavel_db psql -U cascavel_user -d cascavel_db -c "\dt"
```

### Rebuild dos Containers

```bash
# Forçar rebuild
docker-compose build --no-cache

# Rebuild e iniciar
docker-compose up -d --build
```

---

## 📊 Verificação de Dados

### Verificar se os dados foram inseridos

```bash
# Conectar ao banco
docker exec -it cascavel_db psql -U cascavel_user -d cascavel_db

# Verificar tabelas
\dt

# Verificar dados
SELECT * FROM area_demografica;
SELECT * FROM bairros;
SELECT * FROM educacao;

# Sair
\q
```

---

## 🎯 Estrutura de Pastas Final

```
hackathon/
├── backend/
│   ├── app.py
│   ├── config.py
│   ├── Dockerfile
│   ├── requirements.txt
│   ├── models/         # ✅
│   ├── routes/         # ✅
│   └── services/       # ✅
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/ # ✅
│   │   ├── pages/      # ✅
│   │   ├── services/   # ✅
│   │   ├── types/      # ✅
│   │   └── utils/      # ✅
│   ├── Dockerfile
│   └── package.json
├── database/
│   ├── init.sql        # ✅
│   └── seeds/          # ✅
├── docker-compose.yml  # ✅
├── README.md           # ✅
└── SETUP.md            # ✅
```

---

## 🎓 Próximos Passos

1. **Testar Endpoints**:
   - GET http://localhost:5000/api/health
   - GET http://localhost:5000/api/indicadores/kpis
   - GET http://localhost:5000/api/mapas/bairros

2. **Navegar no Frontend**:
   - Dashboard Gestão: http://localhost:3000/gestao
   - Dashboard Técnico: http://localhost:3000/tecnico
   - Dashboard Público: http://localhost:3000/publico

3. **Testar Funcionalidades**:
   - ✅ Visualizar KPIs
   - ✅ Interagir com mapas
   - ✅ Aplicar filtros
   - ✅ Visualizar gráficos
   - ✅ Ver alertas de anomalias
   - ✅ Exportar relatórios

---

## 📝 Notas Importantes

- **Dados Mockados**: Predições e anomalias são mockadas para o MVP
- **Performance**: Primeira execução pode demorar (download de imagens Docker)
- **Mapas**: Requer conexão com internet (tiles do OpenStreetMap)
- **Exportação PDF**: Relatórios gerados na pasta `backend/exports/`

---

## 🆘 Suporte

Se encontrar problemas:

1. Verificar logs: `docker-compose logs -f`
2. Verificar se todas as portas estão livres
3. Tentar rebuild: `docker-compose up -d --build`
4. Verificar documentação no README.md

---

**Desenvolvido para o Hackathon Cascavel 2025** 🚀



