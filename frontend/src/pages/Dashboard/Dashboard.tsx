import React, { useMemo, useState } from 'react';
import Sidebar from '../../components/layout/Sidebar';
import Topbar from '../../components/layout/Topbar';
import AuthEllipses from '../../components/common/AuthEllipses';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './Dashboard.css';
import { useFiltersStore } from '../../store/filters';
import { useKpisEconomia, useSerieEconomia, useTopCnaes } from '../../hooks/useEconomia';
import { bairrosAPI, economiaAPI } from '../../services/api';
import { downloadBlob } from '../../utils/download';
import type { BairroItem } from '../../types/economia';

// Helper para mapear série em 12 meses: assumindo que API retorna {ano, valor}
function toMonthlySeries(serie: { ano: number; valor: number }[]) {
  // Como a API é anual, apenas renomeamos para exibição mensal fictícia
  const meses = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
  return meses.map((mes, i) => ({ mes, contratacao: serie[i % serie.length]?.valor ?? 0 }));
}

const Dashboard: React.FC = () => {
  // Filtros globais
  const { ano, ano_inicio, ano_fim, regiao, bairro_id, setAno, setPeriodo, setRegiao, setBairroId } = useFiltersStore();

  // Carregar bairros para o seletor (por região)
  const [bairros, setBairros] = useState<BairroItem[]>([]);
  const [exportando, setExportando] = useState(false);
  React.useEffect(() => {
    const load = async () => {
      try {
        if (regiao) {
          const res = await bairrosAPI.getByRegiao(regiao);
          setBairros(res.data?.dados || res.data?.dados?.dados || res.data?.dados || []);
        } else {
          const res = await bairrosAPI.getAll();
          setBairros(res.data?.dados || res.data?.dados?.dados || res.data?.dados || []);
        }
      } catch (e) {
        setBairros([]);
      }
    };
    load();
  }, [regiao]);

  // Dados do backend
  const { data: kpis } = useKpisEconomia({ ano, bairro_id, regiao: regiao || undefined });
  const { data: serieEmpregos } = useSerieEconomia({ indicador: 'empregos_gerados', ano_inicio, ano_fim, bairro_id, regiao: regiao || undefined });
  const { data: topCnaes } = useTopCnaes({ ano, metric: 'empresas_ativas', limit: 8, bairro_id, regiao: regiao || undefined });

  // Série de linha em duas séries: empregos_gerados (verde) e empresas_abertas (azul)
  const { data: serieAbertas } = useSerieEconomia({ indicador: 'empresas_abertas', ano_inicio, ano_fim, bairro_id, regiao: regiao || undefined });

  const lineChartData = useMemo(() => {
    const verde = toMonthlySeries(serieEmpregos);
    const azul = toMonthlySeries(serieAbertas);
    return (verde || []).map((v, idx) => ({
      mes: v.mes,
      contratacao: v.contratacao,
      desemprego: azul[idx]?.contratacao ?? 0,
    }));
  }, [serieEmpregos, serieAbertas]);

  // Lógica de alerta real baseada na série de empregos_gerados
  const mostrarAlerta = useMemo(() => {
    if (!serieEmpregos || serieEmpregos.length === 0) return false;
    const valores = serieEmpregos.map((s) => s.valor);
    const media = valores.reduce((a, b) => a + b, 0) / valores.length;
    const ultimo = valores[valores.length - 1];
    return ultimo < media * 0.9;
  }, [serieEmpregos]);

  // Exportação CSV
  const handleExportCSV = async () => {
    try {
      setExportando(true);
      const params = { ano, bairro_id, regiao: regiao || undefined };
      const res = await economiaAPI.exportCSV(params);
      // Tenta extrair filename do header; fallback amigável
      const dispo = res.headers?.['content-disposition'] as string | undefined;
      let filename = 'economia.csv';
      if (dispo && dispo.includes('filename=')) {
        const match = dispo.match(/filename\*=UTF-8''([^;]+)|filename="?([^";]+)"?/i);
        const raw = decodeURIComponent(match?.[1] || match?.[2] || 'economia.csv');
        filename = raw.endsWith('.csv') ? raw : `${raw}.csv`;
      } else {
        const partes: string[] = [];
        if (ano) partes.push(`ano-${ano}`);
        if (regiao) partes.push(`regiao-${regiao}`);
        if (bairro_id) partes.push(`bairro-${bairro_id}`);
        filename = `economia_${partes.join('_') || 'cascavel'}.csv`;
      }
      downloadBlob(res.data as Blob, filename);
    } catch (e) {
      // opcional: feedback ao usuário; por ora silencioso
      console.error('Falha ao exportar CSV', e);
    } finally {
      setExportando(false);
    }
  };

  return (
    <div className="dashboard-layout">
      <AuthEllipses />
      <Sidebar />
      
      <div className="content">
        <Topbar />
        
        <main className="dashboard-main">
          {/* Alerta condicional */}
          {mostrarAlerta && (
            <div className="alert-banner">
              ⚠️ Atenção: Contratação do último mês abaixo de 90% da média histórica
            </div>
          )}
          
          {/* Filtros */}
          <div className="card" style={{ marginBottom: 24 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(140px, 1fr))', gap: 16 }}>
              <div>
                <label className="label">Ano</label>
                <input className="input" type="number" value={ano ?? ''} onChange={(e) => setAno(Number(e.target.value) || undefined)} />
              </div>
              <div>
                <label className="label">Período - Início</label>
                <input className="input" type="number" value={ano_inicio ?? ''} onChange={(e) => setPeriodo(Number(e.target.value) || undefined, ano_fim)} />
              </div>
              <div>
                <label className="label">Período - Fim</label>
                <input className="input" type="number" value={ano_fim ?? ''} onChange={(e) => setPeriodo(ano_inicio, Number(e.target.value) || undefined)} />
              </div>
              <div>
                <label className="label">Região</label>
                <select className="input" value={regiao} onChange={(e) => { setRegiao(e.target.value as any); setBairroId(undefined); }}>
                  <option value="">Todas</option>
                  <option value="Centro">Centro</option>
                  <option value="Norte">Norte</option>
                  <option value="Sul">Sul</option>
                  <option value="Leste">Leste</option>
                  <option value="Oeste">Oeste</option>
                </select>
              </div>
              <div>
                <label className="label">Bairro</label>
                <select className="input" value={bairro_id ?? ''} onChange={(e) => setBairroId(e.target.value ? Number(e.target.value) : undefined)}>
                  <option value="">Todos</option>
                  {bairros.map((b) => (
                    <option key={b.id} value={b.id}>{b.nome}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Gráficos principais */}
          <div className="grid charts-grid">
            <div className="card chart-card">
              <h3>Setor Industrial</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={lineChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(10, 42, 65, 0.1)" />
                  <XAxis 
                    dataKey="mes" 
                    stroke="#0B2239"
                    style={{ fontSize: 12, fontFamily: 'var(--font-family)' }}
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
                  <Line type="monotone" dataKey="contratacao" stroke="#7CDE76" strokeWidth={3} dot={false} name="Empregos Gerados" />
                  <Line type="monotone" dataKey="desemprego" stroke="#2EA1FF" strokeWidth={3} dot={false} name="Empresas Abertas" />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <div className="card chart-card">
              <h3>Top CNAEs por Empresas Ativas</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={(topCnaes || []).map((c) => ({ tipo: `${c.codigo} ${c.descricao}`.slice(0, 22) + (c.descricao.length > 22 ? '…' : ''), valor: c.valor }))}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(10, 42, 65, 0.1)" />
                  <XAxis 
                    dataKey="tipo" 
                    stroke="#0B2239"
                    style={{ fontSize: 12, fontFamily: 'var(--font-family)' }}
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
                  <Bar dataKey="valor" fill="#2EA1FF" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Métricas e análise */}
          <div className="grid bottom-grid">
            <div className="stat-grid-2x2">
              <div className="stat">
                <div className="stat-label">Empresas Ativas</div>
                <div className="value">{kpis?.empresas_ativas_total?.toLocaleString('pt-BR') ?? '—'}</div>
              </div>
              <div className="stat">
                <div className="stat-label">Empresas Abertas</div>
                <div className="value">{kpis?.empresas_abertas_total?.toLocaleString('pt-BR') ?? '—'}</div>
              </div>
              <div className="stat">
                <div className="stat-label">Empregos Gerados</div>
                <div className="value">{kpis?.empregos_gerados_total?.toLocaleString('pt-BR') ?? '—'}</div>
              </div>
              <div className="stat">
                <div className="stat-label">Massa Salarial</div>
                <div className="value">{kpis?.massa_salarial_total ? `R$ ${(kpis.massa_salarial_total).toLocaleString('pt-BR')}` : '—'}</div>
              </div>
            </div>
            
            <div className="card sectors-card">
              <h3>Imposto gerado por cada setor</h3>
              <div className="sector-bars">
                {['Comércio','Indústria','Serviços','Saúde'].map((setor) => {
                  const total = (topCnaes || []).filter((c) => c.setor?.toLowerCase().includes(setor.toLowerCase())).reduce((acc, c) => acc + (c.valor || 0), 0);
                  const max = Math.max(1, (topCnaes || []).reduce((m, c) => Math.max(m, c.valor || 0), 1));
                  const pct = Math.min(100, Math.round((total / (max * 3)) * 100));
                  const highlighted = setor === 'Saúde';
                  return (
                    <div className="sector-row" key={setor}>
                      <span className="sector-label">{setor}</span>
                      <div className="sector-bar-bg">
                        <div className={`sector-bar ${highlighted ? 'highlighted' : ''}`} style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div className="action-buttons">
                <button className="btn-action" onClick={handleExportCSV} disabled={exportando}>
                  {exportando ? '⏳ Exportando…' : '📄 Exportar CSV'}
                </button>
                <button className="btn-action">📊 Gerar Relatório</button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
