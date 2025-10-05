import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthEllipses from '../../components/common/AuthEllipses';
import AuthCard from '../../components/common/AuthCard';
import { Assets } from '../../utils/assets';
import './Login.css';

const Login: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Navega para dashboard sem backend por enquanto
    navigate('/dashboard');
  };

  return (
    <div className="auth-page">
      <AuthEllipses />
      
      <AuthCard>
        <img src={Assets.logo} alt="TraceGov" className="auth-logo" />
        
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label className="label">Email</label>
            <input 
              type="email" 
              className="input" 
              placeholder="seu@email.com"
              required
            />
          </div>
          
          <div className="form-group">
            <label className="label">Senha</label>
            <input 
              type="password" 
              className="input" 
              placeholder="••••••••"
              required
            />
          </div>
          
          <div className="divider"></div>
          
          <div className="auth-button-row">
            <div className="line"></div>
            <button type="submit" className="btn">Entrar</button>
            <div className="line"></div>
          </div>
        </form>
        
        <div className="auth-footer-links">
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a href="#" onClick={(e) => e.preventDefault()}>Esqueci a senha</a>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a href="#" onClick={(e) => { e.preventDefault(); navigate('/signup'); }}>Cadastrar</a>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a href="#" onClick={(e) => e.preventDefault()}>Privacidade</a>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a href="#" onClick={(e) => e.preventDefault()}>Termos</a>
        </div>
      </AuthCard>
    </div>
  );
};

export default Login;
