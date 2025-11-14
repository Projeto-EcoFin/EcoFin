// src/view/RegisterPage.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/AuthService'; // Certifique-se de que o caminho está correto
import './RegisterPage.css'; // Importa estilos se necessário

const RegisterPage = () => {
    // 1. Estados para os campos do formulário e feedback
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false); // Estado para desativar o botão

    const navigate = useNavigate();

    // 2. Função de submissão do formulário
    const handleSubmit = async (e) => {
        e.preventDefault(); // Impede o recarregamento da página

        // Limpa erros anteriores
        setError(null);

        // Validação básica (opcional, mas bom)
        if (!name || !email || !password) {
            setError("Por favor, preencha todos os campos.");
            return;
        }

        if (password.length < 6) {
            setError("A senha deve ter no mínimo 6 caracteres.");
            return;
        }

        setLoading(true); // Ativa o estado de carregamento

        try {
            // Chama o serviço de registro que se comunica com o Flask
            const response = await registerUser(name, email, password);
            
            // Log de sucesso
            console.log("Registro bem-sucedido:", response);

            // Armazenar o token de acesso (exemplo)
            localStorage.setItem('access_token', response.access_token);
            
            // Navega para a dashboard ou página inicial
            navigate('/dashboard');

        } catch (err) {
            console.error("Erro ao tentar registrar:", err);
            // Define o erro a partir da mensagem lançada no AuthService.js
            setError(err.message || "Erro desconhecido ao cadastrar.");
        } finally {
            setLoading(false); // Desativa o carregamento
        }
    };

    return (
        <div className="register-container">
            <h2>Crie sua Conta EcoFin</h2>
            
            {/* 3. Exibição de Erros */}
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
                
                {/* 4. O Botão Corrigido */}
                <button 
                    type="submit" 
                    // Desativa o botão durante o carregamento
                    disabled={loading} 
                    className="submit-button"
                >
                    {loading ? 'Cadastrando...' : 'Cadastrar'}
                </button>

                <p className="login-link">
                    Já tem conta? <span onClick={() => navigate('/login')}>Faça Login</span>
                </p>
            </form>
        </div>
    );
};

export default RegisterPage;