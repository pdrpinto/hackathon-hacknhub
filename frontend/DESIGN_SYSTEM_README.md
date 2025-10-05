# TraceGov - Design System Glassmorphism

## 🎨 Visão Geral

Este projeto implementa um design system moderno com glassmorphism para o Dashboard TraceGov de Cascavel.

### Stack Tecnológica
- **Framework**: React 18 + TypeScript
- **Roteamento**: React Router DOM v6
- **Gráficos**: Recharts
- **Animações**: GSAP
- **Estilo**: CSS Modules + Design Tokens

---

## 📱 Rotas Implementadas

### `/login` - Página de Login
- Fundo glassmorphism com halos difusos (azuis e amarelos)
- Card azul-escuro translúcido com gradiente
- Inputs de Email e Senha
- Botão "Entrar" navega para `/dashboard` (sem backend)
- Links: Esqueci senha, Cadastro, Privacidade, Termos

### `/signup` - Página de Cadastro
- Mesmo estilo visual do Login
- Campos: Email, CPF/CNPJ, Endereço, Senha
- Botão "Cadastrar" navega para `/dashboard`
- Links: Já possuo conta, Privacidade, Termos

### `/dashboard` - Dashboard Central
- Layout em grid: Sidebar (240px) + Conteúdo
- Fundo glassmorphism (mesmos halos do Login/Signup)
- **Topbar**: Busca, Chips (Categoria/Filtro), Ícones (Notificações + Perfil)
- **Sidebar**: Logo, decorações (Group 3.png), navegação
- **Conteúdo**:
  - Alerta condicional (se contratação < 90% da média)
  - Gráfico de linha (Setor Industrial - 12 meses)
  - Gráfico de barras (Tipos de Impostos)
  - Grid 2x2 de métricas (Customers, Orders, Revenue, Growth)
  - Barras horizontais (Imposto por setor) com destaque "Saúde"
  - Botões de ação: "Gerar PDF/CSV" e "Gerar Relatório"

---

## 🎨 Design Tokens

### Cores Principais
```css
--color-blue-deep: #0a2541
--color-blue-darker: #081d35
--color-blue-primary: #2EA1FF
--color-green-accent: #7CDE76
--color-yellow-accent: #F8D548
--color-text-light: #E6EEF6
--color-text-dark: #0B2239
```

### Sombras
```css
--shadow-card: 0 4px 16px rgba(0, 0, 0, 0.08)
--shadow-elevated: 0 4px 12px rgba(0, 0, 0, 0.12)
--shadow-hover: 0 8px 20px rgba(0, 0, 0, 0.16)
```

### Raios de Borda
```css
--radius-sm: 12px
--radius-md: 16px
--radius-lg: 20px
--radius-xl: 26px
```

---

## 🧩 Componentes Criados

### `AuthEllipses`
Fundo com elipses difusas CSS (halos azuis e amarelos).

**Arquivos**: 
- `src/components/common/AuthEllipses.tsx`
- `src/components/common/AuthEllipses.css`

### `AuthCard`
Card azul-escuro com gradiente para formulários de autenticação.

**Features**:
- Animação de entrada (GSAP: fade + translateY)
- Corner lines decorativas (SVG amarelas)
- Inputs estilizados com focus states
- Botões com linhas simétricas

**Arquivos**:
- `src/components/common/AuthCard.tsx`
- `src/components/common/AuthCard.css`

### `Sidebar`
Drawer de navegação lateral com decorações.

**Features**:
- Gradiente azul escuro
- Decorações (Group 3.png) no topo e rodapé (invertida)
- Logo TraceGov
- Itens de navegação com hover e estado ativo
- Responsivo (esconde em mobile)

**Arquivos**:
- `src/components/layout/Sidebar.tsx`
- `src/components/layout/Sidebar.css`

### `Topbar`
Header do dashboard com busca, chips e ícones.

**Features**:
- Busca com placeholder "🔍 Search" (max-width 600px)
- Chips "Categoria" e "Filtro" com ripple effect
- Ícones circulares (48x48) com animação GSAP
- Badge de notificação com pulse infinito

**Arquivos**:
- `src/components/layout/Topbar.tsx`
- `src/components/layout/Topbar.css`

---

## 📊 Gráficos e Dados

