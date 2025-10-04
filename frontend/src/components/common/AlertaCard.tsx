/**
 * Componente para exibir um alerta com análise de impactos
 */
import React, { useState } from 'react';
import { Alerta } from '../../types/alertas';

interface AlertaCardProps {
  alerta: Alerta;
}

const AlertaCard: React.FC<AlertaCardProps> = ({ alerta }) => {
  const [expanded, setExpanded] = useState(false);

  // Cores por severidade
  const getSeveridadeColor = (severidade: string) => {
    const colors = {
      critico: 'bg-red-100 border-red-500 text-red-900',
      atencao: 'bg-yellow-100 border-yellow-500 text-yellow-900',
      informativo: 'bg-blue-100 border-blue-500 text-blue-900',
    };
    return colors[severidade as keyof typeof colors] || colors.informativo;
  };

  // Badge de severidade
  const getSeveridadeBadge = (severidade: string) => {
    const badges = {
      critico: 'bg-red-600 text-white',
      atencao: 'bg-yellow-500 text-white',
      informativo: 'bg-blue-500 text-white',
    };
    return badges[severidade as keyof typeof badges] || badges.informativo;
  };

  // Ícone de direção do impacto
  const getImpactoIcon = (direcao: string) => {
    switch (direcao) {
      case 'positivo':
        return '📈';
      case 'negativo':
        return '📉';
      default:
        return '➡️';
    }
  };

  // Cor do impacto
  const getImpactoColor = (direcao: string) => {
    const colors = {
      positivo: 'bg-green-50 border-green-300',
      negativo: 'bg-red-50 border-red-300',
      neutro: 'bg-gray-50 border-gray-300',
    };
    return colors[direcao as keyof typeof colors] || colors.neutro;
  };

  return (
    <div className={`border-l-4 rounded-lg shadow-md p-6 mb-4 ${getSeveridadeColor(alerta.severidade)}`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${getSeveridadeBadge(alerta.severidade)}`}>
              {alerta.severidade}
            </span>
            <span className="text-xs text-gray-600 font-medium uppercase">
              {alerta.categoria}
            </span>
          </div>
          <h3 className="text-xl font-bold mb-2">{alerta.titulo}</h3>
          <p className="text-sm text-gray-700 mb-3">{alerta.descricao}</p>
        </div>
      </div>

      {/* Métricas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 pb-4 border-b">
        <div>
          <p className="text-xs text-gray-600 uppercase font-semibold">Valor Esperado</p>
          <p className="text-lg font-bold">{alerta.valor_esperado.toLocaleString('pt-BR')}</p>
        </div>
        <div>
          <p className="text-xs text-gray-600 uppercase font-semibold">Valor Detectado</p>
          <p className="text-lg font-bold">{alerta.valor_detectado.toLocaleString('pt-BR')}</p>
        </div>
        <div>
          <p className="text-xs text-gray-600 uppercase font-semibold">Variação</p>
          <p className={`text-lg font-bold ${alerta.variacao_percentual > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {alerta.variacao_percentual > 0 ? '+' : ''}{alerta.variacao_percentual.toFixed(1)}%
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-600 uppercase font-semibold">Desvio Padrão</p>
          <p className="text-lg font-bold">{alerta.desvio_padrao.toFixed(1)}σ</p>
        </div>
      </div>

      {/* Impactos Esperados */}
      <div className="mb-4">
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-gray-900 mb-3"
        >
          <span>{expanded ? '▼' : '▶'}</span>
          <span>Impactos Esperados ({alerta.impactos_esperados.length})</span>
        </button>

        {expanded && (
          <div className="space-y-3 ml-6">
            {alerta.impactos_esperados.map((impacto, index) => (
              <div
                key={index}
                className={`border-l-4 rounded-md p-4 ${getImpactoColor(impacto.direcao)}`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{getImpactoIcon(impacto.direcao)}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-sm">{impacto.metrica.replace(/_/g, ' ').toUpperCase()}</h4>
                      <span className="text-xs px-2 py-0.5 bg-gray-200 rounded">
                        {impacto.categoria}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">{impacto.descricao}</p>
                    <div className="flex flex-wrap gap-3 text-xs">
                      <span className="font-semibold">
                        Impacto: <span className="font-normal">{impacto.impacto_estimado}</span>
                      </span>
                      <span className="font-semibold">
                        Confiança: <span className="font-normal capitalize">{impacto.confianca}</span>
                      </span>
                      <span className="font-semibold">
                        Prazo: <span className="font-normal">{impacto.prazo}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Ação Recomendada */}
      <div className="bg-white bg-opacity-50 rounded-md p-4 mt-4">
        <p className="text-xs text-gray-600 uppercase font-semibold mb-1">Ação Recomendada</p>
        <p className="text-sm font-medium">{alerta.acao_recomendada}</p>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t text-xs text-gray-600">
        <span>Período: {alerta.periodo}</span>
        <span>Detectado em: {new Date(alerta.data_deteccao).toLocaleDateString('pt-BR')}</span>
        <span>Prioridade: {alerta.prioridade}</span>
      </div>
    </div>
  );
};

export default AlertaCard;

