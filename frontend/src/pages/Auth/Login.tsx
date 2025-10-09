import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthEllipses from '../../components/common/AuthEllipses';
import AuthCard from '../../components/common/AuthCard';
import PageTransition from '../../components/PageTransition';
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
    // Funcionalidade em desenvolvimento
    alert('🔒 Em Breve!\n\nA integração com Gov.br está em desenvolvimento.\nPor enquanto, use o login tradicional.');
  };

  return (
    <PageTransition>
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
                opacity: 0.7,
                cursor: 'not-allowed',
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

              {/* Badge Em Breve com Cadeado */}
              <span
                className="govbr-badge-soon"
                aria-hidden
                style={{
                  position: 'absolute',
                  top: -10,
                  right: -10,
                  padding: '4px 10px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                  border: '2px solid #fff',
                  boxShadow: '0 4px 12px rgba(255, 215, 0, 0.5)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                  color: '#0A2541',
                  fontSize: 11,
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}
                title="Funcionalidade em desenvolvimento"
              >
                🔒 Em Breve
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
    </PageTransition>
  );
};

export default Login;
