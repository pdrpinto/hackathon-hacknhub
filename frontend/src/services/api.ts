/**
 * Cliente API para comunicação com o backend
 */
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: `${API_URL}/api`,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para tratamento de erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

// ===== INDICADORES =====
export const indicadoresAPI = {
  getKPIs: (ano?: number) => 
    api.get('/indicadores/kpis', { params: { ano } }),
  
  getDemografia: (anoInicio?: number, anoFim?: number) =>
    api.get('/indicadores/demografia', { params: { ano_inicio: anoInicio, ano_fim: anoFim } }),
  
  getEducacao: (anoInicio?: number, anoFim?: number) =>
    api.get('/indicadores/educacao', { params: { ano_inicio: anoInicio, ano_fim: anoFim } }),
  
  getSaude: (anoInicio?: number, anoFim?: number) =>
    api.get('/indicadores/saude', { params: { ano_inicio: anoInicio, ano_fim: anoFim } }),
  
  getInfraestrutura: (anoInicio?: number, anoFim?: number) =>
    api.get('/indicadores/infraestrutura', { params: { ano_inicio: anoInicio, ano_fim: anoFim } }),
  
  getEnergia: (anoInicio?: number, anoFim?: number) =>
    api.get('/indicadores/energia', { params: { ano_inicio: anoInicio, ano_fim: anoFim } }),
  
  getIDH: (anoInicio?: number, anoFim?: number) =>
    api.get('/indicadores/idh', { params: { ano_inicio: anoInicio, ano_fim: anoFim } }),
  
  getSerieTemporal: (indicador: string) =>
    api.get(`/indicadores/serie-temporal/${indicador}`),
  
  getComparativo: (anoBase: number, anoComparacao: number) =>
    api.get('/indicadores/comparativo', { params: { ano_base: anoBase, ano_comparacao: anoComparacao } }),
};

// ===== MAPAS =====
export const mapasAPI = {
  getBairros: () => api.get('/mapas/bairros'),
  
  getBairro: (id: number) => api.get(`/mapas/bairros/${id}`),
  
  getHeatmapData: (indicador: string) =>
    api.get('/mapas/heatmap', { params: { indicador } }),
  
  getGeoJSON: () => api.get('/mapas/geojson'),
  
  getCNAE: () => api.get('/mapas/cnae'),
  
  getCNAEPorSetor: (setor: string) =>
    api.get(`/mapas/cnae/setor/${setor}`),
};

// ===== PREDIÇÕES =====
export const predicoesAPI = {
  preverPopulacao: (anos: number = 5) =>
    api.get('/predicoes/populacao', { params: { anos } }),
  
  preverEducacao: (anos: number = 5) =>
    api.get('/predicoes/educacao', { params: { anos } }),
  
  preverSaude: (anos: number = 5) =>
    api.get('/predicoes/saude', { params: { anos } }),
  
  preverIDH: (anos: number = 5) =>
    api.get('/predicoes/idh', { params: { anos } }),
  
  simularCenario: (dados: any) =>
    api.post('/predicoes/cenario', dados),
};

// ===== ANOMALIAS =====
export const anomaliasAPI = {
  detectar: (area: string = 'todas', severidade: string = 'todas') =>
    api.get('/anomalias/detectar', { params: { area, severidade } }),
  
  getAlertas: () => api.get('/anomalias/alertas'),
  
  getHistorico: (limite: number = 50) =>
    api.get('/anomalias/historico', { params: { limite } }),
  
  getDashboard: () => api.get('/anomalias/dashboard'),
};

// ===== EXPORTAÇÃO =====
export const exportacaoAPI = {
  exportarCSV: (tipo: string, filtros: any) =>
    api.post('/exportacao/csv', { tipo, filtros }, { responseType: 'blob' }),
  
  exportarPDF: (tipo: string, filtros: any) =>
    api.post('/exportacao/pdf', { tipo, filtros }, { responseType: 'blob' }),
  
  exportarRelatorioCompleto: (ano: number, formato: 'pdf' | 'csv' = 'pdf') =>
    api.post('/exportacao/relatorio-completo', { ano, formato }, { responseType: 'blob' }),
};

// ===== ECONOMIA =====
export const economiaAPI = {
  getKPIs: (params: { ano?: number; bairro_id?: number; regiao?: string; cnae_id?: number } = {}) =>
    api.get('/economia/kpis', { params }),

  getSerie: (params: { indicador: string; ano_inicio?: number; ano_fim?: number; bairro_id?: number; regiao?: string; cnae_id?: number }) =>
    api.get('/economia/serie', { params }),

  getTopCNAE: (params: { ano?: number; metric?: string; limit?: number; bairro_id?: number; regiao?: string } = {}) =>
    api.get('/economia/cnae/top', { params }),

  exportCSV: (params: { ano?: number; bairro_id?: number; regiao?: string; cnae_id?: number } = {}) =>
    api.get('/economia/export/csv', { params, responseType: 'blob' }),

  getPIB: (params: { ano?: number } = {}) =>
    api.get('/economia/pib', { params }),
};

// ===== ECONOMIA MOCK (CAGED) =====
// Removido: API mock isolada (reversão solicitada)

// Health check
export const healthCheck = () => api.get('/health');

export default api;



