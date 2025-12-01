// src/services/AuthService.js (CORRIGIDO PARA O SEU BACKEND ATUAL)

// ⚠️ CORREÇÃO 1: A URL base deve apontar para onde suas rotas estão (/api/auth)
const API_URL = 'http://localhost:3000/api/auth';
const STORAGE_KEY = 'user_id_simple'; 

// =================================================================
// 1. LOGIN (Envia email/senha, recebe o UID)
// =================================================================
export const loginUser = async (email, password) => {
    const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ email, password })
    });
    
    const data = await response.json();

    if (response.ok) {
        // Salva o ID do usuário como nosso 'código de sessão'
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
    const response = await fetch(`${API_URL}/register`, {
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
// 3. GET PROFILE (CORRIGIDO)
// =================================================================
export const getProfile = async () => {
    // Recupera o ID salvo no login
    const userId = localStorage.getItem(STORAGE_KEY);

    if (!userId) {
        throw new Error("Usuário não autenticado. Faça o login.");
    }

    // ⚠️ CORREÇÃO 2: Envia o cabeçalho X-User-ID que o Python espera
    // ⚠️ CORREÇÃO 3: A URL agora é /api/auth/profile
    const response = await fetch(`${API_URL}/profile`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-User-ID': userId 
        }
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.msg || data.error || `Falha ao buscar perfil: ${response.status}`);
    }

    return data; 
};

// =================================================================
// 4. LOGOUT
// =================================================================
export const logoutUser = async () => {
    localStorage.removeItem(STORAGE_KEY);
};