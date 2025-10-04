# ⚡ COMO USAR O SISTEMA AGORA

## 🎯 SISTEMA ESTÁ RODANDO!

### Status Atual:
✅ **Database** (PostGIS): Porta 5432 - 300+ registros carregados  
✅ **Backend** (Flask): Porta 5000 - API funcionando  
✅ **Frontend** (React): Porta 3000 - Compilando  

---

## 🌐 ACESSAR AGORA

### Frontend:
```
http://localhost:3000
```

### Backend:
```
http://localhost:5000/api/health
```

---

## 🧪 TESTAR DADOS

### 1. Ver Todos os Bairros:
```bash
curl http://localhost:5000/api/bairros
```

**Deve retornar 25 bairros** com dados completos!

### 2. Ver KPIs da Cidade:
```bash
curl http://localhost:5000/api/indicadores/kpis?ano=2023
```

### 3. Ver GeoJSON do Mapa:
```bash
curl http://localhost:5000/api/bairros/mapa/geojson
```

### 4. Filtrar por Região Norte:
```bash
curl http://localhost:5000/api/bairros/regiao/Norte
```

### 5. Ver Baseline de População:
```bash
curl "http://localhost:5000/api/indicadores/baseline/populacao?bairro_id=1"
```

---

## 🗺️ USAR MAPA INTERATIVO NO FRONTEND

### Integrar nos Dashboards:

#### 1. Importar Componente:
```tsx
import MapaInterativo from '../components/maps/MapaInterativo';
```

#### 2. Usar no Render:
```tsx
<MapaInterativo
  height={600}
  onBairroClick={(id, nome) => {
    console.log(`Clicou no bairro: ${nome} (ID: ${id})`);
    // Aqui você pode carregar dados específicos do bairro
  }}
/>
```

---

## 📊 FILTROS DISPONÍVEIS

Todas as APIs de indicadores aceitam:

- `?bairro_id=1` - Filtrar por ID do bairro
- `?regiao=Norte` - Filtrar por região (Norte, Sul, Leste, Oeste, Centro)
- `?ano_inicio=2020&ano_fim=2023` - Filtrar por período
- `?cnae_id=1` - Filtrar por CNAE

### Exemplo:
```bash
curl "http://localhost:5000/api/indicadores?bairro_id=1&ano_inicio=2021&ano_fim=2023"
```

---

## 🎨 CORES DO MAPA

### Regiões:
- 🟢 **Centro**: Verde (#2E7D32)
- 🔵 **Norte**: Azul (#1976D2)
- 🔴 **Sul**: Vermelho (#C62828)
- 🟠 **Leste**: Laranja (#F57C00)
- 🟣 **Oeste**: Roxo (#7B1FA2)

---

## 🗺️ BAIRROS CADASTRADOS

### Total: 25 Bairros

**Centro (3)**: Centro, Brasmadeira, Universitário

**Norte (6)**: Coqueiral, Cancelli, Floresta, Interlagos, Santos Dumont, Guarujá

**Sul (6)**: Esmeralda, Palmeiras, Pacaembu, Santa Cruz, XIV de Novembro, Morumbi

**Leste (5)**: Cascavel Velho, Periolo, Neva, Santa Felicidade, Lago Azul

**Oeste (5)**: Cataratas, Brasília, Pioneiros, Parque Verde, Santa Bárbara

---

## 📈 INDICADORES DISPONÍVEIS

### Por Bairro (2020-2023):

#### Demografia:
- População
- Taxa de crescimento (%)
- Densidade (hab/km²)

#### Educação:
- Matrículas totais
- Matrículas por nível
- Escolas municipais/estaduais
- Taxa de alfabetização (%)

#### Saúde:
- Unidades de saúde
- Leitos disponíveis
- Atendimentos/mês
- Taxa mortalidade infantil (‰)

#### Infraestrutura:
- Cobertura água (%)
- Cobertura esgoto (%)
- Coleta de lixo (%)
- Iluminação pública (%)

#### Energia:
- Consumo (kWh)
- Consumidores

#### Economia:
- Empresas ativas
- Empregos formais
- Renda média (R$)

---

## 🔧 PRÓXIMOS PASSOS

### Para Integrar no Frontend:

1. **Atualizar DashboardGestao.tsx**:
   - Substituir mapa antigo por `MapaInterativo`
   - Adicionar filtro de bairros

2. **Atualizar FilterPanel.tsx**:
   - Adicionar seletor de bairros
   - Conectar com API `/api/bairros`

3. **Criar Gráficos Comparativos**:
   - Usar `/api/indicadores/comparacao-regioes`
   - Comparar bairros lado a lado

4. **Adicionar Tabelas Detalhadas**:
   - Usar `/api/indicadores` com filtros
   - Mostrar evolução temporal

---

## 🛠️ COMANDOS ÚTEIS

### Ver Logs:
```bash
docker-compose logs -f backend
docker-compose logs -f db
docker-compose logs -f frontend
```

### Reiniciar Serviços:
```bash
docker-compose restart backend
docker-compose restart frontend
```

### Parar Tudo:
```bash
docker-compose down
```

### Iniciar Novamente:
```bash
docker-compose up -d
```

### Ver Status:
```bash
docker-compose ps
```

---

## 🎯 VERIFICAR SE ESTÁ FUNCIONANDO

### 1. Banco de Dados:
```bash
docker-compose logs db | grep "ready to accept connections"
```
**Deve aparecer a mensagem!**

### 2. Backend:
```bash
curl http://localhost:5000/api/health
```
**Deve retornar JSON com status: healthy**

### 3. Frontend:
```bash
curl http://localhost:3000
```
**Deve retornar HTML do React**

### 4. Dados no Banco:
```bash
curl http://localhost:5000/api/bairros | jq '.dados | length'
```
**Deve retornar: 25**

---

## 📚 DOCUMENTAÇÃO COMPLETA

Para mais detalhes, veja:
- `README_FINAL_V2.md` - Documentação completa
- `ALTERACOES_V2.md` - O que foi alterado
- `SISTEMA_FUNCIONANDO_V2.md` - Dados e endpoints

---

## 🎊 TUDO PRONTO!

✅ **300+ registros** de dados mockados carregados  
✅ **25 bairros** de Cascavel cadastrados  
✅ **APIs completas** com filtros funcionando  
✅ **Mapa interativo** criado e pronto para usar  
✅ **Baselines automáticos** calculados  
✅ **Sistema focado em BAIRROS** como solicitado  
✅ **Alertas removidos** conforme pedido  

**🚀 SISTEMA PRONTO PARA USO E DESENVOLVIMENTO!**

