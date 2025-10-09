import React, { useEffect, useRef } from 'react';
import Sidebar from '../../components/layout/Sidebar';
import Topbar from '../../components/layout/Topbar';
import AuthEllipses from '../../components/common/AuthEllipses';
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './Dashboard.css';
import { KPIS_FOZ, TOP_SETORES_FOZ, ALERTAS_FOZ } from '../../data/fozDoIguacu';
import { gsap } from 'gsap';

// Mock de dados mensais de turismo
const dadosTurismoMensal = [
  { mes: 'Jan', visitantes: 185000, receita: 52 },
  { mes: 'Fev', visitantes: 175000, receita: 48 },
  { mes: 'Mar', visitantes: 190000, receita: 55 },
  { mes: 'Abr', visitantes: 165000, receita: 45 },
  { mes: 'Mai', visitantes: 155000, receita: 42 },
  { mes: 'Jun', visitantes: 145000, receita: 40 },
  { mes: 'Jul', visitantes: 220000, receita: 68 },
  { mes: 'Ago', visitantes: 195000, receita: 58 },
  { mes: 'Set', visitantes: 170000, receita: 47 },
  { mes: 'Out', visitantes: 180000, receita: 51 },
  { mes: 'Nov', visitantes: 175000, receita: 49 },
  { mes: 'Dez', visitantes: 210000, receita: 64 }
];

// Mock de dados de crescimento populacional
const dadosPopulacaoAnual = [
  { ano: '2019', populacao: 252000 },
  { ano: '2020', populacao: 253500 },
  { ano: '2021', populacao: 255200 },
  { ano: '2022', populacao: 256800 },
  { ano: '2023', populacao: 258420 }
];


