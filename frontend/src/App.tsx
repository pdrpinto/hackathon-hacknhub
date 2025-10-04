import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Box } from '@mui/material';
import Layout from './components/layout/Layout';
import DashboardEconomia from './pages/Economia/DashboardEconomia';

function App() {
  return (
    <Router>
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        <Layout>
          <Routes>
            <Route path="/" element={<Navigate to="/economia" replace />} />
            <Route path="/economia" element={<DashboardEconomia />} />
          </Routes>
        </Layout>
      </Box>
    </Router>
  );
}

export default App;



