/**
 * Tipos TypeScript para indicadores e dados do sistema
 */

export interface KPIData {
  ano_referencia: number;
  populacao: {
    valor: number;
    variacao: number;
    tendencia: 'alta' | 'baixa';
  };
  idh: {
    valor: number;
    comparacao_estado: number;
    classificacao: string;
  };
  educacao: {
    matriculas_total: number;
    taxa_analfabetismo: number;
  };
  saude: {
    estabelecimentos: number;
    leitos: number;
    taxa_mortalidade_infantil: number;
  };
  infraestrutura: {
    cobertura_agua: number;
    cobertura_esgoto: number;
    coleta_lixo: number;
  };
  energia: {
    consumo_mwh: number;
    consumidores: number;
    consumo_per_capita: number;
  };
}

export interface DemografiaData {
  id: number;
  area_territorial_km2: number;
  densidade_demografica: number;
  grau_urbanizacao: number;
  populacao_estimada: number;
  populacao_censitaria: number;
  populacao_urbana: number;
  populacao_rural: number;
  taxa_crescimento_populacional: number;
  indice_idosos: number;
  razao_dependencia: number;
  razao_sexo: number;
  taxa_envelhecimento: number;
  ano_referencia: number;
}

export interface EducacaoData {
  id: number;
  matriculas_educacao_basica: number;
  matriculas_creche: number;
  matriculas_pre_escola: number;
  matriculas_ensino_fundamental: number;
  matriculas_ensino_medio: number;
  matriculas_educacao_profissional: number;
  matriculas_educacao_especial: number;
  matriculas_eja: number;
  matriculas_educacao_superior_presencial: number;
  matriculas_educacao_superior_distancia: number;
  taxa_analfabetismo: number;
  ano_referencia: number;
}

export interface SaudeData {
  id: number;
  estabelecimentos_saude: number;
  leitos_hospitalares: number;
  taxa_fecundidade: number;
  taxa_natalidade: number;
  taxa_mortalidade_geral: number;
  taxa_mortalidade_infantil: number;
  taxa_mortalidade_menores_5: number;
  taxa_mortalidade_materna: number;
  ano_referencia: number;
}

export interface BairroData {
  id: number;
  nome: string;
  latitude: number;
  longitude: number;
  populacao_estimada: number;
  area_km2: number;
}

export interface CNAEData {
  id: number;
  codigo: string;
  descricao: string;
  setor: string;
}

export interface PredicaoData {
  indicador: string;
  metodo: string;
  ano_base: number;
  valor_base?: number;
  previsoes: Array<{
    ano: number;
    [key: string]: any;
  }>;
}

export interface AnomaliaData {
  id: number;
  area: string;
  indicador: string;
  tipo: string;
  severidade: 'alta' | 'media' | 'baixa';
  valor_esperado: number;
  valor_detectado: number;
  desvio_percentual: number;
  data_deteccao: string;
  descricao: string;
}

export interface AlertaData {
  id: number;
  titulo: string;
  area: string;
  severidade: 'alta' | 'media' | 'baixa';
  status: string;
  criado_em: string;
  acao_recomendada: string;
}

export interface ComparativoData {
  ano_base: number;
  ano_comparacao: number;
  indicadores: Array<{
    nome: string;
    valor_base: number;
    valor_comparacao: number;
    variacao_absoluta: number;
    variacao_percentual: number;
  }>;
}

export interface FiltrosState {
  anoInicio?: number;
  anoFim?: number;
  cnae?: string;
  bairro?: string;
  setor?: string;
  bairro_id?: number;
  loteamento?: string;
}

export interface HeatmapPoint {
  lat: number;
  lng: number;
  intensity: number;
  bairro: string;
}



