import React, { useState } from 'react';
import './VIPCheckoutPage.css';
import Header from '../components/Header.jsx'; 
import MembroVipBanner from '../assets/membroVip.png'; 
import VipBadgeImage from '../assets/vipBadge.png';

const CheckIcon = () => (
  <svg className="check-icon" viewBox="0 0 24 24">
    <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
  </svg>
);

const StarIcon = () => (
  <svg className="star-icon" viewBox="0 0 24 24">
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
  </svg>
);

const VIPCheckoutPage = () => {
  const [plano, setPlano] = useState('mensal'); 

  return (
    <>
      <Header/>
      
     
    <div className="vip-hero" 
        style={{ backgroundImage: `url(${MembroVipBanner})` }}>
        <div className="vip-hero-content">
          <h1>Torne-se um Membro VIP</h1>
          <p>Desbloqueie todo o potencial do EcoFin</p>
        </div>
      </div>
      
      <div className="checkout-container">
        
        <div className="beneficios-card">
          <div className="beneficios-header">
            <StarIcon />
            <h2>Benefícios VIP</h2>
          </div>
          <ul className="beneficios-lista">
            <li><CheckIcon /> Acesso a todas as lições de educação financeira</li>
            <li><CheckIcon /> Relatórios financeiros avançados</li>
            <li><CheckIcon /> Suporte prioritário</li>
            <li><CheckIcon /> Ferramentas de planejamento financeiro exclusivas</li>
            <li><CheckIcon /> Integração com múltiplas contas bancárias</li>
          </ul>
        </div>
        
        <div className="pagamento-card">
        <img 
            src={VipBadgeImage} 
            alt="Selo VIP" 
            className="vip-badge-image" 
          />
          <h2>Escolha seu Plano</h2>

          <div className="ciclo-cobranca">
            <p>Selecione o ciclo de cobrança</p>
            </div>

          <div className="opcoes-plano">
            <label className={`plano-opcao ${plano === 'mensal' ? 'selected' : ''}`}>
              <input 
                type="radio" 
                name="plano" 
                value="mensal" 
                checked={plano === 'mensal'} 
                onChange={() => setPlano('mensal')} 
              />
              <span className="radio-label">Mensal</span>
              <span className="plano-preco">R$ 29.99</span>
            </label>

            <label className={`plano-opcao ${plano === 'anual' ? 'selected' : ''}`}>
              <input 
                type="radio" 
                name="plano" 
                value="anual" 
                checked={plano === 'anual'} 
                onChange={() => setPlano('anual')} 
              />
              <span className="radio-label">Anual</span>
              <span className="plano-preco">
                R$ 299.99 <span className="economia">Economize 17%</span>
              </span>
            </label>
          </div>

          <div className="formulario-pagamento">
            <label htmlFor="numeroCartao">Número do Cartão</label>
            <input type="text" id="numeroCartao" placeholder="XXX XXXX XXXX XX-XX" />

            <div className="form-row">
              <div>
                <label htmlFor="dataExpiracao">Data de Expiração</label>
                <input type="text" id="dataExpiracao" placeholder="MM/AA" />
              </div>
              <div>
                <label htmlFor="cvv">CVV</label>
                <input type="text" id="cvv" placeholder="XXX" />
              </div>
            </div>
            
            <button className="submit-button">Torne-se VIP</button>
          </div>

        </div>
      </div>
    </>
  );
};

export default VIPCheckoutPage;