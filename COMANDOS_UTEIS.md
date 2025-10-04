# 🛠️ Comandos Úteis - Cascavel em Números

## 🐳 Docker

### Gerenciamento Básico

```bash
# Iniciar todos os serviços
docker-compose up -d

# Ver logs de todos os serviços
docker-compose logs -f

# Ver logs de um serviço específico
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f db

# Ver status dos containers
docker-compose ps

# Parar todos os serviços (mantém volumes)
docker-compose stop

# Parar e remover containers
docker-compose down

# Parar e remover TUDO (incluindo volumes)
docker-compose down -v
```

### Rebuild e Restart

```bash
# Rebuild de um serviço específico
docker-compose build backend
docker-compose build frontend

# Rebuild forçado (sem cache)
docker-compose build --no-cache backend

# Rebuild e restart
docker-compose up -d --build

# Restart de um serviço específico
docker-compose restart backend
docker-compose restart frontend
```

### Acessar Containers

```bash
# Entrar no container do backend
docker exec -it cascavel_backend bash

# Entrar no container do frontend
docker exec -it cascavel_frontend sh

# Entrar no container do database
docker exec -it cascavel_db psql -U cascavel_user -d cascavel_db
```

---

## 🗄️ Database (PostgreSQL)

### Conectar ao Banco

```bash
# Via Docker
docker exec -it cascavel_db psql -U cascavel_user -d cascavel_db

# Local (se PostgreSQL instalado)
psql -h localhost -U cascavel_user -d cascavel_db
```

### Comandos Úteis no psql

```sql
-- Listar todas as tabelas
\dt

-- Descrever estrutura de uma tabela
\d area_demografica
\d bairros

-- Ver dados
SELECT * FROM area_demografica;
SELECT * FROM bairros;
SELECT * FROM educacao ORDER BY ano_referencia;

-- Contar registros
SELECT COUNT(*) FROM area_demografica;
SELECT COUNT(*) FROM bairros;

-- Ver série histórica
SELECT ano_referencia, populacao_estimada 
FROM area_demografica 
ORDER BY ano_referencia;

-- Ver bairros no mapa
SELECT nome, latitude, longitude, populacao_estimada 
FROM bairros;

-- Sair do psql
\q
```

### Backup e Restore

```bash
# Fazer backup
docker exec cascavel_db pg_dump -U cascavel_user cascavel_db > backup.sql

# Restaurar backup
docker exec -i cascavel_db psql -U cascavel_user cascavel_db < backup.sql

# Recriar database do zero
docker-compose down -v
docker-compose up -d
```

---

## 🔧 Backend (Flask)

### Desenvolvimento Local

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

# Executar
python app.py
```

### Testar Endpoints

```bash
# Health check
curl http://localhost:5000/api/health

# KPIs
curl http://localhost:5000/api/indicadores/kpis

# Demografia
curl http://localhost:5000/api/indicadores/demografia

# Bairros
curl http://localhost:5000/api/mapas/bairros

# GeoJSON
curl http://localhost:5000/api/mapas/geojson

# Predições
curl http://localhost:5000/api/predicoes/populacao?anos=5

# Anomalias
curl http://localhost:5000/api/anomalias/alertas
```

---

## ⚛️ Frontend (React)

### Desenvolvimento Local

```bash
cd frontend

# Instalar dependências
npm install

# Executar em modo desenvolvimento
npm start

# Build para produção
npm run build

# Executar testes
npm test
```

### Variáveis de Ambiente

```bash
# Criar .env.local
echo "REACT_APP_API_URL=http://localhost:5000" > .env.local

# Verificar variáveis
cat .env.local
```

---

## 🔍 Debug e Troubleshooting

### Ver Processos nas Portas

```bash
# Windows
netstat -ano | findstr :3000
netstat -ano | findstr :5000
netstat -ano | findstr :5432

# Linux/Mac
lsof -i :3000
lsof -i :5000
lsof -i :5432
```

### Matar Processos

```bash
# Windows
taskkill /PID <PID> /F

