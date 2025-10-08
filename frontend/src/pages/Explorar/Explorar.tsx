import React, { useMemo, useState } from 'react';
import Sidebar from '../../components/layout/Sidebar';
import Topbar from '../../components/layout/Topbar';
import AuthEllipses from '../../components/common/AuthEllipses';
import GlobalFilters from '../../components/common/GlobalFilters';

type Row = { id: number; indicador: string; valor: number; ano: number; area: string };

const mock: Row[] = Array.from({ length: 24 }).map((_, i) => ({
  id: i + 1,
  indicador: ['empresas_ativas', 'empregos_gerados', 'massa_salarial'][i % 3],
  valor: Math.round(Math.random() * 1000),
  ano: 2018 + (i % 6),
  area: ['Economia', 'Saúde', 'Educação'][i % 3],
}));

const Explorar: React.FC = () => {
  const [filtroArea, setFiltroArea] = useState('');
  const [texto, setTexto] = useState('');

  const rows = useMemo(() => {
    return mock.filter(r => (!filtroArea || r.area === filtroArea) && (!texto || r.indicador.includes(texto)));
  }, [filtroArea, texto]);

  return (
    <div className="dashboard-layout">
      <AuthEllipses />
      <Sidebar />
      <div className="content">
        <Topbar />
        <main className="dashboard-main">
          <div className="page-header">
            <h2>Explorar Dados</h2>
            <p className="muted">Busque e filtre indicadores em uma tabela simples</p>
          </div>
          <GlobalFilters compact />

          <div className="card" style={{ marginBottom: 16 }}>
            <div className="filters-row">
              <div>
                <label className="label">Área</label>
                <select className="input" value={filtroArea} onChange={(e) => setFiltroArea(e.target.value)}>
                  <option value="">Todas</option>
                  <option value="Economia">Economia</option>
                  <option value="Saúde">Saúde</option>
                  <option value="Educação">Educação</option>
                </select>
              </div>
              <div>
                <label className="label">Busca</label>
                <input className="input" placeholder="Indicador…" value={texto} onChange={(e) => setTexto(e.target.value)} />
              </div>
            </div>
          </div>

          <div className="card">
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'left', padding: 8 }}>Indicador</th>
                  <th style={{ textAlign: 'right', padding: 8 }}>Valor</th>
                  <th style={{ textAlign: 'center', padding: 8 }}>Ano</th>
                  <th style={{ textAlign: 'left', padding: 8 }}>Área</th>
                </tr>
              </thead>
              <tbody>
                {rows.map(r => (
                  <tr key={r.id}>
                    <td style={{ padding: 8 }}>{r.indicador}</td>
                    <td style={{ padding: 8, textAlign: 'right' }}>{r.valor.toLocaleString('pt-BR')}</td>
                    <td style={{ padding: 8, textAlign: 'center' }}>{r.ano}</td>
                    <td style={{ padding: 8 }}>{r.area}</td>
                  </tr>
                ))}
                {rows.length === 0 && (
                  <tr>
                    <td colSpan={4} style={{ padding: 12, textAlign: 'center' }} className="muted">Nenhum dado encontrado</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Explorar;
