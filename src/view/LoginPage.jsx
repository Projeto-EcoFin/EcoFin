import React from 'react';
import './LoginPage.css';

const LoginPage = () => {
    return (
        <div className="login-page">
            <header className="header">
                <img src="/logo-path.png" alt="EcoFin Logo" className="logo" />
                <h1 className="app-name">EcoFin</h1>
            </header>
            <main className="login-container">
                <div className="login-box">
                    <h2 className="title">Acesse sua conta</h2>
                    <p className="register-link">
                        Novo cliente? Então <a href="/register">registre-se aqui.</a>
                    </p>
                    <form className="login-form">
                        <div className="form-group">
                            <label htmlFor="login">Login *</label>
                            <input type="text" id="login" placeholder="Insira seu login ou email" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Senha *</label>
                            <input type="password" id="password" placeholder="Insira sua senha" />
                        </div>
                        <p className="forgot-password">
                            <a href="/forgot-password">Esqueci minha senha</a>
                        </p>
                        <button type="submit" className="login-button">Acessar Conta</button>
                    </form>
                    <div className="social-login">
                        <p>Ou faça login com</p>
                        <div className="social-icons">
                            {/* Ícones do Google e Facebook */}
                            <img src="/google-icon-path.png" alt="Login com Google" />
                            <img src="/facebook-icon-path.png" alt="Login com Facebook" />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default LoginPage;