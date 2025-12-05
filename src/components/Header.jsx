import React from 'react';
import { Link } from 'react-router-dom'; 
import './Header.css';
import logoImage from '../assets/logo.png';

const Header = () => {
  return (
    <header className="header">
      <div className="logo-container">
        <Link to="/home" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', color: 'inherit' }}>
           <img src={logoImage} alt="EcoFin Logo" className="logo-image" />
           <span className="app-name">EcoFin</span>
        </Link>
      </div>

      <nav className="navbar">
        <ul>
          <li><a href="/home">Home</a></li>
          <li><a href="/metas">Metas</a></li>
          <li><a href="/transacoes">Transações</a></li>
          <li><a href="/dash">Relatórios</a></li>
          <li><a href="/licoes">Lições</a></li>
          <li><a href="/perfil">Perfil</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;