import React from 'react';
import Sidebar from '../../components/layout/Sidebar';
import Topbar from '../../components/layout/Topbar';
import AuthEllipses from '../../components/common/AuthEllipses';
import MapaInterativo from '../../components/maps/MapaInterativo';
import GlobalFilters from '../../components/common/GlobalFilters';

const Mapas: React.FC = () => {
  return (
    <div className="dashboard-layout">
      <AuthEllipses />
      <Sidebar />
      <div className="content">
        <Topbar />
        <main className="dashboard-main">
          <div className="page-header">
            <h2>Mapas e Geoespacial</h2>
            <p className="muted">Visualize bairros, regiões e indicadores sobre o território</p>
          </div>
          <div className="card" style={{ padding: 0 }}>
            <GlobalFilters compact />
            <MapaInterativo height={600} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Mapas;
