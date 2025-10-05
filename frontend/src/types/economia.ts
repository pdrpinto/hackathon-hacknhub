// Tipos para respostas da API de Economia e Bairros

// Wrapper genérico de sucesso padrão do backend
export interface ApiSuccess<T> {
  sucesso: true;
  dados: T;
}

export interface ApiError {
  sucesso: false;
  erro: string;
}

// KPIs de Economia
export interface EconomiaKpis {
  ano: number;
  empresas_ativas_total: number;
  empresas_abertas_total: number;
  empresas_fechadas_total: number;
  saldo_empresas: number;
  empregos_gerados_total: number;
  massa_salarial_total: number;
  ticket_medio_salarial: number;
}

export type EconomiaKpisResponse = ApiSuccess<EconomiaKpis> | ApiError;

// Série temporal de economia
export interface EconomiaSerieItem {
  ano: number;
  valor: number;
}

export interface EconomiaSerieResponseData {
  sucesso: true;
  indicador: string;
  dados: EconomiaSerieItem[];
}

// Top CNAEs
export interface TopCnaeItem {
  cnae_id: number;
  codigo: string;
  descricao: string;
  setor: string;
  valor: number;
}

export interface TopCnaeResponseData {
  sucesso: true;
  ano: number;
  metric: string;
  dados: TopCnaeItem[];
}

// PIB Municipal
export interface PibMunicipal {
  ano: number;
  municipio: string;
  pib_total_mil: number;
  impostos_liquidos_mil: number;
  pib_per_capita: number;
  vab_total_mil: number;
  agropecuaria_mil: number;
  industria_mil: number;
  servicos_privados_mil: number;
  administracao_publica_mil: number;
}

export type PibResponse = ApiSuccess<PibMunicipal> | ApiError;

// Bairros (lista simples)
export interface BairroItem {
  id: number;
  nome: string;
  regiao: 'Norte' | 'Sul' | 'Leste' | 'Oeste' | 'Centro' | string;
}

export interface BairrosListResponseData {
  sucesso: true;
  dados: BairroItem[];
}
