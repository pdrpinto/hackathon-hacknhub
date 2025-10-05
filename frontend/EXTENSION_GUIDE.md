# 🔧 Guia de Extensão - Design System TraceGov

Este guia mostra como adicionar novos componentes e features mantendo o padrão visual.

---

## 📦 Adicionando Novo Card

### Exemplo: Card de Notícias

```tsx
// src/components/common/NewsCard.tsx
import React from 'react';
import './NewsCard.css';

interface NewsCardProps {
  title: string;
  description: string;
  date: string;
}

const NewsCard: React.FC<NewsCardProps> = ({ title, description, date }) => {
  return (
    <div className="card news-card">
      <h3>{title}</h3>
      <p className="news-description">{description}</p>
      <span className="news-date">{date}</span>
    </div>
  );
};

export default NewsCard;
```

```css
/* src/components/common/NewsCard.css */
.news-card {
  /* Card já tem estilos base de .card */
  transition: all var(--transition-normal);
}

.news-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-hover);
}

.news-description {
  color: rgba(11, 34, 57, 0.7);
  font-size: 14px;
  line-height: 1.6;
  margin: var(--spacing-md) 0;
}

.news-date {
  color: var(--color-blue-primary);
  font-size: 12px;
  font-weight: var(--font-weight-semibold);
}
```

**Uso:**
```tsx
<NewsCard 
  title="Nova Atualização" 
  description="Descrição da notícia aqui..."
  date="05/10/2025"
/>
```

---

## 🎨 Adicionando Novo Botão

### Exemplo: Botão Secundário

```css
/* Adicionar em src/styles/tokens.css ou component CSS */
.btn-secondary {
  background: transparent;
  color: var(--color-blue-primary);
  border: 2px solid var(--color-blue-primary);
  padding: 12px 24px;
  border-radius: var(--radius-md);
  font-size: 14px;
  font-weight: var(--font-weight-semibold);
  font-family: var(--font-family);
  cursor: pointer;
  transition: all var(--transition-normal);
}

.btn-secondary:hover {
  background: var(--color-blue-primary);
  color: white;
  transform: translateY(-2px);
  box-shadow: var(--shadow-elevated);
}
```

**Uso:**
```tsx
<button className="btn-secondary">Cancelar</button>
```

---

## 📊 Adicionando Novo Gráfico

### Exemplo: Gráfico de Pizza (Donut)

```tsx
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
  { name: 'Categoria A', value: 400 },
  { name: 'Categoria B', value: 300 },
  { name: 'Categoria C', value: 200 }
];

const COLORS = ['#2EA1FF', '#7CDE76', '#F8D548'];

const DonutChart = () => (
  <div className="card chart-card">
    <h3>Distribuição por Categoria</h3>
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
          paddingAngle={2}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip 
          contentStyle={{ 
            background: 'rgba(10, 37, 65, 0.95)', 
            border: 'none', 
            borderRadius: '12px',
            color: '#E6EEF6'
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  </div>
);
```

---

## 🔔 Adicionando Modal

### Exemplo: Modal de Confirmação

```tsx
// src/components/common/Modal.tsx
import React from 'react';
import './Modal.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{title}</h3>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
```

```css
/* src/components/common/Modal.css */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(10, 42, 65, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease;
}

.modal-content {
  background: white;
  border-radius: var(--radius-xl);
  max-width: 500px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: slideUp 0.3s ease;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-lg);
  border-bottom: 1px solid var(--color-border-light);
}

.modal-header h3 {
  color: var(--color-text-dark);
  font-size: 20px;
  font-weight: var(--font-weight-bold);
  margin: 0;
}

.modal-close {
  background: none;
  border: none;
  font-size: 24px;
  color: rgba(11, 34, 57, 0.5);
  cursor: pointer;
  transition: color var(--transition-fast);
}

.modal-close:hover {
  color: var(--color-text-dark);
}

.modal-body {
  padding: var(--spacing-lg);
}
```

**Uso:**
```tsx
const [isOpen, setIsOpen] = useState(false);

<Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Confirmar Ação">
  <p>Tem certeza que deseja continuar?</p>
  <button className="btn-action" onClick={handleConfirm}>Confirmar</button>
</Modal>
```

---

## 🔄 Adicionando Loading State

### Exemplo: Skeleton Loader

```css
/* src/styles/loaders.css */
.skeleton {
  background: linear-gradient(
    90deg,
    rgba(10, 42, 65, 0.08) 0%,
    rgba(10, 42, 65, 0.15) 50%,
    rgba(10, 42, 65, 0.08) 100%
  );
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;
  border-radius: var(--radius-sm);
}

@keyframes skeleton-loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

.skeleton-text {
  height: 16px;
  margin-bottom: var(--spacing-sm);
}

.skeleton-title {
  height: 24px;
  width: 60%;
  margin-bottom: var(--spacing-md);
}

.skeleton-card {
  height: 200px;
}
```

**Uso:**
```tsx
{loading ? (
  <div className="skeleton skeleton-card"></div>
) : (
  <div className="card">
    {/* Conteúdo real */}
  </div>
)}
```

---

## 📝 Adicionando Novo Input

### Exemplo: Input com Ícone

```tsx
// src/components/common/IconInput.tsx
import React from 'react';
import './IconInput.css';

interface IconInputProps {
  icon: string;
  placeholder: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
}

const IconInput: React.FC<IconInputProps> = ({ 
  icon, 
  placeholder, 
  type = 'text',
  value,
  onChange 
}) => {
  return (
    <div className="icon-input-wrapper">
      <span className="input-icon">{icon}</span>
      <input
        type={type}
        className="icon-input"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default IconInput;
```

