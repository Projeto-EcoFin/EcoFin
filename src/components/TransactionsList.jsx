import React from 'react';
import './TransactionsList.css'; 

// O componente recebe as props onDelete (para exclusão) e onEditStart (para iniciar a edição)
const TransactionsList = ({ transactions, onDelete, onEditStart }) => {
    
    if (transactions.length === 0) {
        return (
            <div className="transactions-card">
                <p className="no-transactions-message">
                    Nenhuma transação encontrada. Adicione uma nova transação para começar.
                </p>
            </div>
        );
    }

    return (
        <div className="transactions-card">
            <h2>Lista de Transações</h2>
            <table>
                <thead>
                    <tr>
                        <th>Descrição</th>
                        <th>Valor</th>
                        <th>Tipo</th>
                        <th>Categoria</th>
                        <th>Data</th>
                        <th>Ações</th> {/* <-- Coluna de Ações */}
                    </tr>
                </thead>
                <tbody>
                    {transactions.map(transaction => (
                        <tr 
                            key={transaction.id} 
                            // Aplica a classe 'expense' ou 'revenue' para estilização de cor
                            className={transaction.type === 'Despesa' ? 'expense' : 'revenue'}
                        >
                            <td>{transaction.description}</td>
                            
                            {/* Formata o valor com R$ e 2 casas decimais, usando Math.abs para ignorar o sinal */}
                            <td>R$ {Math.abs(transaction.value).toFixed(2)}</td>
                            
                            <td>{transaction.type}</td>
                            <td>{transaction.category}</td>
                            <td>{transaction.date}</td>
                            
                            {/* CÉLULA DE AÇÕES */}
                            <td>
                                {/* 1. Botão de Edição (NOVO) */}
                                <button 
                                    className="edit-button" 
                                    // Ao clicar, chama a função que veio do pai (TransactionsPages), passando o objeto completo da transação
                                    onClick={() => onEditStart(transaction)}
                                >
                                    Editar
                                </button>
                                
                                {/* 2. Botão de Exclusão */}
                                <button 
                                    className="delete-button" 
                                    onClick={() => onDelete(transaction.id)}
                                >
                                    Excluir
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TransactionsList;