import React from 'react';
import Sidebar from '../../components/layout/Sidebar';
import Topbar from '../../components/layout/Topbar';
import AuthEllipses from '../../components/common/AuthEllipses';

const mock = Array.from({ length: 12 }).map((_, i) => ({
  id: i+1,
  quando: new Date(Date.now() - i * 3600_000).toLocaleString('pt-BR'),
  usuario: i % 2 === 0 ? 'gestor' : 'analista',
  acao: ['login', 'export_pdf', 'export_csv', 'ajustou_filtro'][i % 4],
  detalhe: ['Login via Gov.br', 'Relatório Economia', 'Relatório Completo', 'Região=Norte'][i % 4],
}));

const Atividade: React.FC = () => {
  return (
    <div className="dashboard-layout">
      <AuthEllipses />
      <Sidebar />
      <div className="content">
        <Topbar />
        <main className="dashboard-main">
          <div className="page-header">
            <h2>Atividade</h2>
            <p className="muted">Histórico de ações recentes no sistema</p>
          </div>

          <div className="card">
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'left', padding: 8 }}>Quando</th>
                  <th style={{ textAlign: 'left', padding: 8 }}>Usuário</th>
                  <th style={{ textAlign: 'left', padding: 8 }}>Ação</th>
                  <th style={{ textAlign: 'left', padding: 8 }}>Detalhe</th>
                </tr>
              </thead>
              <tbody>
                {mock.map(r => (
                  <tr key={r.id}>
                    <td style={{ padding: 8 }}>{r.quando}</td>
                    <td style={{ padding: 8 }}>{r.usuario}</td>
                    <td style={{ padding: 8 }}>{r.acao}</td>
                    <td style={{ padding: 8 }}>{r.detalhe}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Atividade;
