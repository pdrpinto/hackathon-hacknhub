# 🎨 Modal de Detalhes - Guia de Customização

## 🎯 Como Ajustar Elementos Visuais

Este guia permite que você ajuste facilmente qualquer aspecto visual do modal sem quebrar a funcionalidade.

---

## ⏱️ Ajustar Velocidade das Animações

### Tornar Animações Mais Rápidas
```css
/* Em Alertas.css, linha ~560 */

/* De 0.5s para 0.3s */
animation: modalSlideUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);

/* Ajustar todos os delays */
animation-delay: 0.1s;  /* Era 0.3s */
```

### Tornar Animações Mais Lentas
```css
/* Aumentar duração */
animation: modalSlideUp 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);

/* Aumentar delays */
animation-delay: 0.5s;  /* Era 0.3s */
```

### Desabilitar Animações Completamente
```css
/* Comentar todas as linhas animation: */
/* animation: fadeInUp 0.6s ease-out; */

/* Ou usar uma classe global */
.no-animations * {
  animation: none !important;
  transition: none !important;
}
```

---

## 🎨 Mudar Cores

### Badges de Severidade
```css
/* Crítico - Linha ~605 */
.badge-critico {
  background: linear-gradient(135deg, #ff4757 0%, #ff6b81 100%);
  /* Trocar para: */
  background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
}

/* Atenção - Linha ~610 */
.badge-atencao {
  background: linear-gradient(135deg, #f8d548 0%, #feca57 100%);
  /* Trocar para: */
  background: linear-gradient(135deg, #f39c12 0%, #e67e22 100%);
}
```

### Cores de Impactos
```css
/* Positivo - Linha ~762 */
.impacto-positivo {
  border-left-color: #0f9d58;
  /* Trocar para: */
  border-left-color: #27ae60;
}

/* Negativo - Linha ~769 */
.impacto-negativo {
  border-left-color: #d93025;
  /* Trocar para: */
  border-left-color: #e74c3c;
}
```

### Background do Modal
```css
/* Linha ~563 */
background: linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.98) 100%);

/* Trocar para tema escuro */
background: linear-gradient(135deg, rgba(20,30,40,0.95) 0%, rgba(10,20,30,0.98) 100%);
```

---

## 📐 Ajustar Tamanhos

### Tamanho do Modal
```css
/* Linha ~562 */
width: min(960px, 95vw);

/* Tornar menor */
width: min(800px, 90vw);

/* Tornar maior */
width: min(1200px, 98vw);
```

### Tamanho dos Ícones
```css
/* Ícones de métricas - Linha ~691 */
.metric-icon {
  font-size: 32px;
  /* Tornar maior: */
  font-size: 40px;
  /* Tornar menor: */
  font-size: 24px;
}

/* Ícones de impacto - Linha ~778 */
.impacto-icon {
  font-size: 28px;
  /* Ajustar conforme necessário */
}
```

### Tamanho das Fontes
```css
/* Título Hero - Linha ~631 */
.hero-title {
  font-size: 20px;
  /* Tornar maior: */
  font-size: 24px;
}

/* Valores de métricas - Linha ~705 */
.metric-value {
  font-size: 22px;
  /* Ajustar: */
  font-size: 26px;
}
```

---

## 🎯 Ajustar Espaçamentos

### Padding do Modal
```css
/* Header - Linha ~571 */
padding: 24px 28px 20px;
/* Aumentar: */
padding: 32px 36px 24px;

/* Content - Linha ~586 */
padding: 24px 28px;
/* Reduzir: */
padding: 16px 20px;
```

### Gaps entre Cards
```css
/* Métricas - Linha ~673 */
.metrics-cards {
  gap: 16px;
  /* Aumentar: */
  gap: 24px;
}

/* Impactos - Linha ~747 */
.impactos-grid {
  gap: 14px;
  /* Ajustar: */
  gap: 20px;
}
```

---

## 💫 Customizar Efeitos Hover

### Intensidade do Hover
```css
/* Cards de métricas - Linha ~683 */
.metric-card:hover {
  transform: translateY(-4px) scale(1.02);
  /* Mais sutil: */
  transform: translateY(-2px) scale(1.01);
  /* Mais dramático: */
  transform: translateY(-8px) scale(1.05);
}
```

### Shadows no Hover
```css
/* Shadow padrão - Linha ~686 */
box-shadow: 0 8px 24px rgba(0,0,0,0.12);

/* Shadow mais suave: */
box-shadow: 0 4px 16px rgba(0,0,0,0.08);

/* Shadow mais forte: */
box-shadow: 0 12px 32px rgba(0,0,0,0.18);
```

### Rotação de Ícones
```css
/* Ícone de métrica - Linha ~689 */
.metric-card:hover .metric-icon {
  transform: scale(1.2) rotate(10deg);
  /* Sem rotação: */
  transform: scale(1.2);
  /* Mais rotação: */
  transform: scale(1.3) rotate(20deg);
}
```

---

## 🎬 Customizar Animações Específicas

### Bounce do Modal
```css
/* Linha ~562 */
animation: modalSlideUp 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);

/* Menos bounce: */
animation: modalSlideUp 0.5s cubic-bezier(0.4, 1.2, 0.6, 1);

/* Mais bounce: */
animation: modalSlideUp 0.5s cubic-bezier(0.2, 2, 0.6, 1);

/* Sem bounce (linear): */
animation: modalSlideUp 0.5s ease-out;
```

