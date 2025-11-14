// src/view/RegisterPage.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/AuthService'; 
import './RegisterPage.css'; // Importa o CSS com os estilos de painel dividido

const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false); 

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        
        if (!name || !email || !password || password.length < 6) {
            setError("Por favor, preencha todos os campos e use uma senha de no mínimo 6 caracteres.");
            return;
        }

        setLoading(true);

        try {
            const response = await registerUser(name, email, password);
            localStorage.setItem('access_token', response.access_token);
            navigate('/dashboard');

        } catch (err) {
            console.error("Erro ao tentar registrar:", err);
            setError(err.message || "Erro desconhecido ao cadastrar.");
        } finally {
            setLoading(false);
        }
    };

    return (
        // ESTRUTURA PARA APLICAR O CSS DE PAINEL DIVIDIDO
        <div className="split-page-container">
            
            {/* PAINEL ESQUERDO: CONTEÚDO DO FORMULÁRIO */}
            <div className="left-panel">
                <div className="register-box"> {/* Seu CSS usa esta classe */}
                    <h1 className="title">Crie sua Conta EcoFin</h1>
                    
                    {error && <p className="error-message" style={{color: 'red', fontWeight: 'bold'}}>{error}</p>}
                    
                    <form onSubmit={handleSubmit}>
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
                                minLength="6" 
                                required 
                            />
                            <small>Mínimo de 6 caracteres.</small>
                        </div>
                        
                        <button 
                            type="submit" 
                            disabled={loading} 
                            className="login-button" // Seu CSS usa esta classe
                        >
                            {loading ? 'Cadastrando...' : 'Cadastrar'}
                        </button>

                        <p className="register-link">
                            Já tem conta? <a onClick={() => navigate('/login')}>Faça Login</a>
                        </p>
                    </form>
                </div>
            </div>

            {/* PAINEL DIREITO: LOGO E DECORAÇÃO */}
            <div className="right-panel">
                 <div className="ecofin-logo-panel">
                     {/* Certifique-se de que o caminho da imagem está correto */}
                     <img 
                        src="/assets/revolutionary-logo.png" 
                        alt="Logo da EcoFin" 
                        className="revolutionary-logo-image" 
                     />
                 </div>
            </div>
        </div>
    );
};

export default RegisterPage;