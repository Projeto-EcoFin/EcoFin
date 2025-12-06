import React, { useState } from 'react';
import './DashboardPage.css';
import Header from '../components/Header.jsx'; 
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell,
  LineChart, Line, AreaChart, Area
} from 'recharts';


const dadosReceitasDespesas = [
  { mes: 'Jan', receita: 5000, despesa: 3200 },
  { mes: 'Fev', receita: 5200, despesa: 3800 },
  { mes: 'Mar', receita: 4800, despesa: 2900 },
  { mes: 'Abr', receita: 5500, despesa: 4100 },
  { mes: 'Mai', receita: 6000, despesa: 3500 },
  { mes: 'Jun', receita: 5800, despesa: 3000 },
];

const dadosCategorias = [
  { name: 'Alimentação', value: 1200, color: '#9333ea' },
  { name: 'Moradia', value: 1500, color: '#3b82f6' },
  { name: 'Transporte', value: 500, color: '#f59e0b' },
  { name: 'Lazer', value: 400, color: '#ef4444' },
  { name: 'Saúde', value: 300, color: '#10b981' },
];

const dadosPoupanca = [
  { mes: 'Jan', saldo: 10000 },
  { mes: 'Fev', saldo: 11200 },
  { mes: 'Mar', saldo: 12500 },
  { mes: 'Abr', saldo: 13100 },
  { mes: 'Mai', saldo: 14800 },
  { mes: 'Jun', saldo: 16500 },
];


const GraficoReceitasDespesas = () => (
  <div className="card-grafico">
    <h2 className="grafico-titulo">Receitas VS Despesas</h2>
    <div className="grafico-container">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={dadosReceitasDespesas} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="mes" />
          <YAxis />
          <Tooltip 
            contentStyle={{ backgroundColor: '#fff', borderRadius: '8px' }}
            formatter={(value) => `R$ ${value}`}
          />
          <Legend />
          <Bar dataKey="receita" name="Receitas" fill="#10b981" radius={[4, 4, 0, 0]} />
          <Bar dataKey="despesa" name="Despesas" fill="#ef4444" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
);

const GraficoDistribuicao = () => (
  <div className="card-grafico">
    <h2 className="grafico-titulo">Distribuição de gastos</h2>
    <div className="grafico-container pie-container">
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={dadosCategorias}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {dadosCategorias.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `R$ ${value}`} />
        </PieChart>
      </ResponsiveContainer>
      
      <div className="legenda">
        {dadosCategorias.map((cat) => (
            <div key={cat.name} style={{ display: 'flex', alignItems: 'center' }}>
                <span className="dot" style={{backgroundColor: cat.color}}></span> 
                {cat.name}
            </div>
        ))}
      </div>
    </div>
  </div>
);

const GraficoEvolucaoPoupanca = () => (
  <div className="card-grafico full-width">
    <h2 className="grafico-titulo">Evolução da Poupança</h2>
    <div className="grafico-container">
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={dadosPoupanca} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorSaldo" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis dataKey="mes" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <Tooltip formatter={(value) => `R$ ${value}`} />
          <Area 
            type="monotone" 
            dataKey="saldo" 
            stroke="#3b82f6" 
            fillOpacity={1} 
            fill="url(#colorSaldo)" 
          />
        </AreaChart>
      </ResponsiveContainer>
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
                <div className="dashboard-controles">
                   <h2 style={{margin: 0}}>Visão Geral</h2>
                   <PeriodoDropdown />
                </div>

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