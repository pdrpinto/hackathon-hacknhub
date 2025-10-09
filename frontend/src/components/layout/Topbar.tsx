import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { BAIRROS_FOZ, ALERTAS_FOZ } from '../../data/fozDoIguacu';
import './Topbar.css';

interface SearchResult {
  tipo: 'pagina' | 'bairro' | 'alerta' | 'indicador';
  titulo: string;
  subtitulo?: string;
  rota?: string;
  icone: string;
}

// Base de dados para busca inteligente (fora do componente para evitar re-criação)
const searchDatabase: SearchResult[] = [
  // Páginas
  { tipo: 'pagina', titulo: 'Dashboard', subtitulo: 'Visão geral dos indicadores', rota: '/dashboard', icone: '📊' },
  { tipo: 'pagina', titulo: 'Alertas', subtitulo: 'Notificações e avisos críticos', rota: '/alertas', icone: '⚠️' },
  { tipo: 'pagina', titulo: 'Predições', subtitulo: 'Projeções e cenários futuros', rota: '/predicoes', icone: '📈' },
  { tipo: 'pagina', titulo: 'Mapas', subtitulo: 'Visualização geográfica', rota: '/mapas', icone: '🗺️' },
  { tipo: 'pagina', titulo: 'Relatórios', subtitulo: 'Gerar e exportar relatórios', rota: '/relatorios', icone: '📄' },
  { tipo: 'pagina', titulo: 'Explorar', subtitulo: 'Análise detalhada de dados', rota: '/explorar', icone: '🔍' },
  
  // Bairros
  ...BAIRROS_FOZ.map(b => ({
    tipo: 'bairro' as const,
    titulo: b.nome,
    subtitulo: `${b.regiao} • ${b.populacao.toLocaleString()} habitantes`,
    rota: '/mapas',
    icone: '📍'
  })),
  
  // Alertas
  ...ALERTAS_FOZ.map(a => ({
    tipo: 'alerta' as const,
    titulo: a.titulo,
    subtitulo: a.tipo,
    rota: '/alertas',
    icone: '⚠️'
  })),
  
  // Indicadores
  { tipo: 'indicador', titulo: 'População Total', subtitulo: '258.420 habitantes', rota: '/dashboard', icone: '👥' },
  { tipo: 'indicador', titulo: 'Empresas Ativas', subtitulo: '11.780 empresas', rota: '/dashboard', icone: '🏢' },
  { tipo: 'indicador', titulo: 'Turistas por Ano', subtitulo: '1.92M visitantes', rota: '/dashboard', icone: '🎭' },
  { tipo: 'indicador', titulo: 'IDH', subtitulo: '0.751 - Alto', rota: '/dashboard', icone: '📊' },
  { tipo: 'indicador', titulo: 'PIB per Capita', subtitulo: 'R$ 38.200', rota: '/dashboard', icone: '💰' },
  { tipo: 'indicador', titulo: 'Taxa de Emprego', subtitulo: 'Empregos Turismo: 28.5k', rota: '/dashboard', icone: '💼' },
  { tipo: 'indicador', titulo: 'Cataratas do Iguaçu', subtitulo: '1.5M visitantes/ano', rota: '/mapas', icone: '🌊' },
  { tipo: 'indicador', titulo: 'Usina de Itaipu', subtitulo: '800k visitantes/ano', rota: '/mapas', icone: '⚡' },
];

