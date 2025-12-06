
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/AuthService'; 
import './RegisterPage.css';

import logoImage from '../assets/logoP.png'; 

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
        <div className="split-page-container">
            
            <div className="left-panel">
                <div className="register-box">
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
                            className="login-button"
                        >
                            {loading ? 'Cadastrando...' : 'Cadastrar'}
                        </button>

                        <p className="register-link">
                            Já tem conta? <a onClick={() => navigate('/login')} style={{cursor: 'pointer'}}>Faça Login</a>
                        </p>
                    </form>
                </div>
            </div>

            <div className="right-panel">
                 <div className="ecofin-logo-panel">
                     
                     <img 
                        src={logoImage} 
                        alt="Logo da EcoFin" 
                        className="revolutionary-logo-image" 
                     />
                 </div>
            </div>
        </div>
    );
};

export default RegisterPage;    