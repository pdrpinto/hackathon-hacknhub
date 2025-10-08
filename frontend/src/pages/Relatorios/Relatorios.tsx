import React, { useState } from 'react';
import Sidebar from '../../components/layout/Sidebar';
import Topbar from '../../components/layout/Topbar';
import AuthEllipses from '../../components/common/AuthEllipses';
import { exportacaoAPI } from '../../services/api';
import { downloadBlob } from '../../utils/download';
import GlobalFilters from '../../components/common/GlobalFilters';

const Relatorios: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const handleExport = async (formato: 'pdf' | 'csv') => {
    try {
      setLoading(true);
      setMsg(null);
      const res = await exportacaoAPI.exportarRelatorioCompleto(new Date().getFullYear(), formato);
      const filename = `relatorio_${new Date().toISOString().slice(0,10)}.${formato}`;
      downloadBlob(res.data as Blob, filename);
      setMsg(`Exportado: ${filename}`);
    } catch (e: any) {
      setMsg('Falha ao exportar relatório.');
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-layout">
      <AuthEllipses />
      <Sidebar />
      <div className="content">
        <Topbar />
        <main className="dashboard-main">
          <div className="page-header">
            <h2>Relatórios</h2>
            <p className="muted">Gere relatórios completos em PDF ou CSV</p>
          </div>
          <GlobalFilters compact />

          <div className="card" style={{ display: 'flex', gap: 12 }}>
            <button className="btn-action" onClick={() => handleExport('pdf')} disabled={loading}>📄 Exportar PDF</button>
            <button className="btn-action" onClick={() => handleExport('csv')} disabled={loading}>🧾 Exportar CSV</button>
            {msg && <span className="muted">{msg}</span>}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Relatorios;
