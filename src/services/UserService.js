// src/services/UserService.js

const API_USER_URL = "http://localhost:3000/api/user/profile";

// =================================================================
// FUNÇÕES UTILITÁRIAS
// =================================================================

// Obtém o token JWT do localStorage e prepara os headers
const getAuthHeaders = () => {
    const token = localStorage.getItem("access_token");
    if (!token) {
        // Lógica para lidar com token ausente
        throw new Error("Token de autenticação não encontrado. Faça login novamente.");
    }
    return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    };
};

// =================================================================
// READ: Buscar Dados do Perfil (GET)
// =================================================================
export const fetchUserProfile = async () => {
    const headers = getAuthHeaders();
    
    const response = await fetch(API_USER_URL, {
        method: "GET",
        headers: headers,
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Não foi possível carregar o perfil.");
    }

    // O backend retorna os dados do usuário
    return response.json(); 
};

// =================================================================
// UPDATE: Atualizar Dados do Perfil (PUT)
// =================================================================
export const updateProfile = async (updatedData) => {
    const headers = getAuthHeaders();

    const response = await fetch(API_USER_URL, {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Falha ao atualizar o perfil. Verifique o servidor.");
    }

    // O backend retorna o objeto do usuário atualizado
    const result = await response.json();
    return result; 
};