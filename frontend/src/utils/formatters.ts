/**
 * Utilitários para formatação de dados
 */

/**
 * Formata número com separador de milhares
 */
export const formatNumber = (value: number | null | undefined): string => {
  if (value === null || value === undefined) return '-';
  return value.toLocaleString('pt-BR');
};

/**
 * Formata percentual
 */
export const formatPercent = (value: number | null | undefined, decimals: number = 2): string => {
  if (value === null || value === undefined) return '-';
  return `${value.toFixed(decimals)}%`;
};

/**
 * Formata moeda em Real
 */
export const formatCurrency = (value: number | null | undefined): string => {
  if (value === null || value === undefined) return '-';
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

/**
 * Formata decimal
 */
export const formatDecimal = (value: number | null | undefined, decimals: number = 2): string => {
  if (value === null || value === undefined) return '-';
  return value.toFixed(decimals);
};

/**
 * Formata data
 */
export const formatDate = (date: string | Date): string => {
  if (!date) return '-';
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('pt-BR');
};

/**
 * Formata data e hora
 */
export const formatDateTime = (date: string | Date): string => {
  if (!date) return '-';
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleString('pt-BR');
};

/**
 * Abrevia números grandes (ex: 1000 -> 1K, 1000000 -> 1M)
 */
export const abbreviateNumber = (value: number | null | undefined): string => {
  if (value === null || value === undefined) return '-';
  
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`;
  }
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}K`;
  }
  return value.toString();
};

/**
 * Retorna cor baseada na severidade
 */
export const getSeverityColor = (severidade: 'alta' | 'media' | 'baixa'): string => {
  const colors = {
    alta: '#f44336',
    media: '#ff9800',
    baixa: '#4caf50',
  };
  return colors[severidade] || '#9e9e9e';
};

/**
 * Retorna cor baseada na tendência
 */
export const getTrendColor = (tendencia: 'alta' | 'baixa' | 'estavel'): string => {
  const colors = {
    alta: '#4caf50',
    baixa: '#f44336',
    estavel: '#ff9800',
  };
  return colors[tendencia] || '#9e9e9e';
};

/**
 * Trunca texto com reticências
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
};

/**
 * Calcula variação percentual
 */
export const calculatePercentChange = (oldValue: number, newValue: number): number => {
  if (oldValue === 0) return 0;
  return ((newValue - oldValue) / oldValue) * 100;
};

/**
 * Gera cor aleatória para gráficos
 */
export const generateColors = (count: number): string[] => {
  const baseColors = [
    '#1976d2', '#dc004e', '#4caf50', '#ff9800', '#9c27b0',
    '#00bcd4', '#ff5722', '#607d8b', '#795548', '#3f51b5'
  ];
  
  const colors: string[] = [];
  for (let i = 0; i < count; i++) {
    colors.push(baseColors[i % baseColors.length]);
  }
  return colors;
};

/**
 * Baixa arquivo (blob)
 */
export const downloadFile = (blob: Blob, filename: string): void => {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};



