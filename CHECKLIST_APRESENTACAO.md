# ✅ Checklist de Apresentação - Cascavel em Números

## 📋 CHECKLIST COMPLETO PARA O HACKATHON

---

## 🕐 30 MINUTOS ANTES

### Setup Técnico
- [ ] Ligar o notebook e conectar ao projetor
- [ ] Testar projeção (espelhar telas)
- [ ] Ajustar resolução para 1920x1080 se possível
- [ ] Verificar conexão com internet (para tiles do mapa)
- [ ] Fechar todas as abas e programas desnecessários
- [ ] Desativar notificações do sistema
- [ ] Desativar protetor de tela
- [ ] Carregar bateria 100%
- [ ] Ter cabo de energia conectado

### Iniciar o Sistema
```bash
cd hackathon
docker-compose up -d
```

- [ ] Executar comando acima
- [ ] Aguardar ~30 segundos
- [ ] Verificar status: `docker-compose ps`
- [ ] Todos containers devem estar "Up"

### Testar Acesso
- [ ] Frontend: http://localhost:3000
- [ ] Backend: http://localhost:5000/api/health
- [ ] Deve retornar: `{"status":"healthy"}`

### Preparar Navegador
- [ ] Abrir Chrome/Firefox
- [ ] Abrir 4 abas:
  - Tab 1: http://localhost:3000/gestao
  - Tab 2: http://localhost:3000/tecnico
  - Tab 3: http://localhost:3000/publico
  - Tab 4: http://localhost:5000/api/health
- [ ] Ajustar zoom para 110% (Ctrl + ou Cmd +)
- [ ] Modo tela cheia (F11)
- [ ] Testar navegação entre abas

### Backup de Segurança
- [ ] Ter screenshots de todas as telas
- [ ] Ter vídeo gravado de 2 minutos
- [ ] Ter PDF do RESUMO_FINAL.md impresso
- [ ] Ter pen drive com projeto completo

---

## 🕐 10 MINUTOS ANTES

### Verificação Final
- [ ] Testar clicar em marcador do mapa (deve abrir popup)
- [ ] Testar aplicar filtro (deve funcionar)
- [ ] Testar exportar relatório (abrir o PDF gerado)
- [ ] Testar navegar entre dashboards
- [ ] Ver se gráficos carregaram
- [ ] Ver se KPIs estão visíveis

### Preparação Pessoal
- [ ] Revisar roteiro de apresentação
- [ ] Beber água
- [ ] Respirar fundo e relaxar 😊
- [ ] Ter papel e caneta para anotações

---

## 🎬 DURANTE A APRESENTAÇÃO (10 min)

### Minuto 0-1: Introdução
- [ ] Cumprimentar juízes
- [ ] Apresentar equipe
- [ ] Nome do projeto: **"Cascavel em Números"**
- [ ] Objetivo: **"Plataforma de análise e gestão pública"**

**Script sugerido:**
> "Bom dia/Boa tarde! Somos o time **Munhoz e Pinto** e apresentamos o **Cascavel em Números**, uma plataforma moderna para análise e gestão de dados públicos do município de Cascavel."

---

### Minuto 1-4: Dashboard Gestão ⭐

- [ ] Mostrar **KPIs principais** no topo
  - População: 332.333
  - IDH: 0.792
  - Matrículas: 75.443
  - Leitos: 949

- [ ] Mostrar **alertas de anomalias**
  - Destacar severidade (alta, média, baixa)
  - Explicar ação recomendada

- [ ] Interagir com **mapa** 🗺️ **[MUITO IMPORTANTE!]**
  - Clicar em **pelo menos 2 marcadores**
  - Mostrar popup com dados do bairro
  - Destacar que cores indicam densidade
  - Mostrar legenda

- [ ] Mostrar **gráfico de evolução populacional**
  - Destacar tendência de crescimento

**Script sugerido:**
> "Este é o Dashboard Executivo. Vejam os KPIs principais... Temos alertas de anomalias aqui... E o destaque: nosso **mapa interativo** com os bairros de Cascavel. Vou clicar aqui no Coqueiral... vejam, temos população, área e densidade calculada em tempo real!"

