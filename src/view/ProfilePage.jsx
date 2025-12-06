import React, { useState, useEffect } from 'react';
import { fetchUserProfile, updateUserProfile } from '../services/UserService';
import './ProfilePage.css'; 

const ProfilePage = () => {
    const [profile, setProfile] = useState({
        name: '',
        email: '',
        telefone: '',
        localizacao: '',
        membroDesde: ''
    });
    
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

   
    useEffect(() => {
        const loadProfile = async () => {
            try {
                const data = await fetchUserProfile();
                setProfile(data);
            } catch (err) {
                setError(err.message || "Não foi possível carregar o perfil.");
            } finally {
                setLoading(false);
            }
        };

        loadProfile();
    }, []);

  
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfile(prevProfile => ({
            ...prevProfile,
            [name]: value
        }));
    };

   
    const handleSave = async () => {
        setError(null);
        setSuccessMessage(null);
        
        const updateData = {
            nome: profile.name, 
            telefone: profile.telefone,
            localizacao: profile.localizacao
        };

        try {
            const updatedData = await updateUserProfile(updateData);
            setProfile(updatedData); 
            setSuccessMessage("Perfil atualizado com sucesso!");
            setIsEditing(false); 
        } catch (err) {
            setError(err.message || "Erro ao salvar as alterações.");
        }
    };
    
    
    if (loading) {
        return <div className="profile-container">Carregando perfil...</div>;
    }

    if (error && !successMessage) {
        return <div className="profile-container error-message">{error}</div>;
    }

    return (
        <div className="profile-container">
            <h2>Meu Perfil</h2>

            {successMessage && <p className="success-message">{successMessage}</p>}
            {error && <p className="error-message">{error}</p>}

            <div className="profile-data">
                
                <div className="profile-field">
                    <label>Nome:</label>
                    {isEditing ? (
                        <input
                            type="text"
                            name="name"
                            value={profile.name}
                            onChange={handleInputChange}
                        />
                    ) : (
                        <span>{profile.name}</span>
                    )}
                </div>

                <div className="profile-field">
                    <label>Email:</label>
                    <span>{profile.email}</span> 
                </div>

                <div className="profile-field">
                    <label>Telefone:</label>
                    {isEditing ? (
                        <input
                            type="text"
                            name="telefone"
                            value={profile.telefone || ''}
                            onChange={handleInputChange}
                        />
                    ) : (
                        <span>{profile.telefone || 'Não informado'}</span>
                    )}
                </div>

                <div className="profile-field">
                    <label>Localização:</label>
                    {isEditing ? (
                        <input
                            type="text"
                            name="localizacao"
                            value={profile.localizacao || ''}
                            onChange={handleInputChange}
                        />
                    ) : (
                        <span>{profile.localizacao || 'Não informado'}</span>
                    )}
                </div>

                <div className="profile-field">
                    <label>Membro Desde:</label>
                    <span>{profile.membroDesde}</span>
                </div>
            </div>

            <div className="profile-actions">
                {isEditing ? (
                    <>
                        <button className="save-button" onClick={handleSave}>
                            Salvar
                        </button>
                        <button className="cancel-button" onClick={() => setIsEditing(false)}>
                            Cancelar
                        </button>
                    </>
                ) : (
                    <button className="edit-button" onClick={() => setIsEditing(true)}>
                        Editar Perfil
                    </button>
                )}
            </div>
        </div>
    );
};

export default ProfilePage;