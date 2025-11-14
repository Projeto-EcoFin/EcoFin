// src/services/AuthService.js

import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firebase"; // Certifique-se de que o caminho está correto

const API_URL = 'http://localhost:3000/api/auth';

// =================================================================
// REGISTRO DE USUÁRIO
// =================================================================
export const registerUser = async (name, email, password) => {
    try {
        const response = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Falha no register do Flask.');
        }

        return data;

    } catch (error) {
        console.error("Erro no AuthService (registerUser):", error);
        throw error; 
    }
};

// =================================================================
// LOGIN DE USUÁRIO
// =================================================================
const firebaseClientLogin = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const idToken = await userCredential.user.getIdToken();
        return idToken; 
    } catch (error) {
        throw error;
    }
};

export const loginUser = async (email, password) => {
    try {
        const idToken = await firebaseClientLogin(email, password);
        
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id_token: idToken })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Falha na obtenção do JWT no Flask.');
        }

        localStorage.setItem('access_token', data.access_token);
        return data.user; 

    } catch (error) {
        console.error("Erro no AuthService (loginUser):", error);
        if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential') {
            throw new Error("Credenciais inválidas. Verifique seu e-mail e senha.");
        }
        throw error;
    }
};

// =================================================================
// OBTER PERFIL DO USUÁRIO
// =================================================================
export const getProfile = async () => {
    try {
        const token = localStorage.getItem('access_token');
        if (!token) {
            throw new Error("Token de acesso não encontrado.");
        }

        const response = await fetch(`${API_URL}/profile`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` 
            }
        });

        const data = await response.json();

        if (!response.ok) {
            const errorMessage = data.msg || 'Falha ao buscar perfil.';
            throw new Error(errorMessage);
        }

        return data;

    } catch (error) {
        console.error("Erro no AuthService (getProfile):", error);
        logoutUser(); 
        throw error;
    }
};

// =================================================================
// LOGOUT
// =================================================================
export const logoutUser = async () => {
    try {
        localStorage.removeItem('access_token');
        await signOut(auth);
        console.log("Logout bem-sucedido.");
        return true;
    } catch (error) {
        console.error("Erro ao fazer logout do Firebase:", error);
        throw new Error("Erro ao desconectar do Firebase. Token local removido.");
    }
};