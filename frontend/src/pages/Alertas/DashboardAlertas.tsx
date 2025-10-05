/**
 * Dashboard de Alertas com Análise de Impactos Cruzados (usa o mesmo layout do Dashboard)
 */
import React, { useState, useEffect } from 'react';
import { anomaliasAPI } from '../../services/api';
import { Alerta, AlertasResponse, CategoriasResponse } from '../../types/alertas';
import AlertaCard from '../../components/common/AlertaCard';
import Sidebar from '../../components/layout/Sidebar';
import Topbar from '../../components/layout/Topbar';
import AuthEllipses from '../../components/common/AuthEllipses';
import '../Dashboard/Dashboard.css';
import './Alertas.css';

const DashboardAlertas: React.FC = () => {
  const [alertas, setAlertas] = useState<Alerta[]>([]);
  const [filtroCategoria, setFiltroCategoria] = useState<string>('');
  const [filtroSeveridade, setFiltroSeveridade] = useState<string>('');
  const [categorias, setCategorias] = useState<CategoriasResponse | null>(null);
  const [resumo, setResumo] = useState<AlertasResponse['resumo'] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [detalheAberto, setDetalheAberto] = useState<Alerta | null>(null);
  const [impactosAberto, setImpactosAberto] = useState<Alerta | null>(null);
  const [detalheLoading, setDetalheLoading] = useState(false);
  const [detalheErro, setDetalheErro] = useState<string | null>(null);

  // Carregar categorias disponíveis
  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await anomaliasAPI.getCategorias();
        setCategorias(response.data);
      } catch (err) {
        console.error('Erro ao carregar categorias:', err);
      }
    };

    fetchCategorias();
  }, []);

  // Carregar alertas
  useEffect(() => {
    const fetchAlertas = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await anomaliasAPI.getAlertasComImpactos(
          filtroCategoria || undefined,
          filtroSeveridade || undefined
        );
        const data: AlertasResponse = response.data;
        setAlertas(data.alertas);
        setResumo(data.resumo);
      } catch (err) {
        console.error('Erro ao carregar alertas:', err);
        setError('Erro ao carregar alertas. Tente novamente.');
      } finally {
        setLoading(false);
      }
    };

    fetchAlertas();
  }, [filtroCategoria, filtroSeveridade]);

  // Limpar filtros
  const limparFiltros = () => {
    setFiltroCategoria('');
    setFiltroSeveridade('');
  };

  const abrirDetalhe = async (alerta: Alerta) => {
    try {
      setDetalheErro(null);
      setDetalheLoading(true);
      // Buscar detalhes adicionais, se o backend fornecer
      const res = await anomaliasAPI.getAlertaDetalhes(alerta.id);
      const dados = res.data as Alerta; // fallback para o mesmo shape
      setDetalheAberto({ ...alerta, ...dados });
    } catch (e) {
      // Se o endpoint não estiver pronto, ainda abrimos com os dados básicos
      setDetalheAberto(alerta);
      setDetalheErro('Não foi possível carregar detalhes adicionais.');
    } finally {
      setDetalheLoading(false);
    }
  };

  return (
    <div className="dashboard-layout">
      <AuthEllipses />
      <Sidebar />
      <div className="content">
        <Topbar />
        <main className="dashboard-main">
          <div className="page-header">
            <h2>Alertas com Análise de Impactos</h2>
            <p className="muted">Anomalias detectadas nos dados e impactos esperados em outras métricas</p>
          </div>

          {resumo && (
            <div className="grid summary-grid">
              <div className="card kpi red">
                <div className="label">Críticos</div>
                <div className="value">{resumo.criticos}</div>
              </div>
              <div className="card kpi yellow">
                <div className="label">Atenção</div>
                <div className="value">{resumo.atencao}</div>
              </div>
              <div className="card kpi blue">
                <div className="label">Informativos</div>
                <div className="value">{resumo.informativos}</div>
              </div>
              <div className="card kpi green">
                <div className="label">Positivas</div>
                <div className="value">{resumo.anomalias_positivas}</div>
              </div>
              <div className="card kpi orange">
                <div className="label">Negativas</div>
                <div className="value">{resumo.anomalias_negativas}</div>
              </div>
            </div>
          )}

          <div className="card" style={{ marginBottom: 24 }}>
            <div className="filters-row">
              <div>
                <label className="label">Categoria</label>
                <select className="input" value={filtroCategoria} onChange={(e) => setFiltroCategoria(e.target.value)}>
                  <option value="">Todas</option>
                  {categorias?.categorias.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.nome}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="label">Severidade</label>
                <select className="input" value={filtroSeveridade} onChange={(e) => setFiltroSeveridade(e.target.value)}>
                  <option value="">Todas</option>
                  {categorias?.severidades.map((sev) => (
                    <option key={sev.id} value={sev.id}>{sev.nome}</option>
                  ))}
                </select>
              </div>
              <div className="filters-actions">
                <button className="btn" onClick={limparFiltros}>Limpar filtros</button>
              </div>
            </div>
          </div>

          {loading && <div className="loading">Carregando alertas…</div>}
          {error && <div className="error">{error}</div>}

          {!loading && !error && (
            <div className="card">
              <div className="list-header">
                <h3>{alertas.length} {alertas.length === 1 ? 'Alerta' : 'Alertas'}</h3>
              </div>
              <div className="alerta-list">
                {alertas.length === 0 ? (
                  <div className="empty">Nenhum alerta encontrado com os filtros selecionados.</div>
                ) : (
                  alertas.map((a) => (
                    <div key={a.id} className="alerta-item" onClick={() => abrirDetalhe(a)} style={{ cursor: 'pointer' }}>
                      {/* Card com botão de Impactos que abre modal específico */}
                      <AlertaCard alerta={a} onOpenImpactos={(al) => setImpactosAberto(al)} />
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Modal de Detalhes */}
          {detalheAberto && (
            <div className="modal-backdrop" onClick={() => setDetalheAberto(null)}>
              <div className="modal" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                  <h3>Detalhes do Alerta</h3>
                  <button className="icon-btn" onClick={() => setDetalheAberto(null)}>✕</button>
                </div>
                {detalheLoading ? (
                  <div className="loading">Carregando…</div>
                ) : (
                  <div className="modal-content">
                    <div className="grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
                      <div className="card">
                        <div className="label">Título</div>
                        <div className="value">{detalheAberto.titulo}</div>
                      </div>
                      <div className="card">
                        <div className="label">Categoria</div>
                        <div className="value">{detalheAberto.categoria}</div>
                      </div>
                      <div className="card">
                        <div className="label">Severidade</div>
                        <div className="value">{detalheAberto.severidade}</div>
                      </div>
                    </div>

                    <div className="card" style={{ marginTop: 16 }}>
                      <div className="label">Descrição</div>
                      <div className="value" style={{ whiteSpace: 'pre-wrap' }}>{detalheAberto.descricao}</div>
                    </div>

                    <div className="card" style={{ marginTop: 16 }}>
                      <div className="label">Impactos Esperados</div>
                      <div className="alerta-list" style={{ marginTop: 8 }}>
                        {detalheAberto.impactos_esperados?.length ? detalheAberto.impactos_esperados.map((imp, idx) => (
                          <div key={idx} className="sector-row" style={{ alignItems: 'baseline' }}>
                            <span className="sector-label" style={{ minWidth: 160 }}>{imp.metrica}</span>
                            <div className="value">{imp.descricao}</div>
                          </div>
                        )) : (
                          <div className="muted">Sem impactos listados.</div>
                        )}
                      </div>
                    </div>

                    {detalheErro && <div className="error" style={{ marginTop: 12 }}>{detalheErro}</div>}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Modal Impactos Esperados - visual mais rico */}
          {impactosAberto && (
            <div className="modal-backdrop" onClick={() => setImpactosAberto(null)}>
              <div className="modal impactos-modal" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                  <h3>Impactos Esperados — {impactosAberto.titulo}</h3>
                  <button className="icon-btn" onClick={() => setImpactosAberto(null)}>✕</button>
                </div>
                <div className="modal-content">
                  <div className="grid" style={{ gridTemplateColumns: '1fr', gap: 12 }}>
                    {impactosAberto.impactos_esperados?.length ? impactosAberto.impactos_esperados.map((imp, i) => (
                      <div key={i} className="card impacto-item">
                        <div className="sector-row">
                          <span className="sector-label" style={{ minWidth: 180 }}>{imp.metrica.replace(/_/g, ' ').toUpperCase()}</span>
                          <div style={{ width: '100%' }}>
                            <div className="sector-bar-bg">
                              <div className={`sector-bar ${imp.direcao === 'positivo' ? 'highlighted' : ''}`} style={{ width: imp.confianca === 'alta' ? '90%' : imp.confianca === 'media' ? '65%' : '40%' }} />
                            </div>
                            <div className="impacto-meta">
                              <span className={`badge ${imp.direcao}`}>{imp.direcao}</span>
                              <span className="muted">Confiança: {imp.confianca}</span>
                              <span className="muted">Prazo: {imp.prazo}</span>
                              <span className="muted">Estimativa: {imp.impacto_estimado}</span>
                            </div>
                            <div className="value" style={{ marginTop: 8 }}>{imp.descricao}</div>
                          </div>
                        </div>
                      </div>
                    )) : (
                      <div className="muted">Sem impactos listados.</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default DashboardAlertas;

