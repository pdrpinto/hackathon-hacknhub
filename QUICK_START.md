# ⚡ Quick Start - Cascavel em Números

## Começar em 3 comandos

```bash
# 1. Clone e entre na pasta (se ainda não estiver)
cd hackathon

# 2. Inicie o Docker
docker-compose up -d

# 3. Acesse no navegador
# Frontend: http://localhost:3000
# Backend: http://localhost:5000/api/health
```

## Pronto! 🎉

Agora você pode:
- ✅ Navegar pelos dashboards
- ✅ Interagir com mapas
- ✅ Ver dados reais de Cascavel
- ✅ Exportar relatórios

---

## Estrutura dos Dashboards

### 🏢 Dashboard Gestão (`/gestao`)
- KPIs executivos
- Mapas interativos
- Alertas de anomalias
- Visão estratégica

### 🔧 Dashboard Técnico (`/tecnico`)
- Tabelas detalhadas
- Filtros avançados
- Exportação de dados
- Análises comparativas

### 📋 Dashboard Público (`/publico`)
- Visão por secretaria
- Indicadores simplificados
- Dados consolidados

---

## Endpoints Principais da API

```bash
# Health Check
GET http://localhost:5000/api/health

# KPIs
GET http://localhost:5000/api/indicadores/kpis

# Demografia
GET http://localhost:5000/api/indicadores/demografia

# Mapas
GET http://localhost:5000/api/mapas/bairros
GET http://localhost:5000/api/mapas/geojson

# Predições (Mockado)
GET http://localhost:5000/api/predicoes/populacao

# Anomalias (Mockado)
GET http://localhost:5000/api/anomalias/alertas
```

---

## Problemas?

```bash
# Ver logs
docker-compose logs -f

# Reiniciar
docker-compose restart

# Rebuild completo
docker-compose down
docker-compose up -d --build
```

---

## Dados Disponíveis

- 📊 **Demografia**: População, densidade, urbanização (2010-2022)
- 🎓 **Educação**: Matrículas, analfabetismo (2010-2022)
- 🏥 **Saúde**: Leitos, mortalidade, estabelecimentos (2010-2022)
- 🏘️ **Infraestrutura**: Água, esgoto, lixo (2010-2022)
- ⚡ **Energia**: Consumo, consumidores (2010-2022)
- 📈 **IDH**: Desenvolvimento humano (2010-2022)
- 🗺️ **Bairros**: 10 bairros com coordenadas geográficas
- 🏢 **CNAE**: 17 setores econômicos

---

**Documentação completa**: Ver [README.md](README.md) e [SETUP.md](SETUP.md)



