import React from 'react';
import { NavLink } from 'react-router-dom';
import { Assets } from '../../utils/assets';
import './Sidebar.css';
import { anomaliasAPI } from '../../services/api';
import {
  ChartBarIcon,
  AlertIcon,
  MapIcon,
  TrendingUpIcon,
  SearchIcon,
  FileTextIcon,
  ActivityIcon,
  StarIcon,
  SettingsIcon,
  HelpCircleIcon,
} from '../common/Icons';

const useAlertasBadge = () => {
  const [count, setCount] = React.useState<number>(0);
  React.useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const res = await anomaliasAPI.getAlertasComImpactos();
        const resumo = res.data?.resumo;
        if (!mounted) return;
        const total = (resumo?.criticos || 0) + (resumo?.atencao || 0);
        setCount(total);
      } catch (_) {
        // silencioso
      }
    };
    load();
    const id = setInterval(load, 60_000);
    return () => { mounted = false; clearInterval(id); };
  }, []);
  return count;
};

const Sidebar: React.FC = () => {
  const alertaCount = useAlertasBadge();
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
        <h3 className="nav-title">ANÁLISE</h3>
        <ul className="nav-list">
          <NavLink to="/dashboard" className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}>
            <ChartBarIcon size={18} /> Visão Geral
          </NavLink>
          <NavLink to="/alertas" className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}>
            <AlertIcon size={18} /> Alertas
            {alertaCount > 0 && <span className="nav-badge">{alertaCount}</span>}
          </NavLink>
          <NavLink to="/mapas" className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}>
            <MapIcon size={18} /> Mapas
          </NavLink>
          <NavLink to="/predicoes" className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}>
            <TrendingUpIcon size={18} /> Predições
          </NavLink>
          <NavLink to="/explorar" className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}>
            <SearchIcon size={18} /> Explorar Dados
          </NavLink>
        </ul>

        <h3 className="nav-title">OPERAÇÕES</h3>
        <ul className="nav-list">
          <NavLink to="/relatorios" className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}>
            <FileTextIcon size={18} /> Relatórios
          </NavLink>
          <NavLink to="/atividade" className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}>
            <ActivityIcon size={18} /> Atividade
          </NavLink>
          <NavLink to="/favoritos" className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}>
            <StarIcon size={18} /> Favoritos
          </NavLink>
        </ul>

        <h3 className="nav-title">ADMINISTRAÇÃO</h3>
        <ul className="nav-list">
          <NavLink to="/config" className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}>
            <SettingsIcon size={18} /> Configurações
          </NavLink>
          <NavLink to="/ajuda" className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}>
            <HelpCircleIcon size={18} /> Ajuda
          </NavLink>
        </ul>
      </nav>
      
      {/* Decoração no rodapé (invertida) */}
      <img src={Assets.decorativeLine} alt="" className="sidebar-decor-bottom" />
    </aside>
  );
};

export default Sidebar;
