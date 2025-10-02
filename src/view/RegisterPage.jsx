import React from 'react';
import { useNavigate } from 'react-router-dom';
import './RegisterPage.css';

import logoPImage from '../assets/logoP.png'; 

const EcofinLogoPanel = () => (
    <div className="ecofin-logo-panel">
        <img 
            src={logoPImage} 
            alt="Ecofin - O Futuro Financeiro" 
            className="revolutionary-logo-image" 
        />
    </div>
);


const RegisterPage = () => {
  const navigate = useNavigate();

  const handleLoginRedirect = (e) => {
    e.preventDefault();
    navigate('/login');
  };

  return (
    <div className="split-page-container">
        
        <div className="left-panel">
            <div className="register-box">
                <h2 className="title">Crie sua conta</h2>
                <p className="register-link">
                    Já possui uma conta?{" "}
                    <a href="#" onClick={handleLoginRedirect}>
                        Entre aqui
                    </a>.
                </p>

                <form>
                    <div className="form-group"> 
                        <label htmlFor="fullName">Nome Completo </label>
                        <input type="text" id="fullName" placeholder="Insira seu nome" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">E-mail </label>
                        <input type="email" id="email" placeholder="Insira seu e-mail" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Senha </label>
                        <input type="password" id="password" placeholder="Insira sua senha" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirme sua senha </label>
                        <input type="password" id="confirmPassword" placeholder="Confirme sua senha" />
                    </div>

                    <div className="terms-checkbox">
                        <input type="checkbox" id="terms" />
                        <label htmlFor="terms">
                            Eu concordo com os termos de serviço e política de privacidade
                        </label>
                    </div>

                    <button type="submit" className="login-button"> 
                        Registrar Conta
                    </button>
                </form>
            </div>
        </div>
        <div className="right-panel">
            <EcofinLogoPanel />
        </div>
    </div>
  );
};

export default RegisterPage;