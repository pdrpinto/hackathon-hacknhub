import React, { useState } from 'react';
import Sidebar from '../../components/layout/Sidebar';
import Topbar from '../../components/layout/Topbar';
import AuthEllipses from '../../components/common/AuthEllipses';

const Config: React.FC = () => {
  const [tema, setTema] = useState<'claro' | 'escuro'>('escuro');
  const [email, setEmail] = useState('gestor@prefeitura.gov.br');
  const [notificacoes, setNotificacoes] = useState(true);

  return (
    <div className="dashboard-layout">
      <AuthEllipses />
      <Sidebar />
      <div className="content">
        <Topbar />
        <main className="dashboard-main">
          <div className="page-header">
            <h2>Configurações</h2>
            <p className="muted">Preferências do usuário e integrações</p>
          </div>

          <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div className="card">
              <h3>Perfil</h3>
              <div className="form-group">
                <label className="label">E-mail</label>
                <input className="input" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="form-group">
                <label className="label">Notificações</label>
                <label style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                  <input type="checkbox" checked={notificacoes} onChange={(e) => setNotificacoes(e.target.checked)} />
                  Habilitar notificações por e-mail
                </label>
              </div>
              <button className="btn-action">Salvar</button>
            </div>

            <div className="card">
              <h3>Aparência</h3>
              <div className="form-group">
                <label className="label">Tema</label>
                <select className="input" value={tema} onChange={(e) => setTema(e.target.value as any)}>
                  <option value="escuro">Escuro</option>
                  <option value="claro">Claro</option>
                </select>
              </div>
            </div>

            <div className="card" style={{ gridColumn: '1 / -1' }}>
              <h3>Integrações</h3>
              <div className="grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
                <div className="card" style={{ padding: 12 }}>
                  <strong>Gov.br</strong>
                  <p className="muted">Login unificado pela conta Gov.br</p>
                  <button className="btn-action">Configurar</button>
                </div>
                <div className="card" style={{ padding: 12 }}>
                  <strong>Webhooks</strong>
                  <p className="muted">Notifique sistemas externos</p>
                  <button className="btn-action">Gerenciar</button>
                </div>
                <div className="card" style={{ padding: 12 }}>
                  <strong>Exportações</strong>
                  <p className="muted">Relatórios automáticos</p>
                  <button className="btn-action">Agendar</button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Config;