---

### Minuto 4-7: Dashboard Técnico 📊

- [ ] Navegar para aba do **Dashboard Técnico**

- [ ] Abrir aba **"Demografia"**
  - Mostrar tabela com dados históricos
  - Destacar série 2010-2022

- [ ] Aplicar **filtro de período**
  - Abrir painel de filtros
  - Mudar ano início para 2015
  - Clicar em "Aplicar Filtros"
  - Mostrar que dados mudaram

- [ ] Navegar para aba **"Educação"**
  - Mostrar gráfico de barras
  - Mostrar tabela detalhada

- [ ] **Exportar CSV** 📄
  - Clicar no botão "Exportar CSV"
  - Aguardar download
  - Abrir arquivo CSV (se tempo permitir)

**Script sugerido:**
> "Para os analistas técnicos, temos este dashboard com dados detalhados. Aqui podemos filtrar por período... veja, apliquei filtro de 2015 a 2022... e posso exportar os dados em CSV para análise offline."

---

### Minuto 7-9: Dashboard Público 🏛️

- [ ] Navegar para **Dashboard Público**

- [ ] Mostrar **cards por secretaria**
  - Educação
  - Saúde
  - Infraestrutura

- [ ] Mostrar **mapa** novamente
  - Reforçar que está em todas as visões

- [ ] Mostrar **gráfico de IDH**

**Script sugerido:**
> "E para o público interno, as secretarias, temos esta visão simplificada por área de atuação. Cada secretaria vê seus indicadores específicos de forma clara e objetiva."

---

### Minuto 9-10: Conclusão 🎯

- [ ] Destacar **diferenciais**:
  - ✅ Mapas interativos funcionais
  - ✅ Dados reais de Cascavel
  - ✅ Arquitetura profissional
  - ✅ 3 perfis de usuário
  - ✅ Totalmente responsivo

- [ ] Mencionar **tecnologias**:
  - React + TypeScript
  - Flask + PostgreSQL
  - Leaflet (mapas)
  - Docker

- [ ] Finalizar

**Script sugerido:**
> "Em resumo, o Cascavel em Números é uma solução completa e funcional, com **mapas interativos**, **dados reais**, arquitetura escalável, e **pronta para uso imediato**. Obrigado!"

---

## 🎤 PERGUNTAS E RESPOSTAS

### Perguntas Esperadas

**"Por que mockaram ML?"**
- [ ] Responder: "Focamos em UX e estrutura robusta no MVP. O sistema está preparado para receber modelos reais - basta plugar."

**"Os dados são reais?"**
- [ ] Responder: "Sim! Série histórica 2010-2022 extraída dos documentos fornecidos."

**"É escalável?"**
- [ ] Responder: "Sim! Seguimos SOLID, código modular, Docker, fácil adicionar features."

**"Como funciona o mapa?"**
- [ ] Responder: "Usamos Leaflet com tiles OpenStreetMap. Marcadores customizados por densidade populacional, com popups interativos."

**"Quanto tempo levou?"**
- [ ] Responder: "Aproximadamente 8-10 horas de desenvolvimento focado e organizado."

---

## ⚠️ PROBLEMAS COMUNS E SOLUÇÕES

### Container não inicia
```bash
docker-compose down -v
docker-compose up -d --build
```

### Mapa não carrega
- [ ] Verificar conexão com internet
- [ ] Recarregar página (Ctrl + R)

### Frontend não conecta ao backend
- [ ] Verificar se backend está UP: `docker-compose ps`
- [ ] Verificar health: http://localhost:5000/api/health

### Dados não aparecem
- [ ] Verificar se database foi populada:
```bash
docker exec -it cascavel_db psql -U cascavel_user -d cascavel_db -c "SELECT COUNT(*) FROM bairros;"
```

### Emergência Total
- [ ] Usar vídeo de backup
- [ ] Mostrar screenshots
- [ ] Explicar verbalmente

---

## 📸 SCREENSHOTS DE BACKUP

