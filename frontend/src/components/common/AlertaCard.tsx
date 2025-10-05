/**
 * Componente para exibir um alerta com análise de impactos
 * Agora usando o design system local (sem Tailwind) e permitindo abrir um modal externo de impactos
 */
import React from 'react';
import { Alerta } from '../../types/alertas';
import './AlertaCard.css';

interface AlertaCardProps {
  alerta: Alerta;
  // Abre modal externo de impactos
  onOpenImpactos?: (alerta: Alerta) => void;
}

const AlertaCard: React.FC<AlertaCardProps> = ({ alerta, onOpenImpactos }) => {
  const sevClass = (sev: string) => {
    switch (sev) {
      case 'critico':
        return 'sev-critico';
      case 'atencao':
        return 'sev-atencao';
      default:
        return 'sev-informativo';
    }
  };

  const variacaoClass = alerta.variacao_percentual >= 0 ? 'delta-pos' : 'delta-neg';

  return (
    <div className={`alerta-card ${sevClass(alerta.severidade)}`}>
      {/* Header */}
      <div className="alerta-header">
        <div>
          <div className="chips">
            <span className={`chip chip-sev ${sevClass(alerta.severidade)}`}>{alerta.severidade}</span>
            <span className="chip chip-cat">{alerta.categoria}</span>
          </div>
          <h4 className="alerta-title">{alerta.titulo}</h4>
          <p className="alerta-desc">{alerta.descricao}</p>
        </div>
        <button
          className="btn-chip"
          onClick={(e) => {
            e.stopPropagation();
            onOpenImpactos?.(alerta);
          }}
        >
          Impactos Esperados ({alerta.impactos_esperados.length})
        </button>
      </div>

      {/* Métricas */}
      <div className="metrics-grid">
        <div className="metric">
          <div className="metric-label">Valor Esperado</div>
          <div className="metric-value">{alerta.valor_esperado.toLocaleString('pt-BR')}</div>
        </div>
        <div className="metric">
          <div className="metric-label">Valor Detectado</div>
          <div className="metric-value">{alerta.valor_detectado.toLocaleString('pt-BR')}</div>
        </div>
        <div className="metric">
          <div className="metric-label">Variação</div>
          <div className={`metric-value ${variacaoClass}`}>
            {alerta.variacao_percentual > 0 ? '+' : ''}
            {alerta.variacao_percentual.toFixed(1)}%
          </div>
        </div>
        <div className="metric">
          <div className="metric-label">Desvio Padrão</div>
          <div className="metric-value">{alerta.desvio_padrao.toFixed(1)}σ</div>
        </div>
      </div>

      {/* Ação Recomendada */}
      <div className="acao-card">
        <div className="acao-label">Ação Recomendada</div>
        <div className="acao-text">{alerta.acao_recomendada}</div>
      </div>

      {/* Footer */}
      <div className="alerta-footer">
        <span>Período: {alerta.periodo}</span>
        <span>Detectado em: {new Date(alerta.data_deteccao).toLocaleDateString('pt-BR')}</span>
        <span>Prioridade: {alerta.prioridade}</span>
      </div>
    </div>
  );
};

export default AlertaCard;

