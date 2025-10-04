import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Box } from '@mui/material';
import Layout from './components/layout/Layout';
import DashboardGestao from './pages/Gestao/DashboardGestao';
import DashboardTecnico from './pages/Tecnico/DashboardTecnico';
import DashboardPublico from './pages/PublicoInterno/DashboardPublico';
import DashboardEconomia from './pages/Economia/DashboardEconomia';

function App() {
  return (
    <Router>
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        <Layout>
          <Routes>
            <Route path="/" element={<Navigate to="/gestao" replace />} />
            <Route path="/gestao" element={<DashboardGestao />} />
            <Route path="/tecnico" element={<DashboardTecnico />} />
            <Route path="/publico" element={<DashboardPublico />} />
            <Route path="/economia" element={<DashboardEconomia />} />
          </Routes>
        </Layout>
      </Box>
    </Router>
  );
}

export default App;



