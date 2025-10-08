import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import './Topbar.css';

const Topbar: React.FC = () => {
  const iconsRef = useRef<HTMLDivElement>(null);
  const [showCategorias, setShowCategorias] = useState(false);
  const [showFiltros, setShowFiltros] = useState(false);

  useEffect(() => {
    // Animação de entrada dos ícones
    if (iconsRef.current) {
      const icons = iconsRef.current.querySelectorAll('.icon-btn');
      gsap.fromTo(
        icons,
        { scale: 0, opacity: 0 },
        { 
          scale: 1, 
          opacity: 1, 
          duration: 0.4, 
          stagger: 0.1,
          ease: 'back.out(1.7)'
        }
      );
    }
  }, []);

  const handleIconHover = (e: React.MouseEvent<HTMLButtonElement>) => {
    gsap.to(e.currentTarget, { scale: 1.1, duration: 0.2, ease: 'power2.out' });
  };

  const handleIconLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    gsap.to(e.currentTarget, { scale: 1, duration: 0.2, ease: 'power2.out' });
  };

  return (
    <header className="topbar">
      {/* Busca */}
      <div className="search">
        <input type="text" placeholder="🔍 Pesquisar indicadores, bairros, relatórios..." />
      </div>
      
      {/* Chips com funcionalidade */}
      <div className="chips">
        <div style={{ position: 'relative' }}>
          <button className="chip chip-interactive" onClick={() => { setShowCategorias(!showCategorias); setShowFiltros(false); }}>
            📂 Categoria
          </button>
          {showCategorias && (
            <div className="chip-dropdown">
              <button className="chip-dropdown-item">📊 Economia</button>
              <button className="chip-dropdown-item">🏥 Saúde</button>
              <button className="chip-dropdown-item">📚 Educação</button>
              <button className="chip-dropdown-item">🏗️ Infraestrutura</button>
              <button className="chip-dropdown-item">🌳 Meio Ambiente</button>
              <button className="chip-dropdown-item">🚔 Segurança</button>
            </div>
          )}
        </div>
        
        <div style={{ position: 'relative' }}>
          <button className="chip chip-interactive" onClick={() => { setShowFiltros(!showFiltros); setShowCategorias(false); }}>
            🎛️ Filtros
          </button>
          {showFiltros && (
            <div className="chip-dropdown">
              <button className="chip-dropdown-item">🗓️ Período: 2023-2025</button>
              <button className="chip-dropdown-item">📍 Região: Todas</button>
              <button className="chip-dropdown-item">⚠️ Alertas: Ativos</button>
              <button className="chip-dropdown-item">📈 Tendência: Crescente</button>
              <hr style={{ margin: '8px 0', border: 'none', borderTop: '1px solid rgba(255,255,255,0.1)' }} />
              <button className="chip-dropdown-item" style={{ color: '#FFD700' }}>🔄 Limpar Filtros</button>
            </div>
          )}
        </div>
      </div>
      
      {/* Ícones */}
      <div className="topbar-icons" ref={iconsRef}>
        <button 
          className="icon-btn notification-btn"
          onMouseEnter={handleIconHover}
          onMouseLeave={handleIconLeave}
          title="Notificações"
        >
          🔔
          <span className="notification-badge">3</span>
        </button>
        <button 
          className="icon-btn profile-btn"
          onMouseEnter={handleIconHover}
          onMouseLeave={handleIconLeave}
          title="Perfil"
        >
          👤
        </button>
      </div>
    </header>
  );
};

export default Topbar;
