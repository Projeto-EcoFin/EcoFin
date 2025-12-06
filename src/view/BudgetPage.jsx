import React, { useState } from 'react';
import Header from '../components/Header.jsx'; 
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import './BudgetPage.css';

const DADOS_GRAFICO = [
    { nome: 'Transporte', Limite: 500, Gastos: 450 },
    { nome: 'Lazer', Limite: 300, Gastos: 350 },
    { nome: 'Moradia', Limite: 2000, Gastos: 1900 },
];

const ORCAMENTOS = [
    { categoria: 'Alimentação', limite: 1000, gastos: 800 },
    { categoria: 'Transporte', limite: 500, gastos: 450 },
    { categoria: 'Lazer', limite: 300, gastos: 350 },
    { categoria: 'Moradia', limite: 2000, gastos: 1900 },
];


const ProgressBar = ({ limite, gastos }) => {
    const progresso = Math.min((gastos / limite) * 100, 100);
    const excedeu = gastos > limite;
    
    return (
        <div className="progress-container">
            <div 
                className={`progress-bar ${excedeu ? 'exceeded' : ''}`}
                style={{ width: `${progresso}%` }}
            ></div>
        </div>
    );
};

const BudgetPage = () => {
    const [novoOrcamento, setNovoOrcamento] = useState({ categoria: '', limite: '' });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNovoOrcamento(prev => ({ ...prev, [name]: value }));
    };

    const handleAddOrcamento = (e) => {
        e.preventDefault();
        console.log("Novo Orçamento Adicionado:", novoOrcamento);
        setNovoOrcamento({ categoria: '', limite: '' }); 
    };

    return (
        <div className="orcamentos-page-container">
            <Header /> 
            
            <main className="orcamentos-main">
                
                <div className="top-section-orcamentos">
                    
                    <div className="card add-budget-card">
                        <h3>Adicionar Novo Orçamento</h3>
                        <form onSubmit={handleAddOrcamento}>
                            <input 
                                type="text"
                                name="categoria"
                                placeholder="Categoria"
                                value={novoOrcamento.categoria}
                                onChange={handleInputChange}
                                required/>
                            <input 
                                type="number"
                                name="limite"
                                placeholder="Limite"
                                value={novoOrcamento.limite}
                                onChange={handleInputChange}
                                required/>
                            <button type="submit" className="cta-button-orcamento">+ Adicionar Orçamento</button>
                        </form>
                    </div>

                    <div className="card chart-card">
                        <h3>Visão Geral dos Orçamentos</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart
                                data={DADOS_GRAFICO}
                                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="nome" />
                                <YAxis />
                                <Tooltip formatter={(value, name) => [`R$ ${value.toFixed(2)}`, name]} />
                                <Legend />
                                <Bar dataKey="Limite" fill="#3b82f6" name="Limite" />
                                <Bar dataKey="Gastos" fill="#ef4444" name="Gastos" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Seção Central: Lista de Orçamentos */}
                <div className="card budget-list-card">
                    <h3>Lista de Orçamentos</h3>
                    <table className="budget-table">
                        <thead>
                            <tr>
                                <th>Categoria</th>
                                <th>Limite</th>
                                <th>Gastos</th>
                                <th>Progresso</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ORCAMENTOS.map((orcamento, index) => (
                                <tr key={index} className={orcamento.gastos > orcamento.limite ? 'exceeded-row' : ''}>
                                    <td>{orcamento.categoria}</td>
                                    <td>R$ {orcamento.limite.toFixed(2).replace('.', ',')}</td>
                                    <td>R$ {orcamento.gastos.toFixed(2).replace('.', ',')}</td>
                                    <td>
                                        <ProgressBar 
                                            limite={orcamento.limite} 
                                            gastos={orcamento.gastos} 
                                        />
                                    </td>
                                    <td className="actions-cell">
                                        <button className="icon-button edit-button">
                                            <svg className="icon" viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
                                        </button>
                                        <button className="icon-button delete-button">
                                            <svg className="icon" viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="alert-box error">
                    <span className="alert-title">• Alerta de Orçamento</span>
                    <p>Você ultrapassou o limite de **R$ 300.00** para **lazer**. Gasto atual: **R$ 350.00**</p>
                </div>

            </main>
        </div>
    );
};

export default BudgetPage; 