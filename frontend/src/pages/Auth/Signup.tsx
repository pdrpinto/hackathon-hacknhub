import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthEllipses from '../../components/common/AuthEllipses';
import AuthCard from '../../components/common/AuthCard';
import PageTransition from '../../components/PageTransition';
import { Assets } from '../../utils/assets';
import './Signup.css';

const Signup: React.FC = () => {
  const navigate = useNavigate();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // Navega para dashboard sem backend por enquanto
    navigate('/dashboard');
  };

  return (
    <PageTransition>
      <div className="auth-page">
        <AuthEllipses />
        
        <AuthCard>
          <div className="auth-header-animated">
            <img src={Assets.logo} alt="TraceGov" className="auth-logo" />
            <div className="auth-welcome-text">
              <h2 className="auth-welcome-title">Crie sua conta</h2>
              <p className="auth-welcome-subtitle">Preencha os dados para começar</p>
            </div>
          </div>
          
        <form onSubmit={handleSignup} className="auth-form-animated">
          <div className="form-grid">
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
              <label className="label">CPF/CNPJ</label>
              <div className="input-wrapper">
                <span className="input-icon">🆔</span>
                <input 
                  type="text" 
                  className="input input-with-icon" 
                  placeholder="000.000.000-00"
                  required
                />
              </div>
            </div>
            
            <div className="form-group form-group-animated">
              <label className="label">Endereço</label>
              <div className="input-wrapper">
                <span className="input-icon">📍</span>
                <input 
                  type="text" 
                  className="input input-with-icon" 
                  placeholder="Rua, número, cidade"
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
          </div>
          
          <div className="auth-actions-vertical">
            <button type="submit" className="btn btn-primary-animated">
              <span className="btn-text">Criar Conta</span>
              <span className="btn-icon">→</span>
            </button>
            
            <div className="divider-with-text">
              <span>ou</span>
            </div>
            
            <button 
              type="button" 
              className="btn btn-secondary-animated"
              onClick={() => navigate('/login')}
            >
              <span className="btn-text">Já Tenho Conta</span>
              <span className="btn-icon">↩</span>
            </button>
          </div>
        </form>
        
        <div className="auth-footer-links auth-footer-animated">
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a href="#" onClick={(e) => e.preventDefault()}>Privacidade</a>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a href="#" onClick={(e) => e.preventDefault()}>Termos</a>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a href="#" onClick={(e) => e.preventDefault()}>Suporte</a>
        </div>
      </AuthCard>
    </div>
    </PageTransition>
  );
};

export default Signup;
