# 🎨 TraceGov Design System - Glassmorphism

> Design system completo para o Dashboard de Cascavel com React + TypeScript + GSAP

![Status](https://img.shields.io/badge/Status-Completo-success)
![React](https://img.shields.io/badge/React-18.2.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-4.9.5-blue)
![GSAP](https://img.shields.io/badge/GSAP-Latest-green)

---

## 📋 Índice

- [Visão Geral](#-visão-geral)
- [Features](#-features)
- [Instalação](#-instalação)
- [Documentação](#-documentação)
- [Screenshots](#-screenshots)
- [Tecnologias](#-tecnologias)
- [Estrutura](#-estrutura)

---

## 🎯 Visão Geral

Sistema de design moderno com **glassmorphism** para o Dashboard TraceGov de Cascavel. Implementa três páginas principais (Login, Signup, Dashboard) com componentes reutilizáveis, animações suaves e design responsivo.

### Principais Características
- ✨ **Glassmorphism** com halos difusos (azuis e amarelos)
- 🎭 **Animações GSAP** e microinterações CSS
- 📊 **Gráficos Recharts** (linha, barras, métricas)
- 📱 **Totalmente Responsivo** (mobile-first)
- 🎨 **Design Tokens** centralizados
- 🚀 **TypeScript** com types completos

---

## ✨ Features

### Páginas Implementadas

#### `/login` - Autenticação
- Card azul-escuro translúcido
- Fundo glassmorphism com halos
- Inputs estilizados (Email, Senha)
- Navegação mock para dashboard

#### `/signup` - Cadastro
- Mesmo padrão visual do Login
- 4 campos (Email, CPF/CNPJ, Endereço, Senha)
- Links para privacidade e termos

#### `/dashboard` - Central
- **Sidebar**: Navegação com decorações
- **Topbar**: Busca, chips, ícones animados
- **Gráficos**: Linha (12 meses) + Barras (impostos)
- **Métricas**: Grid 2x2 (Customers, Orders, Revenue, Growth)
- **Setores**: Barras horizontais com destaque
- **Ações**: Botões para PDF/CSV e Relatório

### Componentes

| Componente | Descrição |
|------------|-----------|
| `AuthEllipses` | Fundo com halos difusos (8 elipses CSS) |
| `AuthCard` | Card azul com animação GSAP |
| `Sidebar` | Navegação lateral com decorações |
| `Topbar` | Header com busca e ícones animados |

---

## 🚀 Instalação

```bash
# Clone o repositório
git clone https://github.com/pdrpinto/hackathon-hacknhub.git
cd hackathon-hacknhub/frontend

# Instale dependências
npm install

# Inicie o servidor de desenvolvimento
npm start

# Acesse: http://localhost:3000/login
```

### Dependências Principais
- React 18.2.0
- React Router DOM 6.20.1
- Recharts 2.10.3
- GSAP (latest)
- TypeScript 4.9.5

---

## 📚 Documentação

Documentação completa disponível em:

| Documento | Descrição |
|-----------|-----------|
| [QUICK_START.md](./QUICK_START.md) | Guia rápido de uso e navegação |
| [DESIGN_SYSTEM_README.md](./DESIGN_SYSTEM_README.md) | Documentação completa do design system |
| [IMPLEMENTATION_CHECKLIST.md](./IMPLEMENTATION_CHECKLIST.md) | Checklist de implementação |
| [EXTENSION_GUIDE.md](./EXTENSION_GUIDE.md) | Como estender o sistema |

### Design Tokens

```css
/* Cores */
--color-blue-deep: #0a2541
--color-blue-primary: #2EA1FF
--color-green-accent: #7CDE76
--color-yellow-accent: #F8D548

/* Raios */
--radius-sm: 12px
--radius-md: 16px
--radius-lg: 20px
--radius-xl: 26px

/* Sombras */
--shadow-card: 0 4px 16px rgba(0, 0, 0, 0.08)
--shadow-hover: 0 8px 20px rgba(0, 0, 0, 0.16)
```

---

## 📸 Screenshots

### Login Page
- Fundo glassmorphism com halos azuis e amarelos
- Card azul-escuro com inputs translúcidos
- Corner lines decorativas

### Dashboard
- Grid: Sidebar (240px) + Conteúdo responsivo
- Topbar com busca, chips e ícones circulares
- Gráficos de linha e barras (Recharts)
- Métricas 2x2 com hover effects
- Barras horizontais de setores

---

## 🛠 Tecnologias

- **Framework**: React 18 + TypeScript
- **Roteamento**: React Router DOM v6
- **Gráficos**: Recharts 2.10.3
- **Animações**: GSAP
- **Estilo**: CSS Modules + Design Tokens
- **Build**: React Scripts (CRA)

---

## 📂 Estrutura

```
frontend/
├── src/
│   ├── components/
│   │   ├── common/          # AuthEllipses, AuthCard
│   │   └── layout/          # Sidebar, Topbar
│   ├── pages/
│   │   ├── Auth/            # Login, Signup
│   │   └── Dashboard/       # Dashboard principal
│   ├── styles/
│   │   └── tokens.css       # Design tokens
│   ├── utils/
│   │   └── assets.ts        # Helper de assets
│   ├── App.tsx              # Rotas
│   └── index.tsx            # Entry point
├── public/
│   └── assets/              # Logo, decorações
├── QUICK_START.md
├── DESIGN_SYSTEM_README.md
├── IMPLEMENTATION_CHECKLIST.md
└── EXTENSION_GUIDE.md
```

---

## 🎨 Design Principles

1. **Consistência**: Todos componentes seguem design tokens
2. **Responsividade**: Mobile-first, breakpoints em 980px, 768px, 600px
3. **Microinterações**: Hover, focus, animações sutis
4. **Acessibilidade**: Focus states, contraste adequado
5. **Performance**: Animações GPU-accelerated, lazy loading

---

## 🔧 Scripts Disponíveis

```bash
npm start          # Inicia servidor dev (porta 3000)
npm build          # Build para produção
npm test           # Executa testes
npm run eject      # Ejeta CRA (não recomendado)
```

---

## 📱 Responsividade

| Breakpoint | Mudanças |
|------------|----------|
| `< 980px` | Sidebar 200px, gráficos empilhados |
| `< 768px` | Sidebar esconde, métricas 1 coluna |
| `< 600px` | Padding reduzido, botões full-width |

---

## ⚠️ Avisos Importantes

### 🔒 Restrições
- **Não alterar lógica do backend** - Apenas visual (CSS/JSX)
- **Navegação mock** - Login/Signup apenas navegam sem auth real
- **Dados mock** - Gráficos usam dados estáticos

### ✅ Permitido
- Criar novos componentes visuais
- Adicionar animações
- Estender design tokens
- Criar variações de componentes

---

## 🚀 Próximos Passos

Para integração com backend:
1. Criar serviço de autenticação
2. Conectar gráficos com API
3. Implementar filtros funcionais
4. Adicionar exportação real (PDF/CSV)

Ver [EXTENSION_GUIDE.md](./EXTENSION_GUIDE.md) para detalhes.

---

## 🤝 Contribuindo

1. Leia [EXTENSION_GUIDE.md](./EXTENSION_GUIDE.md)
2. Siga os design tokens em `src/styles/tokens.css`
3. Mantenha consistência com componentes existentes
4. Teste responsividade
5. Documente novos componentes

---

## 📄 Licença

Este projeto faz parte do Hackathon HacknHub Cascavel.

---

## 📞 Suporte

Para dúvidas:
- **Design Tokens**: `src/styles/tokens.css`
- **Componentes**: Ver [DESIGN_SYSTEM_README.md](./DESIGN_SYSTEM_README.md)
- **Extensões**: Ver [EXTENSION_GUIDE.md](./EXTENSION_GUIDE.md)

---

## ✨ Status

**✅ IMPLEMENTAÇÃO COMPLETA**

- [x] 3 páginas (Login, Signup, Dashboard)
- [x] 6 componentes reutilizáveis
- [x] Design tokens centralizados
- [x] Animações GSAP + CSS
- [x] Gráficos Recharts
- [x] Totalmente responsivo
- [x] Documentação completa

**Pronto para uso!** 🎉

---

<p align="center">
  Made with ❤️ for Hackathon Cascavel
</p>
