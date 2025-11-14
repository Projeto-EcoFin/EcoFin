// src/services/AuthService.js

// URL base para o seu Backend Flask
const API_URL = 'http://localhost:3000/api/auth';

/**
 * Registra um novo usuário no backend Flask.
 * @param {string} name - Nome completo do usuário.
 * @param {string} email - Email do usuário.
 * @param {string} password - Senha do usuário.
 * @returns {Promise<object>} Dados do usuário registrado e token de acesso.
 */
export const registerUser = async (name, email, password) => {
    try {
        const response = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: {
                // ESSENCIAL: Garante que o Flask saiba que está recebendo JSON.
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                // Os nomes das chaves DEVEM ser EXATAMENTE 'name', 'email', 'password'
                name: name,
                email: email,
                password: password
            })
        });

        const data = await response.json();

        if (!response.ok) {
            // Se o status for 400, 409, ou 500, o Flask retornou um erro JSON.
            // Lança o erro com a mensagem do campo 'error' retornada pelo Flask.
            const errorMessage = data.error || 'Falha no register do Flask.';
            throw new Error(errorMessage);
        }

        // Sucesso (Status 201)
        // Retorna o objeto com dados do usuário e access_token
        return data;

    } catch (error) {
        // Loga o erro de rede ou o erro lançado acima
        console.error("Erro no AuthService (registerUser):", error);
        // Lança o erro para ser capturado no RegisterPage.jsx (linha 24 e 30)
        throw error; 
    }
};

/**
 * Simula o login enviando o token do Firebase para o Flask gerar o JWT.
 * NOTA: O login real no Firebase deve ser feito separadamente no Front-end.
 * @param {string} idToken - ID Token do Firebase (obtido após login do cliente).
 * @returns {Promise<object>} Dados do usuário e token JWT do Flask.
 */
export const loginUser = async (idToken) => {
    // Implementação de login similar, focando no envio do id_token
    // ...
};

// Implemente outras funções de serviço (logout, getProfile, etc.) aqui.