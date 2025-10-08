import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import Dashboard from './pages/Dashboard/Dashboard';
import Alertas from './pages/Alertas/Alertas';
import Mapas from './pages/Mapas/Mapas';
import Predicoes from './pages/Predicoes/Predicoes';
import Relatorios from './pages/Relatorios/Relatorios';
import Explorar from './pages/Explorar/Explorar';
import Config from './pages/Config/Config';
import Atividade from './pages/Atividade/Atividade';
import Favoritos from './pages/Favoritos/Favoritos';
import Ajuda from './pages/Ajuda/Ajuda';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/alertas" element={<Alertas />} />
        <Route path="/mapas" element={<Mapas />} />
        <Route path="/predicoes" element={<Predicoes />} />
        <Route path="/relatorios" element={<Relatorios />} />
        <Route path="/explorar" element={<Explorar />} />
        <Route path="/config" element={<Config />} />
        <Route path="/atividade" element={<Atividade />} />
        <Route path="/favoritos" element={<Favoritos />} />
        <Route path="/ajuda" element={<Ajuda />} />
      </Routes>
    </Router>
  );
}

export default App;



