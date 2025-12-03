// src/services/AuthService.js (CORREÇÃO DEFINITIVA)

// URL Base da API
const API_BASE = 'http://localhost:3000/api';
const STORAGE_KEY = 'user_id_simple'; 

// =================================================================
// 1. LOGIN
// =================================================================
export const loginUser = async (email, password) => {
    // Rota: /api/auth/login
    const response = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ email, password })
    });
    
    const data = await response.json();

    if (response.ok) {
        // Salva o ID simples
        localStorage.setItem(STORAGE_KEY, data.user_id); 
        return { user: data.user, success: true };
    } else {
        throw new Error(data.error || 'Email ou senha inválidos.');
    }
};

// =================================================================
// 2. REGISTRO
// =================================================================
export const registerUser = async (name, email, password) => {
    // Rota: /api/auth/register
    const response = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ name, email, password })
    });
    
    const data = await response.json();

    if (response.ok) {
        localStorage.setItem(STORAGE_KEY, data.id); 
        return { message: data.message, success: true };
    } else {
        throw new Error(data.error || 'Erro ao registrar usuário.');
    }
};

// =================================================================
// 3. GET PROFILE
// =================================================================
export const getProfile = async () => {
    const userId = localStorage.getItem(STORAGE_KEY);

    if (!userId) {
        throw new Error("Usuário não autenticado.");
    }

    // Rota: /api/profile (definida no user_controller)
    // ⚠️ MUDANÇA: Envia X-User-ID em vez de Authorization
    const response = await fetch(`${API_BASE}/profile`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-User-ID': userId 
        }
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.msg || `Erro: ${response.status}`);
    }

    return data; 
};

// =================================================================
// 4. LOGOUT
// =================================================================
export const logoutUser = async () => {
    localStorage.removeItem(STORAGE_KEY);
};