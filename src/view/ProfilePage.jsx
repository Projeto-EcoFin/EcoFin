import React, { useEffect, useState } from "react";
import { mockUser } from "../mock/user";
import Button from "../components/Button";
import Header from "../components/Header";
import "./ProfilePage.css";

const ProfilePage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Simulação de "fetch"
    setTimeout(() => {
      setUser(mockUser);
    }, 500);
  }, []);

  if (!user) {
    return <div className="loading">Carregando perfil...</div>;
  }

  return (
    <div className="profile-container">
      <Header />

      <main className="profile-main">
        {/* Card do perfil */}
        <div className="profile-card">
          <div className="profile-avatar">
            <span>👤</span>
          </div>
          <h3>{user.nome}</h3>
          <p>Membro desde {user.membroDesde}</p>
          <Button className="mt-3">✏️ Editar Perfil</Button>
        </div>

        {/* Informações Pessoais */}
        <div className="info-card">
          <h3>Informações Pessoais</h3>
          <ul>
            <li><strong>Nome Completo:</strong> {user.nome}</li>
            <li><strong>E-mail:</strong> {user.email}</li>
            <li><strong>Telefone:</strong> {user.telefone}</li>
            <li><strong>Localização:</strong> {user.localizacao}</li>
          </ul>
        </div>

        {/* Configurações */}
        <div className="settings-card">
          <h3>Configurações da Conta</h3>
          <div className="settings-buttons">
            <Button variant="outline">💳 Método de Pagamento</Button>
            <Button variant="outline">🔒 Segurança</Button>
            <Button variant="outline">❓ Ajuda e Suporte</Button>
          </div>
          <Button variant="danger" className="mt-4">
            🚪 Sair da Conta
          </Button>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
