
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/AuthService';
import './LoginPage.css'; 

import logoImage from '../assets/logoP.png'; // <-- Caminho relativo correto

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); 

        try {
            const userProfile = await loginUser(email, password);
            alert(`Bem-vindo, ${userProfile.name || userProfile.email}!`);
            navigate('/home'); 
        } catch (err) {
            console.error("Erro de Login:", err);
            setError(err.message); 
        }
    };

    return (
        <div className="split-page-container">
            
            <div className="left-panel">
                <div className="login-box">
                    <form className="login-form" onSubmit={handleSubmit}>
                        <h2 className="title">Login EcoFin</h2> 
                        
                        {error && <p className="error-message">{error}</p>}
                        
                        <div className="form-group">
                            <label htmlFor="email">E-mail</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="password">Senha</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        
                        <button type="submit" className="login-button">Entrar</button>
                        
                        <p className="register-link">
                            Não tem conta? <a href="/cadastro">Cadastre-se</a>
                        </p>
                    </form>
                </div>
            </div>

            <div className="right-panel">
                <div className="ecofin-logo-panel">
                    
                    <img 
                        src={logoImage} 
                        alt="EcoFin Logo" 
                        className="revolutionary-logo-image" 
                    />

                    <h1 className="logo-title">EcoFin</h1>
                    <p className="logo-subtitle">Sua gestão financeira inteligente</p>
                </div>
            </div>

        </div>
    );
};

export default LoginPage;