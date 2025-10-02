import React, { useState } from 'react';
import './DashboardPage.css';
import Header from '../components/Header.jsx'; 

const GraficoReceitasDespesas = () => (
  <div className="card-grafico">
    <h2 className="grafico-titulo">Receitas VS Despesas</h2>
    {/* Substituir por um componente de gráfico real (ex: Chart.js, Recharts) */}
    <div className="grafico-placeholder bar-chart">
        {/* Simulação visual do gráfico de barras */}
        <p>[Gráfico de Barras: Recitas (Verde) vs Despesas (Vermelho)]</p>
    </div>
  </div>
);

const GraficoDistribuicao = () => (
  <div className="card-grafico">
    <h2 className="grafico-titulo">Distribuição de gastos por categoria</h2>
    {/* Substituir por um componente de gráfico real (ex: Chart.js, Recharts) */}
    <div className="grafico-placeholder pie-chart">
        <p>[Gráfico de Pizza]</p>
        <div className="legenda">
            <span className="dot" style={{backgroundColor: '#9333ea'}}></span> Alimentação
            <span className="dot" style={{backgroundColor: '#3b82f6'}}></span> Moradia
            <span className="dot" style={{backgroundColor: '#f59e0b'}}></span> Transporte
            <span className="dot" style={{backgroundColor: '#ef4444'}}></span> Lazer
            <span className="dot" style={{backgroundColor: '#10b981'}}></span> Saúde
        </div>
    </div>
  </div>
);

const GraficoEvolucaoPoupanca = () => (
  <div className="card-grafico full-width">
    <h2 className="grafico-titulo">Evolução da Poupança</h2>
    {/* Substituir por um componente de gráfico real (ex: Chart.js, Recharts) */}
    <div className="grafico-placeholder line-chart">
        <p>[Gráfico de Linhas: Evolução da Poupança]</p>
    </div>
  </div>
);


const DashboardPage = () => {
    const [periodo, setPeriodo] = useState('Último mês');

    const PeriodoDropdown = () => (
        <div className="dropdown-container">
            <select 
                className="dropdown-periodo" 
                value={periodo} 
                onChange={(e) => setPeriodo(e.target.value)}
            >
                <option value="Último mês">Último mês</option>
                <option value="Últimos 3 meses">Últimos 3 meses</option>
                <option value="Últimos 6 meses">Últimos 6 meses</option>
                <option value="Último ano">Último ano</option>
            </select>
        </div>
    );
    
    return (
        <div className="dashboard-page">
            <Header />
            
            <div className="main-content">

                {/* Gráficos */}
                <div className="dashboard-grid">
                    
                    <div className="grid-row-1">
                        <GraficoReceitasDespesas />
                        <GraficoDistribuicao />
                    </div>

                    <div className="grid-row-2">
                        <GraficoEvolucaoPoupanca />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;