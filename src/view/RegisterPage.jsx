import React from 'react';
import './RegisterPage.css';

const RegisterPage = () => {
  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Crie sua conta</h2>
        <p>Já possui uma conta? Entre <a href="#">aqui</a>.</p>

        <form>
          <div className="input-group">
            <label htmlFor="fullName">Nome Completo *</label>
            <input type="text" id="fullName" placeholder="Insira seu nome" />
          </div>

          <div className="input-group">
            <label htmlFor="email">E-mail *</label>
            <input type="email" id="email" placeholder="Insira seu e-mail" />
          </div>

          <div className="input-group">
            <label htmlFor="password">Senha *</label>
            <input type="password" id="password" placeholder="Insira sua senha" />
          </div>

          <div className="input-group">
            <label htmlFor="confirmPassword">Senha *</label>
            <input type="password" id="confirmPassword" placeholder="Insira sua senha" />
          </div>

          <div className="terms-checkbox">
            <input type="checkbox" id="terms" />
            <label htmlFor="terms">Eu concordo com os termos de serviço e política de privacidade</label>
          </div>

          <button type="submit" className="register-button">
            Acessar Conta
          </button>
        </form>

        <p className="or-divider">OU REGISTRE-SE COM</p>

        <div className="social-login">
          {/* Aqui você pode adicionar ícones de redes sociais */}
          <button className="social-icon google"></button>
          <button className="social-icon mail"></button>
          <button className="social-icon facebook"></button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;