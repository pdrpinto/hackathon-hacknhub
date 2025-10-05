import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import Dashboard from './pages/Dashboard/Dashboard';
import DashboardAlertas from './pages/Alertas/DashboardAlertas';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
  <Route path="/dashboard" element={<Dashboard />} />
  <Route path="/alertas" element={<DashboardAlertas />} />
      </Routes>
    </Router>
  );
}

export default App;



