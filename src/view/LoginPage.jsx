import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css'; 
import logoPImage from '../assets/logoP.png'; 

const EcofinLogoPanel = () => (
    <div className="ecofin-logo-panel">
        <img 
            src={logoPImage} 
            alt="Ecofin Logo" 
            className="revolutionary-logo-image" 
        />
    </div>
);

const LoginPage = () => {
    const navigate = useNavigate();

    const handleRegisterRedirect = (e) => {
        e.preventDefault(); 
        navigate('/register');
    };

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        console.log("Tentativa de Login... (Lógica de autenticação a ser implementada aqui)");
        // Lógica de autenticação com Firebase
    };

    return (
        <div className="split-page-container">
            
            <div className="left-panel">
                <div className="login-box">
                    <h2 className="title">Acesse sua conta</h2>
                    <p className="register-link">
                        Novo cliente? Então 
                        {' '}
                        <a href="#" onClick={handleRegisterRedirect}>
                            registre-se aqui
                        </a>.
                    </p> 
                    <form className="login-form" onSubmit={handleLoginSubmit}>
                        <div className="form-group">
                            <label htmlFor="login">Email </label>
                            <input type="email" id="login" placeholder="Insira seu email" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Senha </label>
                            <input type="password" id="password" placeholder="Insira sua senha" required />
                        </div>
                        <p className="forgot-password">
                            <a href="/forgot-password">Esqueci minha senha</a>
                        </p>
                        <button type="submit" className="login-button">Acessar Conta</button>
                    </form>
                </div>
            </div>
            
            <div className="right-panel">
                <EcofinLogoPanel />
            </div>
        </div>
    );
};

export default LoginPage;
