// src/view/LoginPage.jsx - ATUALIZADO

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/AuthService'; // Importa o novo service
import './LoginPage.css';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); // Limpa erros anteriores

        try {
            // CHAMA A LÓGICA DE AUTENTICAÇÃO
            const userProfile = await loginUser(email, password);
            
            // Se o login for bem-sucedido (o token foi salvo no AuthService)
            alert(`Bem-vindo, ${userProfile.name || userProfile.email}!`);
            navigate('/dashboard'); // Redireciona para a dashboard
            
        } catch (err) {
            console.error("Erro de Login:", err);
            // Exibe a mensagem de erro fornecida pelo AuthService
            setError(err.message); 
        }
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Login EcoFin</h2>
                
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
    );
};

export default LoginPage;