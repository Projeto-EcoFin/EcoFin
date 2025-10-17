import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import SummaryCard from '../components/SummaryCard';
import './HomePage.css'; 


const FinanceiroGeral = ({ saldo, despesas, receitas }) => (
    <div className="visao-geral-container">
        <SummaryCard title="Saldo Atual" value={saldo} icon="saldo" isCurrency />
        <SummaryCard title="Despesas do Mês" value={despesas} icon="despesa" isCurrency isNegative />
        <SummaryCard title="Receitas do Mês" value={receitas} icon="receita" isCurrency />
    </div>
)

const AlertasGastos = () => (
    <div className="alertas-container">
        <h3>Alertas de Gastos</h3>

        <div className="alert-item excessive">
            <span className="alert-icon">⚠️</span>
            <p>Você desembolsou R$ 1200 em alimentação, excedendo a cota de R$ 1000. Pense em rever suas despesas neste setor.</p>
        </div>
        <div className="alert-item excessive">
            <span className="alert-icon">⚠️</span>
            <p>Você desembolsou R$ 800 em lazer, excedendo o teto de R$ 500. Pense em rever suas despesas neste setor.</p>
        </div>
    </div>
);

const FluxoCaixa = () => (
    <div className="fluxo-caixa-container">
        <h3>Fluxo de Caixa</h3>
        <p className="mock-chart-placeholder">
            [Gráfico de Receitas vs Despesas dos Últimos 6 meses será implementado aqui]
        </p>
    </div>
);



const HomePage = () => {
    const navigate = useNavigate();

    const mockData = {
        saldo: 5219.00,
        despesas: 3209.00,
        receitas: 7500.00
    };

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
                
                <section className="dashboard-content">

                    <h2>Visão Geral Financeira</h2>
                    <FinanceiroGeral 
                        saldo={mockData.saldo} 
                        despesas={mockData.despesas} 
                        receitas={mockData.receitas} 
                    />
                    
                    <AlertasGastos />
                    <FluxoCaixa />
                    
                </section>

            </main>
            
        </div>
    );
};

export default HomePage;