import React, { useState, useRef, useEffect } from 'react';
import Sidebar from '../../components/layout/Sidebar';
import Topbar from '../../components/layout/Topbar';
import AuthEllipses from '../../components/common/AuthEllipses';
import { BAIRROS_FOZ, KPIS_FOZ, TOP_SETORES_FOZ, ALERTAS_FOZ } from '../../data/fozDoIguacu';
import { gsap } from 'gsap';
import '../Dashboard/Dashboard.css';
import './Relatorios.css';

type TipoRelatorio = 'executivo' | 'completo' | 'setor' | 'regional' | 'anual';
type FormatoExport = 'pdf' | 'excel' | 'csv' | 'ppt';

const Relatorios: React.FC = () => {
  const [tipoSelecionado, setTipoSelecionado] = useState<TipoRelatorio>('executivo');
  const [formatoSelecionado, setFormatoSelecionado] = useState<FormatoExport>('pdf');
  const [gerandoRelatorio, setGerandoRelatorio] = useState(false);
  const [progresso, setProgresso] = useState(0);
  const [periodoInicio, setPeriodoInicio] = useState('2023-01');
  const [periodoFim, setPeriodoFim] = useState('2023-12');
  const [setorFiltro, setSetorFiltro] = useState<string>('todos');
  const [bairroFiltro, setBairroFiltro] = useState<string>('todos');

  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardsRef.current) {
      const cards = cardsRef.current.querySelectorAll('.relatorio-template-card');
      gsap.fromTo(
        cards,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: 'power3.out' }
      );
    }
  }, []);

  const templates = {
    executivo: {
      nome: 'Relatório Executivo',
      desc: 'Resumo estratégico com KPIs principais, tendências e recomendações para gestão.',
      icone: '📊',
      paginas: '4-6 páginas',
      tempo: '2 min',
      secoes: ['KPIs Gerais', 'Top Setores', 'Alertas Críticos', 'Recomendações'],
    },
    completo: {
      nome: 'Relatório Completo',
      desc: 'Análise detalhada com todos os indicadores, gráficos, tabelas e dados históricos.',
      icone: '📄',
      paginas: '20-30 páginas',
      tempo: '5 min',
      secoes: ['Indicadores', 'Demografia', 'Economia', 'Turismo', 'Infraestrutura', 'Saúde', 'Educação'],
    },
    setor: {
      nome: 'Análise Setorial',
      desc: 'Foco em setor econômico específico com empresas, empregos, crescimento e projeções.',
      icone: '🏢',
      paginas: '8-12 páginas',
      tempo: '3 min',
      secoes: ['Perfil do Setor', 'Top Empresas', 'Empregos', 'Crescimento', 'Predições'],
    },
    regional: {
      nome: 'Análise Regional',
      desc: 'Comparativo entre bairros e regiões com mapas, densidade populacional e distribuição.',
      icone: '🗺️',
      paginas: '10-15 páginas',
      tempo: '4 min',
      secoes: ['Mapas', 'Bairros', 'Densidade', 'Renda', 'Infraestrutura'],
    },
    anual: {
      nome: 'Consolidado Anual',
      desc: 'Balanço completo do ano com evolução de indicadores, comparativos e perspectivas.',
      icone: '📅',
      paginas: '15-25 páginas',
      tempo: '6 min',
      secoes: ['Balanço Anual', 'Evolução', 'Comparativos', 'Metas', 'Perspectivas 2024'],
    },
  };

  const exportToCSV = (data: any[], filename: string) => {
    if (data.length === 0) return;
    
    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(','),
      ...data.map(row => 
        headers.map(header => {
          const value = row[header];
          // Escape commas and quotes in values
          if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
            return `"${value.replace(/"/g, '""')}"`;
          }
          return value;
        }).join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  };

  const gerarCSV = () => {
    const timestamp = new Date().toISOString().slice(0, 10);
    
    switch (tipoSelecionado) {
      case 'executivo':
        // Export KPIs
        const kpisData = [{
          Indicador: 'População Total',
          Valor: KPIS_FOZ.populacao_total,
          Unidade: 'habitantes'
        }, {
          Indicador: 'Empresas Ativas',
          Valor: KPIS_FOZ.empresas_ativas,
          Unidade: 'empresas'
        }, {
          Indicador: 'Turistas por Ano',
          Valor: KPIS_FOZ.turistas_ano,
          Unidade: 'visitantes'
        }, {
          Indicador: 'IDH',
          Valor: KPIS_FOZ.idh,
          Unidade: 'índice'
        }, {
          Indicador: 'PIB per Capita',
          Valor: KPIS_FOZ.pib_per_capita,
          Unidade: 'R$'
        }, {
          Indicador: 'Empregos Turismo',
          Valor: KPIS_FOZ.empregos_turismo,
          Unidade: 'empregos'
        }];
        exportToCSV(kpisData, `relatorio_executivo_foz_${timestamp}.csv`);
        break;

      case 'completo':
        // Export all bairros with all indicators
        const bairrosCompleto = BAIRROS_FOZ.map(b => ({
          Bairro: b.nome,
          Região: b.regiao,
          População: b.populacao,
          'Empresas Ativas': b.empresas_ativas,
          'Renda Média': b.renda_media,
          'Score Turismo': b.turismo_score || 0,
          Latitude: b.lat,
          Longitude: b.lng
        }));
        exportToCSV(bairrosCompleto, `relatorio_completo_foz_${timestamp}.csv`);
        break;

      case 'setor':
        // Export sectors data
        const setoresData = TOP_SETORES_FOZ
          .filter(s => setorFiltro === 'todos' || s.setor === setorFiltro)
          .map(s => ({
            Setor: s.setor,
            'Empresas Ativas': s.empresas,
            'Crescimento Anual': s.crescimento + '%'
          }));
        exportToCSV(setoresData, `relatorio_setorial_foz_${timestamp}.csv`);
        break;

      case 'regional':
        // Export regional/bairros data
        const bairrosData = BAIRROS_FOZ
          .filter(b => bairroFiltro === 'todos' || b.nome === bairroFiltro)
          .map(b => ({
            Bairro: b.nome,
            Região: b.regiao,
            População: b.populacao,
            'Empresas Ativas': b.empresas_ativas,
            'Renda Média (R$)': b.renda_media,
            'Score Turismo': b.turismo_score || 0
          }));
        exportToCSV(bairrosData, `relatorio_regional_foz_${timestamp}.csv`);
        break;

      case 'anual':
        // Export annual consolidated data
        const anualData = [{
          Ano: '2023',
          População: KPIS_FOZ.populacao_total,
          'Empresas Ativas': KPIS_FOZ.empresas_ativas,
          'Turistas': KPIS_FOZ.turistas_ano,
          IDH: KPIS_FOZ.idh,
          'PIB per Capita': KPIS_FOZ.pib_per_capita,
          'Empregos Turismo': KPIS_FOZ.empregos_turismo,
          'Total Bairros': BAIRROS_FOZ.length,
          'Alertas Ativos': ALERTAS_FOZ.length
        }];
        exportToCSV(anualData, `relatorio_anual_foz_${timestamp}.csv`);
        break;

      default:
        break;
    }
  };

  const handleGerarRelatorio = async () => {
    setGerandoRelatorio(true);
    setProgresso(0);

    const interval = setInterval(() => {
      setProgresso(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setGerandoRelatorio(false);
            setProgresso(0);
            
            // If CSV format, generate and download real CSV file
            if (formatoSelecionado === 'csv') {
              gerarCSV();
            } else {
              alert(`✅ Relatório ${templates[tipoSelecionado].nome} gerado com sucesso!\n\nFormato: ${formatoSelecionado.toUpperCase()}\nPeríodo: ${periodoInicio} a ${periodoFim}\n\nEm produção, o arquivo seria baixado automaticamente.`);
            }
          }, 500);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const templateAtual = templates[tipoSelecionado];

  const estatisticasRelatorios = {
    gerados_mes: 48,
    downloads: 152,
    compartilhados: 23,
    favoritos: 12,
  };

  return (
    <div className="dashboard-layout">
      <AuthEllipses />
      <Sidebar />
      
      <div className="content">
        <Topbar />
        
        <main className="dashboard-main">
          <div className="page-header" style={{ marginBottom: '24px' }}>
            <div>
              <h2 style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                📄 Central de Relatórios
              </h2>
              <p className="muted">
                Gere relatórios personalizados em múltiplos formatos com dados atualizados de Foz do Iguaçu
              </p>
            </div>
          </div>

          <div className="stats-relatorios-grid">
            <div className="stat-relatorio">
              <div className="stat-icon">📊</div>
              <div>
                <div className="stat-label">Gerados este mês</div>
                <div className="stat-value">{estatisticasRelatorios.gerados_mes}</div>
              </div>
            </div>
            <div className="stat-relatorio">
              <div className="stat-icon">📥</div>
              <div>
                <div className="stat-label">Total de Downloads</div>
                <div className="stat-value">{estatisticasRelatorios.downloads}</div>
              </div>
            </div>
            <div className="stat-relatorio">
              <div className="stat-icon">🔗</div>
              <div>
                <div className="stat-label">Compartilhamentos</div>
                <div className="stat-value">{estatisticasRelatorios.compartilhados}</div>
              </div>
            </div>
            <div className="stat-relatorio">
              <div className="stat-icon">⭐</div>
              <div>
                <div className="stat-label">Favoritos</div>
                <div className="stat-value">{estatisticasRelatorios.favoritos}</div>
              </div>
            </div>
          </div>

          <div className="card" style={{ padding: '32px', marginBottom: '24px' }}>
            <h3 style={{ marginBottom: '20px', color: '#0A2541' }}>📋 Escolha o Tipo de Relatório</h3>
            <div ref={cardsRef} className="relatorios-templates-grid">
              {(Object.keys(templates) as TipoRelatorio[]).map((key) => {
                const template = templates[key];
                const isActive = tipoSelecionado === key;
                return (
                  <div
                    key={key}
                    className={`relatorio-template-card ${isActive ? 'active' : ''}`}
                    onClick={() => setTipoSelecionado(key)}
                  >
                    <div className="template-icon">{template.icone}</div>
                    <h4>{template.nome}</h4>
                    <p>{template.desc}</p>
                    <div className="template-meta">
                      <span>📄 {template.paginas}</span>
                      <span>⏱️ {template.tempo}</span>
                    </div>
                    <div className="template-secoes">
                      {template.secoes.slice(0, 3).map((secao, idx) => (
                        <span key={idx} className="secao-badge">{secao}</span>
                      ))}
                      {template.secoes.length > 3 && (
                        <span className="secao-badge">+{template.secoes.length - 3} mais</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', marginBottom: '24px' }}>
            <div className="card config-card">
              <h3>⚙️ Configurações</h3>
              <div className="config-group">
                <label>📅 Período</label>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <input 
                    type="month" 
                    value={periodoInicio}
                    onChange={(e) => setPeriodoInicio(e.target.value)}
                    className="input-config"
                  />
                  <span>até</span>
                  <input 
                    type="month" 
                    value={periodoFim}
                    onChange={(e) => setPeriodoFim(e.target.value)}
                    className="input-config"
                  />
                </div>
              </div>

              {tipoSelecionado === 'setor' && (
                <div className="config-group">
                  <label>🏢 Setor Específico</label>
                  <select 
                    value={setorFiltro}
                    onChange={(e) => setSetorFiltro(e.target.value)}
                    className="input-config"
                  >
                    <option value="todos">Todos os Setores</option>
                    {TOP_SETORES_FOZ.map((setor, idx) => (
                      <option key={idx} value={setor.setor}>{setor.setor}</option>
                    ))}
                  </select>
                </div>
              )}

              {tipoSelecionado === 'regional' && (
                <div className="config-group">
                  <label>📍 Bairro/Região</label>
                  <select 
                    value={bairroFiltro}
                    onChange={(e) => setBairroFiltro(e.target.value)}
                    className="input-config"
                  >
                    <option value="todos">Todos os Bairros</option>
                    {BAIRROS_FOZ.map((bairro) => (
                      <option key={bairro.id} value={bairro.nome}>{bairro.nome}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            <div className="card config-card">
              <h3>💾 Formato de Exportação</h3>
              <div className="formato-buttons">
                {(['pdf', 'excel', 'csv', 'ppt'] as FormatoExport[]).map((formato) => (
                  <button
                    key={formato}
                    className={`btn-formato ${formatoSelecionado === formato ? 'active' : ''}`}
                    onClick={() => setFormatoSelecionado(formato)}
                  >
                    {formato === 'pdf' && '📄'}
                    {formato === 'excel' && '📊'}
                    {formato === 'csv' && '📋'}
                    {formato === 'ppt' && '📽️'}
                    <span>{formato.toUpperCase()}</span>
                  </button>
                ))}
              </div>
              <div style={{ marginTop: '16px', padding: '12px', background: 'rgba(25, 118, 210, 0.08)', borderRadius: '10px', fontSize: '13px', color: 'var(--color-text-medium)' }}>
                <strong>Formato selecionado:</strong> {formatoSelecionado.toUpperCase()} - {
                  formatoSelecionado === 'pdf' ? 'Documento portátil, ideal para impressão'
                  : formatoSelecionado === 'excel' ? 'Planilha editável com gráficos'
                  : formatoSelecionado === 'csv' ? 'Dados brutos para análise'
                  : 'Apresentação visual para reuniões'
                }
              </div>
            </div>
          </div>

          <div className="card preview-card">
            <h3>👁️ Preview do Relatório</h3>
            <div className="preview-content">
              <div className="preview-header">
                <div className="preview-logo">
                  <span style={{ fontSize: '48px' }}>{templateAtual.icone}</span>
                </div>
                <div className="preview-title">
                  <h2>{templateAtual.nome}</h2>
                  <p>Foz do Iguaçu - PR | Período: {periodoInicio} a {periodoFim}</p>
                </div>
              </div>
              <div className="preview-secoes">
                <h4>📑 Seções Incluídas:</h4>
                <div className="secoes-list">
                  {templateAtual.secoes.map((secao, idx) => (
                    <div key={idx} className="secao-item">
                      <span className="secao-numero">{idx + 1}</span>
                      <span>{secao}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="preview-dados">
                <h4>📊 Dados Contemplados:</h4>
                <div className="dados-badges">
                  <span className="dado-badge">👥 {KPIS_FOZ.populacao_total.toLocaleString('pt-BR')} habitantes</span>
                  <span className="dado-badge">🏢 {KPIS_FOZ.empresas_ativas.toLocaleString('pt-BR')} empresas</span>
                  <span className="dado-badge">🎭 {(KPIS_FOZ.turistas_ano / 1000000).toFixed(2)}M turistas/ano</span>
                  <span className="dado-badge">⚠️ {ALERTAS_FOZ.length} alertas ativos</span>
                  <span className="dado-badge">📍 {BAIRROS_FOZ.length} bairros</span>
                  <span className="dado-badge">💼 {TOP_SETORES_FOZ.length} setores</span>
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '32px' }}>
            <button
              className="btn-gerar-relatorio"
              onClick={handleGerarRelatorio}
              disabled={gerandoRelatorio}
            >
              {gerandoRelatorio ? (
                <>
                  <div className="spinner"></div>
                  Gerando... {progresso}%
                </>
              ) : (
                <>
                  ⚡ Gerar Relatório {templateAtual.nome}
                </>
              )}
            </button>
          </div>

          {gerandoRelatorio && (
            <div className="progress-bar-container">
              <div className="progress-bar" style={{ width: `${progresso}%` }}></div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Relatorios;