Ter prontas em uma pasta:
- [ ] `01_dashboard_gestao.png`
- [ ] `02_mapa_popup.png`
- [ ] `03_alertas.png`
- [ ] `04_dashboard_tecnico.png`
- [ ] `05_tabelas.png`
- [ ] `06_graficos.png`
- [ ] `07_dashboard_publico.png`
- [ ] `08_exportacao.png`

---

## 🎯 PONTOS-CHAVE PARA ENFATIZAR

### Visual
- [ ] Interface moderna e profissional
- [ ] Cores institucionais
- [ ] Design responsivo

### Técnico
- [ ] Arquitetura SOLID
- [ ] Type safety (TypeScript)
- [ ] API RESTful bem estruturada

### Funcional
- [ ] **MAPAS INTERATIVOS** 🗺️ ⭐⭐⭐
- [ ] Dados reais
- [ ] Filtros funcionando
- [ ] Exportação implementada

### Negócio
- [ ] 3 perfis de usuário
- [ ] Pronto para uso
- [ ] Escalável para outros municípios

---

## 📊 MÉTRICAS PARA CITAR

- ✅ **8 Tabelas** de dados
- ✅ **60+ Registros** históricos
- ✅ **10 Bairros** mapeados
- ✅ **25+ Endpoints** da API
- ✅ **3 Dashboards** completos
- ✅ **10+ Componentes** reutilizáveis
- ✅ **5 Anos** de série histórica (2010-2022)
- ✅ **100% Funcional** - nada mockado na interface

---

## 🏆 MENSAGEM FINAL

### Antes de Subir ao Palco

**Respire fundo. Você está preparado! 💪**

- ✅ Sistema está funcionando
- ✅ Você conhece o projeto
- ✅ Você tem backup
- ✅ Roteiro está claro

### Postura na Apresentação

- [ ] Falar com confiança
- [ ] Fazer contato visual com juízes
- [ ] Sorrir (mostra confiança)
- [ ] Gesticular (mas não muito)
- [ ] Não ler slides/código (falar naturalmente)
- [ ] Interagir com o sistema (clicar, navegar)

### Energia

- [ ] Tom de voz entusiasta (mas não exagerado)
- [ ] Mostrar paixão pelo projeto
- [ ] Destacar o que você acha mais legal
- [ ] Aproveitar o momento!

---

## ⏱️ TIMING

- **0-1 min**: Introdução
- **1-4 min**: Dashboard Gestão + Mapas ⭐
- **4-7 min**: Dashboard Técnico + Filtros
- **7-9 min**: Dashboard Público
- **9-10 min**: Conclusão

**LEMBRE-SE**: Se passar de 10 min, não tem problema! O importante é mostrar bem o projeto.

---

## 🎬 FRASE DE ABERTURA

> "Bom dia/Boa tarde! Somos o time **Munhoz e Pinto** e vamos apresentar o **Cascavel em Números**: uma plataforma moderna e funcional que transforma dados municipais em insights visuais e acionáveis para gestores públicos de Cascavel. Vamos ver como funciona?"

---

## 🎯 FRASE DE ENCERRAMENTO

> "Obrigado! Ficamos à disposição para perguntas. Ah, e se quiserem testar vocês mesmos, é só rodar `docker-compose up` - está tudo pronto! 🚀"

---

## ✅ CHECKLIST FINAL RÁPIDO

Antes de começar a apresentação:

```
☑️ Docker rodando?
☑️ Frontend abrindo?
☑️ Backend respondendo?
☑️ Mapa carregando?
☑️ Pode clicar nos marcadores?
☑️ Abas do navegador prontas?
☑️ Zoom ajustado?
☑️ Backup pronto?
☑️ Respirou fundo?
☑️ Tá confiante?

✅ BORA ARRASAR! 🏆
```

---

**🎉 VOCÊ CONSEGUE! BOA SORTE NO HACKATHON! 🚀**

---

**Última atualização**: Outubro 2025
**Equipe**: @Munhoz e @pinto
**Projeto**: Cascavel em Números 💙



