import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, Marker, Polyline, useMap } from 'react-leaflet';
import L, { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { gsap } from 'gsap';
import Sidebar from '../../components/layout/Sidebar';
import Topbar from '../../components/layout/Topbar';
import AuthEllipses from '../../components/common/AuthEllipses';
import { BAIRROS_FOZ, FOZ_CENTER } from '../../data/fozDoIguacu';
import './Mapas.css';

// Fix Leaflet default marker icon
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

// Pontos de Interesse Turístico de Foz do Iguaçu
const PONTOS_TURISTICOS = [
  { id: 1, nome: 'Cataratas do Iguaçu', lat: -25.6953, lng: -54.4367, tipo: 'atracao', icon: '🌊', visitantes: 1500000, descricao: 'Uma das 7 Maravilhas Naturais do Mundo' },
  { id: 2, nome: 'Usina de Itaipu', lat: -25.4083, lng: -54.5889, tipo: 'atracao', icon: '⚡', visitantes: 800000, descricao: 'Maior geradora de energia do mundo' },
  { id: 3, nome: 'Marco das Três Fronteiras', lat: -25.5948, lng: -54.5868, tipo: 'atracao', icon: '🗺️', visitantes: 300000, descricao: 'Encontro Brasil-Argentina-Paraguai' },
  { id: 4, nome: 'Parque das Aves', lat: -25.6850, lng: -54.4450, tipo: 'atracao', icon: '🦜', visitantes: 450000, descricao: 'Maior viveiro de aves da América Latina' },
  { id: 5, nome: 'Templo Budista', lat: -25.4528, lng: -54.5450, tipo: 'cultural', icon: '🏯', visitantes: 120000, descricao: 'Maior templo budista da América Latina' },
  { id: 6, nome: 'Mesquita Omar Ibn Al-Khattab', lat: -25.4556, lng: -54.5233, tipo: 'cultural', icon: '🕌', visitantes: 80000, descricao: 'Centro da comunidade muçulmana' },
  { id: 7, nome: 'Ecomuseu de Itaipu', lat: -25.4342, lng: -54.5894, tipo: 'cultural', icon: '🏛️', visitantes: 150000, descricao: 'História da construção de Itaipu' },
  { id: 8, nome: 'Ponte da Amizade', lat: -25.5127, lng: -54.6114, tipo: 'comercio', icon: '🌉', visitantes: 500000, descricao: 'Ligação Brasil-Paraguai' },
  { id: 9, nome: 'Shopping Cataratas', lat: -25.5354, lng: -54.5617, tipo: 'comercio', icon: '🏬', visitantes: 200000, descricao: 'Maior shopping da região' },
  { id: 10, nome: 'Lago de Itaipu', lat: -25.3500, lng: -54.5000, tipo: 'atracao', icon: '🚤', visitantes: 180000, descricao: 'Atividades aquáticas e turismo náutico' },
];

// Dados de fluxo entre regiões
const FLUXOS_REGIAO = [
  { origem: [-25.5163, -54.5854], destino: [-25.6953, -54.4367], intensidade: 85, nome: 'Centro → Cataratas' },
  { origem: [-25.5163, -54.5854], destino: [-25.4083, -54.5889], intensidade: 60, nome: 'Centro → Itaipu' },
  { origem: [-25.4650, -54.5500], destino: [-25.6953, -54.4367], intensidade: 70, nome: 'Norte → Cataratas' },
  { origem: [-25.5200, -54.5400], destino: [-25.5127, -54.6114], intensidade: 90, nome: 'Leste → Ponte Amizade' },
];

type MetricaType = 'populacao' | 'turismo' | 'empresas' | 'renda';
type CategoriaFiltro = 'todas' | 'atracao' | 'cultural' | 'comercio';

// Componente para animar o mapa ao mudar centro
function MapUpdater({ center, zoom }: { center: LatLngExpression; zoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, zoom, { duration: 1.5 });
  }, [center, zoom, map]);
  return null;
}

