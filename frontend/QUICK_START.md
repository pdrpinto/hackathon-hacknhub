# 🚀 Guia Rápido - Design System TraceGov

## ✅ O Que Foi Implementado

### Páginas Completas
- ✅ `/login` - Login com glassmorphism
- ✅ `/signup` - Cadastro com glassmorphism  
- ✅ `/dashboard` - Dashboard central completo

### Componentes
- ✅ `AuthEllipses` - Fundo com halos difusos
- ✅ `AuthCard` - Card azul escuro para auth
- ✅ `Sidebar` - Navegação lateral com decorações
- ✅ `Topbar` - Header com busca, chips e ícones animados

### Features
- ✅ Animações GSAP (entrada de cards e ícones)
- ✅ Gráficos Recharts (linha e barras)
- ✅ Métricas 2x2 responsivas
- ✅ Botões de ação (PDF/CSV, Relatório)
- ✅ Alerta condicional
- ✅ Design tokens centralizados
- ✅ Totalmente responsivo

---

## 🎯 Como Navegar

1. **Inicie o app**: `npm start` (porta 3001 se 3000 estiver ocupada)
2. **Acesse**: http://localhost:3001/login
3. **Login**: Clique em "Entrar" → vai para `/dashboard`
4. **Cadastro**: No login, clique em "Cadastrar" → `/signup` → "Cadastrar" → `/dashboard`

---

## 🎨 Principais Classes CSS

### Auth Pages
```css
.auth-page        /* Container principal */
.auth-wrapper     /* Card azul-escuro */
.label            /* Labels dos inputs */
.input            /* Inputs estilizados */
.btn              /* Botão claro (auth) */
.auth-footer-links /* Grid de links */
```

### Dashboard
```css
.dashboard-layout /* Grid: sidebar + content */
.topbar           /* Header */
.search input     /* Barra de busca */
.chip             /* Chips com ripple */
.icon-btn         /* Ícones circulares */
.card             /* Cards brancos translúcidos */
.stat             /* Métricas individuais */
.btn-action       /* Botões azuis (ações) */
.sector-bar       /* Barras horizontais */
```

### Sidebar
```css
.sidebar          /* Container */
.nav-item         /* Itens de navegação */
.nav-item.active  /* Item ativo */
```

---

## 🔧 Customização Rápida

### Mudar Cores
Edite `src/styles/tokens.css`:
```css
--color-blue-primary: #2EA1FF;  /* Azul principal */
--color-green-accent: #7CDE76;  /* Verde (positivos) */
--color-yellow-accent: #F8D548; /* Amarelo (acentos) */
```

### Ajustar Raios
```css
--radius-sm: 12px;  /* Pequeno */
--radius-md: 16px;  /* Médio */
--radius-lg: 20px;  /* Grande */
--radius-xl: 26px;  /* Extra grande */
```

### Modificar Sombras
```css
--shadow-card: 0 4px 16px rgba(0, 0, 0, 0.08);
--shadow-hover: 0 8px 20px rgba(0, 0, 0, 0.16);
```

---

## 📊 Dados Mock

### Gráfico de Linha
Localização: `src/pages/Dashboard/Dashboard.tsx`
```tsx
const lineChartData = [
  { mes: 'Jan', contratacao: 120, desemprego: 80 },
  // ... 12 meses
];
```

### Gráfico de Barras
```tsx
const barChartData = [
  { tipo: 'IPTU', valor: 2400 },
  { tipo: 'ISS', valor: 1398 },
  // ...
];
```

**Para conectar com backend**: Substitua os arrays mock por chamadas de API, mantendo a mesma estrutura de dados.

---

## 🎭 Animações Implementadas

### GSAP
- **AuthCard**: Fade + slide up na entrada
- **Ícones Topbar**: Entrada escalonada com bounce
- **Hover de Ícones**: Scale suave (1 → 1.1)

### CSS
- **Chips**: Ripple effect no hover
- **Badge**: Pulse infinito
- **Cards**: Elevação no hover
- **Inputs**: Focus com glow azul

---

## 📱 Responsividade

| Breakpoint | Mudanças |
|------------|----------|
| < 980px | Sidebar 200px, gráficos empilhados |
| < 768px | Sidebar esconde, métricas 1 coluna |
| < 600px | Cards/inputs com padding reduzido |

---

## ⚙️ Estrutura de Pastas

```
src/
├── components/
│   ├── common/          # AuthEllipses, AuthCard
│   └── layout/          # Sidebar, Topbar
├── pages/
│   ├── Auth/            # Login, Signup
│   └── Dashboard/       # Dashboard
├── styles/
│   └── tokens.css       # Design tokens
├── utils/
│   └── assets.ts        # Helper de assets
├── App.tsx              # Rotas principais
└── index.css            # Estilos globais
```

---

## 🚨 Problemas Comuns

### Logo não aparece
- Verifique se `public/assets/logo.png` existe
- Alternativa: Use logo.svg ou crie um placeholder

### Gráficos não renderizam
- Confirme que `recharts` está instalado: `npm install recharts`
- Verifique imports no Dashboard.tsx

### Animações não funcionam
- Confirme que `gsap` está instalado: `npm install gsap`
- Verifique console do navegador

### Porta 3000 ocupada
- Use: `$env:PORT=3001; npm start` (PowerShell)
- Ou: `PORT=3001 npm start` (Bash/Mac)

---

## 🔗 Próximos Passos

### Backend Integration (quando necessário)
1. Criar serviço de API em `src/services/`
2. Substituir dados mock por chamadas reais
3. Adicionar loading states nos cards
4. Implementar error handling

### Features Adicionais (se solicitado)
- [ ] Filtros funcionais (Categoria, Período)
- [ ] Exportação real (PDF/CSV)
- [ ] Autenticação com JWT
- [ ] Tema dark/light toggle
- [ ] Notificações funcionais
- [ ] Perfil de usuário

---

## 💡 Dicas de Desenvolvimento

1. **Mantenha os design tokens**: Sempre use variáveis CSS (`var(--color-*)`), nunca hardcode cores
2. **Reutilize componentes**: Use `<AuthCard>` para qualquer card similar
3. **Siga a convenção de classes**: `.card`, `.btn`, `.btn-action`, etc.
4. **Teste responsividade**: Use DevTools para verificar breakpoints
5. **Não quebre o backend**: Toda alteração deve ser apenas visual

---

## 📞 Suporte

- **Design tokens**: `src/styles/tokens.css`
- **Componentes**: Veja DESIGN_SYSTEM_README.md
- **Assets**: `src/utils/assets.ts`

**Lembre-se**: Este é um design system **front-end only**. Não altere lógica do backend sem permissão.

---

## 🎉 Pronto para Usar!

O design system está completo e funcional. Navegue pelas páginas e explore os componentes!

**Acesse agora**: http://localhost:3001/login
