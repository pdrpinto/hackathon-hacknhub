/**
 * Types para a API de Alertas com Análise de Impactos
 */

export interface ImpactoEsperado {
  metrica: string;
  categoria: string;
  descricao: string;
  impacto_estimado: string;
  direcao: 'positivo' | 'negativo' | 'neutro';
  confianca: 'alta' | 'media' | 'baixa';
  prazo: string;
}

export interface Alerta {
  id: number;
  tipo: 'anomalia_positiva' | 'anomalia_negativa';
  categoria: string;
  metrica_principal: string;
  titulo: string;
  descricao: string;
  severidade: 'critico' | 'atencao' | 'informativo';
  valor_esperado: number;
  valor_detectado: number;
  variacao_percentual: number;
  desvio_padrao: number;
  periodo: string;
  data_deteccao: string;
  impactos_esperados: ImpactoEsperado[];
  acao_recomendada: string;
  prioridade: number;
}

export interface AlertasResponse {
  total: number;
  filtros_aplicados: {
    categoria: string;
    severidade: string;
  };
  alertas: Alerta[];
  resumo: {
    criticos: number;
    atencao: number;
    informativos: number;
    anomalias_positivas: number;
    anomalias_negativas: number;
  };
  gerado_em: string;
}

export interface Categoria {
  id: string;
  nome: string;
}

export interface Severidade {
  id: string;
  nome: string;
  cor: string;
}

export interface CategoriasResponse {
  categorias: Categoria[];
  severidades: Severidade[];
}

