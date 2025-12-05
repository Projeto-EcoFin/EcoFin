// src/components/TransactionsList.jsx (Modelo de Estrutura)

import React from 'react';
// IMPORTANTE: Certifique-se que o CSS está sendo importado!
import './TransactionsList.css'; // <--- IMPORTAÇÃO DO ESTILO

const TransactionsList = ({ transactions, onDelete, onEditStart }) => {
    if (!transactions || transactions.length === 0) {
        return <p className="no-transactions">Nenhuma transação registrada ainda.</p>;
    }

    return (
        <div className="transactions-list-container">
            {/* Cabeçalho da Lista */}
            <div className="transaction-item header-row">
                <span className="trans-date">Data</span>
                <span className="trans-desc">Descrição</span>
                <span className="trans-type">Tipo</span>
                <span className="trans-value">Valor</span>
                <span className="trans-category">Categoria</span>
                <span className="trans-actions">Ações</span>
            </div>

            {/* Itens da Lista */}
            {transactions.map(t => (
                // ⚠️ A classe 'despesa' ou 'receita' é crucial para as cores!
                <div key={t.id} className={`transaction-item ${t.type.toLowerCase()}`}>
                    <span className="trans-date">{t.date}</span>
                    <span className="trans-desc">{t.description}</span>
                    <span className="trans-type">{t.type}</span>
                    <span className="trans-value">R$ {parseFloat(t.value).toFixed(2).replace('.', ',')}</span>
                    <span className="trans-category">{t.category}</span>
                    <div className="trans-actions">
                        <button className="btn-edit" onClick={() => onEditStart(t)}>Editar</button>
                        <button className="btn-delete" onClick={() => onDelete(t.id)}>Excluir</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TransactionsList;