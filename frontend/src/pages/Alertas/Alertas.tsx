import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/layout/Sidebar';
import Topbar from '../../components/layout/Topbar';
import AuthEllipses from '../../components/common/AuthEllipses';
import { ALERTAS_FOZ } from '../../data/fozDoIguacu';
import { gsap } from 'gsap';
import '../Dashboard/Dashboard.css';
import './Alertas.css';

interface Alerta {
  id: number;
  tipo: string;
  severidade: string;
  titulo: string;
  descricao: string;
  recomendacao: string;
  bairros_afetados: string[];
  data: string;
  metrica: string;
  valor_atual: number;
  valor_esperado: number;
}

const Alertas: React.FC = () => {
  const [alertas] = useState<Alerta[]>(ALERTAS_FOZ);
  const [alertaSelecionado, setAlertaSelecionado] = useState<Alerta | null>(null);
  const [filtroSeveridade, setFiltroSeveridade] = useState<string>('todos');

  useEffect(() => {
    // Animação de entrada dos cards
    gsap.fromTo(
      '.alerta-card-animated',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' }
    );
  }, [filtroSeveridade]);

  const alertasFiltrados = filtroSeveridade === 'todos' 
    ? alertas 
    : alertas.filter(a => a.severidade === filtroSeveridade);

  const contadorSeveridade = {
    critico: alertas.filter(a => a.severidade === 'crítico').length,
    atenção: alertas.filter(a => a.severidade === 'atenção').length,
    alerta: alertas.filter(a => a.severidade === 'alerta').length,
  };

  const getSeveridadeIcon = (sev: string) => {
    switch (sev) {
      case 'crítico': return '🚨';
      case 'atenção': return '⚠️';
      case 'alerta': return '🔔';
      default: return 'ℹ️';
    }
  };

  const getSeveridadeColor = (sev: string) => {
    switch (sev) {
      case 'crítico': return '#ff4757';
      case 'atenção': return '#ffa502';
      case 'alerta': return '#ffd700';
      default: return '#70a1ff';
    }
  };

  const getVariacao = (atual: number, esperado: number) => {
    return ((atual - esperado) / esperado * 100).toFixed(1);
  };

  return (
    <div className="dashboard-layout">
      <AuthEllipses />
      <Sidebar />
      <div className="content">
        <Topbar />
        <main className="dashboard-main">
          <div className="page-header page-header-animated">
            <div>
              <h2>🚨 Central de Alertas</h2>
              <p className="muted">Anomalias detectadas, impactos esperados e ações recomendadas para Foz do Iguaçu</p>
            </div>
          </div>

          {/* Resumo por Severidade */}
          <div className="grid summary-grid-alertas">
            <div 
              className={`card kpi kpi-alerta kpi-critico ${filtroSeveridade === 'crítico' ? 'active' : ''}`}
              onClick={() => setFiltroSeveridade(filtroSeveridade === 'crítico' ? 'todos' : 'crítico')}
              style={{ cursor: 'pointer' }}
            >
              <div className="kpi-icon">🚨</div>
              <div>
                <div className="label">Críticos</div>
                <div className="value">{contadorSeveridade.critico}</div>
              </div>
            </div>
            <div 
              className={`card kpi kpi-alerta kpi-atencao ${filtroSeveridade === 'atenção' ? 'active' : ''}`}
              onClick={() => setFiltroSeveridade(filtroSeveridade === 'atenção' ? 'todos' : 'atenção')}
              style={{ cursor: 'pointer' }}
            >
              <div className="kpi-icon">⚠️</div>
              <div>
                <div className="label">Atenção</div>
                <div className="value">{contadorSeveridade.atenção}</div>
              </div>
            </div>
            <div 
              className={`card kpi kpi-alerta kpi-info ${filtroSeveridade === 'alerta' ? 'active' : ''}`}
              onClick={() => setFiltroSeveridade(filtroSeveridade === 'alerta' ? 'todos' : 'alerta')}
              style={{ cursor: 'pointer' }}
            >
              <div className="kpi-icon">🔔</div>
              <div>
                <div className="label">Alertas</div>
                <div className="value">{contadorSeveridade.alerta}</div>
              </div>
            </div>
            <div 
              className="card kpi kpi-alerta kpi-total"
              onClick={() => setFiltroSeveridade('todos')}
              style={{ cursor: 'pointer' }}
            >
              <div className="kpi-icon">📊</div>
              <div>
                <div className="label">Total</div>
                <div className="value">{alertas.length}</div>
              </div>
            </div>
          </div>

          {/* Lista de Alertas */}
          <div className="alertas-list">
            {alertasFiltrados.map((alerta, idx) => (
              <div 
                key={alerta.id} 
                className="card alerta-card-animated alerta-card-modern"
                onClick={() => setAlertaSelecionado(alerta)}
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="alerta-card-header">
                  <div className="alerta-tipo-badge" style={{ background: getSeveridadeColor(alerta.severidade) }}>
                    {getSeveridadeIcon(alerta.severidade)} {alerta.severidade.toUpperCase()}
                  </div>
                  <div className="alerta-meta">
                    <span className="alerta-categoria">{alerta.tipo}</span>
                    <span className="alerta-data">{new Date(alerta.data).toLocaleDateString('pt-BR')}</span>
                  </div>
                </div>

                <h3 className="alerta-titulo">{alerta.titulo}</h3>
                <p className="alerta-descricao">{alerta.descricao}</p>

                <div className="alerta-metricas">
                  <div className="metrica-mini">
                    <span className="metrica-mini-label">Valor Atual</span>
                    <span className="metrica-mini-valor">{alerta.valor_atual.toLocaleString('pt-BR')}</span>
                  </div>
                  <div className="metrica-mini-sep">→</div>
                  <div className="metrica-mini">
                    <span className="metrica-mini-label">Esperado</span>
                    <span className="metrica-mini-valor">{alerta.valor_esperado.toLocaleString('pt-BR')}</span>
                  </div>
                  <div className="metrica-mini variacao">
                    <span className="metrica-mini-label">Variação</span>
                    <span className={`metrica-mini-valor ${Number(getVariacao(alerta.valor_atual, alerta.valor_esperado)) < 0 ? 'negativa' : 'positiva'}`}>
                      {getVariacao(alerta.valor_atual, alerta.valor_esperado)}%
                    </span>
                  </div>
                </div>

                <div className="alerta-bairros">
                  <strong>Bairros afetados:</strong> {alerta.bairros_afetados.join(', ')}
                </div>

                <button className="btn-alerta-detalhes">Ver Detalhes e Recomendações →</button>
              </div>
            ))}
          </div>

          {/* Modal de Detalhes */}
          {alertaSelecionado && (
            <div className="modal-overlay" onClick={() => setAlertaSelecionado(null)}>
              <div className="modal-content modal-alerta-detalhes" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={() => setAlertaSelecionado(null)}>✕</button>
                
                <div className="modal-alerta-header">
                  <div className="modal-alerta-badge" style={{ background: getSeveridadeColor(alertaSelecionado.severidade) }}>
                    {getSeveridadeIcon(alertaSelecionado.severidade)} {alertaSelecionado.severidade.toUpperCase()}
                  </div>
                  <h2>{alertaSelecionado.titulo}</h2>
                  <p className="modal-alerta-meta">
                    {alertaSelecionado.tipo} • {new Date(alertaSelecionado.data).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
                  </p>
                </div>

                <div className="modal-alerta-body">
                  <div className="detalhes-section">
                    <h3>📋 Descrição Detalhada</h3>
                    <p>{alertaSelecionado.descricao}</p>
                  </div>

                  <div className="detalhes-section metricas-detalhes">
                    <h3>📊 Métricas</h3>
                    <div className="metricas-grid-modal">
                      <div className="metrica-card">
                        <div className="metrica-label">Valor Detectado</div>
                        <div className="metrica-valor destaque">{alertaSelecionado.valor_atual.toLocaleString('pt-BR')}</div>
                        <div className="metrica-unidade">{alertaSelecionado.metrica.replace(/_/g, ' ')}</div>
                      </div>
                      <div className="metrica-card">
                        <div className="metrica-label">Valor Esperado</div>
                        <div className="metrica-valor">{alertaSelecionado.valor_esperado.toLocaleString('pt-BR')}</div>
                        <div className="metrica-unidade">baseline histórico</div>
                      </div>
                      <div className="metrica-card variacao-card">
                        <div className="metrica-label">Variação</div>
                        <div className={`metrica-valor ${Number(getVariacao(alertaSelecionado.valor_atual, alertaSelecionado.valor_esperado)) < 0 ? 'negativa' : 'positiva'}`}>
                          {getVariacao(alertaSelecionado.valor_atual, alertaSelecionado.valor_esperado)}%
                        </div>
                        <div className="metrica-unidade">vs. esperado</div>
                      </div>
                    </div>
                  </div>

                  <div className="detalhes-section recomendacao-section">
                    <h3>💡 Ações Recomendadas</h3>
                    <div className="recomendacao-box">
                      <p>{alertaSelecionado.recomendacao}</p>
                    </div>
                  </div>

                  <div className="detalhes-section">
                    <h3>📍 Bairros Afetados</h3>
                    <div className="bairros-chips">
                      {alertaSelecionado.bairros_afetados.map((b, i) => (
                        <span key={i} className="bairro-chip">{b}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="modal-alerta-footer">
                  <button className="btn btn-secondary" onClick={() => setAlertaSelecionado(null)}>Fechar</button>
                  <button className="btn btn-primary">Marcar como Tratado</button>
                  <button className="btn btn-primary">Gerar Relatório</button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Alertas;
