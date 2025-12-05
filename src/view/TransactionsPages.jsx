// src/pages/TransactionsPages.jsx
import React, { useState } from 'react';
import Header from '../components/Header';
import AddTransactionForm from '../components/AddTransactionForm';
import TransactionsList from '../components/TransactionsList';

import './TransactionsPages.css';

const TransactionsPages = () => {
  const [transactions, setTransactions] = useState([]);

  const handleAddTransaction = (newTransaction) => {
    setTransactions((prev) => [...prev, newTransaction]);
  };

  const handleDeleteTransaction = (transactionId) => {
    setTransactions((prev) => prev.filter(t => t.id !== transactionId));
  };

  const handleEditStart = () => {
    alert("Edição ainda não implementada 😅");
  };

  return (
    <div className="transactions-container">
      <Header />
      <main className="main-content">
        <h1 className="page-title">Transações</h1>

        <AddTransactionForm onAddTransaction={handleAddTransaction} />

        <TransactionsList
          transactions={transactions}
          onDelete={handleDeleteTransaction}
          onEditStart={handleEditStart}
        />
      </main>
    </div>
  );
};

export default TransactionsPages;
