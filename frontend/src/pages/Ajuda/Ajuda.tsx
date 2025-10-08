import React from 'react';
import Sidebar from '../../components/layout/Sidebar';
import Topbar from '../../components/layout/Topbar';
import AuthEllipses from '../../components/common/AuthEllipses';

const Ajuda: React.FC = () => {
  return (
    <div className="dashboard-layout">
      <AuthEllipses />
      <Sidebar />
      <div className="content">
        <Topbar />
        <main className="dashboard-main">
          <div className="page-header">
            <h2>Ajuda e Documentação</h2>
            <p className="muted">Guias rápidos, atalhos e como obter suporte</p>
          </div>

          <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div className="card">
              <h3>Atalhos</h3>
              <ul>
                <li><strong>/</strong> — foco na busca</li>
                <li><strong>G</strong> depois <strong>D</strong> — ir para Dashboard</li>
                <li><strong>G</strong> depois <strong>A</strong> — ir para Alertas</li>
              </ul>
            </div>
            <div className="card">
              <h3>Documentação</h3>
              <p className="muted">Veja os guias na raiz do projeto e na wiki.</p>
              <ul>
                <li>README.md</li>
                <li>FINAL_SUMMARY.md</li>
                <li>VISUAL_GUIDE.md</li>
              </ul>
            </div>
            <div className="card" style={{ gridColumn: '1 / -1' }}>
              <h3>Suporte</h3>
              <p className="muted">Envie um email para suporte@tracegov.gov.br</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Ajuda;
