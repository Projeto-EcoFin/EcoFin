// src/view/ProfilePage.jsx - ATUALIZADO para usar o UserService

import React, { useEffect, useState } from "react";
import EditProfileModal from "../components/EditProfileModal"; 
import Button from "../components/Button"; // Assumindo que você usa este componente
import { fetchUserProfile, updateProfile } from "../services/UserService"; // Importa o novo Service
import './ProfilePage.css'; // Assumindo o CSS

const ProfilePage = () => {
    // Inicialização com dados simulados ou nulos até que o fetch ocorra
    const [user, setUser] = useState(null); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false); 

    // Efeito para carregar o perfil ao montar o componente
    useEffect(() => {
        const loadProfile = async () => {
            try {
                // CHAMA O SERVICE
                const data = await fetchUserProfile(); 
                setUser(data);
            } catch (err) {
                setError("Não foi possível carregar os dados do perfil. Verifique o login.");
                console.error("Erro ao buscar perfil:", err);
            } finally {
                setLoading(false);
            }
        };
        loadProfile();
    }, []); 


    // FUNÇÃO CHAMADA AO SALVAR O MODAL
    const handleSaveProfile = async (updatedData) => {
        try {
            // CHAMA O SERVICE DE UPDATE
            const updatedUser = await updateProfile(updatedData);
            
            // Atualiza o estado da UI
            setUser(updatedUser);
            alert("Perfil atualizado com sucesso!");
            
            setIsEditing(false); // Fecha o modal
        } catch (err) {
            alert(err.message || 'Erro ao salvar as alterações do perfil.');
            console.error("Erro ao salvar perfil:", err);
        }
    };

    if (loading) return <div className="profile-container"><p>Carregando perfil...</p></div>;
    if (error) return <div className="profile-container"><p style={{ color: 'red' }}>Erro: {error}</p></div>;
    
    // Fallback se o user for null por alguma razão após o loading (embora improvável)
    if (!user) return <div className="profile-container"><p>Nenhum dado de usuário encontrado.</p></div>;

    // Garante que 'nome' seja exibido corretamente (o backend usa 'name', o frontend usa 'nome')
    const displayNome = user.nome || user.name; 

    return (
        <div className="profile-container">
            <header className="profile-header">
                <h2>Olá, {displayNome}! 👋</h2>
                <p>Aqui você gerencia suas informações e configurações de conta.</p>
            </header>
            
            <main className="profile-main">
                {/* Card do perfil */}
                <div className="profile-card">
                    {/* Exemplo de avatar simples */}
                    <div className="avatar">👤</div>
                    <h3>{displayNome}</h3>
                    <p>Membro desde {user.membroDesde || "N/A"}</p>
                    
                    {/* Botão que abre o modal */}
                    <Button className="mt-3" onClick={() => setIsEditing(true)}> 
                        ✏️ Editar Perfil
                    </Button>
                </div>

                {/* Informações Detalhadas */}
                <div className="profile-details">
                    <h3>Informações Pessoais</h3>
                    <p><strong>E-mail:</strong> {user.email}</p>
                    <p><strong>Telefone:</strong> {user.telefone || "Não informado"}</p>
                    <p><strong>Localização:</strong> {user.localizacao || "Não informada"}</p>
                </div>
            </main>
            
            {/* Renderiza o modal se isEditing for true */}
            {isEditing && (
                <EditProfileModal
                    user={user}
                    onSave={handleSaveProfile} // Conectado à função que chama a API
                    onCancel={() => setIsEditing(false)}
                />
            )}
        </div>
    );
};

export default ProfilePage;