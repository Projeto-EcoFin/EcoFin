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
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/transacoes">Transações</Link></li>
          <li><Link to="/dash">Relatórios</Link></li>
          <li><Link to="/licoes">Lições</Link></li>
          <li><Link to="/perfil">Perfil</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;