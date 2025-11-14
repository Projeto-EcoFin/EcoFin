// src/view/RegisterPage.jsx - Limpo

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/AuthService'; 
import './RegisterPage.css'; 

const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); 

        if (password.length < 6) {
            setError("A senha deve ter pelo menos 6 caracteres.");
            return;
        }

        try {
            await registerUser(name, email, password); 
            
            alert(`Bem-vindo, ${name}! Seu cadastro foi concluído com sucesso.`);
            navigate('/dashboard'); 
            
        } catch (err) {
            console.error("Erro de Registro:", err);
            setError(err.message); 
        }
    };

    return (
        <div className="register-container">
            <form className="register-form" onSubmit={handleSubmit}>
                <h2>Crie sua Conta EcoFin</h2>
                
                {error && <p className="error-message">{error}</p>}
                
                <div className="form-group">
                    <label htmlFor="name">Nome Completo</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                
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
                    <small>Mínimo de 6 caracteres.</small>
                </div>
                
                <button type="submit" className="register-button">Cadastrar</button>
                
                <p className="login-link">
                    Já tem conta? <a href="/login">Faça Login</a>
                </p>
            </form>
        </div>
    );
};

export default RegisterPage;