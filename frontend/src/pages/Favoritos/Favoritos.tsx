import React from 'react';
import Sidebar from '../../components/layout/Sidebar';
import Topbar from '../../components/layout/Topbar';
import AuthEllipses from '../../components/common/AuthEllipses';

const Favoritos: React.FC = () => {
  const cards = [
    { id: 1, titulo: 'KPIs — Economia', desc: 'Visão com KPIs e filtros Norte' },
    { id: 2, titulo: 'Mapa — Indústria', desc: 'Camada por setor industrial' },
    { id: 3, titulo: 'Relatório — Mensal', desc: 'Exportação automática todo mês' },
  ];

  return (
    <div className="dashboard-layout">
      <AuthEllipses />
      <Sidebar />
      <div className="content">
        <Topbar />
        <main className="dashboard-main">
          <div className="page-header">
            <h2>Favoritos</h2>
            <p className="muted">Acesse rapidamente suas visões salvas</p>
          </div>

          <div className="grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
            {cards.map(c => (
              <div className="card" key={c.id}>
                <h3>{c.titulo}</h3>
                <p className="muted">{c.desc}</p>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button className="btn-action">Abrir</button>
                  <button className="btn-action">Compartilhar</button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Favoritos;
