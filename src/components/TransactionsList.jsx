import React from 'react';
import './TransactionsList.css';

const TransactionsList = ({ transactions }) => { 
  return (
    <div className="list-container">
      <h3>Lista de Transações</h3>

      {/* Verificação: se não houver transações, mostre uma mensagem */}
      {transactions.length === 0 ? (
        <p className="no-transactions-message">Nenhuma transação encontrada. Adicione uma nova transação para começar.</p>
      ) : (
        <table>
          {/*cabeçalho e corpo da tabela */}
        </table>
      )}
    </div>
  );
};

export default TransactionsList;