// src/services/AuthService.js

import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword 
} from "firebase/auth";
import { auth } from "../firebase"; // Importa a instância de autenticação que criamos

const API_AUTH_URL = "http://localhost:3000/api/auth";

// =================================================================
// FUNÇÃO UTILITÁRIA PARA ENVIAR O TOKEN PARA O FLASK
// =================================================================

/**
 * Envia o token JWT do Firebase para o Flask para que ele possa verificar o token
 * e emitir o JWT interno da aplicação EcoFin.
 * @param {string} idToken - O token JWT gerado pelo Firebase
 * @param {string} endpoint - O endpoint do Flask (/login ou /register)
 * @param {object} additionalData - Dados adicionais para o registro (nome)
 */
const exchangeTokenWithFlask = async (idToken, endpoint, additionalData = {}) => {
    const payload = {
        id_token: idToken,
        ...additionalData
    };

    const response = await fetch(`${API_AUTH_URL}/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Falha no ${endpoint} do Flask.`);
    }

    return response.json();
};

// =================================================================
// LOGIN
// =================================================================

export const loginUser = async (email, password) => {
    try {
        // 1. Login no Firebase Authentication (verifica senha, lida com segurança)
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        // 2. Obtém o ID Token do Firebase
        const idToken = await user.getIdToken();

        // 3. Troca o ID Token com o Backend Flask para obter o JWT da aplicação
        const flaskResponse = await exchangeTokenWithFlask(idToken, 'login');

        // 4. Salva o token JWT do Flask no LocalStorage
        localStorage.setItem('access_token', flaskResponse.access_token);
        
        // 5. Retorna o perfil do usuário para o Frontend
        return flaskResponse.user_profile;

    } catch (firebaseError) {
        // Tratamento de erros comuns do Firebase
        if (firebaseError.code === 'auth/user-not-found' || firebaseError.code === 'auth/wrong-password') {
            throw new Error("E-mail ou senha incorretos.");
        }
        throw new Error(`Erro de login: ${firebaseError.message}`);
    }
};

// =================================================================
// REGISTRO
// =================================================================

export const registerUser = async (name, email, password) => {
    try {
        // 1. Cria o usuário no Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // 2. Obtém o ID Token do Firebase
        const idToken = await user.getIdToken();

        // 3. Troca o ID Token com o Backend Flask (que também salva no Firestore)
        const flaskResponse = await exchangeTokenWithFlask(idToken, 'register', { name: name });

        // 4. Salva o token JWT do Flask no LocalStorage
        localStorage.setItem('access_token', flaskResponse.access_token);
        
        // 5. Retorna o perfil do usuário
        return flaskResponse.user_id;

    } catch (firebaseError) {
        // Tratamento de erros comuns do Firebase
        if (firebaseError.code === 'auth/email-already-in-use') {
            throw new Error("Este e-mail já está cadastrado.");
        }
        throw new Error(`Erro de registro: ${firebaseError.message}`);
    }
};