const Topbar: React.FC = () => {
  const navigate = useNavigate();
  const iconsRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  
  const [showCategorias, setShowCategorias] = useState(false);
  const [showFiltros, setShowFiltros] = useState(false);
  const [showNotificacoes, setShowNotificacoes] = useState(false);
  const [showPerfil, setShowPerfil] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  
  const [categoriaAtiva, setCategoriaAtiva] = useState('Todas');
  const [filtros, setFiltros] = useState({
    periodo: '2023-2024',
    regiao: 'Todas',
    alertas: 'Ativos',
    tendencia: 'Todas'
  });

  useEffect(() => {
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

  // Busca inteligente
  useEffect(() => {
    if (searchQuery.length >= 2) {
      const query = searchQuery.toLowerCase();
      const results = searchDatabase.filter(item => 
        item.titulo.toLowerCase().includes(query) ||
        item.subtitulo?.toLowerCase().includes(query)
      ).slice(0, 8);
      setSearchResults(results);
      setShowSearchResults(true);
    } else {
      setSearchResults([]);
      setShowSearchResults(false);
    }
  }, [searchQuery]);

  // Fechar dropdowns ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.chip') && !target.closest('.chip-dropdown')) {
        setShowCategorias(false);
        setShowFiltros(false);
      }
      if (!target.closest('.icon-btn') && !target.closest('.dropdown-panel')) {
        setShowNotificacoes(false);
        setShowPerfil(false);
      }
      if (!target.closest('.search') && !target.closest('.search-dropdown')) {
        setShowSearchResults(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (result: SearchResult) => {
    if (result.rota) {
      navigate(result.rota);
    }
    setSearchQuery('');
    setShowSearchResults(false);
  };

  const handleCategoria = (categoria: string) => {
    setCategoriaAtiva(categoria);
    setShowCategorias(false);
    // Aqui você pode filtrar o conteúdo baseado na categoria
  };

  const handleFiltroChange = (filtroKey: keyof typeof filtros, valor: string) => {
    setFiltros(prev => ({ ...prev, [filtroKey]: valor }));
  };

  const limparFiltros = () => {
    setFiltros({
      periodo: '2023-2024',
      regiao: 'Todas',
      alertas: 'Ativos',
      tendencia: 'Todas'
    });
    setCategoriaAtiva('Todas');
    setShowFiltros(false);
  };

  const notificacoes = [
    { id: 1, tipo: 'alerta', titulo: 'Novo alerta de segurança', tempo: '5 min atrás', icone: '⚠️', cor: '#ff4757' },
    { id: 2, tipo: 'relatorio', titulo: 'Relatório mensal disponível', tempo: '1 hora atrás', icone: '📄', cor: '#1976D2' },
    { id: 3, tipo: 'predicao', titulo: 'Projeção turismo atualizada', tempo: '3 horas atrás', icone: '📈', cor: '#FFD700' },
  ];

  const getTipoIcon = (tipo: string) => {
    const icons: Record<string, string> = {
      'pagina': '📄',
      'bairro': '📍',
      'alerta': '⚠️',
      'indicador': '📊'
    };
    return icons[tipo] || '🔍';
  };

  return (
    <header className="topbar">
      {/* Busca Inteligente */}
      <div className="search" style={{ position: 'relative' }}>
        <input 
          ref={searchRef}
          type="text" 
          placeholder="🔍 Pesquisar indicadores, bairros, relatórios..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => searchQuery.length >= 2 && setShowSearchResults(true)}
        />
        
        {showSearchResults && searchResults.length > 0 && (
          <div className="search-dropdown">
            <div className="search-dropdown-header">
              <span>Resultados da busca</span>
              <span className="search-count">{searchResults.length}</span>
            </div>
            {searchResults.map((result, idx) => (
              <button 
                key={idx}
                className="search-dropdown-item"
                onClick={() => handleSearch(result)}
              >
                <span className="search-item-icon">{result.icone}</span>
                <div className="search-item-content">
                  <div className="search-item-titulo">{result.titulo}</div>
                  {result.subtitulo && (
                    <div className="search-item-subtitulo">{result.subtitulo}</div>
                  )}
                </div>
                <span className="search-item-badge">{getTipoIcon(result.tipo)}</span>
              </button>
            ))}
          </div>
        )}
        
        {showSearchResults && searchResults.length === 0 && searchQuery.length >= 2 && (
          <div className="search-dropdown">
            <div className="search-empty">
              <span style={{ fontSize: '32px' }}>🔍</span>
              <p>Nenhum resultado encontrado</p>
              <small>Tente buscar por: bairros, indicadores, alertas</small>
            </div>
          </div>
        )}
      </div>
      
      {/* Chips com Dropdowns Funcionais */}
      <div className="chips">
        <div style={{ position: 'relative' }}>
          <button 
            className={`chip chip-interactive ${categoriaAtiva !== 'Todas' ? 'chip-active' : ''}`}
            onClick={() => { setShowCategorias(!showCategorias); setShowFiltros(false); }}
          >
            📂 {categoriaAtiva}
          </button>
          {showCategorias && (
            <div className="chip-dropdown">
              <div className="chip-dropdown-header">Categorias</div>
              <button className="chip-dropdown-item" onClick={() => handleCategoria('Todas')}>
                🌐 Todas as Categorias
              </button>
              <button className="chip-dropdown-item" onClick={() => handleCategoria('Economia')}>
                💰 Economia
              </button>
              <button className="chip-dropdown-item" onClick={() => handleCategoria('Turismo')}>
                🎭 Turismo
              </button>
              <button className="chip-dropdown-item" onClick={() => handleCategoria('Demografia')}>
                👥 Demografia
              </button>
              <button className="chip-dropdown-item" onClick={() => handleCategoria('Infraestrutura')}>
                🏗️ Infraestrutura
              </button>
              <button className="chip-dropdown-item" onClick={() => handleCategoria('Saúde')}>
                🏥 Saúde
              </button>
              <button className="chip-dropdown-item" onClick={() => handleCategoria('Educação')}>
                📚 Educação
              </button>
              <button className="chip-dropdown-item" onClick={() => handleCategoria('Meio Ambiente')}>
                🌳 Meio Ambiente
              </button>
            </div>
          )}
        </div>
        
        <div style={{ position: 'relative' }}>
          <button 
            className="chip chip-interactive"
            onClick={() => { setShowFiltros(!showFiltros); setShowCategorias(false); }}
          >
            🎛️ Filtros
          </button>
          {showFiltros && (
            <div className="chip-dropdown chip-dropdown-wide">
              <div className="chip-dropdown-header">Filtros Avançados</div>
              
              <div className="filtro-group">
                <label className="filtro-label">📅 Período</label>
                <div className="filtro-opcoes">
                  <button 
                    className={`filtro-btn ${filtros.periodo === '2023-2024' ? 'active' : ''}`}
                    onClick={() => handleFiltroChange('periodo', '2023-2024')}
                  >
                    2023-2024
                  </button>
                  <button 
                    className={`filtro-btn ${filtros.periodo === '2022-2023' ? 'active' : ''}`}
                    onClick={() => handleFiltroChange('periodo', '2022-2023')}
                  >
                    2022-2023
                  </button>
                  <button 
                    className={`filtro-btn ${filtros.periodo === 'Último Ano' ? 'active' : ''}`}
                    onClick={() => handleFiltroChange('periodo', 'Último Ano')}
                  >
                    Último Ano
                  </button>
                </div>
              </div>

              <div className="filtro-group">
                <label className="filtro-label">📍 Região</label>
                <div className="filtro-opcoes">
                  <button 
                    className={`filtro-btn ${filtros.regiao === 'Todas' ? 'active' : ''}`}
                    onClick={() => handleFiltroChange('regiao', 'Todas')}
                  >
                    Todas
                  </button>
                  <button 
                    className={`filtro-btn ${filtros.regiao === 'Centro' ? 'active' : ''}`}
                    onClick={() => handleFiltroChange('regiao', 'Centro')}
                  >
                    Centro
                  </button>
                  <button 
                    className={`filtro-btn ${filtros.regiao === 'Norte' ? 'active' : ''}`}
                    onClick={() => handleFiltroChange('regiao', 'Norte')}
                  >
                    Norte
                  </button>
                  <button 
                    className={`filtro-btn ${filtros.regiao === 'Sul' ? 'active' : ''}`}
                    onClick={() => handleFiltroChange('regiao', 'Sul')}
                  >
                    Sul
                  </button>
                </div>
              </div>

              <div className="filtro-group">
                <label className="filtro-label">📈 Tendência</label>
                <div className="filtro-opcoes">
                  <button 
                    className={`filtro-btn ${filtros.tendencia === 'Todas' ? 'active' : ''}`}
                    onClick={() => handleFiltroChange('tendencia', 'Todas')}
                  >
                    Todas
                  </button>
                  <button 
                    className={`filtro-btn ${filtros.tendencia === 'Crescente' ? 'active' : ''}`}
                    onClick={() => handleFiltroChange('tendencia', 'Crescente')}
                  >
                    📈 Crescente
                  </button>
                  <button 
                    className={`filtro-btn ${filtros.tendencia === 'Decrescente' ? 'active' : ''}`}
                    onClick={() => handleFiltroChange('tendencia', 'Decrescente')}
                  >
                    📉 Decrescente
                  </button>
                </div>
              </div>
              
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '12px', marginTop: '8px' }}>
                <button className="chip-dropdown-item" onClick={limparFiltros} style={{ color: '#FFD700', justifyContent: 'center' }}>
                  🔄 Limpar Todos os Filtros
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Ícones com Dropdowns */}
      <div className="topbar-icons" ref={iconsRef}>
        <div style={{ position: 'relative' }}>
          <button 
            className="icon-btn notification-btn"
            onClick={() => { setShowNotificacoes(!showNotificacoes); setShowPerfil(false); }}
            title="Notificações"
          >
            🔔
            <span className="notification-badge">{notificacoes.length}</span>
          </button>
          
          {showNotificacoes && (
            <div className="dropdown-panel notificacoes-dropdown">
              <div className="dropdown-header">
                <span className="dropdown-title">Notificações</span>
                <span className="notification-count">{notificacoes.length}</span>
              </div>
              <div className="notificacoes-list">
                {notificacoes.map(notif => (
                  <div key={notif.id} className="notificacao-item">
                    <div className="notificacao-icon" style={{ background: notif.cor }}>
                      {notif.icone}
                    </div>
                    <div className="notificacao-content">
                      <div className="notificacao-titulo">{notif.titulo}</div>
                      <div className="notificacao-tempo">{notif.tempo}</div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="dropdown-footer-btn">
                Ver todas as notificações →
              </button>
            </div>
          )}
        </div>
        
        <div style={{ position: 'relative' }}>
          <button 
            className="icon-btn profile-btn"
            onClick={() => { setShowPerfil(!showPerfil); setShowNotificacoes(false); }}
            title="Perfil"
          >
            👤
          </button>
          
          {showPerfil && (
            <div className="dropdown-panel perfil-dropdown">
              <div className="perfil-header">
                <div className="perfil-avatar">👤</div>
                <div className="perfil-info">
                  <div className="perfil-nome">Gestor Municipal</div>
                  <div className="perfil-email">gestor@foz.pr.gov.br</div>
                </div>
              </div>
              <div className="perfil-menu">
                <button className="perfil-menu-item" onClick={() => navigate('/dashboard')}>
                  📊 Dashboard
                </button>
                <button className="perfil-menu-item">
                  ⚙️ Configurações
                </button>
                <button className="perfil-menu-item">
                  📄 Meus Relatórios
                </button>
                <button className="perfil-menu-item">
                  ⭐ Favoritos
                </button>
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', margin: '8px 0' }}></div>
                <button className="perfil-menu-item" onClick={() => navigate('/')} style={{ color: '#ff4757' }}>
                  🚪 Sair
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Topbar;
