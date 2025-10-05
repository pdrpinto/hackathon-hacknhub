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

          {/* Modal de Detalhes - Página Completa Redesenhada */}
          {detalheAberto && (
            <div className="detalhes-fullpage" onClick={() => setDetalheAberto(null)}>
              <div className="detalhes-container" onClick={(e) => e.stopPropagation()}>
                {/* Header com gradiente */}
                <div className="detalhes-header">
                  <div className="detalhes-header-bg"></div>
                  <div className="detalhes-header-content">
                    <button className="detalhes-close" onClick={() => setDetalheAberto(null)}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </button>
                    <div className="detalhes-badges">
                      <span className={`detalhes-badge badge-sev-${detalheAberto.severidade}`}>
                        {detalheAberto.severidade === 'critico' && '🚨 CRÍTICO'}
                        {detalheAberto.severidade === 'atencao' && '⚠️ ATENÇÃO'}
                        {detalheAberto.severidade === 'informativo' && 'ℹ️ INFO'}
                      </span>
                      <span className="detalhes-badge badge-categoria">
                        {detalheAberto.categoria}
                      </span>
                    </div>
                    <h1 className="detalhes-title">{detalheAberto.titulo}</h1>
                    <p className="detalhes-subtitle">{detalheAberto.descricao}</p>
                  </div>
                </div>

                {detalheLoading ? (
                  <div className="detalhes-loading">
                    <div className="spinner-lg"></div>
                    <p>Carregando análise completa...</p>
                  </div>
                ) : (
                  <div className="detalhes-body">
                    {/* Métricas Principais em Cards Grandes */}
                    <div className="detalhes-metrics">
                      <div className="metric-big">
                        <div className="metric-big-icon blue-gradient">
                          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                            <path d="M9 11L12 14L22 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                            <path d="M21 12V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5C3.89543 5 5 3.89543 5 3H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                          </svg>
                        </div>
                        <div className="metric-big-content">
                          <span className="metric-big-label">Valor Esperado</span>
                          <span className="metric-big-value">{detalheAberto.valor_esperado.toLocaleString('pt-BR')}</span>
                        </div>
                      </div>

                      <div className="metric-big highlight">
                        <div className="metric-big-icon yellow-gradient">
                          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                            <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <div className="metric-big-content">
                          <span className="metric-big-label">Valor Detectado</span>
                          <span className="metric-big-value alert">{detalheAberto.valor_detectado.toLocaleString('pt-BR')}</span>
                        </div>
                      </div>

                      <div className="metric-big">
                        <div className={`metric-big-icon ${detalheAberto.variacao_percentual >= 0 ? 'green-gradient' : 'red-gradient'}`}>
                          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                            {detalheAberto.variacao_percentual >= 0 ? (
                              <path d="M12 19V5M12 5L5 12M12 5L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            ) : (
                              <path d="M12 5V19M12 19L19 12M12 19L5 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            )}
                          </svg>
                        </div>
                        <div className="metric-big-content">
                          <span className="metric-big-label">Variação</span>
                          <span className={`metric-big-value ${detalheAberto.variacao_percentual >= 0 ? 'positive' : 'negative'}`}>
                            {detalheAberto.variacao_percentual > 0 ? '+' : ''}{detalheAberto.variacao_percentual.toFixed(1)}%
                          </span>
                        </div>
                      </div>

                      <div className="metric-big">
                        <div className="metric-big-icon purple-gradient">
                          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                            <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                          </svg>
                        </div>
                        <div className="metric-big-content">
                          <span className="metric-big-label">Desvio Padrão</span>
                          <span className="metric-big-value">{detalheAberto.desvio_padrao.toFixed(1)}σ</span>
                        </div>
                      </div>
                    </div>

                    {/* Impactos em Grid Moderno */}
                    {detalheAberto.impactos_esperados?.length ? (
                      <div className="detalhes-section">
                        <div className="section-title-row">
                          <h2 className="section-title-big">
                            <span className="section-icon-big">🎯</span>
                            Impactos Esperados
                          </h2>
                          <span className="section-count">{detalheAberto.impactos_esperados.length} impactos identificados</span>
                        </div>
                        <div className="impactos-modern-grid">
                          {detalheAberto.impactos_esperados.map((imp, idx) => (
                            <div key={idx} className={`impacto-modern impacto-dir-${imp.direcao}`}>
                              <div className="impacto-modern-header">
                                <div className="impacto-modern-icon-wrapper">
                                  <span className="impacto-modern-icon">
                                    {imp.direcao === 'positivo' && '✅'}
                                    {imp.direcao === 'negativo' && '⚠️'}
                                    {imp.direcao === 'neutro' && '➡️'}
                                  </span>
                                </div>
                                <div className="impacto-modern-title">
                                  <h3>{imp.metrica.replace(/_/g, ' ')}</h3>
                                  <span className="impacto-modern-cat">{imp.categoria}</span>
                                </div>
                              </div>
                              <p className="impacto-modern-desc">{imp.descricao}</p>
                              <div className="impacto-modern-meta">
                                <span className={`meta-pill confianca-${imp.confianca}`}>
                                  {imp.confianca === 'alta' && '🔥 Alta confiança'}
                                  {imp.confianca === 'media' && '📊 Média confiança'}
                                  {imp.confianca === 'baixa' && '💡 Baixa confiança'}
                                </span>
                                <span className="meta-pill prazo">⏱️ {imp.prazo}</span>
                                <span className="meta-pill impacto">� {imp.impacto_estimado}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : null}

                    {/* Ação Recomendada em Destaque */}
                    <div className="detalhes-section">
                      <div className="section-title-row">
                        <h2 className="section-title-big">
                          <span className="section-icon-big">💡</span>
                          Ação Recomendada
                        </h2>
                      </div>
                      <div className="acao-box">
                        <div className="acao-box-icon">🎯</div>
                        <p className="acao-box-text">{detalheAberto.acao_recomendada}</p>
                      </div>
                    </div>

                    {/* Footer com Timeline */}
                    <div className="detalhes-footer-info">
                      <div className="footer-info-item">
                        <span className="footer-info-icon">📅</span>
                        <div className="footer-info-text">
                          <span className="footer-info-label">Período Analisado</span>
                          <span className="footer-info-value">{detalheAberto.periodo}</span>
                        </div>
                      </div>
                      <div className="footer-info-divider"></div>
                      <div className="footer-info-item">
                        <span className="footer-info-icon">🕐</span>
                        <div className="footer-info-text">
                          <span className="footer-info-label">Detectado em</span>
                          <span className="footer-info-value">
                            {new Date(detalheAberto.data_deteccao).toLocaleDateString('pt-BR', { 
                              day: '2-digit', 
                              month: 'long', 
                              year: 'numeric' 
                            })}
                          </span>
                        </div>
                      </div>
                      <div className="footer-info-divider"></div>
                      <div className="footer-info-item">
                        <span className="footer-info-icon">🎚️</span>
                        <div className="footer-info-text">
                          <span className="footer-info-label">Prioridade</span>
                          <span className="footer-info-value">{detalheAberto.prioridade}</span>
                        </div>
                      </div>
                    </div>

                    {detalheErro && (
                      <div className="error-banner-modern">
                        <span className="error-icon-modern">⚠️</span>
                        <span>{detalheErro}</span>
                      </div>
                    )}
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