# Linux/Mac
kill -9 <PID>
```

### Limpar Docker

```bash
# Remover containers parados
docker container prune

# Remover imagens não utilizadas
docker image prune

# Remover volumes não utilizados
docker volume prune

# Limpeza completa (CUIDADO!)
docker system prune -a --volumes
```

### Verificar Espaço em Disco

```bash
# Ver uso de disco do Docker
docker system df

# Ver tamanho das imagens
docker images

# Ver tamanho dos volumes
docker volume ls
```

---

## 📊 Testes Rápidos

### Verificar se está Funcionando

```bash
# 1. Verificar containers
docker-compose ps
# Todos devem estar "Up"

# 2. Verificar backend
curl http://localhost:5000/api/health
# Deve retornar: {"status":"healthy"}

# 3. Verificar frontend
curl http://localhost:3000
# Deve retornar HTML

# 4. Verificar database
docker exec cascavel_db psql -U cascavel_user -d cascavel_db -c "SELECT COUNT(*) FROM bairros;"
# Deve retornar: 10
```

---

## 📦 Exportação

### Exportar Relatórios via API

```bash
# Exportar CSV (salva no backend/exports/)
curl -X POST http://localhost:5000/api/exportacao/csv \
  -H "Content-Type: application/json" \
  -d '{"tipo":"demografia","filtros":{"ano":2022}}' \
  --output relatorio.csv

# Exportar PDF
curl -X POST http://localhost:5000/api/exportacao/pdf \
  -H "Content-Type: application/json" \
  -d '{"tipo":"completo","filtros":{"ano":2022}}' \
  --output relatorio.pdf
```

---

## 🚀 Deploy

### Build de Produção

```bash
# Backend
cd backend
pip install -r requirements.txt
gunicorn app:app

# Frontend
cd frontend
npm run build
# Arquivos em frontend/build/
```

### Docker em Produção

```bash
# Usar variáveis de produção
cp .env.example .env
# Editar .env com valores de produção

# Build e executar
docker-compose -f docker-compose.yml up -d

# Ver logs
docker-compose logs -f
```

---

## 📝 Git

```bash
# Status
git status

# Adicionar arquivos
git add .

# Commit
git commit -m "feat: adicionar nova funcionalidade"

# Push
git push origin main

# Pull
git pull origin main

# Ver histórico
git log --oneline
```

---

## 🔐 Segurança

```bash
# Gerar SECRET_KEY segura
python -c "import secrets; print(secrets.token_hex(32))"

# Verificar permissões de arquivos
ls -la

# Verificar portas abertas
netstat -tulpn | grep LISTEN
```

---

## 📈 Performance

```bash
# Ver uso de recursos dos containers
docker stats

# Ver logs de queries lentas no PostgreSQL
docker exec cascavel_db psql -U cascavel_user -d cascavel_db \
  -c "SELECT query, mean_exec_time FROM pg_stat_statements ORDER BY mean_exec_time DESC LIMIT 10;"
```

---

## 🎯 Comandos do Dia a Dia

```bash
# Workflow padrão

# 1. Iniciar tudo
docker-compose up -d

# 2. Ver logs
docker-compose logs -f

# 3. Testar
curl http://localhost:5000/api/health
open http://localhost:3000

# 4. Fazer mudanças no código...

# 5. Rebuild se necessário
docker-compose restart backend

# 6. Parar tudo
docker-compose down
```

---

**💡 Dica**: Adicione aliases no seu `.bashrc` ou `.zshrc`:

```bash
# Adicione ao seu ~/.bashrc ou ~/.zshrc
alias dcu="docker-compose up -d"
alias dcd="docker-compose down"
alias dcl="docker-compose logs -f"
alias dcr="docker-compose restart"
alias dcps="docker-compose ps"
```

---

**🎓 Para mais informações, consulte**: README.md | SETUP.md | QUICK_START.md



