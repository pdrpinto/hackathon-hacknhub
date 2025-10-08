import React, { useEffect, useMemo, useState } from 'react';
import Sidebar from '../../components/layout/Sidebar';
import Topbar from '../../components/layout/Topbar';
import AuthEllipses from '../../components/common/AuthEllipses';
import { predicoesAPI } from '../../services/api';
import GlobalFilters from '../../components/common/GlobalFilters';
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, AreaChart, Area, Legend } from 'recharts';

type Serie = Array<{ ano: number; valor: number }>;

const Predicoes: React.FC = () => {
  const [pop, setPop] = useState<Serie>([]);
  const [edu, setEdu] = useState<Serie>([]);
  const [saude, setSaude] = useState<Serie>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setErro(null);
        const [p, e, s] = await Promise.all([
          predicoesAPI.preverPopulacao(5),
          predicoesAPI.preverEducacao(5),
          predicoesAPI.preverSaude(5)
        ]);
        setPop(p.data?.serie || []);
        setEdu(e.data?.serie || []);
        setSaude(s.data?.serie || []);
      } catch (err: any) {
        // Fallback amigável quando o backend não está disponível
        const anoBase = new Date().getFullYear();
        const mk = (base: number) => Array.from({ length: 6 }).map((_, i) => ({ ano: anoBase + i, valor: Math.round(base * Math.pow(1.03, i)) }));
        setPop(mk(280000));
        setEdu(mk(50000));
        setSaude(mk(120000));
        setErro('Não foi possível carregar as predições do backend. Exibindo projeções simuladas.');
      } finally {
        setCarregando(false);
      }
    };
    load();
  }, []);

  const popData = useMemo(() => pop.map(p => ({ x: p.ano, y: p.valor })), [pop]);
  const eduData = useMemo(() => edu.map(p => ({ x: p.ano, y: p.valor })), [edu]);
  const saudeData = useMemo(() => saude.map(p => ({ x: p.ano, y: p.valor })), [saude]);

  return (
    <div className="dashboard-layout">
      <AuthEllipses />
      <Sidebar />
      <div className="content">
        <Topbar />
        <main className="dashboard-main">
          <div className="page-header">
            <h2>Predições</h2>
            <p className="muted">Projeções para os próximos anos com base nas séries históricas</p>
          </div>
          <GlobalFilters compact />
          {erro && (
            <div className="alert-banner" style={{ background: 'linear-gradient(135deg, #ff6b6b 0%, #ffa8a8 100%)' }}>
              ⚠️ {erro}
            </div>
          )}

          <div className="grid charts-grid">
            <div className="card chart-card">
              <h3>População Projetada</h3>
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={popData}>
                  <defs>
                    <linearGradient id="gradPop" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2EA1FF" stopOpacity={0.35}/>
                      <stop offset="95%" stopColor="#2EA1FF" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(10, 42, 65, 0.1)" />
                  <XAxis dataKey="x" stroke="#0B2239" />
                  <YAxis stroke="#0B2239" />
                  <Tooltip contentStyle={{ background: 'rgba(10, 37, 65, 0.95)', border: 'none', borderRadius: 12, color: '#E6EEF6' }} />
                  <Area type="monotone" dataKey="y" stroke="#2EA1FF" strokeWidth={2.5} fill="url(#gradPop)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="card chart-card">
              <h3>Educação (Taxa de Matrículas)</h3>
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={eduData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(10, 42, 65, 0.1)" />
                  <XAxis dataKey="x" stroke="#0B2239" />
                  <YAxis stroke="#0B2239" />
                  <Tooltip contentStyle={{ background: 'rgba(10, 37, 65, 0.95)', border: 'none', borderRadius: 12, color: '#E6EEF6' }} />
                  <Legend />
                  <Line type="monotone" dataKey="y" name="Matrículas" stroke="#7CDE76" strokeWidth={3} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="card chart-card">
              <h3>Saúde (Atendimentos)</h3>
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={saudeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(10, 42, 65, 0.1)" />
                  <XAxis dataKey="x" stroke="#0B2239" />
                  <YAxis stroke="#0B2239" />
                  <Tooltip contentStyle={{ background: 'rgba(10, 37, 65, 0.95)', border: 'none', borderRadius: 12, color: '#E6EEF6' }} />
                  <Line type="monotone" dataKey="y" name="Atendimentos" stroke="#FFB703" strokeWidth={3} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Predicoes;
