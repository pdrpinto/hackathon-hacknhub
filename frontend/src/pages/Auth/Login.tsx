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

  const handleGovLogin = () => {
    // Fluxo placeholder do Gov.br (OAuth) – troque pela sua rota backend quando disponível
    // Exemplo: window.location.href = '/api/auth/govbr/login'
    const govAuthUrl = 'https://sso.acesso.gov.br/';
    window.open(govAuthUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="auth-page">
      <AuthEllipses />
      
      <AuthCard>
        <div className="auth-header-animated">
          <img
            src={Assets.logo}
            alt="TraceGov"
            className="auth-logo auth-logo-img-giant"
            style={{ height: 160, width: 'auto', objectFit: 'contain', maxWidth: '100%' }}
          />
          <div className="auth-welcome-text">
            <h2 className="auth-welcome-title">Bem-vindo de volta</h2>
            <p className="auth-welcome-subtitle">Entre para acessar sua conta</p>
          </div>
        </div>
        
        <form onSubmit={handleLogin} className="auth-form-animated">
          <div className="form-group form-group-animated">
            <label className="label">Email</label>
            <div className="input-wrapper">
              <span className="input-icon">📧</span>
              <input 
                type="email" 
                className="input input-with-icon" 
                placeholder="seu@email.com"
                required
              />
            </div>
          </div>
          
          <div className="form-group form-group-animated">
            <label className="label">Senha</label>
            <div className="input-wrapper">
              <span className="input-icon">🔒</span>
              <input 
                type="password" 
                className="input input-with-icon" 
                placeholder="••••••••"
                required
              />
            </div>
          </div>
          
          <div className="auth-actions-vertical">
            <button type="submit" className="btn btn-primary-animated">
              <span className="btn-text">Entrar</span>
              <span className="btn-icon">→</span>
            </button>
            
            <div className="divider-with-text">
              <span>ou</span>
            </div>

            {/* Botão Entrar com Gov.br */}
            <button
              type="button"
              className="btn btn-govbr-styled"
              onClick={handleGovLogin}
              aria-label="Entrar com Gov.br"
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 12,
                padding: '12px 16px',
                border: '2px solid #1351B4',
                background: 'linear-gradient(135deg, #EAF2FF 0%, #FFFFFF 100%)',
                color: '#0B2D6B',
                fontWeight: 600,
              }}
            >
              <span style={{ display: 'inline-flex', alignItems: 'center' }}>
                {/* Ícone genérico (shield) com cores Gov.br */}
                <svg
                  className="govbr-logo-svg"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path d="M12 2l7 3v6c0 5-3.8 9-7 11-3.2-2-7-6-7-11V5l7-3z" fill="#1351B4"/>
                  <path d="M12 6a6 6 0 016 6h-2a4 4 0 10-8 0H6a6 6 0 016-6z" fill="#FFD700"/>
                </svg>
              </span>
              <span className="btn-text">Entrar com Gov.br</span>

              {/* Selo verificado */}
              <span
                className="govbr-badge-verified"
                aria-hidden
                style={{
                  position: 'absolute',
                  top: -6,
                  right: -6,
                  width: 24,
                  height: 24,
                  borderRadius: '9999px',
                  background: '#fff',
                  border: '3px solid #28A745',
                  boxShadow: '0 2px 8px rgba(40, 167, 69, 0.35)',
                  display: 'grid',
                  placeItems: 'center',
                  color: '#28A745',
                  fontSize: 14,
                  fontWeight: 800,
                }}
                title="Verificado"
              >
                ✓
              </span>
            </button>
            
            <button 
              type="button" 
              className="btn btn-secondary-animated"
              onClick={() => navigate('/signup')}
            >
              <span className="btn-text">Criar Nova Conta</span>
              <span className="btn-icon">✨</span>
            </button>
          </div>
        </form>
        
        <div className="auth-footer-links auth-footer-animated">
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a href="#" onClick={(e) => e.preventDefault()}>Esqueci a senha</a>
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