const Mapas: React.FC = () => {
  const [metricaSelecionada, setMetricaSelecionada] = useState<MetricaType>('turismo');
  const [categoriaFiltro, setCategoriaFiltro] = useState<CategoriaFiltro>('todas');
  const [bairroSelecionado, setBairroSelecionado] = useState<number | null>(null);
  const [mostrarFluxos, setMostrarFluxos] = useState(true);
  const [mostrarPontos, setMostrarPontos] = useState(true);
  const [mapCenter, setMapCenter] = useState<LatLngExpression>(FOZ_CENTER);
  const [mapZoom, setMapZoom] = useState(12);
  
  const statsRef = useRef<HTMLDivElement>(null);
  const legendRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animar estatísticas
    if (statsRef.current) {
      const items = statsRef.current.querySelectorAll('.stat-item-map');
      gsap.fromTo(
        items,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out' }
      );
    }
    
    // Animar legenda
    if (legendRef.current) {
      gsap.fromTo(
        legendRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.3, ease: 'power3.out' }
      );
    }
  }, []);

  // Filtrar pontos turísticos
  const pontosFiltrados = PONTOS_TURISTICOS.filter(p => 
    categoriaFiltro === 'todas' || p.tipo === categoriaFiltro
  );

  // Calcular cor do círculo baseado na métrica
  const getCircleColor = (bairro: typeof BAIRROS_FOZ[0]) => {
    let value = 0;
    let max = 0;
    
    switch (metricaSelecionada) {
      case 'populacao':
        value = bairro.populacao;
        max = Math.max(...BAIRROS_FOZ.map(b => b.populacao));
        break;
      case 'turismo':
        value = bairro.turismo_score;
        max = 100;
        break;
      case 'empresas':
        value = bairro.empresas_ativas;
        max = Math.max(...BAIRROS_FOZ.map(b => b.empresas_ativas));
        break;
      case 'renda':
        value = bairro.renda_media;
        max = Math.max(...BAIRROS_FOZ.map(b => b.renda_media));
        break;
    }
    
    const intensity = value / max;
    if (intensity > 0.7) return '#ff4757'; // Vermelho (alto)
    if (intensity > 0.4) return '#FFD700'; // Amarelo (médio)
    return '#1976D2'; // Azul (baixo)
  };

  const getCircleRadius = (bairro: typeof BAIRROS_FOZ[0]) => {
    let value = 0;
    let max = 0;
    
    switch (metricaSelecionada) {
      case 'populacao':
        value = bairro.populacao;
        max = Math.max(...BAIRROS_FOZ.map(b => b.populacao));
        break;
      case 'turismo':
        value = bairro.turismo_score;
        max = 100;
        break;
      case 'empresas':
        value = bairro.empresas_ativas;
        max = Math.max(...BAIRROS_FOZ.map(b => b.empresas_ativas));
        break;
      case 'renda':
        value = bairro.renda_media;
        max = Math.max(...BAIRROS_FOZ.map(b => b.renda_media));
        break;
    }
    
    return 8 + (value / max) * 20; // 8-28px
  };

  // Focar em ponto turístico
  const focarPonto = (ponto: typeof PONTOS_TURISTICOS[0]) => {
    setMapCenter([ponto.lat, ponto.lng]);
    setMapZoom(15);
  };

  // Focar em bairro
  const focarBairro = (bairro: typeof BAIRROS_FOZ[0]) => {
    setBairroSelecionado(bairro.id);
    setMapCenter([bairro.lat, bairro.lng]);
    setMapZoom(14);
  };

  // Estatísticas totais
  const estatisticasTotais = {
    populacao: BAIRROS_FOZ.reduce((acc, b) => acc + b.populacao, 0),
    empresas: BAIRROS_FOZ.reduce((acc, b) => acc + b.empresas_ativas, 0),
    visitantes: PONTOS_TURISTICOS.reduce((acc, p) => acc + p.visitantes, 0),
    pontos: pontosFiltrados.length,
  };

  return (
    <div className="dashboard-layout">
      <AuthEllipses />
      <Sidebar />
      
      <div className="content">
        <Topbar />
        
        <main className="dashboard-main">
          <div className="page-header" style={{ marginBottom: '24px' }}>
            <div>
              <h2 style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                🗺️ Mapa Interativo - Foz do Iguaçu
              </h2>
              <p className="muted">
                Explore bairros, pontos turísticos e fluxos da cidade. Dados atualizados em tempo real.
              </p>
            </div>
            <button 
              className="btn-action"
              onClick={() => {
                setMapCenter(FOZ_CENTER);
                setMapZoom(12);
                setBairroSelecionado(null);
              }}
              style={{ 
                background: 'linear-gradient(135deg, #1976D2 0%, #0A2541 100%)',
                color: 'white',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '12px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              🎯 Resetar Visão
            </button>
          </div>

          {/* Estatísticas Rápidas */}
          <div ref={statsRef} className="stats-map-grid">
            <div className="stat-item-map">
              <div className="stat-icon">👥</div>
              <div>
                <div className="stat-label">População Total</div>
                <div className="stat-value">{estatisticasTotais.populacao.toLocaleString('pt-BR')}</div>
              </div>
            </div>
            <div className="stat-item-map">
              <div className="stat-icon">💼</div>
              <div>
                <div className="stat-label">Empresas Ativas</div>
                <div className="stat-value">{estatisticasTotais.empresas.toLocaleString('pt-BR')}</div>
              </div>
            </div>
            <div className="stat-item-map">
              <div className="stat-icon">🎫</div>
              <div>
                <div className="stat-label">Visitantes/Ano</div>
                <div className="stat-value">{(estatisticasTotais.visitantes / 1000000).toFixed(1)}M</div>
              </div>
            </div>
            <div className="stat-item-map">
              <div className="stat-icon">📍</div>
              <div>
                <div className="stat-label">Pontos de Interesse</div>
                <div className="stat-value">{estatisticasTotais.pontos}</div>
              </div>
            </div>
          </div>

          {/* Controles do Mapa */}
          <div className="map-controls-panel">
            <div className="control-section">
              <h4>📊 Métrica de Visualização</h4>
              <div className="btn-group-map">
                <button 
                  className={`btn-map-control ${metricaSelecionada === 'turismo' ? 'active' : ''}`}
                  onClick={() => setMetricaSelecionada('turismo')}
                >
                  🎭 Turismo
                </button>
                <button 
                  className={`btn-map-control ${metricaSelecionada === 'populacao' ? 'active' : ''}`}
                  onClick={() => setMetricaSelecionada('populacao')}
                >
                  👥 População
                </button>
                <button 
                  className={`btn-map-control ${metricaSelecionada === 'empresas' ? 'active' : ''}`}
                  onClick={() => setMetricaSelecionada('empresas')}
                >
                  💼 Empresas
                </button>
                <button 
                  className={`btn-map-control ${metricaSelecionada === 'renda' ? 'active' : ''}`}
                  onClick={() => setMetricaSelecionada('renda')}
                >
                  💰 Renda
                </button>
              </div>
            </div>

            <div className="control-section">
              <h4>🎯 Categoria de Pontos</h4>
              <div className="btn-group-map">
                <button 
                  className={`btn-map-control ${categoriaFiltro === 'todas' ? 'active' : ''}`}
                  onClick={() => setCategoriaFiltro('todas')}
                >
                  🌟 Todas
                </button>
                <button 
                  className={`btn-map-control ${categoriaFiltro === 'atracao' ? 'active' : ''}`}
                  onClick={() => setCategoriaFiltro('atracao')}
                >
                  🎢 Atrações
                </button>
                <button 
                  className={`btn-map-control ${categoriaFiltro === 'cultural' ? 'active' : ''}`}
                  onClick={() => setCategoriaFiltro('cultural')}
                >
                  🏛️ Cultural
                </button>
                <button 
                  className={`btn-map-control ${categoriaFiltro === 'comercio' ? 'active' : ''}`}
                  onClick={() => setCategoriaFiltro('comercio')}
                >
                  🏬 Comércio
                </button>
              </div>
            </div>

            <div className="control-section">
              <h4>⚙️ Camadas</h4>
              <div className="toggle-controls">
                <label className="toggle-label">
                  <input 
                    type="checkbox" 
                    checked={mostrarPontos}
                    onChange={(e) => setMostrarPontos(e.target.checked)}
                  />
                  <span>📍 Pontos Turísticos</span>
                </label>
                <label className="toggle-label">
                  <input 
                    type="checkbox" 
                    checked={mostrarFluxos}
                    onChange={(e) => setMostrarFluxos(e.target.checked)}
                  />
                  <span>🔄 Fluxos de Movimento</span>
                </label>
              </div>
            </div>
          </div>

          {/* Container do Mapa */}
          <div className="map-container-wrapper">
            <MapContainer
              center={FOZ_CENTER}
              zoom={12}
              style={{ height: '600px', width: '100%', borderRadius: '16px' }}
              zoomControl={true}
            >
              <MapUpdater center={mapCenter} zoom={mapZoom} />
              
              {/* Tile Layer - OpenStreetMap */}
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              />

              {/* Círculos dos Bairros */}
              {BAIRROS_FOZ.map((bairro) => (
                <CircleMarker
                  key={bairro.id}
                  center={[bairro.lat, bairro.lng]}
                  radius={getCircleRadius(bairro)}
                  fillColor={getCircleColor(bairro)}
                  color="white"
                  weight={bairroSelecionado === bairro.id ? 3 : 1}
                  opacity={1}
                  fillOpacity={0.6}
                  eventHandlers={{
                    click: () => focarBairro(bairro),
                  }}
                >
                  <Popup>
                    <div style={{ minWidth: '200px' }}>
                      <h3 style={{ margin: '0 0 8px 0', color: '#0A2541' }}>{bairro.nome}</h3>
                      <div style={{ fontSize: '13px', color: '#666' }}>
                        <p style={{ margin: '4px 0' }}><strong>Região:</strong> {bairro.regiao}</p>
                        <p style={{ margin: '4px 0' }}><strong>População:</strong> {bairro.populacao.toLocaleString('pt-BR')}</p>
                        <p style={{ margin: '4px 0' }}><strong>Empresas:</strong> {bairro.empresas_ativas.toLocaleString('pt-BR')}</p>
                        <p style={{ margin: '4px 0' }}><strong>Renda Média:</strong> R$ {bairro.renda_media.toLocaleString('pt-BR')}</p>
                        <p style={{ margin: '4px 0' }}><strong>Score Turismo:</strong> {bairro.turismo_score}/100</p>
                      </div>
                    </div>
                  </Popup>
                </CircleMarker>
              ))}

              {/* Pontos Turísticos */}
              {mostrarPontos && pontosFiltrados.map((ponto) => (
                <Marker
                  key={ponto.id}
                  position={[ponto.lat, ponto.lng]}
                  eventHandlers={{
                    click: () => focarPonto(ponto),
                  }}
                >
                  <Popup>
                    <div style={{ minWidth: '220px' }}>
                      <h3 style={{ margin: '0 0 8px 0', color: '#0A2541', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '24px' }}>{ponto.icon}</span>
                        {ponto.nome}
                      </h3>
                      <div style={{ fontSize: '13px', color: '#666' }}>
                        <p style={{ margin: '4px 0', fontStyle: 'italic' }}>{ponto.descricao}</p>
                        <p style={{ margin: '8px 0 4px 0' }}><strong>Visitantes/ano:</strong> {ponto.visitantes.toLocaleString('pt-BR')}</p>
                        <p style={{ margin: '4px 0' }}><strong>Tipo:</strong> {ponto.tipo}</p>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              ))}

              {/* Fluxos entre regiões */}
              {mostrarFluxos && FLUXOS_REGIAO.map((fluxo, idx) => (
                <Polyline
                  key={idx}
                  positions={[fluxo.origem as LatLngExpression, fluxo.destino as LatLngExpression]}
                  color="#FFD700"
                  weight={Math.max(2, fluxo.intensidade / 20)}
                  opacity={0.6}
                  dashArray="10, 10"
                >
                  <Popup>
                    <div>
                      <strong>{fluxo.nome}</strong>
                      <p>Intensidade: {fluxo.intensidade}%</p>
                    </div>
                  </Popup>
                </Polyline>
              ))}
            </MapContainer>

            {/* Legenda */}
            <div ref={legendRef} className="map-legend">
              <h4>📊 Legenda</h4>
              <div className="legend-item">
                <span className="legend-color" style={{ background: '#ff4757' }}></span>
                <span>Alto</span>
              </div>
              <div className="legend-item">
                <span className="legend-color" style={{ background: '#FFD700' }}></span>
                <span>Médio</span>
              </div>
              <div className="legend-item">
                <span className="legend-color" style={{ background: '#1976D2' }}></span>
                <span>Baixo</span>
              </div>
              <div style={{ marginTop: '12px', fontSize: '12px', color: '#666' }}>
                Tamanho do círculo indica intensidade da métrica selecionada
              </div>
            </div>
          </div>

          {/* Lista de Pontos Turísticos */}
          <div className="pontos-turisticos-grid">
            <h3 style={{ gridColumn: '1 / -1', marginBottom: '16px' }}>
              🎯 Pontos Turísticos de Destaque
            </h3>
            {pontosFiltrados.slice(0, 6).map((ponto) => (
              <div 
                key={ponto.id} 
                className="ponto-card"
                onClick={() => focarPonto(ponto)}
              >
                <div className="ponto-icon">{ponto.icon}</div>
                <div className="ponto-info">
                  <h4>{ponto.nome}</h4>
                  <p>{ponto.descricao}</p>
                  <div className="ponto-stats">
                    <span>👥 {(ponto.visitantes / 1000).toFixed(0)}k/ano</span>
                    <span className="ponto-tipo">{ponto.tipo}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Mapas;