### Animação dos Badges
```css
/* Linha ~597 */
animation: scaleIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) both;

/* Mais rápido: */
animation: scaleIn 0.2s cubic-bezier(0.34, 1.56, 0.64, 1) both;

/* Com fade: */
animation: scaleIn 0.4s ease-out both;
```

### Delays Progressivos
```css
/* Badges - Linhas ~598-600 */
.badge-lg:nth-child(1) { animation-delay: 0.4s; }
.badge-lg:nth-child(2) { animation-delay: 0.45s; }
.badge-lg:nth-child(3) { animation-delay: 0.5s; }

/* Mais rápido: */
.badge-lg:nth-child(1) { animation-delay: 0.2s; }
.badge-lg:nth-child(2) { animation-delay: 0.25s; }
.badge-lg:nth-child(3) { animation-delay: 0.3s; }
```

---

## 🎨 Temas Pré-definidos

### Tema Escuro
```css
/* Substituir no .modal (linha ~563) */
.modal {
  background: linear-gradient(135deg, rgba(20,30,40,0.98) 0%, rgba(10,20,30,1) 100%);
  border: 1px solid rgba(100, 150, 255, 0.3);
}

/* Hero section */
.detalhes-hero {
  background: linear-gradient(135deg, rgba(46, 161, 255, 0.15) 0%, rgba(124, 222, 118, 0.1) 100%);
  border-left-color: #48dbfb;
}

/* Text colors */
.hero-title, .section-title, .metric-value {
  color: #e0e0e0;
}

.hero-desc, .impacto-desc {
  color: rgba(255,255,255,0.8);
}
```

### Tema Minimalista
```css
/* Remover gradientes */
.badge-lg, .metric-card, .impacto-card {
  background: #ffffff;
  border: 1px solid #e0e0e0;
}

/* Shadows sutis */
box-shadow: 0 2px 8px rgba(0,0,0,0.06);

/* Hover discreto */
.metric-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}
```

### Tema Vibrante
```css
/* Cores mais saturadas */
.badge-critico {
  background: linear-gradient(135deg, #ff0844 0%, #ff4757 100%);
}

/* Shadows coloridas mais fortes */
box-shadow: 0 8px 24px rgba(46, 161, 255, 0.4);

/* Hover mais dramático */
.metric-card:hover {
  transform: translateY(-6px) scale(1.05);
}
```

---

## 📱 Ajustar Responsividade

### Breakpoint Mobile
```css
/* Linha ~897 */
@media (max-width: 768px) {
  /* Mudar para tablet menor: */
  @media (max-width: 640px) {
  
  /* Mudar para phone grande: */
  @media (max-width: 480px) {
}
```

### Grid de Métricas Mobile
```css
/* Linha ~906 */
.metrics-cards {
  grid-template-columns: 1fr;
  /* Manter 2 colunas no mobile: */
  grid-template-columns: repeat(2, 1fr);
}
```

---

## 🔧 Ajustes Rápidos Comuns

### Remover Blur do Backdrop
```css
/* Linha ~559 */
backdrop-filter: blur(8px);
/* Comentar ou reduzir: */
backdrop-filter: blur(0px);
```

### Scrollbar Mais Larga
```css
/* Linha ~883 */
.modal-content::-webkit-scrollbar {
  width: 8px;
  /* Aumentar: */
  width: 12px;
}
```

### Border-radius Mais Suave
```css
/* Modal - Linha ~567 */
border-radius: 24px;
/* Mais suave: */
border-radius: 16px;

/* Cards - várias linhas */
border-radius: 16px;
/* Mais suave: */
border-radius: 12px;
```

---

## 🎯 Dicas de Performance

### Reduzir Animações para Performance
```css
/* Usar apenas opacity e transform */
/* Evitar animar: width, height, top, left, right, bottom */

/* BOM ✅ */
transition: transform 0.3s, opacity 0.3s;

/* RUIM ❌ */
transition: width 0.3s, margin 0.3s;
```

### Otimizar Gradientes
```css
/* Gradiente complexo */
background: linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.98) 100%);

/* Simplificado */
background: rgba(255,255,255,0.95);
```

---

## 📋 Checklist de Customização

Antes de modificar, considere:

- [ ] A mudança melhora a legibilidade?
- [ ] Mantém contraste acessível (WCAG AA)?
- [ ] Preserva a hierarquia visual?
- [ ] Funciona em mobile?
- [ ] Performance 60fps mantida?
- [ ] Consistente com o resto do app?

---

## 🚀 Testar Suas Mudanças

```bash
# 1. Faça a mudança no CSS
# 2. Salve o arquivo
# 3. Recarregue o navegador (Ctrl+Shift+R)
# 4. Clique em um alerta
# 5. Observe o resultado
# 6. Ajuste conforme necessário
```

---

## 📚 Referências de Classes

### Classes Principais
```
.modal-detalhes      → Container principal
.detalhes-hero       → Seção hero
.badge-lg            → Badges grandes
.metrics-cards       → Grid de métricas
.metric-card         → Card individual de métrica
.impactos-grid       → Grid de impactos
.impacto-card        → Card individual de impacto
.acao-recomendada    → Seção de ação
.detalhes-footer     → Footer com timeline
```

### Modificadores de Estado
```
:hover               → Estado hover
.badge-critico       → Severidade crítica
.badge-atencao       → Severidade atenção
.impacto-positivo    → Impacto positivo
.impacto-negativo    → Impacto negativo
.badge-alta          → Confiança alta
.badge-media         → Confiança média
```

---

**Lembre-se**: Teste sempre em diferentes tamanhos de tela e navegadores após fazer mudanças! 🎨✨
