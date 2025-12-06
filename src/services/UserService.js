
const API_PROFILE_URL = "http://localhost:3000/api/profile";

const getAuthHeaders = () => {
    const token = localStorage.getItem('access_token');
    if (!token) {
        throw new Error("Token de acesso não encontrado. Usuário não autenticado.");
    }
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };
};



export const fetchUserProfile = async () => {
    const headers = getAuthHeaders();
    
    const response = await fetch(API_PROFILE_URL, {
        method: 'GET',
        headers: headers,
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Falha ao buscar perfil.");
    }

    return response.json();
};


export const updateUserProfile = async (data) => {
    const headers = getAuthHeaders();

    const response = await fetch(API_PROFILE_URL, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Falha ao atualizar perfil.");
    }

    return response.json();
};