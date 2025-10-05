import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './Topbar.css';

const Topbar: React.FC = () => {
  const iconsRef = useRef<HTMLDivElement>(null);

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
        <input type="text" placeholder="🔍 Search" />
      </div>
      
      {/* Chips */}
      <div className="chips">
        <button className="chip">Categoria</button>
        <button className="chip">Filtro</button>
      </div>
      
      {/* Ícones */}
      <div className="topbar-icons" ref={iconsRef}>
        <button 
          className="icon-btn notification-btn"
          onMouseEnter={handleIconHover}
          onMouseLeave={handleIconLeave}
        >
          🔔
          <span className="notification-badge">3</span>
        </button>
        <button 
          className="icon-btn profile-btn"
          onMouseEnter={handleIconHover}
          onMouseLeave={handleIconLeave}
        >
          👤
        </button>
      </div>
    </header>
  );
};

export default Topbar;