### Gráfico de Linha (Setor Industrial)
- 12 meses de dados mock
- Séries: Contratação (verde #7CDE76) e Desemprego (azul #2EA1FF)
- Sem dots, strokeWidth 3
- Tooltip customizado (fundo escuro translúcido)

### Gráfico de Barras (Tipos de Impostos)
- 4 tipos: IPTU, ISS, IPVA, ICMS
- Cor: #2EA1FF
- Bordas arredondadas no topo

### Barras Horizontais (Setores)
- Comércio, Indústria, Saúde (destacada), Serviços
- Barra de fundo cinza translúcida
- Saúde com gradiente azul escuro → azul primário

### Métricas (Grid 2x2)
- Customers, Orders, Revenue, Growth
- Cards brancos translúcidos com hover (elevação)
- Delta com cores (verde para positivo, vermelho para negativo)

---

## 🎭 Animações e Microinterações

### GSAP
- **AuthCard**: Entrada com fade + translateY (power2.out)
- **Ícones Topbar**: Entrada escalonada (scale 0→1, stagger 0.1s, back.out)
- **Ícones Hover**: Scale 1→1.1 suave

### CSS
- **Chips**: Ripple em hover (pseudo-elemento)
- **Badge Notificação**: Pulse infinito (2s)
- **Botões**: Elevação no hover, recuo no active
- **Cards**: Hover com sombra aumentada
- **Inputs**: Focus com border azul e shadow

---

## 📂 Estrutura de Arquivos

```
frontend/src/
├── components/
│   ├── common/
│   │   ├── AuthEllipses.tsx
│   │   ├── AuthEllipses.css
│   │   ├── AuthCard.tsx
│   │   └── AuthCard.css
│   └── layout/
│       ├── Sidebar.tsx
│       ├── Sidebar.css
│       ├── Topbar.tsx
│       └── Topbar.css
├── pages/
│   ├── Auth/
│   │   ├── Login.tsx
│   │   ├── Login.css
│   │   ├── Signup.tsx
│   │   └── Signup.css
│   └── Dashboard/
│       ├── Dashboard.tsx
│       └── Dashboard.css
├── styles/
│   └── tokens.css
├── utils/
│   └── assets.ts
├── App.tsx
├── index.tsx
└── index.css
```

---

## 🚀 Como Executar

```bash
cd frontend
npm install
npm start
```

O app abre em `http://localhost:3000/login`

---

## 📐 Responsividade

### Breakpoints
- **980px**: Sidebar reduz para 200px, gráficos em coluna única
- **768px**: Sidebar esconde (mobile), métricas em 1 coluna
- **600px**: Chips/inputs reduzem padding, topbar adapta

---

## ⚠️ Importante

### Restrições de Implementação
1. **Não alterar lógica de backend** - Todas as mudanças são visuais (CSS/JSX)
2. **Não fazer chamadas de API** sem aprovação
3. **Manter estrutura de classes e componentes** existentes
4. **Perguntar antes de adicionar funcionalidades** novas

### Se Precisar Estender

- **Novos cards**: Use `.card` (branco translúcido, sombra)
- **Novos botões auth**: Use `.btn` (claro)
- **Novos botões dashboard**: Use `.btn-action` (azul escuro)
- **Novos ícones topbar**: Seguir `.icon-btn` (48x48) + GSAP
- **Novos gráficos**: Encaixar em `.card`, respeitar cores primárias

---

## 🎨 Assets Necessários

Certifique-se de que estes arquivos existem em `public/assets/`:
- `logo.png` - Logo TraceGov
- `Group (3).png` - Linha decorativa da sidebar
- (Opcional) `Ellipse 23.png` e `Ellipse 25.png` - Mantidos no helper, mas não usados (substituídos por CSS)

---

## 📝 Créditos

Design system inspirado em:
- Glassmorphism trends
- GSAP/ReactBits microanimações
- Material Design principles (adaptado)

---

## 🆘 Suporte

Para dúvidas sobre:
- **Cores/estilos**: Verifique `src/styles/tokens.css`
- **Componentes**: Consulte a seção "Componentes Criados"
- **Animações**: Reveja "Animações e Microinterações"

**Nunca altere a lógica do backend. Tudo é front-end only.**
