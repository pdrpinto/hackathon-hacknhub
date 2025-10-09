import React, { useState, useEffect, useRef } from 'react';
import Sidebar from '../../components/layout/Sidebar';
import Topbar from '../../components/layout/Topbar';
import AuthEllipses from '../../components/common/AuthEllipses';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { KPIS_FOZ } from '../../data/fozDoIguacu';
import { gsap } from 'gsap';
import '../Dashboard/Dashboard.css';
import './Predicoes.css';

// Dados de predição por setor
const PREDICOES_SETORES = {
  turismo: {
    nome: 'Turismo e Hotelaria',
    dados: [
      { ano: 2023, valor: 18200, crescimento: 8.5 },
      { ano: 2024, valor: 19750, crescimento: 8.5 },
      { ano: 2025, valor: 21430, crescimento: 8.5 },
      { ano: 2026, valor: 23250, crescimento: 8.5 },
      { ano: 2027, valor: 25230, crescimento: 8.5 },
    ],
    cor: '#FFD700',
    icon: '🎭',
    kpi: 'empregos',
    insights: {
      otimista: 'Expansão das Cataratas e novos hotéis 5 estrelas podem criar 10 mil empregos adicionais.',
      realista: 'Crescimento de 8.5% a.a. mantém Foz como principal destino turístico do PR.',
      pessimista: 'Riscos: crise econômica global, câmbio desfavorável e competição com destinos vizinhos.',
    }
  },
  comercio: {
    nome: 'Comércio Varejista',
    dados: [
      { ano: 2023, valor: 12500, crescimento: 4.2 },
      { ano: 2024, valor: 13025, crescimento: 4.2 },
      { ano: 2025, valor: 13570, crescimento: 4.2 },
      { ano: 2026, valor: 14140, crescimento: 4.2 },
      { ano: 2027, valor: 14730, crescimento: 4.2 },
    ],
    cor: '#1976D2',
    icon: '🏪',
    kpi: 'empregos',
    insights: {
      otimista: 'E-commerce local e parcerias internacionais podem impulsionar vendas em 25%.',
      realista: 'Crescimento estável com foco em turistas e residentes da tríplice fronteira.',
      pessimista: 'Concorrência do Paraguai e informalidade podem pressionar margens.',
    }
  },
  servicos: {
    nome: 'Serviços',
    dados: [
      { ano: 2023, valor: 9800, crescimento: 6.1 },
      { ano: 2024, valor: 10400, crescimento: 6.1 },
      { ano: 2025, valor: 11030, crescimento: 6.1 },
      { ano: 2026, valor: 11700, crescimento: 6.1 },
      { ano: 2027, valor: 12410, crescimento: 6.1 },
    ],
    cor: '#26de81',
    icon: '💼',
    kpi: 'empregos',
    insights: {
      otimista: 'Digitalização e serviços premium para turistas podem acelerar crescimento para 10% a.a.',
      realista: 'Setor em expansão com demanda crescente de consultoria, TI e serviços especializados.',
      pessimista: 'Automação e terceirização podem limitar criação de novos postos.',
    }
  },
  construcao: {
    nome: 'Construção Civil',
    dados: [
      { ano: 2023, valor: 6400, crescimento: 3.8 },
      { ano: 2024, valor: 6640, crescimento: 3.8 },
      { ano: 2025, valor: 6890, crescimento: 3.8 },
      { ano: 2026, valor: 7150, crescimento: 3.8 },
      { ano: 2027, valor: 7420, crescimento: 3.8 },
    ],
    cor: '#ff4757',
    icon: '🏗️',
    kpi: 'empregos',
    insights: {
      otimista: 'Megaprojetos de infraestrutura turística e residencial podem dobrar empregos.',
      realista: 'Obras públicas e expansão hoteleira sustentam crescimento moderado.',
      pessimista: 'Alta de juros e custos de insumos podem travar novos empreendimentos.',
    }
  },
  alimentacao: {
    nome: 'Alimentação',
    dados: [
      { ano: 2023, valor: 8100, crescimento: 5.9 },
      { ano: 2024, valor: 8578, crescimento: 5.9 },
      { ano: 2025, valor: 9084, crescimento: 5.9 },
      { ano: 2026, valor: 9620, crescimento: 5.9 },
      { ano: 2027, valor: 10188, crescimento: 5.9 },
    ],
    cor: '#FFA500',
    icon: '🍴',
    kpi: 'empregos',
    insights: {
      otimista: 'Gastronomia internacional e food trucks podem criar 3 mil novos postos.',
      realista: 'Crescimento impulsionado por turistas e expansão de delivery.',
      pessimista: 'Inflação de alimentos e concorrência acirrada podem pressionar setor.',
    }
  },
  transporte: {
    nome: 'Transporte e Logística',
    dados: [
      { ano: 2023, valor: 4200, crescimento: 7.3 },
      { ano: 2024, valor: 4507, crescimento: 7.3 },
      { ano: 2025, valor: 4836, crescimento: 7.3 },
      { ano: 2026, valor: 5189, crescimento: 7.3 },
      { ano: 2027, valor: 5568, crescimento: 7.3 },
    ],
    cor: '#8e44ad',
    icon: '🚚',
    kpi: 'empregos',
    insights: {
      otimista: 'Hub logístico tripartite e corredores turísticos podem duplicar setor.',
      realista: 'Turismo e comércio fronteiriço impulsionam demanda por transporte.',
      pessimista: 'Combustíveis caros e regulação podem limitar expansão.',
    }
  },
};

