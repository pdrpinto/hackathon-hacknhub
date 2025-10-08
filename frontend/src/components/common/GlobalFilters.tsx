import React from 'react';
import { useFiltersStore } from '../../store/filters';

interface Props {
  compact?: boolean;
}

const GlobalFilters: React.FC<Props> = ({ compact = false }) => {
  const { ano, ano_inicio, ano_fim, regiao, bairro_id, setAno, setPeriodo, setRegiao, setBairroId, reset } = useFiltersStore();
  return (
    <div className="card" style={{ marginBottom: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: compact ? 'repeat(3, minmax(160px, 1fr))' : 'repeat(5, minmax(140px, 1fr))', gap: 12 }}>
        <div>
          <label className="label">Ano</label>
          <input className="input" type="number" value={ano ?? ''} onChange={(e) => setAno(Number(e.target.value) || undefined)} />
        </div>
        <div>
          <label className="label">Início</label>
          <input className="input" type="number" value={ano_inicio ?? ''} onChange={(e) => setPeriodo(Number(e.target.value) || undefined, ano_fim)} />
        </div>
        <div>
          <label className="label">Fim</label>
          <input className="input" type="number" value={ano_fim ?? ''} onChange={(e) => setPeriodo(ano_inicio, Number(e.target.value) || undefined)} />
        </div>
        {!compact && (
          <>
            <div>
              <label className="label">Região</label>
              <select className="input" value={regiao} onChange={(e) => { setRegiao(e.target.value as any); setBairroId(undefined); }}>
                <option value="">Todas</option>
                <option value="Centro">Centro</option>
                <option value="Norte">Norte</option>
                <option value="Sul">Sul</option>
                <option value="Leste">Leste</option>
                <option value="Oeste">Oeste</option>
              </select>
            </div>
            <div>
              <label className="label">Bairro</label>
              <input className="input" placeholder="ID do bairro" value={bairro_id ?? ''} onChange={(e) => setBairroId(e.target.value ? Number(e.target.value) : undefined)} />
            </div>
          </>
        )}
      </div>
      <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
        <button className="btn-action" onClick={reset}>Limpar</button>
      </div>
    </div>
  );
};

export default GlobalFilters;
