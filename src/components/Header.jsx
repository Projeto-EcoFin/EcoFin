import React from 'react';
import './Header.css';
import logoImage from '../assets/logo.png';

const Header = () => {
  return (
    <header className="header">
      <div className="logo-container">
       <img src={logoImage} alt="EcoFin Logo" className="logo-image" />
        <span className="app-name">EcoFin</span>
      </div>
      <nav className="navbar">
        <ul>
          <li><a href="#">Dashboard</a></li>
          <li><a href="#">Metas</a></li>
          <li><a href="#">Transações</a></li>
          <li><a href="#">Orçamentos</a></li>
          <li><a href="#">Relatórios</a></li>
          <li><a href="#">Lições</a></li>
          <li><a href="#">Perfil</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;