type SetorKey = keyof typeof PREDICOES_SETORES;
type CenarioType = 'otimista' | 'realista' | 'pessimista';

const PredicoesNova: React.FC = () => {
  const [cenarioSelecionado, setCenarioSelecionado] = useState<CenarioType>('realista');
  const [setorSelecionado, setSetorSelecionado] = useState<SetorKey>('turismo');
  const [compararSetores, setCompararSetores] = useState(false);
  
  const chartsRef = useRef<HTMLDivElement>(null);
  const setoresRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animar gráficos
    if (chartsRef.current) {
      const charts = chartsRef.current.querySelectorAll('.predicao-card');
      gsap.fromTo(
        charts,
        { opacity: 0, scale: 0.95, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out' }
      );
    }

    // Animar cards de setores
    if (setoresRef.current) {
      const cards = setoresRef.current.querySelectorAll('.setor-card');
      gsap.fromTo(
        cards,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.5, stagger: 0.08, ease: 'power2.out', delay: 0.2 }
      );
    }
  }, [cenarioSelecionado, setorSelecionado, compararSetores]);

  // Aplicar multiplicadores de cenário
  const aplicarCenario = (dados: typeof PREDICOES_SETORES.turismo.dados) => {
    const multiplicadores = {
      otimista: 1.25,
      realista: 1.0,
      pessimista: 0.85,
    };
    const mult = multiplicadores[cenarioSelecionado];
    return dados.map((d) => ({ ...d, valor: Math.round(d.valor * mult) }));
  };

  const setorAtual = PREDICOES_SETORES[setorSelecionado];
  const dadosSetor = aplicarCenario(setorAtual.dados);

  // Dados para comparação multi-setores
  const dadosComparacao = Object.entries(PREDICOES_SETORES).map(([key, setor]) => ({
    setor: setor.nome,
    cor: setor.cor,
    dados: aplicarCenario(setor.dados),
  }));

  // Gerar dados agregados para o gráfico de comparação
  const dadosGraficoComparacao = dadosComparacao[0].dados.map((_, idx) => {
    const ano = 2023 + idx;
    const obj: any = { ano };
    dadosComparacao.forEach((setor) => {
      obj[setor.setor] = setor.dados[idx].valor;
    });
    return obj;
  });

  const cenarioDesc = {
    otimista: '📈 Crescimento acelerado com investimentos massivos, infraestrutura de ponta e marketing agressivo internacional.',
    realista: '➡️ Crescimento moderado mantendo tendências históricas, investimentos planejados e políticas atuais.',
    pessimista: '📉 Cenário de crise econômica, redução de investimentos, alta de custos e retração de demanda.',
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
              <h2 style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                📈 Predições e Cenários - Foz do Iguaçu
              </h2>
              <p className="muted">
                Projeções setoriais baseadas em dados históricos, modelagem econômica e análise de tendências 2023-2027
              </p>
            </div>
          </div>

          {/* Seletor de Cenários */}
          <div className="cenarios-selector">
            <button 
              className={`cenario-btn ${cenarioSelecionado === 'otimista' ? 'active otimista' : ''}`}
              onClick={() => setCenarioSelecionado('otimista')}
            >
              📈 Otimista (+25%)
            </button>
            <button 
              className={`cenario-btn ${cenarioSelecionado === 'realista' ? 'active realista' : ''}`}
              onClick={() => setCenarioSelecionado('realista')}
            >
              ➡️ Realista (Base)
            </button>
            <button 
              className={`cenario-btn ${cenarioSelecionado === 'pessimista' ? 'active pessimista' : ''}`}
              onClick={() => setCenarioSelecionado('pessimista')}
            >
              📉 Pessimista (-15%)
            </button>
          </div>

          <div className="card cenario-desc-card">
            <strong style={{ marginRight: '8px' }}>Cenário {cenarioSelecionado.charAt(0).toUpperCase() + cenarioSelecionado.slice(1)}:</strong> 
            {cenarioDesc[cenarioSelecionado]}
          </div>

          {/* Filtro de Setores */}
          <div ref={setoresRef} className="setores-filtro-grid">
            {(Object.keys(PREDICOES_SETORES) as SetorKey[]).map((key) => {
              const setor = PREDICOES_SETORES[key];
              const isActive = setorSelecionado === key;
              const crescimentoAnual = setor.dados[0].crescimento;
              return (
                <div
                  key={key}
                  className={`setor-card ${isActive ? 'active' : ''}`}
                  onClick={() => {
                    setSetorSelecionado(key);
                    setCompararSetores(false);
                  }}
                  style={{ borderLeftColor: setor.cor }}
                >
                  <div className="setor-icon" style={{ fontSize: '32px' }}>{setor.icon}</div>
                  <div className="setor-info">
                    <h4>{setor.nome}</h4>
                    <div className="setor-stats">
                      <span>📊 {setor.dados[setor.dados.length - 1].valor.toLocaleString('pt-BR')} empregos (2027)</span>
                      <span style={{ color: crescimentoAnual > 6 ? '#26de81' : crescimentoAnual > 4 ? '#FFD700' : '#1976D2' }}>
                        📈 +{crescimentoAnual}% a.a.
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Toggle Comparação */}
          <div style={{ display: 'flex', justifyContent: 'center', margin: '24px 0' }}>
            <button
              className="btn-action"
              onClick={() => setCompararSetores(!compararSetores)}
              style={{
                background: compararSetores 
                  ? 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)'
                  : 'linear-gradient(135deg, #1976D2 0%, #0A2541 100%)',
                color: 'white',
                border: 'none',
                padding: '14px 32px',
                borderRadius: '12px',
                fontSize: '15px',
                fontWeight: '700',
                cursor: 'pointer',
                boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
                transition: 'all 0.3s ease',
              }}
            >
              {compararSetores ? '📊 Ver Setor Individual' : '🔄 Comparar Todos os Setores'}
            </button>
          </div>

          {/* Gráficos de Predição */}
          <div ref={chartsRef}>
            {!compararSetores ? (
              // Visão Individual do Setor
              <div className="grid charts-grid-predicoes">
                <div className="card chart-card predicao-card">
                  <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    {setorAtual.icon} Projeção de Empregos - {setorAtual.nome}
                  </h3>
                  <ResponsiveContainer width="100%" height={340}>
                    <AreaChart data={dadosSetor}>
                      <defs>
                        <linearGradient id={`color${setorSelecionado}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={setorAtual.cor} stopOpacity={0.8}/>
                          <stop offset="95%" stopColor={setorAtual.cor} stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(10, 42, 65, 0.1)" />
                      <XAxis dataKey="ano" stroke="#0B2239" style={{ fontSize: 12, fontFamily: 'var(--font-family)' }} />
                      <YAxis stroke="#0B2239" style={{ fontSize: 12, fontFamily: 'var(--font-family)' }} />
                      <Tooltip 
                        contentStyle={{ 
                          background: 'rgba(10, 37, 65, 0.95)', 
                          border: 'none', 
                          borderRadius: '12px',
                          color: '#E6EEF6',
                          boxShadow: '0 4px 16px rgba(0,0,0,0.2)'
                        }}
                        formatter={(value: any) => [value.toLocaleString('pt-BR'), 'Empregos']}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="valor" 
                        stroke={setorAtual.cor} 
                        fillOpacity={1} 
                        fill={`url(#color${setorSelecionado})`} 
                        strokeWidth={3}
                        name="Empregos"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                  <div className="predicao-insight">
                    <strong>💡 Insight:</strong> {setorAtual.insights[cenarioSelecionado]}
                  </div>
                </div>

                <div className="card chart-card predicao-card">
                  <h3>📊 Crescimento Acumulado 2023-2027</h3>
                  <ResponsiveContainer width="100%" height={340}>
                    <BarChart data={dadosSetor}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(10, 42, 65, 0.1)" />
                      <XAxis dataKey="ano" stroke="#0B2239" style={{ fontSize: 12, fontFamily: 'var(--font-family)' }} />
                      <YAxis stroke="#0B2239" style={{ fontSize: 12, fontFamily: 'var(--font-family)' }} />
                      <Tooltip 
                        contentStyle={{ 
                          background: 'rgba(10, 37, 65, 0.95)', 
                          border: 'none', 
                          borderRadius: '12px',
                          color: '#E6EEF6',
                          boxShadow: '0 4px 16px rgba(0,0,0,0.2)'
                        }}
                      />
                      <Bar dataKey="valor" fill={setorAtual.cor} radius={[8, 8, 0, 0]} name="Empregos" />
                    </BarChart>
                  </ResponsiveContainer>
                  <div className="predicao-insight">
                    <strong>📈 Crescimento Projetado:</strong> De {dadosSetor[0].valor.toLocaleString('pt-BR')} para {dadosSetor[dadosSetor.length - 1].valor.toLocaleString('pt-BR')} empregos ({((dadosSetor[dadosSetor.length - 1].valor / dadosSetor[0].valor - 1) * 100).toFixed(1)}% acumulado).
                  </div>
                </div>
              </div>
            ) : (
              // Visão Comparativa Multi-Setores
              <div className="card chart-card predicao-card" style={{ gridColumn: '1 / -1' }}>
                <h3>🔄 Comparação Multi-Setorial - Projeção de Empregos 2023-2027</h3>
                <ResponsiveContainer width="100%" height={450}>
                  <LineChart data={dadosGraficoComparacao}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(10, 42, 65, 0.1)" />
                    <XAxis dataKey="ano" stroke="#0B2239" style={{ fontSize: 12, fontFamily: 'var(--font-family)' }} />
                    <YAxis stroke="#0B2239" style={{ fontSize: 12, fontFamily: 'var(--font-family)' }} />
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
                    {dadosComparacao.map((setor) => (
                      <Line 
                        key={setor.setor}
                        type="monotone" 
                        dataKey={setor.setor} 
                        stroke={setor.cor} 
                        strokeWidth={3} 
                        dot={{ fill: setor.cor, r: 5 }}
                      />
                    ))}
                  </LineChart>
                </ResponsiveContainer>
                <div className="predicao-insight" style={{ marginTop: '20px' }}>
                  <strong>🔍 Análise Comparativa:</strong> Turismo lidera crescimento absoluto, mas Transporte tem maior taxa de crescimento percentual. Setor de Serviços e Alimentação mostram expansão consistente, enquanto Construção apresenta volatilidade sazonal.
                </div>
              </div>
            )}
          </div>

          {/* KPIs de Referência */}
          <div className="card" style={{ marginTop: '32px', padding: '32px' }}>
            <h3 style={{ marginBottom: '24px' }}>📌 Indicadores de Referência 2023</h3>
            <div className="kpis-predicoes-grid">
              <div className="kpi-predicao">
                <div className="kpi-predicao-label">População Total</div>
                <div className="kpi-predicao-valor">{KPIS_FOZ.populacao_total.toLocaleString('pt-BR')}</div>
                <div className="kpi-predicao-sub">habitantes</div>
              </div>
              <div className="kpi-predicao">
                <div className="kpi-predicao-label">Turistas/Ano</div>
                <div className="kpi-predicao-valor">{(KPIS_FOZ.turistas_ano / 1000000).toFixed(2)}M</div>
                <div className="kpi-predicao-sub">visitantes</div>
              </div>
              <div className="kpi-predicao">
                <div className="kpi-predicao-label">PIB Per Capita</div>
                <div className="kpi-predicao-valor">R$ {(KPIS_FOZ.pib_per_capita / 1000).toFixed(1)}k</div>
                <div className="kpi-predicao-sub">por habitante</div>
              </div>
              <div className="kpi-predicao">
                <div className="kpi-predicao-label">IDH Municipal</div>
                <div className="kpi-predicao-valor">{KPIS_FOZ.idh.toFixed(3)}</div>
                <div className="kpi-predicao-sub">desenvolvimento alto</div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PredicoesNova;