const Dashboard: React.FC = () => {
  const kpisRef = useRef<HTMLDivElement>(null);
  const chartsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animar KPIs na entrada
    if (kpisRef.current) {
      const kpiCards = kpisRef.current.querySelectorAll('.stat');
      gsap.fromTo(
        kpiCards,
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.6, 
          stagger: 0.1,
          ease: 'power3.out'
        }
      );
    }

    // Animar gráficos
    if (chartsRef.current) {
      const charts = chartsRef.current.querySelectorAll('.card');
      gsap.fromTo(
        charts,
        { opacity: 0, scale: 0.95 },
        { 
          opacity: 1, 
          scale: 1, 
          duration: 0.7, 
          delay: 0.3,
          stagger: 0.15,
          ease: 'power3.out'
        }
      );
    }
  }, []);

  // Alerta crítico de turismo
  const alertaCritico = ALERTAS_FOZ.find(a => a.severidade === 'crítico');

  return (
    <div className="dashboard-layout">
      <AuthEllipses />
      <Sidebar />
      
      <div className="content">
        <Topbar />
        
        <main className="dashboard-main">
          {/* Alerta crítico de turismo */}
          {alertaCritico && (
            <div className="alert-banner" style={{ 
              background: 'linear-gradient(135deg, #ff4757 0%, #c23616 100%)',
              color: 'white',
              padding: '20px 24px',
              borderRadius: '16px',
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              boxShadow: '0 8px 24px rgba(255, 71, 87, 0.3)'
            }}>
              <span style={{ fontSize: '32px' }}>⚠️</span>
              <div>
                <strong style={{ display: 'block', fontSize: '18px', marginBottom: '4px' }}>
                  {alertaCritico.titulo}
                </strong>
                <span style={{ fontSize: '14px', opacity: 0.95 }}>
                  {alertaCritico.descricao}
                </span>
              </div>
            </div>
          )}

          {/* KPIs Principais - Foz do Iguaçu */}
          <div ref={kpisRef} className="stat-grid-2x2" style={{ marginBottom: '32px' }}>
            <div className="stat">
              <div className="stat-label">População Total</div>
              <div className="value">{KPIS_FOZ.populacao_total.toLocaleString('pt-BR')}</div>
              <div className="stat-sublabel">habitantes (2023)</div>
            </div>
            <div className="stat">
              <div className="stat-label">Visitantes Anuais</div>
              <div className="value">{(KPIS_FOZ.turistas_ano / 1000000).toFixed(2)}M</div>
              <div className="stat-sublabel">turistas por ano</div>
            </div>
            <div className="stat">
              <div className="stat-label">Empresas Ativas</div>
              <div className="value">{KPIS_FOZ.empresas_ativas.toLocaleString('pt-BR')}</div>
              <div className="stat-sublabel">total na cidade</div>
            </div>
            <div className="stat">
              <div className="stat-label">IDH Municipal</div>
              <div className="value">{KPIS_FOZ.idh.toFixed(3)}</div>
              <div className="stat-sublabel">desenvolvimento alto</div>
            </div>
          </div>

          {/* Gráficos principais */}
          <div ref={chartsRef} className="grid charts-grid">
            <div className="card chart-card">
              <h3>📈 Turismo - Visitantes Mensais (2023)</h3>
              <ResponsiveContainer width="100%" height={320}>
                <AreaChart data={dadosTurismoMensal}>
                  <defs>
                    <linearGradient id="colorVisitantes" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#FFD700" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#FFD700" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(10, 42, 65, 0.1)" />
                  <XAxis 
                    dataKey="mes" 
                    stroke="#0B2239"
                    style={{ fontSize: 12, fontFamily: 'var(--font-family)' }}
                  />
                  <YAxis 
                    stroke="#0B2239"
                    style={{ fontSize: 12, fontFamily: 'var(--font-family)' }}
                    tickFormatter={(value) => `${(value / 1000)}k`}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      background: 'rgba(10, 37, 65, 0.95)', 
                      border: 'none', 
                      borderRadius: '12px',
                      color: '#E6EEF6',
                      boxShadow: '0 4px 16px rgba(0,0,0,0.2)'
                    }}
                    formatter={(value: any) => [value.toLocaleString('pt-BR'), 'Visitantes']}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="visitantes" 
                    stroke="#FFD700" 
                    strokeWidth={3}
                    fill="url(#colorVisitantes)"
                    name="Visitantes"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            
            <div className="card chart-card">
              <h3>👥 Crescimento Populacional (2019-2023)</h3>
              <ResponsiveContainer width="100%" height={320}>
                <LineChart data={dadosPopulacaoAnual}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(10, 42, 65, 0.1)" />
                  <XAxis 
                    dataKey="ano" 
                    stroke="#0B2239"
                    style={{ fontSize: 12, fontFamily: 'var(--font-family)' }}
                  />
                  <YAxis 
                    stroke="#0B2239"
                    style={{ fontSize: 12, fontFamily: 'var(--font-family)' }}
                    domain={[250000, 260000]}
                    tickFormatter={(value) => `${(value / 1000)}k`}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      background: 'rgba(10, 37, 65, 0.95)', 
                      border: 'none', 
                      borderRadius: '12px',
                      color: '#E6EEF6',
                      boxShadow: '0 4px 16px rgba(0,0,0,0.2)'
                    }}
                    formatter={(value: any) => [value.toLocaleString('pt-BR'), 'População']}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="populacao" 
                    stroke="#1976D2" 
                    strokeWidth={3} 
                    dot={{ fill: '#1976D2', r: 6 }}
                    name="População"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Top Setores Econômicos */}
          <div className="grid charts-grid" style={{ marginTop: '24px' }}>
            <div className="card chart-card">
              <h3>💼 Top Setores Econômicos - Foz do Iguaçu</h3>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={TOP_SETORES_FOZ.map(s => ({ 
                  setor: s.setor.length > 20 ? s.setor.substring(0, 20) + '...' : s.setor,
                  empresas: s.empresas,
                  empregos: s.empregos
                }))}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(10, 42, 65, 0.1)" />
                  <XAxis 
                    dataKey="setor" 
                    stroke="#0B2239"
                    style={{ fontSize: 11, fontFamily: 'var(--font-family)' }}
                    angle={-15}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis 
                    stroke="#0B2239"
                    style={{ fontSize: 12, fontFamily: 'var(--font-family)' }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      background: 'rgba(10, 37, 65, 0.95)', 
                      border: 'none', 
                      borderRadius: '12px',
                      color: '#E6EEF6',
                      boxShadow: '0 4px 16px rgba(0,0,0,0.2)'
                    }}
                  />
                  <Legend />
                  <Bar dataKey="empresas" fill="#FFD700" radius={[8, 8, 0, 0]} name="Empresas" />
                  <Bar dataKey="empregos" fill="#1976D2" radius={[8, 8, 0, 0]} name="Empregos" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="card sectors-card">
              <h3>📊 Distribuição por Setor</h3>
              <div className="sector-bars">
                {TOP_SETORES_FOZ.slice(0, 6).map((setor) => {
                  const maxEmpregos = Math.max(...TOP_SETORES_FOZ.map(s => s.empregos));
                  const pct = Math.round((setor.empregos / maxEmpregos) * 100);
                  const highlighted = setor.setor.includes('Turismo') || setor.setor.includes('Hotelaria');
                  return (
                    <div className="sector-row" key={setor.setor}>
                      <span className="sector-label" title={setor.setor}>
                        {setor.setor.length > 18 ? setor.setor.substring(0, 18) + '...' : setor.setor}
                      </span>
                      <div className="sector-bar-bg">
                        <div 
                          className={`sector-bar ${highlighted ? 'highlighted' : ''}`} 
                          style={{ 
                            width: `${pct}%`,
                            background: highlighted 
                              ? 'linear-gradient(90deg, #FFD700 0%, #FFA500 100%)'
                              : 'linear-gradient(90deg, #1976D2 0%, #0A2541 100%)'
                          }} 
                        />
                      </div>
                      <span style={{ fontSize: '13px', fontWeight: '600', color: '#0A2541', minWidth: '60px', textAlign: 'right' }}>
                        {setor.empregos.toLocaleString('pt-BR')}
                      </span>
                    </div>
                  );
                })}
              </div>
              
              <div className="action-buttons" style={{ marginTop: '24px' }}>
                <button className="btn-action" onClick={() => alert('Exportação disponível em breve!')}>
                  📄 Exportar PDF/CSV
                </button>
                <button className="btn-action" onClick={() => alert('Relatório completo em breve!')}>
                  📊 Gerar Relatório
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
