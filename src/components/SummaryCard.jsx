import React from 'react';
import './SummaryCard.css'; 


const SummaryCard = ({ title, value, icon, isCurrency = true, isNegative = false }) => {

    const formattedValue = isCurrency 
        ? `R$ ${Math.abs(value).toFixed(2).replace('.', ',')}` 
        : value;

    const valueClass = isNegative ? 'negative' : 'positive';
    const iconMap = {
        'saldo': '💰', 
        'despesa': '💸', 
        'receita': '📈',
    };

    return (
        <div className="summary-card">
            <div className="card-header">
                <span className="card-icon">{iconMap[icon] || 'ℹ️'}</span>
                <h3 className="card-title">{title}</h3>
            </div>
            
            <p className={`card-value ${valueClass}`}>{formattedValue}</p>
        </div>
    );
};

export default SummaryCard;