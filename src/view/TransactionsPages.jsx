import React, { useState } from 'react';
import Header from '../components/Header';
import AddTransactionForm from '../components/AddTransactionForm';
import TransactionsList from '../components/TransactionsList';
// Certifique-se de que o nome do CSS também está correto e no plural
import './TransactionsPages.css';

// Mude o nome da função/componente
const TransactionsPages = () => {
  const [transactions, setTransactions] = useState([]);

  const handleAddTransaction = (newTransaction) => {
    setTransactions([...transactions, { ...newTransaction, id: transactions.length + 1 }]);
  };

  return (
    <div className="page-wrapper">
      <Header />
      <main className="main-content">
        <h1 className="page-title">Transações</h1>
        <AddTransactionForm onAddTransaction={handleAddTransaction} />
        <TransactionsList transactions={transactions} />
      </main>
    </div>
  );
};

// Exporte o componente com o nome plural
export default TransactionsPages;