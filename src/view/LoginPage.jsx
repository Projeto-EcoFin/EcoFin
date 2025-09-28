import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';
import logoImage from '../assets/logo.png'; 

const LoginPage = () => {
    const navigate = useNavigate();

    // Função para navegar para a página de registro
    const handleRegisterRedirect = (e) => {
        e.preventDefault(); 
        navigate('/register');
    };

    return (
        <div className="login-page">
            <header className="header">
                <div className="logo-container">
                    <img src={logoImage} alt="EcoFin Logo" className="logo-image" />
                    <span className="app-name">EcoFin</span>
                </div>
                <nav className="navbar">
                </nav>
            </header>
            
            <main className="login-container">
                <div className="login-box">
                    <h2 className="title">Acesse sua conta</h2>
                    <p className="register-link">
                        Novo cliente? Então 
                        {' '}
                        <a href="#" onClick={handleRegisterRedirect}>
                            registre-se aqui
                        </a>.
                    </p> 
                    <form className="login-form">
                        <div className="form-group">
                            <label htmlFor="login">Login </label>
                            <input type="text" id="login" placeholder="Insira seu email" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Senha </label>
                            <input type="password" id="password" placeholder="Insira sua senha" />
                        </div>
                        <p className="forgot-password">
                            <a href="/forgot-password">Esqueci minha senha</a>
                        </p>
                        <button type="submit" className="login-button">Acessar Conta</button>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default LoginPage;
