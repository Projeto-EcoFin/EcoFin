import React from 'react';
import { useNavigate } from 'react-router-dom';
import './RegisterPage.css';
import logoImage from '../assets/logo.png';

const RegisterPage = () => {
  const navigate = useNavigate();

  const handleLoginRedirect = (e) => {
    e.preventDefault(); 
    navigate('/login');
  };

  return (
    <div className="register-container">
       <header className="header">
                        <div className="logo-container">
                         <img src={logoImage} alt="EcoFin Logo" className="logo-image" />
                          <span className="app-name">EcoFin</span>
                        </div>
                        <nav className="navbar">
                        </nav>
                      </header>
      <div className="register-box">
        <h2>Crie sua conta</h2>
        <p>Já possui uma conta? <a href="#" onClick={handleLoginRedirect}>
            Entre aqui
          </a>.</p>

        <form>
          <div className="input-group">
            <label htmlFor="fullName">Nome Completo </label>
            <input type="text" id="fullName" placeholder="Insira seu nome" />
          </div>

          <div className="input-group">
            <label htmlFor="email">E-mail </label>
            <input type="email" id="email" placeholder="Insira seu e-mail" />
          </div>

          <div className="input-group">
            <label htmlFor="password">Senha </label>
            <input type="password" id="password" placeholder="Insira sua senha" />
          </div>

          <div className="input-group">
            <label htmlFor="confirmPassword">Confirme sua senha </label>
            <input type="password" id="confirmPassword" placeholder="Confirme sua senha" />
          </div>

          <div className="terms-checkbox">
            <input type="checkbox" id="terms" />
            <label htmlFor="terms">Eu concordo com os termos de serviço e política de privacidade</label>
          </div>

          <button type="submit" className="register-button">
            Acessar Conta
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;