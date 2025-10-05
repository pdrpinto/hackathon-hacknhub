import React from 'react';
import { NavLink } from 'react-router-dom';
import { Assets } from '../../utils/assets';
import './Sidebar.css';

const Sidebar: React.FC = () => {
  return (
    <aside className="sidebar">
      {/* Decoração no topo */}
      <img src={Assets.decorativeLine} alt="" className="sidebar-decor-top" />
      
      {/* Logo */}
      <div className="brand">
        <img src={Assets.logo} alt="TraceGov" />
      </div>
      
      {/* Navegação */}
      <nav className="sidebar-nav">
        <h3 className="nav-title">DASHBOARD CENTRAL</h3>
        
        <ul className="nav-list">
          <NavLink to="/dashboard" className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}>
            <span role="img" aria-label="Visão Geral">📊</span> Visão Geral
          </NavLink>
          <NavLink to="/alertas" className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}>
            <span role="img" aria-label="Alertas">�</span> Alertas
          </NavLink>
          <div className="nav-item" aria-disabled="true">
            <span role="img" aria-label="Configurações">⚙️</span> Configurações
          </div>
        </ul>
      </nav>
      
      {/* Decoração no rodapé (invertida) */}
      <img src={Assets.decorativeLine} alt="" className="sidebar-decor-bottom" />
    </aside>
  );
};

export default Sidebar;