```css
/* src/components/common/IconInput.css */
.icon-input-wrapper {
  position: relative;
  width: 100%;
}

.input-icon {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 18px;
  color: rgba(11, 34, 57, 0.4);
  pointer-events: none;
  z-index: 1;
}

.icon-input {
  width: 100%;
  padding: 14px 16px 14px 48px;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid var(--color-border-medium);
  border-radius: var(--radius-md);
  font-size: 15px;
  font-family: var(--font-family);
  color: var(--color-text-dark);
  transition: all var(--transition-normal);
  outline: none;
}

.icon-input:focus {
  border-color: var(--color-blue-primary);
  box-shadow: 0 0 0 3px rgba(46, 161, 255, 0.1);
}

.icon-input:focus + .input-icon {
  color: var(--color-blue-primary);
}
```

**Uso:**
```tsx
<IconInput
  icon="📧"
  placeholder="Digite seu email"
  type="email"
  value={email}
  onChange={setEmail}
/>
```

---

## 🎭 Adicionando Animação Customizada

### Exemplo: Fade In Staggered

```tsx
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const AnimatedList = ({ items }) => {
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (listRef.current) {
      const children = listRef.current.children;
      gsap.fromTo(
        children,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out'
        }
      );
    }
  }, []);

  return (
    <div ref={listRef}>
      {items.map((item, index) => (
        <div key={index} className="card">
          {item}
        </div>
      ))}
    </div>
  );
};
```

---

## 🎨 Criando Tema Variante

### Exemplo: Modo Escuro

```css
/* Adicionar em tokens.css */
[data-theme="dark"] {
  --color-bg-primary: #081d35;
  --color-bg-secondary: #0a2541;
  --color-text-primary: #E6EEF6;
  --color-card-bg: rgba(10, 42, 65, 0.6);
  --color-border-light: rgba(230, 238, 246, 0.1);
}

/* Aplicar ao body */
body[data-theme="dark"] {
  background: var(--color-bg-primary);
  color: var(--color-text-primary);
}

/* Cards */
[data-theme="dark"] .card {
  background: var(--color-card-bg);
  color: var(--color-text-primary);
  border-color: var(--color-border-light);
}
```

**Toggle Theme:**
```tsx
const toggleTheme = () => {
  const current = document.body.getAttribute('data-theme');
  document.body.setAttribute('data-theme', current === 'dark' ? 'light' : 'dark');
};

<button onClick={toggleTheme}>🌙 Trocar Tema</button>
```

---

## 📊 Adicionando Filtro Funcional

### Exemplo: Dropdown de Categoria

```tsx
import React, { useState } from 'react';

const CategoryFilter = ({ onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState('Todas');
  
  const categories = ['Todas', 'Indústria', 'Comércio', 'Saúde', 'Serviços'];

  const handleSelect = (category: string) => {
    setSelected(category);
    onFilterChange(category);
    setIsOpen(false);
  };

  return (
    <div className="dropdown">
      <button className="chip" onClick={() => setIsOpen(!isOpen)}>
        {selected} ▼
      </button>
      {isOpen && (
        <div className="dropdown-menu">
          {categories.map((cat) => (
            <button
              key={cat}
              className="dropdown-item"
              onClick={() => handleSelect(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
```

```css
.dropdown {
  position: relative;
}

.dropdown-menu {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  background: white;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-elevated);
  padding: var(--spacing-sm);
  min-width: 150px;
  z-index: 100;
  animation: fadeIn 0.2s ease;
}

.dropdown-item {
  width: 100%;
  padding: var(--spacing-sm) var(--spacing-md);
  background: none;
  border: none;
  text-align: left;
  font-family: var(--font-family);
  font-size: 14px;
  color: var(--color-text-dark);
  cursor: pointer;
  border-radius: var(--radius-sm);
  transition: background var(--transition-fast);
}

.dropdown-item:hover {
  background: var(--color-border-light);
}
```

---

## 🚨 Importante: Regras de Extensão

### ✅ PERMITIDO:
- Criar novos componentes visuais
- Adicionar animações CSS/GSAP
- Estender design tokens
- Criar variações de componentes existentes
- Adicionar novos gráficos (Recharts)

### ❌ NÃO PERMITIDO (sem aprovação):
- Alterar lógica do backend
- Fazer chamadas de API sem confirmação
- Modificar contratos/interfaces existentes
- Quebrar componentes existentes
- Alterar design tokens base sem discussão

### 💡 BOAS PRÁTICAS:
1. **Sempre usar design tokens** (variáveis CSS)
2. **Manter consistência** com componentes existentes
3. **Documentar** novos componentes criados
4. **Testar responsividade** em todos breakpoints
5. **Seguir nomenclatura** de classes estabelecida
6. **Adicionar tipos TypeScript** em novos componentes
7. **Perguntar antes** de grandes mudanças

---

## 📞 Onde Buscar Ajuda

- **Design Tokens**: `src/styles/tokens.css`
- **Componentes Base**: `src/components/common/`
- **Layout**: `src/components/layout/`
- **Exemplos de Uso**: `src/pages/Dashboard/Dashboard.tsx`
- **Assets**: `src/utils/assets.ts`

---

## ✨ Checklist para Novos Componentes

Antes de adicionar um novo componente:

- [ ] Define interface TypeScript
- [ ] Cria arquivo .tsx e .css separados
- [ ] Usa design tokens (não hardcode cores/espaços)
- [ ] Adiciona hover/focus states
- [ ] Testa responsividade
- [ ] Adiciona animações se necessário
- [ ] Documenta props e uso
- [ ] Testa com dados reais e edge cases
- [ ] Adiciona ao index para export (se necessário)

---

**Lembre-se**: Mantenha a consistência visual e sempre pergunte antes de alterações significativas! 🎨
