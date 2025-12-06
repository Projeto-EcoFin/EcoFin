import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import './HomePage.css'; 

const FeatureCard = ({ icon, title, description }) => (
    <div className="feature-card">
        <div className="feature-icon">{icon}</div>
        <h3>{title}</h3>
        <p>{description}</p>
    </div>
);

const HomePage = () => {
    const navigate = useNavigate();

    const handleNavigateToTransactions = () => {
        navigate('/transacoes');
    };

    return (
        <div className="home-container">
            <Header />
            
            <main className="home-main-content">
                
                <section className="home-hero">
                    <div className="hero-overlay">
                        <h1>Gerencie as suas finanças com precisão</h1>
                        <p>Administre seus gastos, monitore suas receitas e atinja suas metas financeiras.</p>
                        <button 
                            className="btn-primary" 
                            onClick={handleNavigateToTransactions}
                        >
                            Incluir Transação
                        </button>
                    </div>
                </section>
                
                <section className="dashboard-content generic-mode">

                    <div className="section-header">
                        <h2>Tudo sob controle</h2>
                        <p>Uma visão clara para o seu sucesso financeiro.</p>
                    </div>

                    <div className="features-grid">
                        <FeatureCard 
                            icon="📊" 
                            title="Dashboards Intuitivos" 
                            description="Visualize seus saldos e despesas sem planilhas complicadas." 
                        />
                        <FeatureCard 
                            icon="📚" 
                            title="Lições para seu Crescimento" 
                            description="Aprenda com facilidade." 
                        />
                        <FeatureCard 
                            icon="📈" 
                            title="Relatórios de Evolução" 
                            description="Acompanhe seu progresso mês a mês com gráficos detalhados." 
                        />
                    </div>

                        
                       
                   

                </section>

            </main>
        </div>
    );
};

export default HomePage;